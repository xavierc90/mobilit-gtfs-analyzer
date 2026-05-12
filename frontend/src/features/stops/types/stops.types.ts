export type GtfsStop = {
  id: string;
  name: string;
  lat: number | null;
  lon: number | null;
  groupKey: string;
  hasCoordinateIssue: boolean;
};

export type AnalyzeStopsResponse = {
  success: boolean;
  message: string;
  stopCount: number;
  groupCount: number;
  coordinateIssueCount: number;
  stops: GtfsStop[];
};