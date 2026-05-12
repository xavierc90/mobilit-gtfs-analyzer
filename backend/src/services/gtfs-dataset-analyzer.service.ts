import { inspectGtfsZip } from "./gtfs-zip.service.js";
import { parseGtfsFileFromZip } from "./gtfs-parser.service.js";

import type { GtfsDatasetSummary } from "../types/gtfs-dataset.types.js";

// Safely parse a GTFS file if it exists

function safeParseGtfsFile(buffer: Buffer, fileName: string) {
  try {
    return parseGtfsFileFromZip(buffer, fileName);
  } catch {
    return [];
  }
}

// Generate a high-level GTFS dataset summary

export function analyzeGtfsDataset(buffer: Buffer): GtfsDatasetSummary {
  const inspection = inspectGtfsZip(buffer);

  const routes = safeParseGtfsFile(buffer, "routes.txt");
  const stops = safeParseGtfsFile(buffer, "stops.txt");
  const trips = safeParseGtfsFile(buffer, "trips.txt");
  const calendars = safeParseGtfsFile(buffer, "calendar.txt");
  const calendarDates = safeParseGtfsFile(buffer, "calendar_dates.txt");

  return {
    routeCount: routes.length,
    stopCount: stops.length,
    tripCount: trips.length,
    calendarCount: calendars.length,
    calendarDatesCount: calendarDates.length,
    availableFiles: inspection.fileNames,
    missingFiles: inspection.missingRequiredFiles,
  };
}