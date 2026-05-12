// Required GTFS files for a basic dataset

export const REQUIRED_GTFS_FILES = [
  "agency.txt",
  "stops.txt",
  "routes.txt",
  "trips.txt",
  "stop_times.txt",
];

export function normalizeZipEntryName(entryName: string): string {
  return entryName.replace(/\\/g, "/").split("/").pop()?.trim() ?? "";
}

export function hasRequiredGtfsFiles(fileNames: string[]): string[] {
  return REQUIRED_GTFS_FILES.filter(
    (requiredFile) => !fileNames.includes(requiredFile)
  );
}