import express from "express";
import multer from "multer";

import {
  inspectGtfsZipFile,
  uploadGtfsFile,
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

export default router;