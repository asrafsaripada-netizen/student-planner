"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

const DAYS = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];

export default function SettingsPage() {
  const [uniformDays, setUniformDays] = useState<number[]>([1, 2, 4]);

  useEffect(() => {
    const saved = localStorage.getItem("uniformDays");
    if (saved) setUniformDays(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("uniformDays", JSON.stringify(uniformDays));
  }, [uniformDays]);

  const toggleDay = (dayId: number) => {
    setUniformDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight mb-6">
          Settings
        </h1>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-1">
            Clothing Rules
          </h2>
          <p className="text-[13px] text-neutral-500 mb-5">
            Select the days that are <span className="text-neutral-900 font-medium">Uniform Day</span>.  
            Days with no classes will show “No Classes”.
          </p>

          <div className="space-y-2">
            {DAYS.map((day) => {
              const isUniform = uniformDays.includes(day.id);

              return (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-[14px] transition ${
                    isUniform
                      ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                      : "bg-white border-neutral-200 text-neutral-600"
                  }`}
                >
                  <span className="font-medium">{day.name}</span>
                  <span className="text-[13px] font-medium">
                    {isUniform ? "Uniform" : "Civilian"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}