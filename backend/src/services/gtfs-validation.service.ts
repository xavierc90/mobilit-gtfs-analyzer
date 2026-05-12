import { inspectGtfsZip } from "./gtfs-zip.service.js";
import { parseGtfsFileFromZip } from "./gtfs-parser.service.js";

// Validate GTFS required files and readable CSV files

import type { GtfsValidationResult } from "../types/gtfs-validation.types.js";

const OPTIONAL_GTFS_FILES = [
  "calendar.txt",
  "calendar_dates.txt",
  "shapes.txt",
  "transfers.txt",
  "feed_info.txt",
];

export function validateGtfsDataset(buffer: Buffer): GtfsValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const inspection = inspectGtfsZip(buffer);

  for (const missingFile of inspection.missingRequiredFiles) {
    errors.push(`Missing required file: ${missingFile}`);
  }

  for (const optionalFile of OPTIONAL_GTFS_FILES) {
    if (!inspection.fileNames.includes(optionalFile)) {
      warnings.push(`Optional file not found: ${optionalFile}`);
    }
  }

  for (const fileName of inspection.fileNames) {
    if (!fileName.endsWith(".txt")) {
      continue;
    }

    try {
      parseGtfsFileFromZip(buffer, fileName);
    } catch {
      errors.push(`Malformed CSV file: ${fileName}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}