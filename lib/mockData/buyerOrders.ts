import type { BuyerOrder } from "../types";

export const buyerOrders: BuyerOrder[] = [
  {
    id: "order-1",
    itemId: "item-1",
    itemName: "Blue Marlin (Whole)",
    quantityKg: 80,
    status: "matched",
    createdAt: "2026-08-23T09:00:00+08:00",
  },
  {
    id: "order-2",
    itemId: "item-2",
    itemName: "Yellowfin Tuna Loins",
    quantityKg: 40,
    status: "pending",
    createdAt: "2026-08-25T01:20:00+08:00",
  },
];
