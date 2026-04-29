export default function HazardMaps() {
  return (
    <div className="flex flex-1 w-full h-[calc(100vh-140px)] rounded-xl shadow-[0_0_20px_-4px_rgba(0,0,0,0.5)] border border-slate-800 bg-slate-900 overflow-hidden relative" style={{ maxWidth: 'none' }}>
      <iframe
        src="https://hazardhunter.georisk.gov.ph/map"
        className="w-full h-full border-0"
        title="Hazard Map"
        allowFullScreen
      />
    </div>
  );
}

