import { UploadCard } from "../features/upload/components/UploadCard";

export function HomePage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-map-bg.png')",
      }}
    >
      {/* Overlay blanc léger */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10">
        <UploadCard />
      </div>
    </main>
  );
}