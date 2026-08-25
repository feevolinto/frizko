import { Tabs } from "expo-router";
import { BottomNavBar } from "../../components/BottomNavBar";

// Ops is an internal-only role (contract.md role table), distinct from the
// consumer-facing Supplier/Operator/Buyer roles — it gets its own 2-tab
// shell instead of the shared Home/Logistics/Market/Profile set, since
// "browse marketplace" and "supplier logistics" tabs don't apply to an
// internal dispatcher. See spec-phase-1.md §6/§9.3 (resolved).
export default function OpsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNavBar {...props} />}
      initialRouteName="matching"
    >
      <Tabs.Screen name="matching" options={{ title: "Matching" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
