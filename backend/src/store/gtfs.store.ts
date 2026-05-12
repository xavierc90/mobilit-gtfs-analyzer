import type { StoredGtfsDataset } from "../types/gtfs-index.types.js";

// Temporary in-memory GTFS store

const gtfsStore = new Map<string, StoredGtfsDataset>();

export function saveGtfsDataset(dataset: StoredGtfsDataset): void {
  gtfsStore.set(dataset.id, dataset);
}

export function getGtfsDataset(id: string): StoredGtfsDataset | undefined {
  return gtfsStore.get(id);
}

export function getAllGtfsDatasets(): StoredGtfsDataset[] {
  return Array.from(gtfsStore.values());
}

export function deleteGtfsDataset(id: string): boolean {
  return gtfsStore.delete(id);
}