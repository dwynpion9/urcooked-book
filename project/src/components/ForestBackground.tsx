import { useEffect, useState } from "react";

export type TimeOfDay = "day" | "night";

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}

export function useTimeOfDay(): TimeOfDay {
  const [tod, setTod] = useState<TimeOfDay>(getTimeOfDay);

  useEffect(() => {
    const interval = setInterval(() => {
      setTod(getTimeOfDay());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return tod;
}

export function ForestBackground({ tod }: { tod: TimeOfDay }) {
  const isDay = tod === "day";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-[2000ms]">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-[2000ms]"
        style={{
          background: isDay
            ? "linear-gradient(180deg, #1a3d2e 0%, #2d5a3d 40%, #3d6b4d 70%, #2a4a3a 100%)"
            : "linear-gradient(180deg, #0a0f1a 0%, #0f1a2a 30%, #1a1a2e 60%, #0d0d15 100%)",
        }}
      />

      {isDay ? <DayScene /> : <NightScene />}
    </div>
  );
}

function DayScene() {
  return (
    <>
      {/* Sun rays - slow drifting light leak */}
      <div
        className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,200,0.6) 0%, transparent 70%)",
          animation: "drift-sun 20s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-10 right-0 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(180,220,255,0.5) 0%, transparent 70%)",
          animation: "drift-sun2 25s ease-in-out infinite alternate",
        }}
      />

      {/* Birch tree trunks - subtle vertical lines */}
      <div className="absolute inset-0 flex justify-between opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-2 bg-gradient-to-b from-[#d4ccc0] to-[#a8a098]"
            style={{ marginLeft: `${i * 12}%` }}
          />
        ))}
      </div>

      {/* Lake reflection at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #4a7a8a 50%, #3a6a7a 100%)",
        }}
      />
    </>
  );
}

function NightScene() {
  return (
    <>
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 60 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Cabin window with warm glow */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div
          className="h-24 w-40 rounded-t-lg"
          style={{
            background: "linear-gradient(180deg, #2a1f15 0%, #1a120a 100%)",
            boxShadow: "0 0 60px 20px rgba(255,180,80,0.15)",
          }}
        >
          {/* Window */}
          <div
            className="mx-auto mt-4 h-14 w-24 rounded"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,200,100,0.6) 0%, rgba(255,160,60,0.4) 100%)",
              boxShadow: "0 0 30px 10px rgba(255,180,80,0.3)",
            }}
          />
        </div>
      </div>

      {/* Bonfire */}
      <div className="absolute bottom-16 right-12 hidden sm:block">
        <Bonfire />
      </div>

      {/* Ambient warm glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,160,60,0.3) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

function Bonfire() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Rising embers */}
      <div className="relative h-32 w-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-8 rounded-full bg-amber-400"
            style={{
              width: "3px",
              height: "3px",
              left: `${20 + Math.random() * 60}%`,
              animation: `ember ${Math.random() * 2 + 2}s ease-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Flames */}
      <div className="relative -mt-20 flex items-end gap-1">
        <div
          className="h-12 w-6 rounded-full bg-orange-500/60"
          style={{ animation: "flicker 0.8s ease-in-out infinite alternate" }}
        />
        <div
          className="h-16 w-7 rounded-full bg-amber-400/70"
          style={{ animation: "flicker 1s ease-in-out infinite alternate" }}
        />
        <div
          className="h-10 w-5 rounded-full bg-orange-600/50"
          style={{ animation: "flicker 0.6s ease-in-out infinite alternate" }}
        />
      </div>

      {/* Logs */}
      <div className="flex gap-1">
        <div className="h-2 w-16 rotate-12 rounded-full bg-amber-950/60" />
        <div className="-mt-1 h-2 w-14 -rotate-12 rounded-full bg-amber-900/60" />
      </div>
    </div>
  );
}
