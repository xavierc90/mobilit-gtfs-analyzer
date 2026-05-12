export type GtfsRoute = {
  id: string;
  shortName: string;
  longName: string;
  type: string;
  color: string;
  textColor: string;
};

export type AnalyzeRoutesResponse = {
  success: boolean;
  message: string;
  routeCount: number;
  routes: GtfsRoute[];
};