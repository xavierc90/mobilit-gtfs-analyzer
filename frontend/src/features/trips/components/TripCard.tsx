import type { GtfsTrip } from "../types/trips.types";

type TripCardProps = {
  trip: GtfsTrip;
};

export function TripCard({ trip }: TripCardProps) {
  const firstStop = trip.stopTimes[0];
  const lastStop = trip.stopTimes[trip.stopTimes.length - 1];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {trip.headsign || "Unnamed trip"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Trip ID: {trip.id}
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Route {trip.routeId}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
            Service {trip.serviceId}
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {trip.stopSequenceCount} stops
          </span>

          {trip.directionId && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Direction {trip.directionId}
            </span>
          )}
        </div>

        {firstStop && lastStop && (
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
            <p>
              First stop: <strong>{firstStop.stopId}</strong> ·{" "}
              {firstStop.departureTime}
            </p>
            <p className="mt-1">
              Last stop: <strong>{lastStop.stopId}</strong> ·{" "}
              {lastStop.arrivalTime}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}