"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Compass, Calendar, MessageSquare, Ticket } from "lucide-react";

export default function BottomNavbar() {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.startsWith("/spots")) return "spots";
    if (pathname.startsWith("/events")) return "events";
    if (pathname.startsWith("/poll")) return "poll";
    if (pathname.startsWith("/passport") || pathname.startsWith("/vip-pass") || pathname.startsWith("/hotlists")) return "saved";
    if (pathname === "/") return "deck";
    return "";
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none w-full sm:max-w-[430px] mx-auto px-3 sm:px-4">
      <nav className="pointer-events-auto glass-pill-dock rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between gap-3 sm:gap-6 text-white/70 shadow-2xl">
        {/* Tab 1: Discover Deck (Warm Sunset Coral Heart) */}
        <Link
          href="/"
          className={`p-2 rounded-full transition-all duration-300 ${
            activeTab === "deck"
              ? "bg-gradient-to-r from-[#ff6b57] to-[#ff916f] text-white shadow-[0_4px_16px_rgba(255,107,87,0.55)] scale-105"
              : "hover:text-white hover:bg-white/10"
          }`}
          title="Discover Deck (kolkata this weekend)"
          aria-label="Discover"
        >
          <Heart className={`w-[18px] h-[18px] ${activeTab === "deck" ? "fill-white text-white" : "text-white/80"}`} />
        </Link>

        {/* Tab 2: Spots / Compass */}
        <Link
          href="/spots"
          className={`p-2 rounded-full transition-all duration-300 ${
            activeTab === "spots"
              ? "bg-white/20 text-white font-bold scale-105"
              : "hover:text-white hover:bg-white/10"
          }`}
          title="Curated City Spots & Cafes"
          aria-label="Spots"
        >
          <Compass className="w-[19px] h-[19px] text-inherit" />
        </Link>

        {/* Tab 3: Events & Gigs */}
        <Link
          href="/events"
          className={`p-2 rounded-full transition-all duration-300 ${
            activeTab === "events"
              ? "bg-white/20 text-white font-bold scale-105"
              : "hover:text-white hover:bg-white/10"
          }`}
          title="Verified Weekend Events & Passes"
          aria-label="Events"
        >
          <Calendar className="w-[18px] h-[18px] text-inherit" />
        </Link>

        {/* Tab 4: Kothay Jabi? WhatsApp Poll with notification badge */}
        <Link
          href="/poll/sat-crew-plan"
          className={`relative p-2 rounded-full transition-all duration-300 ${
            activeTab === "poll"
              ? "bg-white/20 text-white font-bold scale-105"
              : "hover:text-white hover:bg-white/10"
          }`}
          title="Kothay Jabi? Crew Poll"
          aria-label="Polls"
        >
          <MessageSquare className="w-[18px] h-[18px] text-inherit" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#f6804a] ring-2 ring-[#181a1e]" />
        </Link>

        {/* Tab 5: Passes & Shortlist */}
        <Link
          href="/passport"
          className={`p-2 rounded-full transition-all duration-300 ${
            activeTab === "saved"
              ? "bg-white/20 text-white font-bold scale-105"
              : "hover:text-white hover:bg-white/10"
          }`}
          title="Weekend Passport & Saved Passes"
          aria-label="Passport"
        >
          <Ticket className="w-[18px] h-[18px] text-inherit" />
        </Link>
      </nav>
    </div>
  );
}
