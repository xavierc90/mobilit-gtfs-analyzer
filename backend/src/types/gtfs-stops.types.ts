// Normalized GTFS stop

export type GtfsStop = {
  id: string;
  name: string;
  lat: number | null;
  lon: number | null;
  groupKey: string;
  hasCoordinateIssue: boolean;
};

export type GtfsStopsAnalysis = {
  stopCount: number;
  groupCount: number;
  coordinateIssueCount: number;
  stops: GtfsStop[];
};