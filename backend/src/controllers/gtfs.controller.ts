import type { Request, Response } from "express";

import {
  getUploadMetadata,
  validateGtfsUpload,
} from "../services/gtfs-upload.service.js";
import { inspectGtfsZip } from "../services/gtfs-zip.service.js";

// Handle GTFS zip upload request

export function uploadGtfsFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const metadata = getUploadMetadata(req.file!);

    return res.status(200).json({
      success: true,
      message: "GTFS zip uploaded successfully",
      file: metadata,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown upload error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

// Inspect GTFS zip contents

export function inspectGtfsZipFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const inspection = inspectGtfsZip(req.file!.buffer);

    return res.status(200).json({
      success: true,
      message: "GTFS zip inspected successfully",
      inspection,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown zip inspection error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}