export type GtfsStopTime = {
  stopId: string;
  arrivalTime: string;
  departureTime: string;
  sequence: number;
};

export type GtfsTrip = {
  id: string;
  routeId: string;
  serviceId: string;
  headsign: string;
  directionId: string;
  stopSequenceCount: number;
  stopTimes: GtfsStopTime[];
};

export type AnalyzeTripsResponse = {
  success: boolean;
  message: string;
  tripCount: number;
  stopTimeCount: number;
  trips: GtfsTrip[];
};