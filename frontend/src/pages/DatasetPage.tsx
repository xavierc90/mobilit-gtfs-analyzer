import { DatasetSummaryCard } from "../features/dataset/components/DatasetSummaryCard";
import { RoutesExplorer } from "../features/routes/components/RoutesExplorer";
import { StopsExplorer } from "../features/stops/components/StopsExplorer";
import { TripsExplorer } from "../features/trips/components/TripsExplorer";

import type { GtfsDatasetSummary } from "../features/dataset/types/dataset.types";
import type { GtfsRoute } from "../features/routes/types/routes.types";
import type { GtfsStop } from "../features/stops/types/stops.types";
import type { GtfsTrip } from "../features/trips/types/trips.types";
import type { GtfsValidationResult } from "../features/validation/types/validation.types";

type DatasetPageProps = {
  summary: GtfsDatasetSummary;
  validation: GtfsValidationResult | null;
  routes: GtfsRoute[];
  stops: GtfsStop[];
  stopGroupCount: number;
  coordinateIssueCount: number;
  trips: GtfsTrip[];
  stopTimeCount: number;
  onReset: () => void;
};

export function DatasetPage({
  summary,
  routes,
  stops,
  stopGroupCount,
  coordinateIssueCount,
  trips,
  stopTimeCount,
  onReset,
}: DatasetPageProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50/80">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200/70 bg-white/85 backdrop-blur-xl p-6 lg:block">
        <img src="/logo-mobilit.svg" alt="Mobilit" className="w-24" />

        <nav className="mt-10 space-y-2">
          <NavItem label="Analyzer" active />
          <NavItem label="Datasets" />
          <NavItem label="Historique" />
          <NavItem label="Paramètres" />
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-bold text-slate-900">GTFS Analyzer</p>
          <p className="text-sm text-slate-500">Local dataset</p>
        </div>
      </aside>

      <main className="min-h-screen px-6 py-6 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  GTFS Analyzer
                </p>

                <h1 className="mt-2 text-3xl font-bold text-slate-950">
                  GTFS Dataset
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>Fichier analysé</span>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
                    Analyse terminée
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onReset}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
              >
                Nouveau dataset
              </button>
            </div>
          </header>

          <DatasetSummaryCard summary={summary} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <RoutesExplorer routes={routes} />

            <StopsExplorer
              stops={stops}
              groupCount={stopGroupCount}
              coordinateIssueCount={coordinateIssueCount}
            />

            <TripsExplorer trips={trips} stopTimeCount={stopTimeCount} />
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
        active
          ? "bg-violet-50 text-violet-700"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </div>
  );
}