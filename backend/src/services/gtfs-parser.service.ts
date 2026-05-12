import AdmZip from "adm-zip";
import { parseGtfsCsv } from "../utils/csv.utils.js";
import type { CsvRow } from "../types/csv.types.js";

// Parse a single GTFS text file from a zip buffer

export function parseGtfsFileFromZip(
  buffer: Buffer,
  fileName: string
): CsvRow[] {
  const zip = new AdmZip(buffer);
  const entry = zip.getEntry(fileName);

  if (!entry) {
    throw new Error(`GTFS file not found: ${fileName}`);
  }

  const content = entry.getData().toString("utf-8");

  return parseGtfsCsv(content);
}