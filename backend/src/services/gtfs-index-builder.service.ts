import { getGtfsRoutes } from "./gtfs-routes.service.js";
import { getGtfsStops } from "./gtfs-stops.service.js";
import { analyzeGtfsTrips } from "./gtfs-trips.service.js";

import type { GtfsIndex } from "../types/gtfs-index.types.js";

// Build fast lookup maps from parsed GTFS data

export function buildGtfsIndex(buffer: Buffer): GtfsIndex {
  const routes = getGtfsRoutes(buffer);
  const stops = getGtfsStops(buffer);
  const tripsAnalysis = analyzeGtfsTrips(buffer);

  const trips = tripsAnalysis.trips;

  return {
    routes,
    stops,
    trips,

    routesById: new Map(routes.map((route) => [route.id, route])),
    stopsById: new Map(stops.map((stop) => [stop.id, stop])),
    tripsById: new Map(trips.map((trip) => [trip.id, trip])),
    stopTimesByTripId: new Map(
      trips.map((trip) => [trip.id, trip.stopTimes])
    ),
  };
}