import { UploadCard } from "../features/upload/components/UploadCard";

export function HomePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-map-bg.png')",
      }}
    >
      <div className="w-full max-w-[440px] flex flex-col items-center gap-6">
        <img
          src="/logo-mobilit.svg"
          alt="Mobilit"
          className="w-[92px] h-auto drop-shadow-sm"
        />

        <UploadCard />
      </div>
    </main>
  );
}