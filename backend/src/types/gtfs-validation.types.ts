// GTFS validation result

export type GtfsValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};