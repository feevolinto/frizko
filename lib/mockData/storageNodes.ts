import type { StorageNode } from "../types";

// Facility photos reused from design/landing_cold_storage_finder/code.html
// (same aida-public Google-hosted asset host already used for Buyer
// Marketplace listing photos elsewhere in the app).
const EXTERIOR_PHOTO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAcrDLuyCGeNaCsWrU21WJSuRHbAmr0uS19-SBy-LnBFhNxfc45v0HC1uUmuiEnQLcw1YTx0RAurz-kpf5I6S-Bgk8ktKoqu_gVDDmwxN96-7aXTpP8DGR1T6AuagbgsT20YluZs_vsFV7AQ36Ho9lTbuCKy1FWayGeLZWQaZz8_7EkX_UQW63WtBioP5CtypCx5IxgCCHL2a2DpqJCJ9sA70VzXtMjTclqGll9pPqf9_LQdVgm5vNS";
const INTERIOR_PHOTO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBYpYZN6OTkTVXFkO1Qz-Ar-6sV4UOa6_9amldVfMPGtdi2wXjOP-nh8potJwNOgu2bgc3D55TP_hTQSXfvA_F-8h9I5pVVPekUC5ysecCqGoSdKqfgkW88k_L2TkAsHMR-PJRHmfhNtP4hI9LLmgdthTF36usrYYtdMtY3p_tSgqkwt4EM4SGJVW1xfaIJDkKYx8rB9aQJBbTmzMquPv33pWKN92tkKU-TGPWBBR6exZm-PerTzxjr";

export const storageNodes: StorageNode[] = [
  {
    id: "node-1",
    name: "Metro Cold Storage",
    address: "National Highway, Barangay Labangal, General Santos City",
    areaLabel: "Labangal District",
    verified: true,
    distanceKm: 12,
    capacityAvailableKg: 12000,
    capacityTotalKg: 26000,
    status: "available",
    rating: 4.6,
    tempRangeLabel: "-20°C to 4°C",
    availablePallets: 1200,
    pricePerPalletPhp: 1800,
    imageUrl: INTERIOR_PHOTO,
  },
  {
    id: "node-2",
    name: "Valenzuela Hub",
    address: "Pioneer Avenue, Barangay Dadiangas East, General Santos City",
    areaLabel: "Dadiangas East",
    verified: true,
    distanceKm: 5,
    capacityAvailableKg: 9000,
    capacityTotalKg: 97000,
    status: "reserved",
    rating: 4.3,
    tempRangeLabel: "-25°C to -10°C",
    availablePallets: 320,
    pricePerPalletPhp: 2200,
    imageUrl: EXTERIOR_PHOTO,
  },
  {
    id: "node-3",
    name: "GenSan Cold Storage A",
    address: "Purok Tuna, Barangay Calumpang, General Santos City",
    areaLabel: "Calumpang, Port District",
    verified: true,
    distanceKm: 3,
    capacityAvailableKg: 4500,
    capacityTotalKg: 20000,
    status: "available",
    rating: 4.8,
    tempRangeLabel: "2°C to 8°C",
    availablePallets: 450,
    pricePerPalletPhp: 1500,
    imageUrl: EXTERIOR_PHOTO,
  },
];
