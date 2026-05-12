import express from "express";
import multer from "multer";

import {
  analyzeGtfsDatasetFile,
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

export default router;

// Analyze GTFS dataset summary

router.post("/analyze", upload.single("gtfs"), analyzeGtfsDatasetFile);

// Validate GTFS dataset

router.post("/validate", upload.single("gtfs"), validateGtfsDatasetFile);