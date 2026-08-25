import { useSyncExternalStore } from "react";
import type { IncomingRequest } from "./types";

// Minimal pub-sub so the Supplier chat's "book a cold storage" action can
// push a live entry into the Operator Dashboard's Incoming Requests queue —
// simulating the storage operator actually being notified, without a real
// backend. Module-level singleton (no Context/provider needed) since the
// whole app runs in a single JS runtime.

let dynamicRequests: IncomingRequest[] = [];
const listeners = new Set<() => void>();

export function notifyColdStorage(request: IncomingRequest) {
  dynamicRequests = [request, ...dynamicRequests];
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return dynamicRequests;
}

export function useDynamicIncomingRequests(): IncomingRequest[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
