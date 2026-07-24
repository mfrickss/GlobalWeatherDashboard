'use client';

export function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(122,154,146,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(96,128,120,0.06) 0%, transparent 55%),
            linear-gradient(180deg, #0f171a 0%, #131d20 50%, #0f171a 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='30' cy='40' r='1.2' fill='rgba(255,255,255,0.12)'/%3E%3Ccircle cx='80' cy='20' r='0.8' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='150' cy='60' r='1' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='60' cy='120' r='1.5' fill='rgba(255,255,255,0.06)'/%3E%3Ccircle cx='170' cy='140' r='0.9' fill='rgba(255,255,255,0.09)'/%3E%3Ccircle cx='120' cy='90' r='1.1' fill='rgba(255,255,255,0.07)'/%3E%3Ccircle cx='40' cy='170' r='1.3' fill='rgba(255,255,255,0.05)'/%3E%3Ccircle cx='190' cy='30' r='0.7' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`,
          animation: 'rainDrift 20s linear infinite',
        }}
      />
      <style jsx global>{`
        @keyframes rainDrift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 80px; }
        }
      `}</style>
    </div>
  );
}
