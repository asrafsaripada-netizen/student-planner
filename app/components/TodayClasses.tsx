"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ClassItem = {
  id: string;
  subject: string;
  day: number;
  startTime: string;
  endTime: string;
  room?: string;
};

export default function TodayClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [today] = useState(() => new Date());

  useEffect(() => {
    const saved = localStorage.getItem("classes");
    if (saved) {
      try {
        setClasses(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading classes:", error);
      }
    }

    const handleFocus = () => {
      const latest = localStorage.getItem("classes");
      if (latest) {
        try {
          setClasses(JSON.parse(latest));
        } catch (error) {
          console.error("Error loading classes:", error);
        }
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const day = today.getDay();
  const classesToday = classes
    .filter((c) => c.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-neutral-900">
          Classes Today
        </h3>
        <Link href="/schedule" className="text-[12px] text-indigo-600 font-medium">
          Manage
        </Link>
      </div>

      {classesToday.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-[14px] text-neutral-400">No classes today</p>
          <Link
            href="/schedule"
            className="inline-block mt-2 text-[13px] text-indigo-600 font-medium"
          >
            Add a class
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {classesToday.map((item) => (
            <div key={item.id} className="flex items-start justify-between">
              <div>
                <p className="text-[15px] font-medium text-neutral-900">
                  {item.subject}
                </p>
                <p className="text-[13px] text-neutral-500 mt-0.5">
                  {item.startTime} – {item.endTime}
                  {item.room ? ` · ${item.room}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}