"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Today" },
    { href: "/schedule", label: "Schedule" },
    { href: "/tasks", label: "Tasks" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-[50px]">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] ${
                isActive
                  ? "text-black font-semibold"
                  : "text-neutral-400 font-normal"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}