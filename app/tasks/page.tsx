"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      dueDate: dueDate || new Date().toISOString().split("T")[0],
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setDueDate("");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight mb-6">
          Tasks
        </h1>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm mb-4">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
            Add Task
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="text-[12px] text-neutral-500 font-medium">Task</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Finish assignment"
                className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
              />
            </div>

            <div>
              <label className="text-[12px] text-neutral-500 font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full mt-1.5 px-3.5 py-2.5 border border-neutral-200 rounded-xl text-[14px] bg-white focus:border-indigo-300"
              />
            </div>

            <button
              onClick={addTask}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-[14px] font-medium hover:bg-indigo-700 active:scale-[0.98] transition mt-1"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm mb-4">
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
            To Do ({pendingTasks.length})
          </h2>

          {pendingTasks.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[14px] text-neutral-400">No pending tasks</p>
              <p className="text-[13px] text-neutral-400 mt-1">
                Add a task using the form above
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="mt-1 w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0 active:scale-95 transition"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-neutral-900">
                      {task.title}
                    </p>
                    <p className="text-[12px] text-neutral-500 mt-0.5">
                      Due {task.dueDate}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[13px] text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
            <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
              Completed ({completedTasks.length})
            </h2>

            <div className="space-y-3.5">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 opacity-60">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="mt-1 w-5 h-5 rounded-full bg-indigo-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-neutral-900 line-through">
                      {task.title}
                    </p>
                    <p className="text-[12px] text-neutral-500 mt-0.5">
                      Due {task.dueDate}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-[13px] text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}