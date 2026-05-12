import type { GtfsStop } from "../types/stops.types";

type StopCardProps = {
  stop: GtfsStop;
};

export function StopCard({ stop }: StopCardProps) {
  return (
    <article
      className={`rounded-xl border p-3 transition ${
        stop.hasCoordinateIssue
          ? "border-red-200 bg-red-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
          📍
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-900">
            {stop.name || "Unnamed stop"}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Stop ID: {stop.id}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Group: {stop.groupKey || "unknown"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {stop.lat ?? "?"}, {stop.lon ?? "?"}
          </p>

          {stop.hasCoordinateIssue && (
            <p className="mt-2 text-xs font-semibold text-red-600">
              Coordinate anomaly detected
            </p>
          )}
        </div>
      </div>
    </article>
  );
}