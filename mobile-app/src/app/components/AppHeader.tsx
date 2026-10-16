"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, MapPin, Bell } from "lucide-react";
import { useApp } from "../context";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  transparent?: boolean;
  rightAction?: React.ReactNode;
}

export default function AppHeader({
  title,
  subtitle,
  showBackButton,
  transparent,
  rightAction,
}: AppHeaderProps) {
  const { location } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = transparent !== undefined ? transparent : isHome;
  const shouldShowBack = showBackButton !== undefined ? showBackButton : !isHome;

  return (
    <header
      className={`z-40 flex items-center justify-between px-4 sm:px-5 py-2.5 transition-all duration-300 ${
        isTransparent
          ? "absolute top-0 inset-x-0 bg-transparent border-none"
          : "sticky top-0 bg-[#ecefed]/95 backdrop-blur-xl border-b border-black/5"
      }`}
    >
      {/* Left: Back Button or Location Selector */}
      <div className="flex items-center gap-2 min-w-0">
        {shouldShowBack ? (
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1a1d20] hover:opacity-75 transition-all cursor-pointer border border-black/5 shadow-xs flex-shrink-0 active:scale-95"
            aria-label="Go Back"
            title="Go back"
          >
            <ArrowLeft size={16} strokeWidth={2.2} />
          </button>
        ) : (
          <Link
            href="/location"
            className="flex items-center gap-1.5 text-[#1a1d20] hover:opacity-75 transition cursor-pointer no-underline min-w-0"
            title="Change neighborhood in Kolkata"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-xs flex-shrink-0 text-[#ff6859]">
              <MapPin size={15} strokeWidth={2.4} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-bold text-[#1a1d20] leading-none truncate">
                {location.area}
              </span>
              <span className="text-[10px] text-[#717882] font-semibold leading-tight truncate">
                {location.subArea}
              </span>
            </div>
          </Link>
        )}

        {/* Center / Page Title with Brand Logo */}
        {!isHome && (
          <div className="flex items-center gap-2 min-w-0 ml-1">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-black/5 shadow-xs shrink-0">
              <Image
                src="/images/kolkata-logo.png"
                alt="Kolkata This Weekend"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[15.5px] font-black text-[#1a1d20] tracking-tight leading-tight truncate lowercase">
                {title || "kolkata this weekend"}
              </h1>
              {subtitle && (
                <span className="text-[10px] text-[#717882] font-semibold truncate leading-tight">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Actions: Custom Action OR Notification Bell with Badge 2 */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {rightAction ? (
          rightAction
        ) : (
          <Link
            href="/notifications"
            className={`relative w-8 h-8 flex items-center justify-center transition-all no-underline ${
              pathname === "/notifications"
                ? "bg-[#181a1e] text-white rounded-full shadow-xs"
                : "text-[#1a1d20] hover:opacity-75"
            }`}
            title="Weekend alerts & passes"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f6804a] text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs">
              2
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
