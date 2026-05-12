import {
  isAllowedFileSize,
  isZipFile,
  isZipMimeType,
} from "../utils/file.utils.js";

import type {
  UploadedFile,
  UploadMetadata,
} from "../types/upload.types.js";

// Build a clean response from the uploaded GTFS file

export function getUploadMetadata(file: UploadedFile): UploadMetadata {
  return {
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    extension: ".zip",
  };
}

// Validate that the uploaded file looks like a GTFS zip

export function validateGtfsUpload(file?: UploadedFile): void {
  if (!file) {
    throw new Error("No file uploaded");
  }

  if (!file.originalname) {
    throw new Error("Invalid file name");
  }

  if (!isZipFile(file.originalname)) {
    throw new Error("Only .zip files are allowed");
  }

  if (!isZipMimeType(file.mimetype)) {
    throw new Error("Invalid zip MIME type");
  }

  if (!isAllowedFileSize(file.size)) {
    throw new Error("File is empty or too large");
  }
}