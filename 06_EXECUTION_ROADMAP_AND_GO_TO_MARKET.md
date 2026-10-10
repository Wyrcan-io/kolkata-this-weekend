# 06. Execution Roadmap & Go-To-Market Playbook (Bootstrap Edition)

> **Document Version:** 1.2.0 (Lean 4-Person Edition)  
> **Team:** 4 Founders  
> **Target:** Live MVP in 4 Weeks (Zero Bureaucracy)  

---

## 1. The 4-Week Fast MVP Gantt Chart

We do not have months to theorize. We ship a functional, beautiful product in 4 weeks:

```mermaid
gantt
    title Kolkata This Weekend — 4-Week Bootstrap Sprint
    dateFormat  YYYY-MM-DD
    section Week 1: Core Base
    Supabase DB Schema & Next.js Setup (P1 & P2) :2026-10-12, 5d
    Curate 60 Initial Seed Events (P3)           :2026-10-14, 4d
    Setup Brand Assets & Domain (P4)             :2026-10-12, 3d
    section Week 2: Discovery Feed
    Mobile Editorial Feed & Date Strip (P1)      :2026-10-19, 5d
    Mobile Admin 1-Click Moderation Tool (P2)    :2026-10-21, 4d
    Reach 100 Verified Weekend Events (P3)       :2026-10-22, 4d
    section Week 3: Viral Loop
    WhatsApp Poll & Shortlist Engine (P1 & P2)   :2026-10-26, 5d
    Soft Launch with 50 College Friends (P4)     :2026-10-29, 3d
    section Week 4: Public Launch
    First 'Thursday 6 PM Drop' Blast (Team)      :2026-11-05, 2d
    Distribute Table Cards to 10 Cafes (P4)      :2026-11-06, 3d
```

---

## 2. The 4-Person Weekly Rhythm & Roles

To prevent confusion and ensure everyone knows what to do every single day:

```mermaid
flowchart TD
    subgraph P1Role["Person 1: Frontend & UI (Dev)"]
        P1A["Next.js App Router & Tailwind"]
        P1B["Fast Mobile Performance (LCP < 1.2s)"]
        P1C["Card animations & WhatsApp share buttons"]
    end

    subgraph P2Role["Person 2: Backend & AI (Dev)"]
        P2A["Supabase PostgreSQL & Security (RLS)"]
        P2B["Gemini 1.5 Flash Flyer OCR Route"]
        P2C["Mobile Admin Staging Tool (/admin)"]
    end

    subgraph P3Role["Person 3: Lead Curator (Content)"]
        P3A["Wednesday 90-minute 80-event curation"]
        P3B["Verify ticket prices & venue addresses"]
        P3C["Maintain zero expired/cancelled links"]
    end

    subgraph P4Role["Person 4: GTM & Hustle (Growth)"]
        P4A["Post Thursday 6 PM Drop Reel on Instagram"]
        P4B["WhatsApp broadcast to college & friend groups"]
        P4C["Visit 10 cafes for coaster/table tent collabs"]
    end

    P2Role -->|Clean Data API| P1Role
    P3Role -->|Curated Event Content| P2Role
    P4Role -->|Brings Users & Submissions| P3Role

    style P1Role fill:#FFF8EE,stroke:#B51F2A
    style P2Role fill:#FFF8EE,stroke:#B51F2A
    style P3Role fill:#F7E3E1,stroke:#B51F2A
    style P4Role fill:#F7E3E1,stroke:#B51F2A
```

---

## 3. The 90-Minute Wednesday Content Flywheel

Person 3 doesn't need to spend 20 hours a week curating. Here is the exact, repeatable 90-minute protocol executed every Wednesday evening:

```mermaid
flowchart LR
    A["7:00 PM: Open BookMyShow & Insider Kolkata<br>(Grab 15 verified gigs/comedy)"] --> B["7:25 PM: Scan 30 Bookmarked Instagram Pages<br>(Skinny Mo's, Nandan, KCC, TopCat, Art Studios)"]
    B --> C["7:50 PM: Drop flyers into /api/ingest<br>(Gemini OCR auto-parses title, date, venue)"]
    C --> D["8:15 PM: Review on phone (/admin)<br>(1-tap approve 80-100 events)"]
    D --> E["8:30 PM: Feed is locked & verified for Thursday Drop!"]

    style A fill:#FFFFFF,stroke:#B51F2A
    style C fill:#FFF8EE,stroke:#B51F2A
    style E fill:#F7E3E1,stroke:#B51F2A,stroke-width:2px
```

---

## 4. Zero-Budget Hyperlocal Distribution (GTM)

We don't buy Facebook or Google ads. We leverage Kolkata's organic social networks:

```mermaid
flowchart TD
    subgraph ZeroBudgetGrowth["How We Get 10,000 Users for ₹0"]
        JU["Jadavpur University & Presidency Arts Circles<br>• Share event links in WhatsApp batch groups<br>• Tap into theatre & music crowds"]
        Xaviers["St. Xavier's & Park Street Crowd<br>• Focus on nightlife, comedy & social hangouts"]
        Cafes["10 South & Central Kolkata Cafes<br>• Place simple printed table tents: 'What's happening in Kolkata this weekend? Scan to see'<br>(Sienna, Roastery, Bunaphile, Blue Tokai)"]
        ViralPoll["'Kothay Jabi?' WhatsApp Polls<br>• Every group plan shared in WhatsApp brings 3-5 new users to vote!"]
    end

    JU --> FeedTraffic["Kolkata This Weekend Traffic"]
    Xaviers --> FeedTraffic
    Cafes --> FeedTraffic
    ViralPoll --> FeedTraffic

    style ZeroBudgetGrowth fill:#FFF8EE,stroke:#B51F2A,stroke-width:2px
    style FeedTraffic fill:#B51F2A,color:#FFFFFF,stroke:#961720,stroke-width:2px
```

---

## 5. North-Star Success Metric & Weekly Checks

```
┌────────────────────────────────────────────────────────┐
│                   THE ONLY METRIC THAT MATTERS         │
│                                                        │
│           Weekly Active Weekend Planners (WAWP)         │
│   (Real people who visit Thursday–Sunday and click a   │
│         Save, WhatsApp Share, or Ticket link)          │
└────────────────────────────────────────────────────────┘
```

### Targets for the 4 Founders

| Timeline | Active Weekly Users | Events in Feed | WhatsApp Polls Created | Outbound Ticket Clicks |
| :--- | :--- | :--- | :--- | :--- |
| **Week 2 (Alpha)** | 100 (Friends & family) | 60 | 10 | 25 |
| **Week 4 (Public Launch)**| 1,200 | 100+ | 80 | 250 |
| **Month 2** | 3,500 | 140+ | 300 | 800 |
| **Month 3** | 6,500 | 180+ | 750 | 1,800 |
| **Month 6** | 15,000+ | 250+ | 2,000+ | 5,000+ |
