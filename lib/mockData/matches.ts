import type { MatchSuggestion } from "../types";
import { supplierRequests } from "./supplierRequests";
import { storageNodes } from "./storageNodes";

export const matchSuggestions: MatchSuggestion[] = [
  { request: supplierRequests[3], suggestedNode: storageNodes[0] }, // Oceanic Catch Co. -> Metro Cold Storage
  { request: supplierRequests[4], suggestedNode: storageNodes[1] }, // Northern Farms -> Valenzuela Hub
  { request: supplierRequests[2], suggestedNode: storageNodes[2] }, // Skipjack (pending) -> GenSan Cold Storage A
];
