import type { GtfsRoute } from "./gtfs-routes.types.js";
import type { GtfsStop } from "./gtfs-stops.types.js";
import type { GtfsTrip, GtfsStopTime } from "./gtfs-trips.types.js";

// In-memory GTFS index

export type GtfsIndex = {
  routes: GtfsRoute[];
  stops: GtfsStop[];
  trips: GtfsTrip[];

  routesById: Map<string, GtfsRoute>;
  stopsById: Map<string, GtfsStop>;
  tripsById: Map<string, GtfsTrip>;
  stopTimesByTripId: Map<string, GtfsStopTime[]>;
};

export type StoredGtfsDataset = {
  id: string;
  createdAt: string;
  fileName: string;
  index: GtfsIndex;
};