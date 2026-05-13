import type { GtfsRoute } from "../types/routes.types";

type RouteCardProps = {
  route: GtfsRoute;
};

export function RouteCard({ route }: RouteCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition">
      <div className="flex items-center gap-3">
        <div
          className="flex h-7 min-w-7 items-center justify-center rounded-md text-sm font-bold shadow-sm"
          style={{
            backgroundColor: route.color,
            color: route.textColor,
          }}
        >
          {route.shortName || route.id}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-slate-900">
            {route.longName || "Unnamed route"}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Route ID: {route.id}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 capitalize">
          {route.type}
        </span>
      </div>
    </article>
  );
}