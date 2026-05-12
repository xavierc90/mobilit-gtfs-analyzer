// High-level GTFS dataset summary

export type GtfsDatasetSummary = {
  routeCount: number;
  stopCount: number;
  tripCount: number;
  calendarCount: number;
  calendarDatesCount: number;
  availableFiles: string[];
  missingFiles: string[];
};