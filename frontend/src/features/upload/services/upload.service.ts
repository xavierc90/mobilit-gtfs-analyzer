import { gtfsApi } from "../../../api/gtfs.api";

// Upload GTFS zip file

export async function uploadGtfsZip(file: File) {
  const formData = new FormData();

  formData.append("gtfs", file);

  const response = await gtfsApi.post("/gtfs/upload", formData);

  return response.data;
}