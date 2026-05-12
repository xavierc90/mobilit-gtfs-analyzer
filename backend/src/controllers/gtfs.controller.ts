import type { Request, Response } from "express";

import {
  getUploadMetadata,
  validateGtfsUpload,
} from "../services/gtfs-upload.service.js";
import { inspectGtfsZip } from "../services/gtfs-zip.service.js";
import { parseGtfsFileFromZip } from "../services/gtfs-parser.service.js";
import { analyzeGtfsDataset } from "../services/gtfs-dataset-analyzer.service.js";
import { validateGtfsDataset } from "../services/gtfs-validation.service.js";
import { analyzeGtfsRoutes } from "../services/gtfs-routes.service.js";


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

// Parse one GTFS text file from the uploaded zip

export function parseGtfsFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const fileName = req.body.fileName;

    if (!fileName || typeof fileName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing GTFS file name",
      });
    }

    const rows = parseGtfsFileFromZip(req.file!.buffer, fileName);

    return res.status(200).json({
      success: true,
      message: "GTFS file parsed successfully",
      fileName,
      rowCount: rows.length,
      rows,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GTFS parsing error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

// Analyze GTFS dataset summary

export function analyzeGtfsDatasetFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const summary = analyzeGtfsDataset(req.file!.buffer);

    return res.status(200).json({
      success: true,
      message: "GTFS dataset analyzed successfully",
      summary,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GTFS analysis error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

// Validate GTFS dataset structure and CSV files

export function validateGtfsDatasetFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const validation = validateGtfsDataset(req.file!.buffer);

    return res.status(200).json({
      success: true,
      message: "GTFS dataset validated successfully",
      validation,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GTFS validation error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

// Analyze GTFS routes

export function analyzeGtfsRoutesFile(req: Request, res: Response) {
  try {
    validateGtfsUpload(req.file);

    const result = analyzeGtfsRoutes(req.file!.buffer);

    return res.status(200).json({
    success: true,
    message: "GTFS routes analyzed successfully",
    ...result,
    });

    } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown GTFS routes error";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}