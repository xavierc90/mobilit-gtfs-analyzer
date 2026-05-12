import { StopCard } from "./StopCard";
import type { GtfsStop } from "../types/stops.types";

type StopsExplorerProps = {
  stops: GtfsStop[];
  groupCount: number;
  coordinateIssueCount: number;
};

export function StopsExplorer({
  stops,
  groupCount,
  coordinateIssueCount,
}: StopsExplorerProps) {
  return (
    <section className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Arrêts</h2>

        <p className="mt-1 text-sm text-slate-500">
          {stops.length} arrêts · {groupCount} groupes
        </p>

        {coordinateIssueCount > 0 && (
          <p className="mt-2 text-xs font-semibold text-red-600">
            {coordinateIssueCount} anomalies coordonnées
          </p>
        )}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Rechercher un arrêt..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400"
        />
      </div>

      <div className="mt-4 max-h-[520px] overflow-y-auto pr-2 space-y-2">
        {stops.map((stop) => (
          <StopCard key={stop.id} stop={stop} />
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition">
        Voir tous les arrêts ({stops.length})
      </button>
    </section>
  );
}