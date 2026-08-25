# Frizko — Steering Contract

## 1. Problem

The Philippine fishing industry (₱328.74B/year, ~2.29M people in its value chain) has no centralized cold chain infrastructure. Cold storage exists in General Santos, Davao Gulf, Zamboanga, and Cebu, but capacity is invisible and fragmented across isolated operators. Two failures result:

- **First-mile blind spot**: suppliers can't locate available cold storage within their short post-harvest window, forcing distress sales or total loss (~40% of catch volume lost to spoilage annually).
- **Demand-supply mismatch**: catch that *is* safely consigned into storage is still invisible to verified B2B buyers, who default to imports instead of sourcing local.

This is a visibility problem, not a cash-flow problem — consignment without upfront payment is already the trusted norm suppliers use via consignatarios.

## 2. Goal (this build)

Ship an MVP that digitizes the storage-matching workflow for the General Santos pilot: let suppliers find and consign into open cold storage via SMS, let storage operators manage intake, and give buyers a visible feed of consignable inventory — without requiring suppliers to change how they already store and sell fish.

This steering doc governs the **software build**, scoped and sequenced to support (not duplicate) the business plan already defined in the pitch doc (revenue model, cold-start sequencing, SDG alignment).

## 3. Team & Constraints

- Solo or small team, hackathon/short-sprint timeline (days–weeks).
- **Mobile app first**: this is a mobile application, not a desktop/web product. All design and build decisions target a phone-sized touch interface as the primary surface.
- Frontend-first build: UI/interfaces come before backend matching logic is wired up.
- Low-connectivity-first: SMS is the default supplier/storage-operator channel, not a fallback.
- No money custody by the platform — payment/escrow deferred to a licensed rail (Maya Business / GCash for Business / PayMongo) integration, out of scope for this MVP phase.

## 3a. Tech Stack

- **App layer:** React Native + Expo — single codebase for iOS + Android, fast to prototype and get running on a real device (Expo Go) with no native build pain. Fits the small-team/short-sprint constraint.
- **Backend/data:** Supabase (or Firebase) — auth, database, and realtime updates out of the box, so matching/status changes (request → matched → stored) can feel live without a hand-built backend. Mock data now, swap in real SMS parsing + matching logic later without a rewrite.
- **SMS intake (future phase):** structured shortcode parsing via a PH-capable SMS gateway (e.g. Semaphore, Globe Labs/Smart SMS API, or Twilio) — out of scope for Phase 1 (see Section 5), but the stack should not block this integration later.
- **Design source:** Google Stitch, mobile frame/aspect ratio, per Section 6 design direction.

## 4. Success Criteria (Phase 1 — MVP)

Given the short timeline, "done" means a demonstrable, clickable/testable system covering the four surfaces below, even if matching logic is stubbed or manually simulated behind the scenes:

- [ ] Supplier can submit a storage request via a simulated SMS intake flow (structured short-code format, e.g. `STORE GENSAN 500KG AVAIL`) and see it acknowledged.
- [ ] Storage operator has an interface to view, accept/reject, and log intake against their available capacity.
- [ ] A storage-matching view exists showing supplier requests against available storage nodes (matching logic can be rule-based/manual for MVP — real "agentic" matching is a later phase).
- [ ] Buyer has an interface to browse consigned/available inventory (read-only feed is acceptable for MVP).
- [ ] The four surfaces are visually connected as one coherent product (shared design system, not four disconnected prototypes).

## 5. Scope

**In scope (Phase 1):**
- Frontend for all four roles: Supplier (via SMS-style intake), Storage Operator, internal Storage-Matching view, Buyer.
- Simulated/structured SMS intake parsing (can be a text-input mock standing in for a real telco gateway).
- Static or mock data layer to demonstrate flows end-to-end.

**Explicitly out of scope (Phase 1):**
- Real SMS/telco gateway integration.
- Real payment rail / escrow / split-payment integration.
- BFAR Key Data Element traceability capture and quality-dispute workflow.
- Real matching algorithm/agentic logic (rule-based or hardcoded stand-ins are fine).
- Multi-region support (Zamboanga, Cebu) — General Santos only.
- Authentication/production security hardening.

## 6. Design Direction

- **Color:** Blue-dominant (deep ocean/trust blue) on a light neutral background, with a warm amber/coral accent reserved for CTAs and status alerts only.
- **Inspiration:** Grab (bold, functional, dense info cards, clear status chips, map/list hybrid views, strong logistics iconography) × Airbnb (generous whitespace, soft rounded corners, warm typography, card-based browsing, trust/verification signals).
- **Feel:** Intuitive, low cognitive load — used in the field by non-technical users (fisherfolk, storage operators) as well as professional B2B buyers. Clarity over density.
- **Mobile app, not mobile-responsive-web**: designed for a native phone screen (touch targets, thumb reach zones, bottom-anchored navigation) — not a scaled-down desktop layout. Rounded corners, soft shadows, clear typographic hierarchy.
- **Status badge convention** (consistent across all screens): green = available, amber = pending, blue = matched/confirmed, gray = closed.

## 6a. Screens to Build (Phase 1)

Design + frontend build covers these screens, one per role plus shared shell screens:

| # | Screen | Role | Purpose |
|---|--------|------|---------|
| 1 | **Onboarding / Login** | Shared | Frizko logo/branding, role selection (Supplier / Storage Operator / Buyer / Ops), simple login |
| 2 | **Supplier SMS Intake View** | Supplier | Structured SMS request (e.g. `STORE GENSAN 500KG AVAIL`) parsed into a status card — species, weight, location, status stepper (Pending → Matched → Stored) |
| 3 | **Supplier Request History** | Supplier | List of past/active consignment requests with status badges |
| 4 | **Storage Operator Dashboard** | Storage Operator | Queue of incoming supplier requests with Accept/Reject actions, capacity utilization gauge |
| 5 | **Storage Operator Intake Log** | Storage Operator | Card list of active consignments in their facility, status chips (Available / Reserved / Full) |
| 6 | **Storage-Matching View (Ops)** | Internal/Ops | Kanban or list matching open supplier requests to available storage nodes; filters by location, capacity, species |
| 7 | **Buyer Marketplace Feed** | Buyer | Airbnb-style grid/list of available consigned inventory — species, weight, location, freshness/grading badge, price |
| 8 | **Buyer Item Detail / Request to Buy** | Buyer | Expanded view of a single inventory item with "Request to Buy" CTA |
| 9 | **Shared Navigation Shell** | Shared | Bottom tab nav (mobile), role-dependent, consistent status badge system |

Screens 2–3 (Supplier), 4–5 (Storage Operator), and 7–8 (Buyer) can each be treated as one connected mini-flow. Screen 6 (Ops matching) and Screen 1/9 (shell) are cross-cutting.

## 7. Assumptions

- "Frontend even without backend logic" means: build real, navigable interfaces with realistic mock data and interaction states, not static mockups — but persistence/matching can be simulated.
- Project name confirmed as **Frizko**; output directory `docs/ideation/frizko/`.
- Platform decision: **native-feeling mobile app (React Native + Expo)** over responsive web/PWA — Frizko's users (field-based fisherfolk, storage operators, mobile-first buyers) are best served by an installable app experience; the SMS intake path remains available independent of app install for suppliers without the app.
- Buyer-matching activation threshold (3 storage nodes / 50 supplier accounts) is a business-stage gate, not a Phase 1 build gate — the buyer interface should exist in Phase 1 as a browsable surface even before that threshold is "real."

## 8. Open Questions (carried into PRD, not blocking)

- Single combined app with role-based navigation/login, or separate lightweight apps per role? (Screen 1/9 assumes a shared shell with role selection — confirm this is preferred over fully separate apps.)
- Logo/brand assets for Frizko — placeholder for now; swap in once available.
- Target OS priority — Android-first (higher share among target field users in the Philippines) or parity iOS/Android from the start?

## 9. Next Artifacts

On approval of this contract:
- `prd-phase-1.md` — detailed requirements for the four Phase 1 surfaces.
- `spec-phase-1.md` — implementation spec (screens, components, mock data shape, file structure).
