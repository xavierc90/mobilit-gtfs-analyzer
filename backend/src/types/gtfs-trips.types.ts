// Normalized GTFS stop time

export type GtfsStopTime = {
  stopId: string;
  arrivalTime: string;
  departureTime: string;
  sequence: number;
};

// Normalized GTFS trip

export type GtfsTrip = {
  id: string;
  routeId: string;
  serviceId: string;
  headsign: string;
  directionId: string;
  stopSequenceCount: number;
  stopTimes: GtfsStopTime[];
};

export type GtfsTripsAnalysis = {
  tripCount: number;
  stopTimeCount: number;
  trips: GtfsTrip[];
};