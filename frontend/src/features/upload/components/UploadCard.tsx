import { useState } from "react";

import { uploadGtfsZip } from "../services/upload.service";

import { analyzeGtfsDataset } from "../../dataset/services/dataset.service";
import { analyzeGtfsRoutes } from "../../routes/services/routes.service";

import { DatasetSummaryCard } from "../../dataset/components/DatasetSummaryCard";
import { RoutesExplorer } from "../../routes/components/RoutesExplorer";

import type { GtfsDatasetSummary } from "../../dataset/types/dataset.types";
import type { GtfsRoute } from "../../routes/types/routes.types";

export function UploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [summary, setSummary] = useState<GtfsDatasetSummary | null>(null);
  const [routes, setRoutes] = useState<GtfsRoute[]>([]);

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

      const uploadResult = await uploadGtfsZip(selectedFile);
      setMessage(uploadResult.message);

      const analyzeResult = await analyzeGtfsDataset(selectedFile);
      setSummary(analyzeResult.summary);

      const routesResult = await analyzeGtfsRoutes(selectedFile);
      setRoutes(routesResult.routes);
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  if (summary) {
    return (
      <div className="w-full max-w-7xl space-y-6">
        <DatasetSummaryCard summary={summary} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RoutesExplorer routes={routes} />

          <div className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
            <h2 className="text-xl font-bold text-slate-900">Arrêts</h2>
            <p className="mt-1 text-sm text-slate-500">Bloc à venir</p>
          </div>

          <div className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
            <h2 className="text-xl font-bold text-slate-900">Voyages</h2>
            <p className="mt-1 text-sm text-slate-500">Bloc à venir</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[28px] bg-white/90 backdrop-blur-md shadow-2xl border border-white/40 p-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Upload a GTFS dataset to explore routes, stops and trips.
          </p>
        </div>

        <label className="flex flex-col gap-3">
          <input
            type="file"
            accept=".zip"
            className="hidden"
            onChange={(event) => {
              setSelectedFile(event.target.files?.[0] ?? null);
            }}
          />

          <div className="w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition cursor-pointer px-5 py-8 text-center">
            <p className="font-medium text-gray-700">
              {selectedFile ? selectedFile.name : "Choose a GTFS zip file"}
            </p>

            <p className="text-sm text-gray-400 mt-2">.zip GTFS dataset</p>
          </div>
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full rounded-2xl bg-[#0f172a] hover:bg-[#111c35] transition text-white font-semibold py-4 text-[15px] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUploading ? "Analyzing..." : "Analyze GTFS"}
        </button>

        {message && (
          <div className="rounded-2xl bg-gray-100 text-gray-700 px-4 py-3 text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}