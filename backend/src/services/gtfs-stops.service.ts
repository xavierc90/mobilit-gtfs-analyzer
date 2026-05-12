import { parseGtfsFileFromZip } from "./gtfs-parser.service.js";

import type { CsvRow } from "../types/csv.types.js";
import type {
  GtfsStop,
  GtfsStopsAnalysis,
} from "../types/gtfs-stops.types.js";

// Create a simple grouping key from stop name

function createStopGroupKey(stopName: string): string {
  return stopName.trim().toLowerCase();
}

// Parse GTFS coordinate value

function parseCoordinate(value?: string): number | null {
  if (!value) {
    return null;
  }

  const coordinate = Number(value);

  return Number.isFinite(coordinate) ? coordinate : null;
}

// Detect invalid stop coordinates

function hasCoordinateIssue(lat: number | null, lon: number | null): boolean {
  if (lat === null || lon === null) {
    return true;
  }

  return lat < -90 || lat > 90 || lon < -180 || lon > 180;
}

// Convert one stops.txt row into a normalized stop

function normalizeStop(row: CsvRow): GtfsStop {
  const lat = parseCoordinate(row.stop_lat);
  const lon = parseCoordinate(row.stop_lon);

  return {
    id: row.stop_id ?? "",
    name: row.stop_name ?? "",
    lat,
    lon,
    groupKey: createStopGroupKey(row.stop_name ?? ""),
    hasCoordinateIssue: hasCoordinateIssue(lat, lon),
  };
}

// Get normalized GTFS stops

export function getGtfsStops(buffer: Buffer): GtfsStop[] {
  const rows = parseGtfsFileFromZip(buffer, "stops.txt");

  return rows.map(normalizeStop);
}

// Analyze GTFS stops

export function analyzeGtfsStops(buffer: Buffer): GtfsStopsAnalysis {
  const stops = getGtfsStops(buffer);
  const groupKeys = new Set(stops.map((stop) => stop.groupKey));

  return {
    stopCount: stops.length,
    groupCount: groupKeys.size,
    coordinateIssueCount: stops.filter((stop) => stop.hasCoordinateIssue)
      .length,
    stops,
  };
}