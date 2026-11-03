"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

type ClassItem = {
  id: string;
  subject: string;
  day: number;
  startTime: string;
  endTime: string;
  room?: string;
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function SchedulePage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState(1);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [room, setRoom] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("classes");
    if (saved) setClasses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const resetForm = () => {
    setSubject("");
    setDay(1);
    setStartTime("08:00");
    setEndTime("09:00");
    setRoom("");
    setEditingId(null);
  };

  const addOrUpdateClass = () => {
    if (!subject.trim()) {
      alert("Please enter a subject name");
      return;
    }

    if (editingId) {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                subject: subject.trim(),
                day,
                startTime,
                endTime,
                room: room.trim() || undefined,
              }
            : item
        )
      );
    } else {
      const newClass: ClassItem = {
        id: Date.now().toString(),
        subject: subject.trim(),
        day,
        startTime,
        endTime,
        room: room.trim() || undefined,
      };
      setClasses((prev) => [...prev, newClass]);
    }

    resetForm();
  };

  const startEdit = (item: ClassItem) => {
    setSubject(item.subject);
    setDay(item.day);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setRoom(item.room || "");
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight mb-6">
          Schedule
        </h1>

        {/* Add / Edit Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm mb-4">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
            {editingId ? "Edit Class" : "Add Class"}
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="text-[12px] text-neutral-500 font-medium">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Programming 101"
                className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
              />
            </div>

            <div>
              <label className="text-[12px] text-neutral-500 font-medium">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
              >
                {DAYS.map((name, index) => (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] text-neutral-500 font-medium">Start</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
                />
              </div>
              <div>
                <label className="text-[12px] text-neutral-500 font-medium">End</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] text-neutral-500 font-medium">Room (optional)</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. Room 203"
                className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={addOrUpdateClass}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-[14px] font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
              >
                {editingId ? "Update Class" : "Add Class"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 border border-neutral-200 rounded-xl text-[14px] text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List of Classes */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
            All Classes ({classes.length})
          </h2>

          {classes.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[14px] text-neutral-400">No classes yet</p>
              <p className="text-[13px] text-neutral-400 mt-1">
                Add your first class using the form above
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {classes
                .sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime))
                .map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[15px] font-medium text-neutral-900">
                        {item.subject}
                      </p>
                      <p className="text-[13px] text-neutral-500 mt-0.5">
                        {DAYS[item.day]} · {item.startTime} - {item.endTime}
                        {item.room ? ` · ${item.room}` : ""}
                      </p>
                    </div>

                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-[13px] text-indigo-600 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteClass(item.id)}
                        className="text-[13px] text-red-500 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}