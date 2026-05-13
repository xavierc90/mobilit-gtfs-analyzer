import type { GtfsValidationResult } from "../types/validation.types";

type ValidationPanelProps = {
  validation: GtfsValidationResult;
};

export function ValidationPanel({ validation }: ValidationPanelProps) {
  return (
    <section className="rounded-[28px] bg-white/95 border border-slate-200/70 shadow-xl p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Validation</h2>

        <p className="mt-1 text-sm text-slate-500">
          GTFS dataset quality check
        </p>
      </div>

      <div
        className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
          validation.isValid
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-700"
        }`}
      >
        {validation.isValid
          ? "Dataset valid"
          : "Dataset contains errors"}
      </div>

      <div className="mt-5 space-y-4">
        <ValidationList
          title="Errors"
          items={validation.errors}
          emptyMessage="No errors detected."
          variant="error"
        />

        <ValidationList
          title="Warnings"
          items={validation.warnings}
          emptyMessage="No warnings detected."
          variant="warning"
        />
      </div>
    </section>
  );
}

function ValidationList({
  title,
  items,
  emptyMessage,
  variant,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
  variant: "error" | "warning";
}) {
  const isError = variant === "error";

  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-800">{title}</p>

      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className={`rounded-xl px-3 py-2 text-sm ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}