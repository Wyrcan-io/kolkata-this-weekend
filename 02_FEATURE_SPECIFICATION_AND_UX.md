# 02. Feature Specification & UX Architecture (Lean Edition)

> **Document Version:** 1.2.0 (Lean 4-Person Edition)  
> **Status:** Feature Blueprint & Functional Requirements  
> **Principle:** Maximum utility, zero bloat, mobile-first  

---

## 1. Information Architecture & Lean Routes

For a 4-person team, every unnecessary route is technical debt. We keep the application surface lean and laser-focused on weekend conversion:

```mermaid
flowchart TD
    Home["Homepage ('/')<br>• Weekend Date Bar (Tonight / Sat / Sun)<br>• Category Chips (Music, Art, Food, etc.)<br>• Fast Editorial Cards Feed"]
    
    Explore["Explore & Filters ('/explore')<br>• Filter by Zone (South, Salt Lake, Central)<br>• Filter by Price (Free, Under ₹500)<br>• Keyword Search"]
    
    Detail["Event Detail ('/event/:slug')<br>• Full Hero Poster & Summary<br>• Direct Outbound Action CTA<br>• Google Maps Directions Link<br>• 'Save' & 'Share to WhatsApp'"]
    
    Planner["Build My Weekend ('/build-my-weekend')<br>• 3-Step Constraint Input<br>• AI-Curated 3-Stop Day Plan<br>• 1-Tap Itinerary WhatsApp Export"]
    
    Saved["Saved & Polls ('/saved')<br>• LocalStorage Shortlist<br>• 'Kothay Jabi?' WhatsApp Poll Link"]
    
    Submit["Add Event ('/submit')<br>• Flyer Dropzone / Instagram Link<br>• AI Pre-fill in 3 seconds"]
    
    Admin["Admin Gate ('/admin')<br>• Mobile-Friendly Staging Table<br>• 1-Tap Approve / Reject"]

    Home --> Explore
    Home --> Detail
    Home --> Planner
    Home --> Saved
    Home --> Submit
    Detail --> Saved
    Saved --> PollLink["Shareable WhatsApp Group Poll"]

    style Home fill:#FFF8EE,stroke:#B51F2A,stroke-width:2px
    style Detail fill:#F7E3E1,stroke:#B51F2A,stroke-width:1.5px
    style PollLink fill:#B51F2A,color:#FFFFFF,stroke:#961720,stroke-width:2px
```

---

## 2. Core User Journey Flow

```mermaid
flowchart LR
    A["Open Website<br>(No Login Needed)"] --> B["Tap 'Tomorrow (Sat)'<br>+ 'South Kolkata'"]
    B --> C["Scroll Editorial Cards<br>(Loads in < 1 sec)"]
    C --> D{"User Intent"}
    
    D -->|Single Event| E["Tap Outbound Link<br>(BookMyShow / Insta DM)"]
    D -->|Group Indecision| F["Save 3 Events to Shortlist<br>➔ Generate WhatsApp Poll"]
    D -->|Wants Full Plan| G["Use 'Build My Weekend'<br>➔ Get 3-stop day sequence"]

    style A fill:#FFF8EE,stroke:#B51F2A
    style E fill:#B51F2A,color:#FFFFFF
    style F fill:#F7E3E1,stroke:#B51F2A
    style G fill:#F7E3E1,stroke:#B51F2A
```

---

## 3. Core Feature Breakdown

### 3.1. The Date-Aware Weekend Feed (Homepage)
* **Goal:** Give the user the answer to *"What should I do today/tomorrow?"* within 3 seconds.
* **The Date Strip:**
  - `🔥 Everything This Weekend`
  - `Tonight (From 4 PM)`
  - `Saturday`
  - `Sunday`
  - `Next Weekend`
* **Category Filters:**
  - 🎵 Live Music & Gigs
  - 🎨 Workshops & Art
  - 🎭 Theatre & Cultural
  - 🍽️ Food & Nightlife
  - 🌿 Heritage, Walks & Nature
* **Card Anatomy:**
  - High-res flyer preview (optimized WebP).
  - Category Badge (`🎵 Live Music`).
  - Title, Time & Venue (`Sat • 7:30 PM • Park Street`).
  - Price Tag (`FREE` or `₹299 onwards`).
  - 1-tap Save heart + 1-tap WhatsApp Share.

---

### 3.2. Event Detail Experience (`/event/[slug]`)
* **Goal:** Full context with zero clutter, passing the user cleanly to the source.
* **Sticky Mobile Bottom Bar:**
  - Primary button: Dynamic Outbound CTA (`"Book on BookMyShow ↗"`, `"Register via Google Form ↗"`, or `"DM on Instagram ↗"`).
  - Secondary button: Quick Save heart + WhatsApp share icon.
* **Neighborhood Proximity:**
  - Display coarse location (e.g., *"Hindustan Park, South Kolkata • 4 mins walk from Gariahat"*).
  - Direct *"Open in Google Maps"* link.

---

### 3.3. The Signature Feature: "Build My Weekend"

```mermaid
flowchart TD
    subgraph UserInput["Step 1: 30-Second Constraint Input"]
        In1["Date: Tomorrow (Saturday)"]
        In2["Area: South Kolkata"]
        In3["Budget: Under ₹1,000 / head"]
        In4["Vibe: Chill Coffee + Something Creative + Dinner"]
    end

    subgraph BackendResolution["Step 2: Database Query & Conflict Check"]
        Query["Supabase Query:<br>Match events by Date + Zone + Budget"]
        Slot1["Afternoon Slot (3:30 PM):<br>Art Cafe / Exhibition"]
        Slot2["Evening Slot (6:00 PM):<br>Pottery Workshop / Live Gig"]
        Slot3["Night Slot (8:30 PM):<br>Nearby Dinner / Acoustic Pub"]
        Query --> Slot1 & Slot2 & Slot3
    end

    subgraph Output["Step 3: Clean Itinerary Card"]
        Result["Narrative Timeline with Timings, Budgets & Outbound Links"]
        WAShare["1-Tap 'Send Plan to WhatsApp Group'"]
        Result --> WAShare
    end

    UserInput --> Query
    Slot1 & Slot2 & Slot3 --> Result

    style BackendResolution fill:#FFF8EE,stroke:#B51F2A,stroke-width:1.5px
    style WAShare fill:#B51F2A,color:#FFFFFF,stroke:#961720,stroke-width:2px
```

---

### 3.4. The Viral Growth Engine: "Kothay Jabi?" WhatsApp Poll

This is how our 4-person team gets thousands of users without spending a single rupee on paid ads:

```mermaid
sequenceDiagram
    autonumber
    actor User as Organizer of Friend Group (Rahul)
    participant Web as Kolkata This Weekend (/saved)
    participant WA as WhatsApp Friends Group
    actor Friends as Friends (3-5 People)

    User->>Web: Saves 3 candidate events to Shortlist
    User->>Web: Clicks "Plan with Friends (WhatsApp)"
    Web->>Web: Generates lightweight poll (e.g. /poll/sat-plans-77)
    User->>WA: Pastes pre-formatted text: "Vote where we should go this Saturday! 👉 link"
    Friends->>Web: Click link on their phones (No app install, No login!)
    Friends->>Web: Tap thumbs-up on their preferred option
    Web-->>Friends: Instant live results bar
    Note over Friends,Web: Every friend just discovered Kolkata This Weekend!
```

---

### 3.5. Fast Organizer Submission & AI Extraction (`/submit`)

```mermaid
flowchart LR
    A["Organizer drops flyer poster or pastes IG link"] --> B["Gemini 1.5 Flash Vision parses fields in 2.5s"]
    B --> C["Organizer reviews pre-filled form on screen"]
    C --> D["Organizer taps 'Submit Event'"]
    D --> E["Admin receives instant Telegram/WhatsApp alert"]
    E --> F["Admin taps 'Approve' on phone ➔ Live on feed!"]

    style A fill:#FFFFFF,stroke:#B51F2A
    style B fill:#FFF8EE,stroke:#B51F2A
    style F fill:#F7E3E1,stroke:#B51F2A,stroke-width:2px
```

---

### 3.6. Mobile Admin Curation Console (`/admin`)
* **Requirements for a 4-person team:**
  - Must be 100% usable on a mobile phone so Person 3 can approve events while riding the metro.
  - Review queue displays: Poster image, extracted title, date, venue, price, and source link.
  - Buttons: `✅ Approve`, `✏️ Quick Edit`, `❌ Reject`.
