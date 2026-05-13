import { useState } from "react";

import { uploadGtfsZip } from "../services/upload.service";

import { analyzeGtfsDataset } from "../../dataset/services/dataset.service";
import { analyzeGtfsRoutes } from "../../routes/services/routes.service";
import { analyzeGtfsStops } from "../../stops/services/stops.service";
import { analyzeGtfsTrips } from "../../trips/services/trips.service";

import type { GtfsDatasetSummary } from "../../dataset/types/dataset.types";
import type { GtfsRoute } from "../../routes/types/routes.types";
import type { GtfsStop } from "../../stops/types/stops.types";
import type { GtfsTrip } from "../../trips/types/trips.types";

import { validateGtfsDataset } from "../../validation/services/validation.service";
import type { GtfsValidationResult } from "../../validation/types/validation.types";
import { DatasetPage } from "../../../pages/DatasetPage";

export function UploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [summary, setSummary] = useState<GtfsDatasetSummary | null>(null);

  const [routes, setRoutes] = useState<GtfsRoute[]>([]);

  const [stops, setStops] = useState<GtfsStop[]>([]);
  const [stopGroupCount, setStopGroupCount] = useState(0);
  const [coordinateIssueCount, setCoordinateIssueCount] = useState(0);

  const [trips, setTrips] = useState<GtfsTrip[]>([]);
  const [stopTimeCount, setStopTimeCount] = useState(0);
  const [validation, setValidation] = useState<GtfsValidationResult | null>(null);

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Please select a GTFS zip file first.");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");

      setSummary(null);
      setRoutes([]);
      setStops([]);
      setTrips([]);
      setValidation(null);

      const uploadResult = await uploadGtfsZip(selectedFile);
      setMessage(uploadResult.message);

      const analyzeResult = await analyzeGtfsDataset(selectedFile);
      setSummary(analyzeResult.summary);

      const routesResult = await analyzeGtfsRoutes(selectedFile);
      setRoutes(routesResult.routes);

      const stopsResult = await analyzeGtfsStops(selectedFile);
      setStops(stopsResult.stops);
      setStopGroupCount(stopsResult.groupCount);
      setCoordinateIssueCount(stopsResult.coordinateIssueCount);

      const tripsResult = await analyzeGtfsTrips(selectedFile);
      setTrips(tripsResult.trips);
      setStopTimeCount(tripsResult.stopTimeCount);
    
      const validationResult = await validateGtfsDataset(selectedFile);
        setValidation(validationResult.validation);
        } catch {
        setMessage("Upload failed. Please try again.");
        } finally {
        setIsUploading(false);
        }
    }

if (summary) {
  return (
    <DatasetPage
      summary={summary}
      validation={validation}
      routes={routes}
      stops={stops}
      stopGroupCount={stopGroupCount}
      coordinateIssueCount={coordinateIssueCount}
      trips={trips}
      stopTimeCount={stopTimeCount}
      onReset={() => {
        setSummary(null);
        setRoutes([]);
        setStops([]);
        setTrips([]);
        setValidation(null);
        setSelectedFile(null);
        setMessage("");
      }}
    />
  );
}
return (
  <div className="flex min-h-screen items-center justify-center px-6 py-10">
    <div className="w-full max-w-[460px] rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-8">
      
      <div className="flex flex-col items-center text-center">
        
        <img
          src="/logo-mobilit.svg"
          alt="Mobilit"
          className="h-10 w-auto"
        />

        <div className="mt-6">
          <h1 className="text-[28px] font-bold tracking-tight text-slate-950">
            GTFS Analyzer
          </h1>

          <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
            Upload a GTFS dataset to explore routes,
            stops, trips and validation results.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <label className="flex flex-col gap-3">
          <input
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(event) => {
              setSelectedFile(event.target.files?.[0] ?? null);
            }}
          />

          <div className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-300/80 bg-white/40 px-6 py-10 text-center transition hover:bg-white/60">
            <p className="font-semibold text-slate-700">
              {selectedFile
                ? selectedFile.name
                : "Choose a GTFS zip file"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              .zip GTFS dataset
            </p>
          </div>
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="h-[58px] rounded-2xl bg-[#0f172a] text-[15px] font-semibold text-white shadow-xl transition hover:bg-[#111c35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Analyzing..." : "Analyze GTFS"}
        </button>

        {message && (
          <div className="rounded-2xl bg-white/50 px-4 py-3 text-sm text-slate-700">
            {message}
          </div>
        )}
      </div>
    </div>
  </div>
);
}