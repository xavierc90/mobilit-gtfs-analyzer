import type { GtfsDatasetSummary } from "../types/dataset.types";

type DatasetSummaryCardProps = {
  summary: GtfsDatasetSummary;
};

export function DatasetSummaryCard({ summary }: DatasetSummaryCardProps) {
  return (
    <div className="w-full rounded-[28px] bg-white/90 backdrop-blur-md shadow-2xl border border-white/40 p-8">
      <h2 className="text-2xl font-bold text-slate-900">
        Dataset summary
      </h2>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <StatCard label="Routes" value={summary.routeCount} />
        <StatCard label="Stops" value={summary.stopCount} />
        <StatCard label="Trips" value={summary.tripCount} />
        <StatCard label="Calendars" value={summary.calendarCount} />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">
          Missing files
        </p>

        {summary.missingFiles.length === 0 ? (
          <p className="mt-2 text-sm text-emerald-600">
            No required file missing.
          </p>
        ) : (
          <ul className="mt-2 list-disc pl-5 text-sm text-red-600">
            {summary.missingFiles.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}