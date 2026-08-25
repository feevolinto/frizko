# Frizko — Phase 1 Implementation Spec

Derived from `contract.md` (steering contract) and the four Stitch design mockups in `design/`. This is the `spec-phase-1.md` artifact called for in contract §9.

## 1. Status of design assets vs. contract §6a

Contract §6a calls for 9 screens. Only 4 have Stitch mockups today:

| # | Screen | Role | Mockup |
|---|--------|------|--------|
| 1 | Onboarding / Login | Shared | **Missing** |
| 2 | Supplier SMS Intake View | Supplier | `design/supplier_sms_intake_new_brand_color/` |
| 3 | Supplier Request History | Supplier | **Missing** |
| 4 | Storage Operator Dashboard | Storage Operator | `design/operator_dashboard_new_brand_color/` |
| 5 | Storage Operator Intake Log | Storage Operator | **Missing** |
| 6 | Storage-Matching View (Ops) | Internal/Ops | `design/internal_ops_matching_new_brand_color/` |
| 7 | Buyer Marketplace Feed | Buyer | `design/buyer_marketplace_new_brand_color/` |
| 8 | Buyer Item Detail / Request to Buy | Buyer | **Missing** |
| 9 | Shared Navigation Shell | Shared | Implied (bottom nav duplicated per-screen, not a standalone artifact) |

Screens 1, 3, 5, 8 need net-new design before build; §5 below specs them by extrapolation from the sibling screens in their mini-flow (2↔3, 4↔5, 7↔8) plus contract §6a's stated purpose.

## 2. Design system conflict — needs a decision before build

Two competing token sets ship in `design/`, and the 4 mockups don't consistently use either one:

- **Arctic Logistics Framework** (`design/arctic_logistics_framework/DESIGN.md`) — primary `#002c4f` (deep navy), secondary `#006878` (teal). Used by Buyer Marketplace, Ops Matching, and Supplier Intake mockups.
- **Teal Frost Logistics** (`design/teal_frost_logistics/DESIGN.md`) — primary `#006878` (teal), secondary `#004373` (navy). Used *only* by the Operator Dashboard mockup — its `primary` token is remapped to teal while every other screen keeps `primary: #002c4f`.

Net effect: the Operator Dashboard's top bar, capacity gauge, and Accept buttons render teal while the other three screens render navy for the equivalent role. This directly contradicts contract §4's "four surfaces are visually connected as one coherent product" success criterion.

**Recommendation:** standardize on Arctic Logistics Framework (3 of 4 existing screens already use it; it's also the one that matches contract §6's "Blue-dominant... deep ocean/trust blue" direction). Rebuild Operator Dashboard's color bindings onto the Arctic token set. Flagging as an open item rather than silently picking — confirm before implementation.

## 3. Status badge convention — mockups don't match contract §6

Contract §6 states: green = available, amber = pending, blue = matched/confirmed, gray = closed. Actual mockups use:

- Buyer Marketplace: badges are grade/quality labels (Grade A+, Sashimi Grade), not status — out of the stated convention entirely.
- Ops Matching: "Pending" renders in secondary teal, not amber.
- Operator Dashboard: "Available" renders primary-tinted (navy/teal), "Full" renders error red — not green/gray.
- Supplier Intake: "Pending" renders in a hardcoded `#FFF8E1`/`#F57F17` amber pair that isn't a design-token color at all.

**Build rule for Phase 1:** implement the `StatusBadge` component strictly per contract §6 (green/available, amber/pending, blue/matched, gray/closed) as the single source of truth, and treat grade labels (Grade A+, Sashimi Grade) as a separate `GradeBadge` component — don't conflate the two.

## 4. Shared components

Extracted from repeated markup across all 4 mockups:

| Component | Notes |
|---|---|
| `TopAppBar` | Frizko wordmark + `ac_unit` icon (secondary/primary tint), role label right-aligned. Desktop variant adds inline nav links; mobile variant is icon+wordmark only, fixed top. |
| `BottomNavBar` | 4 tabs: Home (`dashboard`), Logistics (`inventory_2`), Market (`storefront`), Profile (`person`). Mobile-only (`md:hidden`), fixed bottom, active tab gets pill background + filled icon. **Open item:** which tab is "active" must be driven by current route, not hardcoded per screen — today each mockup hardcodes a different active tab inconsistently (see §6). |
| `StatusBadge` | Pill, 15%-opacity tinted background, semibold `label-sm`, icon + text. Colors per §3 above. |
| `GradeBadge` | Pill, frosted/blurred white background over an image, icon + text (e.g. `ac_unit` + "Grade A+"). Marketplace-only. |
| `LogisticsCard` | White card, `rounded-xl`, soft shadow (`0 4px 20px rgba(25,53,70,.05)`, lifts to `0 8px 30px rgba(25,53,70,.12)` on hover). Base pattern for consignment, request, and match cards. |
| `CapacityGauge` | Big percentage number + thin horizontal progress bar (`h-2` for match cards, `h-base` for dashboard) + numeric caption row. |
| `RequestStatusStepper` | Vertical stepper, 3 steps (Received → Finding Storage → Stored), filled/active/pending dot states, connecting line. |
| `PrimaryButton` / `SecondaryButton` / `TertiaryButton` | Per Arctic DESIGN.md §Components: solid/outline/ghost, `h-12`, `rounded-lg`. |
| `FilterChipRow` | Horizontal scroll, `no-scrollbar`, pill filter buttons, one active (solid) + rest outlined. |

## 5. Screen specs

### 5.1 Onboarding / Login *(to design)*
- Frizko logo/wordmark, tagline.
- Role selector: 4 cards or segmented control — Supplier, Storage Operator, Buyer, Ops.
- Simple login (phone number or email + password stub — no real auth per contract §5 out-of-scope).
- On role select → route to that role's home tab with `BottomNavBar` scoped to role (see §7).

### 5.2 Supplier SMS Intake View — built
- Raw SMS echo card (monospace, `sms` icon): `"STORE GENSAN 500KG AVAIL"`.
- Parsed request card: species, location, weight, type, `StatusBadge`, `RequestStatusStepper`.
- Actions: "View Nearby Facilities" (primary), "Cancel Request" (secondary/outline).
- Data need: latest `SupplierRequest` for the logged-in supplier.

### 5.3 Supplier Request History *(to design)*
- List of `LogisticsCard`s, one per past/active `SupplierRequest`, each showing species/weight/date + `StatusBadge`.
- Tap → reuses the parsed-request card layout from 5.2 (read-only if not latest/active).
- Empty state: "No requests yet" + CTA to submit one.

### 5.4 Storage Operator Dashboard — built
- `CapacityGauge` card for the operator's facility (percent utilized, tons used/total).
- "Active Consignments" grid — `LogisticsCard`s with ID, species, temp requirement, thin progress bar (pallets used/total), `StatusBadge`.
- Side rail: "Incoming Requests" queue, count badge, per-request card (name, tons, temp, ETA, Accept/Decline buttons).
- Data need: `Facility`, `Consignment[]`, `IncomingRequest[]`.

### 5.5 Storage Operator Intake Log *(to design)*
- Full card list (not the dashboard's 2-up preview) of all consignments in the facility.
- `StatusBadge` per contract §6 convention: Available (green) / Reserved (amber) / Full (gray, since "closed"-equivalent).
- Filter/sort by status.

### 5.6 Storage-Matching View (Ops) — built
- Filter row: Location, Capacity, Species.
- Match cards: left half = `SupplierRequest` (name, `StatusBadge` Pending, species, volume); right half = suggested `StorageNode` (name, verified icon, distance, capacity bar, "Match Now" CTA).
- Data need: paired list of `{ request: SupplierRequest, suggestedNode: StorageNode }` — matching logic is rule-based/manual per contract §4.

### 5.7 Buyer Marketplace Feed — built
- Sticky search header + `tune` filter button + `FilterChipRow` (species, grade).
- Responsive grid (1/2/3/4 cols) of `LogisticsCard`s: image, `GradeBadge`, name, price/kg, description, weight available, location, "Request to Buy" CTA.
- Data need: `InventoryItem[]`.

### 5.8 Buyer Item Detail / Request to Buy *(to design)*
- Expanded single-`InventoryItem` view: larger image, full description, seller/location/grade detail, quantity stepper, "Request to Buy" CTA → confirmation state.
- Reuses `GradeBadge`, `PrimaryButton`.

### 5.9 Shared Navigation Shell
- Not a standalone screen — codify `TopAppBar` + `BottomNavBar` as layout components wrapping every screen (React Navigation tab/stack shell), not copy-pasted markup per screen as in the current mockups.

## 6. Navigation inconsistency in current mockups (fix during build)

Each mockup hardcodes a different "active" bottom-nav tab regardless of what the screen actually is:
- Buyer Marketplace → highlights **Market** (correct).
- Ops Matching → highlights **Logistics** (arguably should be its own "Ops" tab, or Ops role gets a different tab set entirely since it's internal-only).
- Operator Dashboard → highlights **Home**.
- Supplier Intake → highlights **Home**.

**Build rule:** active tab must be derived from route, and role-based tab sets should be defined explicitly (Supplier/Operator/Buyer likely share Home+Logistics+Market+Profile, but Ops is an internal role — confirm whether Ops gets the same 4-tab shell or a separate internal shell before building navigation).

## 7. Mock data shape

```ts
type RequestStatus = "pending" | "matched" | "stored";
type FacilityStatus = "available" | "reserved" | "full";

interface SupplierRequest {
  id: string;
  supplierName: string;
  species: string;
  weightKg: number;
  location: string;        // e.g. "General Santos City"
  status: RequestStatus;
  rawSms?: string;         // e.g. "STORE GENSAN 500KG AVAIL"
  createdAt: string;       // ISO timestamp
}

interface StorageNode {
  id: string;
  name: string;
  verified: boolean;
  distanceKm: number;
  capacityAvailableKg: number;
  capacityTotalKg: number;
  status: FacilityStatus;
}

interface Consignment {
  id: string;              // e.g. "CS-9921-A"
  species: string;
  tempRequiredC: number;
  palletsUsed: number;
  palletsTotal: number;
  status: FacilityStatus;
}

interface IncomingRequest {
  id: string;
  requesterName: string;
  tons: number;
  tempC: number;
  etaLabel: string;        // e.g. "Today, 14:00"
}

interface Facility {
  id: string;
  name: string;
  operatorId: string;
  tonsUsed: number;
  tonsTotal: number;
}

interface InventoryItem {
  id: string;
  species: string;
  variant?: string;        // e.g. "Whole", "Loins", "Fillets"
  grade: string;           // e.g. "Grade A+", "Sashimi Grade"
  pricePerKg: number;
  description: string;
  weightAvailableKg: number;
  location: string;
  imageUrl: string;
  sellerId: string;
}

interface MatchSuggestion {
  request: SupplierRequest;
  suggestedNode: StorageNode;
}
```

## 8. File structure (React Native + Expo, per contract §3a)

```
frizko/
  app/                          # Expo Router
    (auth)/
      login.tsx                 # §5.1
    (supplier)/
      intake.tsx                # §5.2
      history.tsx               # §5.3
    (operator)/
      dashboard.tsx             # §5.4
      intake-log.tsx            # §5.5
    (ops)/
      matching.tsx              # §5.6
    (buyer)/
      marketplace.tsx           # §5.7
      item/[id].tsx              # §5.8
    _layout.tsx                 # role-based shell, TopAppBar + BottomNavBar
  components/
    TopAppBar.tsx
    BottomNavBar.tsx
    StatusBadge.tsx
    GradeBadge.tsx
    LogisticsCard.tsx
    CapacityGauge.tsx
    RequestStatusStepper.tsx
    FilterChipRow.tsx
    buttons/
      PrimaryButton.tsx
      SecondaryButton.tsx
      TertiaryButton.tsx
  lib/
    mockData/
      supplierRequests.ts
      storageNodes.ts
      consignments.ts
      inventoryItems.ts
    types.ts                    # §7 interfaces
  theme/
    tokens.ts                   # Arctic Logistics Framework, per §2 decision
  design/                       # existing Stitch reference mockups (source of truth for visuals)
  contract.md
  spec-phase-1.md
```

## 9. Open items carried forward (needs decision before/during build)

1. Confirm Arctic Logistics Framework as the single token set (§2) — resolves the Operator Dashboard color mismatch.
2. Reconcile `StatusBadge` colors to contract §6's green/amber/blue/gray convention (§3) — current mockups don't follow it.
3. Define role-based tab sets, especially whether the internal Ops role shares the 4-tab consumer shell or gets a separate internal nav (§6).
4. Design the 5 missing screens (§1): Onboarding/Login, Supplier Request History, Storage Operator Intake Log, Buyer Item Detail.
5. Carried from `contract.md` §8: single app with role-based login vs. separate apps; logo/brand assets; Android-first vs. parity iOS/Android.
```
