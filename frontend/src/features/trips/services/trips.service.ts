import { gtfsApi } from "../../../api/gtfs.api";

import type { AnalyzeTripsResponse } from "../types/trips.types";

export async function analyzeGtfsTrips(
  file: File
): Promise<AnalyzeTripsResponse> {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post<AnalyzeTripsResponse>(
    "/gtfs/trips",
    formData
  );

  return response.data;
}