import { DatasetSummaryCard } from "../features/dataset/components/DatasetSummaryCard";
import { RoutesExplorer } from "../features/routes/components/RoutesExplorer";
import { StopsExplorer } from "../features/stops/components/StopsExplorer";
import { TripsExplorer } from "../features/trips/components/TripsExplorer";
import { FaCheckCircle } from "react-icons/fa";
import { useDataset } from "../features/dataset/context/DatasetContext";

export function DatasetPage() {
  const {
    summary,
    routes,
    stops,
    stopGroupCount,
    coordinateIssueCount,
    trips,
    stopTimeCount,
    resetDataset,
  } = useDataset();

  if (!summary) {
    return null;
  }
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
          <p className="text-sm text-slate-500">Version 1.0</p>
        </div>
      </aside>

      <main className="min-h-screen px-6 py-6 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="rounded-[28px] border border-slate-200/70 bg-white/90 p-7 shadow-xl backdrop-blur-md">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">
        GTFS Analyzer
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        GTFS Dataset
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span>Fichier analysé</span>

        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">
          <FaCheckCircle className="text-emerald-600" />
          Analyse terminée
        </span>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        Télécharger le rapport
      </button>

      <button
        type="button"
        onClick={resetDataset}
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
      >
        Nouveau dataset
      </button>
    </div>
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