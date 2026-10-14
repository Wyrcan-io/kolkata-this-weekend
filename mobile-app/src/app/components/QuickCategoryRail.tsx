"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../context";

export interface QuickCategoryItem {
  id: string;
  label: string;
  href?: string;
  colorClass: string;
  bgTint: string;
  icon: React.ReactNode;
}

export const BOOKMYSHOW_CATEGORIES: QuickCategoryItem[] = [
  {
    id: "explore",
    label: "Explore",
    href: "/spots",
    colorClass: "text-sky-500 dark:text-sky-400",
    bgTint: "bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/25",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
        <polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "food-offers",
    label: "Food Offers",
    href: "/spots",
    colorClass: "text-amber-500 dark:text-amber-400",
    bgTint: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/25",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <path d="M18 2v20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d="M21 14V2a4 4 0 0 0-4 4v8h4z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M5 2v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 10v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "upcoming-events",
    label: "Upcoming Events",
    href: "/events",
    colorClass: "text-purple-500 dark:text-purple-400",
    bgTint: "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/25",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <path
          d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M13 5v14" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2.5 2.5" />
        <polygon
          points="8 9.5 8.8 11.2 10.7 11.3 9.3 12.6 9.7 14.5 8 13.5 6.3 14.5 6.7 12.6 5.3 11.3 7.2 11.2"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "trending-movies",
    label: "Trending Movies",
    href: "/movies",
    colorClass: "text-[#c6121f] dark:text-[#ff3b53]",
    bgTint: "bg-red-600/10 dark:bg-red-600/15 border-red-500/25",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <rect
          width="20"
          height="14"
          x="2"
          y="6"
          rx="2.5"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M2 11h20" stroke="currentColor" strokeWidth="2" />
        <path d="m6 6-2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m11 6-2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m16 6-2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="10 13.5 15 16 10 18.5" fill="currentColor" />
      </svg>
    ),
  },
];

interface QuickCategoryRailProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function QuickCategoryRail({
  selectedCategory,
  onSelectCategory,
}: QuickCategoryRailProps) {
  const { isDarkMode } = useApp();

  return (
    <section
      className={`w-full border-b transition-colors ${
        isDarkMode ? "border-neutral-800/60 bg-[#090a0f]" : "border-neutral-100 bg-white"
      }`}
    >
      {/* BookMyShow Style Category Grid */}
      <div className="grid grid-cols-4 gap-2 px-3 pt-4 pb-3.5 max-w-[420px] mx-auto">
        {BOOKMYSHOW_CATEGORIES.map((item) => {
          const isSelected = selectedCategory === item.id;

          const Content = (
            <div className="flex flex-col items-center select-none group w-full">
              {/* BookMyShow Iconic Circular Badge Container */}
              <div
                className={`relative w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-full flex items-center justify-center transition-all duration-300 shadow-xs border ${
                  isSelected
                    ? "ring-2 ring-[#c6121f] ring-offset-2 ring-offset-[#090a0f] bg-[#c6121f]/15 border-[#c6121f] shadow-md shadow-red-600/30 scale-105"
                    : isDarkMode
                    ? `${item.bgTint} hover:border-white/30 hover:scale-105`
                    : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200/80 hover:border-neutral-300 hover:scale-105"
                } ${item.colorClass}`}
              >
                {item.icon}
              </div>

              {/* Category Label with Clean Typography */}
              <span
                className={`text-[11px] sm:text-[11.5px] font-bold mt-2 transition-colors leading-[1.2] tracking-tight text-center min-h-[28px] flex items-center justify-center px-0.5 ${
                  isSelected
                    ? "text-[#c6121f]"
                    : isDarkMode
                    ? "text-neutral-300 group-hover:text-white"
                    : "text-neutral-700 group-hover:text-black"
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Bar */}
              <div
                className={`w-6 h-[3px] rounded-full mt-1.5 transition-all duration-300 ${
                  isSelected
                    ? "bg-[#c6121f] opacity-100 scale-100"
                    : "bg-transparent opacity-0 scale-50"
                }`}
              />
            </div>
          );

          if (item.href && item.id === "explore") {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onSelectCategory("explore")}
                className="flex flex-col items-center no-underline cursor-pointer transition-transform active:scale-95"
                title="Explore Kolkata Spots & Heritage"
              >
                {Content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="flex flex-col items-center cursor-pointer transition-transform active:scale-95 focus:outline-none"
              title={`View ${item.label}`}
            >
              {Content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
