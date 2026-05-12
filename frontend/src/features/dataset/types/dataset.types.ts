export type GtfsDatasetSummary = {
  routeCount: number;
  stopCount: number;
  tripCount: number;
  calendarCount: number;
  calendarDatesCount: number;
  availableFiles: string[];
  missingFiles: string[];
};

export type AnalyzeGtfsResponse = {
  success: boolean;
  message: string;
  summary: GtfsDatasetSummary;
};