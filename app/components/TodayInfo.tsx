"use client";

import { useEffect, useState } from "react";

type ClassItem = {
  id: string;
  subject: string;
  day: number;
  startTime: string;
  endTime: string;
  room?: string;
};

export default function TodayInfo() {
  const [uniformDays, setUniformDays] = useState<number[]>([1, 2, 4]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [today] = useState(() => new Date());

  useEffect(() => {
    const savedUniform = localStorage.getItem("uniformDays");
    if (savedUniform) setUniformDays(JSON.parse(savedUniform));

    const savedClasses = localStorage.getItem("classes");
    if (savedClasses) setClasses(JSON.parse(savedClasses));

    const handleFocus = () => {
      const latestUniform = localStorage.getItem("uniformDays");
      const latestClasses = localStorage.getItem("classes");
      if (latestUniform) setUniformDays(JSON.parse(latestUniform));
      if (latestClasses) setClasses(JSON.parse(latestClasses));
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const day = today.getDay();
  const hasClassesToday = classes.some((c) => c.day === day);

  let clothingRule = "No Classes";
  let clothingStyle = "bg-neutral-100 text-neutral-600";

  if (hasClassesToday) {
    const isUniform = uniformDays.includes(day);
    clothingRule = isUniform ? "Uniform Day" : "Civilian Day";
    clothingStyle = isUniform
      ? "bg-indigo-50 text-indigo-700"
      : "bg-sky-50 text-sky-700";
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <p className="text-[12px] text-neutral-400 font-medium mb-1">
        Today
      </p>
      <h2 className="text-[21px] font-semibold text-neutral-900 mb-4">
        {formattedDate}
      </h2>

      <div className={`rounded-xl px-4 py-3 ${clothingStyle}`}>
        <p className="text-[12px] opacity-70 mb-0.5">Clothing Rule</p>
        <p className="text-[16px] font-semibold">{clothingRule}</p>
      </div>
    </div>
  );
}