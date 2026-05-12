import { gtfsApi } from "../../../api/gtfs.api";
import type { AnalyzeGtfsResponse } from "../types/dataset.types";

export async function analyzeGtfsDataset(
  file: File
): Promise<AnalyzeGtfsResponse> {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post<AnalyzeGtfsResponse>(
    "/gtfs/analyze",
    formData
  );

  return response.data;
}