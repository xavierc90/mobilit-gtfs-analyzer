import { RouteCard } from "./RouteCard";
import type { GtfsRoute } from "../types/routes.types";

type RoutesExplorerProps = {
  routes: GtfsRoute[];
};

export function RoutesExplorer({ routes }: RoutesExplorerProps) {
  return (
    <section className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Lignes</h2>

        <p className="mt-1 text-sm text-slate-500">
          {routes.length} lignes détectées
        </p>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Rechercher une ligne..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400"
        />
      </div>

      <div className="mt-4 max-h-[520px] overflow-y-auto pr-2 space-y-2">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition">
        Voir toutes les lignes ({routes.length})
      </button>
    </section>
  );
}