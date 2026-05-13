// frontend/src/features/validation/services/validation.service.ts

import { gtfsApi } from "../../../api/gtfs.api";

import type { ValidateGtfsResponse } from "../types/validation.types";

export async function validateGtfsDataset(
  file: File
): Promise<ValidateGtfsResponse> {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post<ValidateGtfsResponse>(
    "/gtfs/validate",
    formData
  );

  return response.data;
}