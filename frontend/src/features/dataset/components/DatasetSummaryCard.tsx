import type { GtfsDatasetSummary } from "../types/dataset.types";
import {
  FiMapPin,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";

import { TbRouteSquare, TbRouteAltLeft } from "react-icons/tb";

import { HiOutlineCollection } from "react-icons/hi";

type DatasetSummaryCardProps = {
  summary: GtfsDatasetSummary;
};

export function DatasetSummaryCard({ summary }: DatasetSummaryCardProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      <StatCard
        label="Lignes"
        value={summary.routeCount}
        suffix="routes"
        icon={<TbRouteSquare size={22} />}
        iconBg="linear-gradient(135deg,#7c3aed,#9333ea)"
      />

      <StatCard
        label="Arrêts"
        value={summary.stopCount}
        suffix="stops"
        icon={<FiMapPin size={20} />}
        iconBg="linear-gradient(135deg,#2563eb,#3b82f6)"
      />

      <StatCard
        label="Voyages"
        value={summary.tripCount}
        suffix="trips"
        icon={<TbRouteAltLeft size={22} />}
        iconBg="linear-gradient(135deg,#10b981,#34d399)"
      />

      <StatCard
        label="Calendriers"
        value={summary.calendarCount}
        suffix="services"
        icon={<FiCalendar size={20} />}
        iconBg="linear-gradient(135deg,#f59e0b,#fbbf24)"
      />

      <StatCard
        label="Fichiers manquants"
        value={summary.missingFiles.length}
        suffix="manquant"
        icon={<FiFileText size={20} />}
        iconBg="linear-gradient(135deg,#ef4444,#fb7185)"
      />

      <StatCard
        label="Fichiers détectés"
        value={summary.availableFiles.length}
        suffix="fichiers"
        icon={<HiOutlineCollection size={22} />}
        iconBg="linear-gradient(135deg,#2563eb,#60a5fa)"
      />
    </section>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon,
  iconBg,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200/70 bg-white/90 p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg"
          style={{
            background: iconBg,
          }}
        >
          {icon}
        </div>

        <div className="text-right">
          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-950">
            {value}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {suffix}
          </p>
        </div>
      </div>
    </article>
  );
}