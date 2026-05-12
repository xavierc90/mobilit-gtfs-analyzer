import { parseGtfsFileFromZip } from "./gtfs-parser.service.js";

import type { CsvRow } from "../types/csv.types.js";
import type {
  GtfsStopTime,
  GtfsTrip,
  GtfsTripsAnalysis,
} from "../types/gtfs-trips.types.js";

// Parse GTFS stop sequence

function parseStopSequence(value?: string): number {
  const sequence = Number(value);

  return Number.isFinite(sequence) ? sequence : 0;
}

// Convert one stop_times.txt row into a normalized stop time

function normalizeStopTime(row: CsvRow): GtfsStopTime {
  return {
    stopId: row.stop_id ?? "",
    arrivalTime: row.arrival_time ?? "",
    departureTime: row.departure_time ?? "",
    sequence: parseStopSequence(row.stop_sequence),
  };
}

// Group stop times by trip id

function groupStopTimesByTripId(rows: CsvRow[]): Map<string, GtfsStopTime[]> {
  const stopTimesByTripId = new Map<string, GtfsStopTime[]>();

  for (const row of rows) {
    const tripId = row.trip_id;

    if (!tripId) {
      continue;
    }

    const stopTime = normalizeStopTime(row);
    const currentStopTimes = stopTimesByTripId.get(tripId) ?? [];

    currentStopTimes.push(stopTime);
    stopTimesByTripId.set(tripId, currentStopTimes);
  }

  for (const stopTimes of stopTimesByTripId.values()) {
    stopTimes.sort((a, b) => a.sequence - b.sequence);
  }

  return stopTimesByTripId;
}

// Convert one trips.txt row into a normalized trip

function normalizeTrip(
  row: CsvRow,
  stopTimesByTripId: Map<string, GtfsStopTime[]>
): GtfsTrip {
  const tripId = row.trip_id ?? "";
  const stopTimes = stopTimesByTripId.get(tripId) ?? [];

  return {
    id: tripId,
    routeId: row.route_id ?? "",
    serviceId: row.service_id ?? "",
    headsign: row.trip_headsign ?? "",
    directionId: row.direction_id ?? "",
    stopSequenceCount: stopTimes.length,
    stopTimes,
  };
}

// Analyze GTFS trips and stop times

export function analyzeGtfsTrips(buffer: Buffer): GtfsTripsAnalysis {
  const tripRows = parseGtfsFileFromZip(buffer, "trips.txt");
  const stopTimeRows = parseGtfsFileFromZip(buffer, "stop_times.txt");

  const stopTimesByTripId = groupStopTimesByTripId(stopTimeRows);
  const trips = tripRows.map((row) => normalizeTrip(row, stopTimesByTripId));

  return {
    tripCount: trips.length,
    stopTimeCount: stopTimeRows.length,
    trips,
  };
}