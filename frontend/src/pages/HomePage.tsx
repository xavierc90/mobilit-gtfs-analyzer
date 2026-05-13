import { UploadCard } from "../features/upload/components/UploadCard";
import { DatasetPage } from "./DatasetPage";
import { useDataset } from "../features/dataset/context/DatasetContext";

export function HomePage() {
  const { hasDataset } = useDataset();

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-map-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />

      <div className="relative z-10">
        {hasDataset ? <DatasetPage /> : <UploadCard />}
      </div>
    </main>
  );
}