"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context";

export default function BottomNavbar() {
  const { isDarkMode } = useApp();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.startsWith("/spots")) return "spots";
    if (pathname.startsWith("/upcoming")) return "upcoming";
    if (pathname.startsWith("/search")) return "search";
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
          width="19"
          height="19"
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
      id: "spots",
      label: "Spots",
      href: "/spots",
      icon: (
        <svg
          width="19"
          height="19"
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
      id: "upcoming",
      label: "Upcoming",
      href: "/upcoming",
      icon: (
        <svg
          width="19"
          height="19"
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
      id: "search",
      label: "Search",
      href: "/search",
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none w-full sm:max-w-[440px] mx-auto px-4">
      {/* Centered Floating Island Dock without District and BookMyShow */}
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.18)] ${
          isDarkMode
            ? "bg-[#141622]/95 backdrop-blur-2xl border-neutral-800 text-neutral-300 shadow-[0_14px_38px_rgba(0,0,0,0.65)]"
            : "bg-white/95 backdrop-blur-2xl border-neutral-200/90 text-neutral-600 shadow-neutral-300/50"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 no-underline cursor-pointer ${
                isActive
                  ? "bg-[#c6121f] text-white shadow-md shadow-red-600/35 font-bold animate-tab-bounce"
                  : isDarkMode
                  ? "text-neutral-400 hover:text-white hover:bg-white/5"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span
                className={`text-[12px] font-semibold tracking-tight transition-all ${
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
