import { createContext, useContext, useState } from "react";

import type { GtfsDatasetSummary } from "../types/dataset.types";
import type { GtfsRoute } from "../../routes/types/routes.types";
import type { GtfsStop } from "../../stops/types/stops.types";
import type { GtfsTrip } from "../../trips/types/trips.types";
import type { GtfsValidationResult } from "../../validation/types/validation.types";

type DatasetState = {
  summary: GtfsDatasetSummary | null;
  validation: GtfsValidationResult | null;
  routes: GtfsRoute[];
  stops: GtfsStop[];
  stopGroupCount: number;
  coordinateIssueCount: number;
  trips: GtfsTrip[];
  stopTimeCount: number;
};

type DatasetContextValue = DatasetState & {
  hasDataset: boolean;
  setDataset: (dataset: DatasetState) => void;
  resetDataset: () => void;
};

const emptyDataset: DatasetState = {
  summary: null,
  validation: null,
  routes: [],
  stops: [],
  stopGroupCount: 0,
  coordinateIssueCount: 0,
  trips: [],
  stopTimeCount: 0,
};

const DatasetContext = createContext<DatasetContextValue | null>(null);

export function DatasetProvider({ children }: { children: React.ReactNode }) {
  const [dataset, setDatasetState] = useState<DatasetState>(emptyDataset);

  function setDataset(nextDataset: DatasetState) {
    setDatasetState(nextDataset);
  }

  function resetDataset() {
    setDatasetState(emptyDataset);
  }

  return (
    <DatasetContext.Provider
      value={{
        ...dataset,
        hasDataset: dataset.summary !== null,
        setDataset,
        resetDataset,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);

  if (!context) {
    throw new Error("useDataset must be used inside DatasetProvider");
  }

  return context;
}