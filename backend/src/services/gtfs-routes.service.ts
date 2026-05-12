import { parseGtfsFileFromZip } from "./gtfs-parser.service.js";

import type { GtfsRoute } from "../types/gtfs-routes.types.js";
import type { CsvRow } from "../types/csv.types.js";

// Convert GTFS route_type into a readable transport mode

function getTransportMode(routeType: string): string {
  const modes: Record<string, string> = {
    "0": "tram",
    "1": "subway",
    "2": "rail",
    "3": "bus",
    "4": "ferry",
    "5": "cable_tram",
    "6": "aerial_lift",
    "7": "funicular",
  };

  return modes[routeType] ?? "unknown";
}

// Normalize GTFS color value

function normalizeColor(color?: string): string {
  if (!color) {
    return "#000000";
  }

  return color.startsWith("#") ? color : `#${color}`;
}

// Convert one routes.txt row into a normalized route

function normalizeRoute(row: CsvRow): GtfsRoute {
  return {
    id: row.route_id ?? "",
    shortName: row.route_short_name ?? "",
    longName: row.route_long_name ?? "",
    type: getTransportMode(row.route_type ?? ""),
    color: normalizeColor(row.route_color),
    textColor: normalizeColor(row.route_text_color ?? "FFFFFF"),
  };
}

// Analyze GTFS routes

// Get normalized GTFS routes

export function getGtfsRoutes(buffer: Buffer): GtfsRoute[] {
  const rows = parseGtfsFileFromZip(buffer, "routes.txt");

  return rows.map(normalizeRoute);
}

// Analyze GTFS routes

export function analyzeGtfsRoutes(buffer: Buffer) {
  const routes = getGtfsRoutes(buffer);

  return {
    routeCount: routes.length,
    routes,
  };
}