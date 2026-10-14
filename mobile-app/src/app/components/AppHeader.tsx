"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "../context";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

export default function AppHeader({
  title,
  subtitle,
  showBackButton,
  transparent,
}: AppHeaderProps) {
  const { isDarkMode, toggleTheme, location } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = transparent !== undefined ? transparent : isHome;
  const shouldShowBack = showBackButton !== undefined ? showBackButton : !isHome;

  return (
    <header
      className={`z-40 flex items-center justify-between px-4 pt-3.5 pb-2 transition-all duration-300 ${
        isTransparent
          ? "absolute top-0 inset-x-0 bg-transparent border-none"
          : `sticky top-0 backdrop-blur-md ${
              isDarkMode
                ? "bg-[#090a0f]/90 border-b border-neutral-800/60"
                : "bg-white/90 border-b border-neutral-100"
            }`
      }`}
    >
      {/* Left: Back Button OR Swiggy-Style Location Selector */}
      <div className="flex items-center gap-2 min-w-0">
        {shouldShowBack ? (
          <button
            onClick={() => router.back()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
              isTransparent
                ? "bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60"
                : isDarkMode
                ? "bg-neutral-800/80 hover:bg-neutral-700 text-white"
                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
            }`}
            aria-label="Go Back"
            title="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        ) : null}

        {/* Title/Location: Placed directly on background image without pill container */}
        {isHome ? (
          <Link
            href="/location"
            className="flex items-center gap-2.5 text-white no-underline group cursor-pointer transition-transform active:scale-95 min-w-0"
            title="Change Location (Like Swiggy)"
          >
            {/* Crisp White Location Pin */}
            <div className="relative flex items-center justify-center flex-shrink-0">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="flex-shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] group-hover:scale-110 transition-transform duration-200"
              >
                {/* Clean Pure White Sculptured Pin */}
                <path
                  d="M12 2C7.58 2 4 5.58 4 10C4 15.35 10.3 21.32 11.45 22.42C11.75 22.71 12.25 22.71 12.55 22.42C13.7 21.32 20 15.35 20 10C20 5.58 16.42 2 12 2Z"
                  fill="white"
                />
                {/* Inner aperture dot */}
                <circle cx="12" cy="9.5" r="2.8" fill="#c6121f" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-black tracking-tight text-white truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] leading-tight">
                  {location.area}
                </span>
                <span className="w-4 h-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/25 group-hover:bg-white/35 transition-colors">
                  <svg
                    className="w-2.5 h-2.5 text-white group-hover:translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-white/90 truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] tracking-wide -mt-0.5">
                {location.subArea}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col min-w-0">
            <h1 className={`text-[16px] font-extrabold truncate leading-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              {title || "Kolkata This Weekend"}
            </h1>
            {subtitle && (
              <span className="text-[11px] text-neutral-400 truncate mt-0.5">{subtitle}</span>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Clean Bell Link + Slider Theme Switch + Brand Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Dedicated Notifications Page Link with Clean Crisp Bell */}
        <Link
          href="/notifications"
          className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 no-underline shadow-md group ${
            isTransparent
              ? "bg-black/35 backdrop-blur-md border border-white/25 text-white hover:bg-black/55 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              : pathname === "/notifications"
              ? "bg-[#c6121f] text-white border-[#c6121f] shadow-red-600/40"
              : isDarkMode
              ? "bg-[#141622] border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
              : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-200"
          }`}
          title="Weekend Live Notifications & Alerts"
          aria-label="View Notifications"
        >
          {/* Clean Classic Notification Bell Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:rotate-12 transition-transform duration-200 text-white"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          {/* Simple Clean Notification Badge Dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#c6121f] ring-2 ring-white shadow-xs" />
        </Link>

        {/* Sliding iOS Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6.5 rounded-full p-0.5 flex items-center transition-colors duration-300 cursor-pointer focus:outline-none shadow-md ${
            isTransparent
              ? "bg-black/40 backdrop-blur-md border border-white/20"
              : isDarkMode
              ? "bg-red-950/80 border border-red-800/60"
              : "bg-neutral-200 border border-neutral-300"
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme Slider"
        >
          <div
            className={`w-5.5 h-5.5 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${
              isDarkMode
                ? "translate-x-5.5 bg-[#c6121f] text-white"
                : "translate-x-0 bg-white text-amber-500 shadow-neutral-400"
            }`}
          >
            {isDarkMode ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </div>
        </button>

        {/* Brand Official Red & White Logo */}
        <Link href="/" className="relative w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-md flex-shrink-0" title="Home">
          <Image
            src="/images/kolkata-logo.png"
            alt="Kolkata This Weekend"
            fill
            sizes="32px"
            className="object-cover"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
