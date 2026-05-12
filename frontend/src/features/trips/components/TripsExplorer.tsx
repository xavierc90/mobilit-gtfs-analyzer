import { TripCard } from "./TripCard";
import type { GtfsTrip } from "../types/trips.types";

type TripsExplorerProps = {
  trips: GtfsTrip[];
  stopTimeCount: number;
};

export function TripsExplorer({ trips, stopTimeCount }: TripsExplorerProps) {
  return (
    <section className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Voyages</h2>

        <p className="mt-1 text-sm text-slate-500">
          {trips.length} voyages · {stopTimeCount} horaires d’arrêt
        </p>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Rechercher un voyage..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400"
        />
      </div>

      <div className="mt-4 max-h-[520px] overflow-y-auto pr-2 space-y-2">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      <button className="mt-4 w-full rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition">
        Voir tous les voyages ({trips.length})
      </button>
    </section>
  );
}