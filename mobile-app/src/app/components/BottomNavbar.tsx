"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context";

export default function BottomNavbar() {
  const { isDarkMode } = useApp();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.startsWith("/events")) return "events";
    if (pathname.startsWith("/planner")) return "planner";
    if (pathname.startsWith("/spots")) return "spots";
    if (pathname.startsWith("/submit") || pathname.startsWith("/admin")) return "submit";
    if (pathname === "/") return "home";
    return "";
  };

  const activeTab = getActiveTab();

  const navItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "events",
      label: "Events",
      href: "/events",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <circle cx="12" cy="15" r="1.5" />
        </svg>
      ),
    },
    {
      id: "planner",
      label: "Circuit",
      href: "/planner",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      id: "spots",
      label: "Spots",
      href: "/spots",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21.5C12 21.5 19 14.8 19 9.5C19 5.63 15.87 2.5 12 2.5C8.13 2.5 5 5.63 5 9.5C5 14.8 12 21.5 12 21.5Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      ),
    },
    {
      id: "submit",
      label: "+Add",
      href: "/submit",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none w-full sm:max-w-[440px] mx-auto px-3">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-1 px-3 py-2 rounded-full border transition-all duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.2)] ${
          isDarkMode
            ? "bg-[#141622]/95 backdrop-blur-2xl border-neutral-800 text-neutral-300"
            : "bg-white/95 backdrop-blur-2xl border-neutral-200/90 text-neutral-600 shadow-neutral-300/50"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-200 no-underline cursor-pointer ${
                isActive
                  ? "bg-[#b51f2a] text-white shadow-md shadow-red-600/35 font-bold scale-102"
                  : isDarkMode
                  ? "text-neutral-400 hover:text-white hover:bg-white/5"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span
                className={`text-[11px] font-semibold tracking-tight transition-all ${
                  isActive ? "inline-block" : "hidden sm:inline-block"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
