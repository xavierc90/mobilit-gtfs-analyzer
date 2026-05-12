// GTFS zip inspection result

export type GtfsZipFile = {
  name: string;
  size: number;
};

export type GtfsZipInspection = {
  files: GtfsZipFile[];
  fileNames: string[];
  requiredFiles: string[];
  missingRequiredFiles: string[];
  isValidGtfsZip: boolean;
};