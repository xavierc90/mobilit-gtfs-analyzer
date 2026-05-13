import { UploadCard } from "../features/upload/components/UploadCard";

export function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-map-bg.png')",
      }}
    >
      <UploadCard />
    </main>
  );
}