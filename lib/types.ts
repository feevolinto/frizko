export type RequestStatus = "pending" | "matched" | "stored";
export type FacilityStatus = "available" | "reserved" | "full";

export interface SupplierRequest {
  id: string;
  supplierName: string;
  species: string;
  weightKg: number;
  location: string;
  status: RequestStatus;
  rawSms?: string;
  createdAt: string;
}

export interface StorageNode {
  id: string;
  name: string;
  address: string;
  areaLabel: string;
  verified: boolean;
  distanceKm: number;
  capacityAvailableKg: number;
  capacityTotalKg: number;
  status: FacilityStatus;
  rating: number;
  tempRangeLabel: string;
  availablePallets: number;
  pricePerPalletPhp: number;
  imageUrl: string;
}

export interface Consignment {
  id: string;
  species: string;
  tempRequiredC: number;
  palletsUsed: number;
  palletsTotal: number;
  status: FacilityStatus;
}

export interface IncomingRequest {
  id: string;
  requesterName: string;
  tons: number;
  tempC: number;
  etaLabel: string;
  icon: "local-shipping" | "sailing";
}

export interface Facility {
  id: string;
  name: string;
  operatorId: string;
  tonsUsed: number;
  tonsTotal: number;
}

export interface InventoryItem {
  id: string;
  species: string;
  variant?: string;
  grade: string;
  pricePerKg: number;
  description: string;
  weightAvailableKg: number;
  location: string;
  imageUrl: string;
  sellerId: string;
}

export interface BuyerOrder {
  id: string;
  itemId: string;
  itemName: string;
  quantityKg: number;
  status: RequestStatus;
  createdAt: string;
}

export type FrizkoRole = "supplier" | "operator" | "buyer";
