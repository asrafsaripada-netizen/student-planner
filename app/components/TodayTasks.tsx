"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

function formatDueDate(dueDate: string) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  if (dueDate === todayStr) return "Today";
  if (dueDate === tomorrowStr) return "Tomorrow";
  return dueDate;
}

export default function TodayTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }

    const handleFocus = () => {
      const latest = localStorage.getItem("tasks");
      if (latest) {
        try {
          setTasks(JSON.parse(latest));
        } catch (error) {
          console.error("Error loading tasks:", error);
        }
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const toggleComplete = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const pendingTasks = tasks.filter((task) => !task.completed).slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-neutral-900">Tasks</h3>
        <Link href="/tasks" className="text-[12px] text-indigo-600 font-medium">
          See all
        </Link>
      </div>

      {pendingTasks.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-[14px] text-neutral-400">No pending tasks</p>
          <Link
            href="/tasks"
            className="inline-block mt-2 text-[13px] text-indigo-600 font-medium"
          >
            Add a task
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5">
          {pendingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3">
              <button
                onClick={() => toggleComplete(task.id)}
                className="mt-0.5 w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0 active:scale-95 transition"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-neutral-900">
                  {task.title}
                </p>
                <p className="text-[12px] text-neutral-500 mt-0.5">
                  Due {formatDueDate(task.dueDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}