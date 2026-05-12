import { gtfsApi } from "../../../api/gtfs.api";
import type { AnalyzeRoutesResponse } from "../types/routes.types";

export async function analyzeGtfsRoutes(
  file: File
): Promise<AnalyzeRoutesResponse> {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post<AnalyzeRoutesResponse>(
    "/gtfs/routes",
    formData
  );

  return response.data;
}