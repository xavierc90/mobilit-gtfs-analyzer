import { gtfsApi } from "../../../api/gtfs.api";

import type { AnalyzeStopsResponse } from "../types/stops.types";

export async function analyzeGtfsStops(
  file: File
): Promise<AnalyzeStopsResponse> {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post<AnalyzeStopsResponse>(
    "/gtfs/stops",
    formData
  );

  return response.data;
}