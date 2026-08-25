import { MarketplaceScreen } from "../../components/screens/MarketplaceScreen";

// Buyer's Home tab IS the marketplace feed — this is their primary surface
// per contract.md §6a screen 7. Fixes the source mockup's nav bug where
// "Market" was highlighted instead of "Home" for this exact screen.
// See spec-phase-1.md §6 (resolved).
export default function BuyerHome() {
  return <MarketplaceScreen roleLabel="Buyer View" />;
}
