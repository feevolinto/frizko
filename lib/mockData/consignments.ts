import type { Consignment, IncomingRequest, Facility } from "../types";

export const facility: Facility = {
  id: "fac-1",
  name: "GenSan Cold Storage Unit A",
  operatorId: "op-1",
  tonsUsed: 360,
  tonsTotal: 500,
};

export const consignments: Consignment[] = [
  {
    id: "CS-9921-A",
    species: "Premium Grade Tuna",
    tempRequiredC: -18,
    palletsUsed: 45,
    palletsTotal: 100,
    status: "available",
  },
  {
    id: "CS-9922-B",
    species: "Frozen Poultry Batch",
    tempRequiredC: -20,
    palletsUsed: 200,
    palletsTotal: 200,
    status: "full",
  },
  {
    id: "CS-9923-C",
    species: "Skipjack Tuna Batch",
    tempRequiredC: -18,
    palletsUsed: 60,
    palletsTotal: 120,
    status: "reserved",
  },
  {
    id: "CS-9924-D",
    species: "Blue Marlin (Whole)",
    tempRequiredC: -22,
    palletsUsed: 30,
    palletsTotal: 80,
    status: "available",
  },
];

export const incomingRequests: IncomingRequest[] = [
  {
    id: "in-1",
    requesterName: "Fresh Produce Dist.",
    tons: 50,
    tempC: 2,
    etaLabel: "Today, 14:00",
    icon: "local-shipping",
  },
  {
    id: "in-2",
    requesterName: "Oceania Seafoods",
    tons: 120,
    tempC: -25,
    etaLabel: "Tomorrow, 09:00",
    icon: "sailing",
  },
  {
    id: "in-3",
    requesterName: "Skipjack Co-op",
    tons: 18,
    tempC: -18,
    etaLabel: "Tomorrow, 16:30",
    icon: "local-shipping",
  },
];
