# 04. Technical Stack & System Architecture (Lean Edition)

> **Document Version:** 1.2.0 (Lean Edition)  
> **Target Scale:** Fast MVP Launch (0 to 15,000 WAU)  
> **Hosting Cost Target:** ₹0 to $25/month max (Free Tiers first)  

---

## 1. Grounded Infrastructure Topology

For a 4-person team, we eliminate DevOps overhead completely. No Kubernetes, no standalone Redis clusters to babysit, no microservice fragmentation.

```mermaid
flowchart TD
    User["User Mobile / Desktop Browser"] -->|Free Global CDN & SSL| CF["Cloudflare (Free Tier)"]
    CF -->|Edge SSR & Next.js App Router| Vercel["Vercel Hosting (Hobby / Free Tier)"]
    
    subgraph ManagedBackend["Supabase (Free Tier / Postgres 16)"]
        DB[("PostgreSQL Database<br>• Relational Events & Venues<br>• pg_trgm Fuzzy Search<br>• Row-Level Security (RLS)")]
        Auth["Supabase Auth (Admin Login)"]
        Storage["Supabase Storage (Flyer Images)"]
    end

    subgraph ServerlessAI["Serverless Extraction Route"]
        NextAPI["Next.js Server Actions / API Routes"]
        Gemini["Gemini 1.5 Flash API<br>($0.001 per flyer OCR)"]
    end

    Vercel --> NextAPI
    NextAPI --> DB
    NextAPI --> Auth
    NextAPI --> Storage
    NextAPI --> Gemini

    style ManagedBackend fill:#FFF8EE,stroke:#B51F2A,stroke-width:2px
    style Vercel fill:#F7E3E1,stroke:#B51F2A,stroke-width:1.5px
    style Gemini fill:#FFFFFF,stroke:#B51F2A
```

---

## 2. Complete Entity-Relationship Diagram (ERD)

The relational schema cleanly separates canonical events from multiple acquisition sources and enables fast filtering:

```mermaid
erDiagram
    VENUES ||--o{ EVENTS : hosts
    ORGANIZERS ||--o{ EVENTS : organizes
    EVENTS ||--|{ EVENT_SOURCES : has
    EVENTS ||--o{ USER_SAVES : saved_by
    EVENTS ||--o{ EVENT_ANALYTICS : tracks

    VENUES {
        uuid id PK
        string name
        string slug
        string address
        string neighborhood
        string zone
        decimal latitude
        decimal longitude
        string google_maps_url
    }

    ORGANIZERS {
        uuid id PK
        string name
        string slug
        string instagram_handle
        string contact_phone
        boolean is_verified
    }

    EVENTS {
        uuid id PK
        string title
        string slug
        text short_summary
        string category
        text_array vibe_tags
        timestamptz start_datetime
        timestamptz end_datetime
        boolean is_free
        decimal starting_price
        string pricing_details
        uuid venue_id FK
        uuid organizer_id FK
        string cover_image_url
        string status
        boolean is_featured
        integer boost_priority
    }

    EVENT_SOURCES {
        uuid id PK
        uuid event_id FK
        string source_platform
        string source_url
        string outbound_action_type
        timestamptz captured_at
    }

    EVENT_SUBMISSIONS {
        uuid id PK
        string submitted_by_name
        string contact_info
        string source_url
        string uploaded_flyer_url
        jsonb raw_extracted_json
        string moderation_status
        timestamptz created_at
    }

    USER_SAVES {
        uuid id PK
        uuid user_id
        uuid event_id FK
        timestamptz created_at
    }

    EVENT_ANALYTICS {
        uuid id PK
        uuid event_id FK
        string event_type
        string source_platform
        timestamptz created_at
    }
```

---

## 3. Multimodal Ingestion Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor Organizer as Organizer / Curator (Person 3)
    participant UI as /submit Page
    participant API as /api/ingest Route
    participant Storage as Supabase Storage
    participant Gemini as Gemini 1.5 Flash
    participant DB as Postgres (Supabase)
    actor Admin as Admin (Phone Mobile Web)

    Organizer->>UI: Uploads flyer image or Instagram link
    UI->>API: Sends file/URL payload
    API->>Storage: Stores compressed WebP asset
    API->>Gemini: Sends image with strict JSON extraction prompt
    Gemini-->>API: Returns parsed fields (Title, Date, Time, Venue, Price, Category)
    API->>DB: Checks trigram collision (>85% title similarity on same date)
    alt Is Duplicate
        API->>DB: Attaches source URL to existing event
    else Is New Event
        API->>DB: Saves to event_submissions (status = 'pending')
    end
    DB-->>Admin: Staging queue item appears
    Admin->>DB: Taps "Approve" ➔ Event published instantly!
```

---

## 4. "Build My Weekend" Candidate Resolution Engine

```mermaid
flowchart LR
    A["User Prompt / Constraints:<br>Sat • South CCU • <₹1,000"] --> B["SQL Filter:<br>Events on Sat in South CCU<br>Price <= ₹500"]
    B --> C["Conflict & Distance Validator:<br>Ensure stops are < 5 km apart"]
    C --> D["Slot Assignment:<br>3:30 PM: Cafe<br>6:00 PM: Workshop<br>8:30 PM: Live Music"]
    D --> E["Gemini 1.5 Flash:<br>Formats witty itinerary card<br>with outbound links"]

    style A fill:#FFFFFF,stroke:#B51F2A
    style B fill:#FFF8EE,stroke:#B51F2A
    style E fill:#F7E3E1,stroke:#B51F2A,stroke-width:1.5px
```

---

## 5. Production PostgreSQL DDL Schema

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Venues
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    neighborhood VARCHAR(100) NOT NULL, -- 'Park Street', 'Salt Lake', 'Ballygunge', etc.
    zone VARCHAR(50) NOT NULL,          -- 'South', 'Central', 'East', 'North'
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    google_maps_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organizers
CREATE TABLE organizers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    instagram_handle VARCHAR(100),
    contact_phone VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Canonical Events
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_summary TEXT NOT NULL,
    full_description TEXT,
    category VARCHAR(50) NOT NULL,      -- 'music', 'workshops', 'theatre', 'food', 'heritage'
    vibe_tags TEXT[] DEFAULT '{}',
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ,
    is_free BOOLEAN DEFAULT FALSE,
    starting_price DECIMAL(10, 2) DEFAULT 0.00,
    pricing_details VARCHAR(255),
    venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
    organizer_id UUID REFERENCES organizers(id) ON DELETE SET NULL,
    cover_image_url TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'published', -- 'draft', 'pending', 'published', 'expired'
    is_featured BOOLEAN DEFAULT FALSE,
    boost_priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_title_trgm ON events USING gin(title gin_trgm_ops);

-- 4. Event Sources (1 Event -> Many Links)
CREATE TABLE event_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    source_platform VARCHAR(50) NOT NULL, -- 'instagram', 'bookmyshow', 'insider', 'google_forms'
    source_url TEXT NOT NULL,
    outbound_action_type VARCHAR(50) DEFAULT 'external_ticket',
    captured_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Submissions Queue
CREATE TABLE event_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submitted_by_name VARCHAR(255),
    contact_info VARCHAR(255) NOT NULL,
    source_url TEXT,
    uploaded_flyer_url TEXT,
    raw_extracted_json JSONB,
    moderation_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
