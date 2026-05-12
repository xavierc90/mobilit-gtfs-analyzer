import express from "express";
import multer from "multer";

import {
  analyzeGtfsDatasetFile,
  analyzeGtfsRoutesFile,
  inspectGtfsZipFile,
  parseGtfsFile,
  uploadGtfsFile,
  validateGtfsDatasetFile,
} from "../controllers/gtfs.controller.js";

const router = express.Router();

// Store uploaded files in memory

const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload a GTFS zip file
router.post("/upload", upload.single("gtfs"), uploadGtfsFile);

// Inspect GTFS zip contents
router.post("/inspect-zip", upload.single("gtfs"), inspectGtfsZipFile);

// Parse a GTFS text file from the uploaded zip
router.post("/parse-file", upload.single("gtfs"), parseGtfsFile);

// Analyze GTFS dataset summary
router.post("/analyze", upload.single("gtfs"), analyzeGtfsDatasetFile);

// Validate GTFS dataset
router.post("/validate", upload.single("gtfs"), validateGtfsDatasetFile);

// Analyze GTFS routes
router.post("/routes", upload.single("gtfs"), analyzeGtfsRoutesFile);

export default router;