import { Suspense } from "react";
import TodayInfo from "./components/TodayInfo";
import TodayClasses from "./components/TodayClasses";
import TodayTasks from "./components/TodayTasks";
import BottomNav from "./components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-neutral-900 tracking-tight">
            Student Planner
          </h1>
          <p className="text-neutral-500 text-[13px] mt-1">
            Schedule · Tasks · Uniform
          </p>
        </div>

        <div className="space-y-4">
          <Suspense fallback={<div className="h-36 bg-white rounded-2xl animate-pulse" />}>
            <TodayInfo />
          </Suspense>

          <Suspense fallback={<div className="h-28 bg-white rounded-2xl animate-pulse" />}>
            <TodayClasses />
          </Suspense>

          <Suspense fallback={<div className="h-28 bg-white rounded-2xl animate-pulse" />}>
            <TodayTasks />
          </Suspense>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}