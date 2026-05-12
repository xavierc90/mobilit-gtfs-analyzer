import { parse } from "csv-parse/sync";

import type { CsvRow } from "../types/csv.types.js";

// Remove UTF-8 BOM from the first header

export function removeBom(value: string): string {
  return value.replace(/^\uFEFF/, "");
}

// Normalize CSV headers

export function normalizeHeader(header: string): string {
  return removeBom(header).trim();
}

// Parse GTFS CSV text into rows

export function parseGtfsCsv(content: string): CsvRow[] {
  return parse(content, {
    columns: (headers: string[]) => headers.map(normalizeHeader),
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];
}