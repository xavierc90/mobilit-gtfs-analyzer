import AdmZip, { IZipEntry } from "adm-zip";

import {
  hasRequiredGtfsFiles,
  REQUIRED_GTFS_FILES,
  normalizeZipEntryName,
} from "../utils/zip.utils.js";

import type {
  GtfsZipFile,
  GtfsZipInspection,
} from "../types/zip.types.js";

// Inspect GTFS zip contents without extracting to disk

export function inspectGtfsZip(buffer: Buffer): GtfsZipInspection {
  const zip = new AdmZip(buffer);

  const files: GtfsZipFile[] = zip
    .getEntries()
    .filter((entry: IZipEntry) => !entry.isDirectory)
    .map((entry: IZipEntry) => ({
      name: normalizeZipEntryName(entry.entryName),
      size: entry.header.size,
    }))
    .filter((file: GtfsZipFile) => file.name.length > 0);

  const fileNames = files.map(
    (file: GtfsZipFile) => file.name
  );

  const missingRequiredFiles =
    hasRequiredGtfsFiles(fileNames);

  return {
    files,
    fileNames,
    requiredFiles: REQUIRED_GTFS_FILES,
    missingRequiredFiles,
    isValidGtfsZip: missingRequiredFiles.length === 0,
  };
}