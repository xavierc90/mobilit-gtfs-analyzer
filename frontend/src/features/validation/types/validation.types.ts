// frontend/src/features/validation/types/validation.types.ts

export type GtfsValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};

export type ValidateGtfsResponse = {
  success: boolean;
  message: string;
  validation: GtfsValidationResult;
};