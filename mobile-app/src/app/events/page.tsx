"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "../context";
import AppHeader from "../components/AppHeader";
import { EventCategory } from "../../lib/types";

export default function EventsTimelinePage() {
  const { isDarkMode, allEvents, isSaved, toggleSave, savedItems } = useApp();
  const [dayFilter, setDayFilter] = useState<"all" | "tonight" | "saturday" | "sunday">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = allEvents.filter((evt) => {
    // Day match
    if (dayFilter === "tonight" && !evt.isTonight) return false;
    if (dayFilter === "saturday" && !evt.isSaturday) return false;
    if (dayFilter === "sunday" && !evt.isSunday) return false;

    // Category match
    if (categoryFilter !== "all" && evt.category !== categoryFilter) return false;

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        evt.title.toLowerCase().includes(q) ||
        evt.venueName.toLowerCase().includes(q) ||
        evt.neighborhood.toLowerCase().includes(q) ||
        evt.summary.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Kolkata This Weekend" subtitle="Live Feed & Verified Gigs" />

      {/* Temporal Date Filter Strip */}
      <section className="px-5 pt-3 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "🔥 All Weekend" },
            { id: "tonight", label: "Tonight (Fri)" },
            { id: "saturday", label: "Saturday" },
            { id: "sunday", label: "Sunday" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDayFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                dayFilter === tab.id
                  ? "bg-[#b51f2a] text-white shadow-md shadow-red-950/40 scale-102"
                  : isDarkMode
                  ? "bg-[#141620] text-neutral-400 hover:text-white border border-neutral-800"
                  : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Category Pills */}
      <section className="px-5 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all", label: "All Vibes" },
            { id: "music", label: "🎵 Music" },
            { id: "workshops", label: "🎨 Workshops" },
            { id: "theatre", label: "🎭 Theatre/Film" },
            { id: "heritage", label: "🏛️ Walks" },
            { id: "nightlife", label: "🍹 Nightlife" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                  ? "bg-neutral-900/80 text-neutral-400"
                  : "bg-white text-neutral-500 border border-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Search Input Bar */}
      <section className="px-5 pb-4">
        <div
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white focus-within:border-[#b51f2a]"
              : "bg-white border-neutral-200/90 text-neutral-900 shadow-xs focus-within:border-red-400"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search events, venues, Park St, jazz..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs font-medium focus:outline-none placeholder:text-neutral-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-xs text-neutral-400">
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Events Stream */}
      <section className="px-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-400">
            Showing <strong className="text-red-500">{filteredEvents.length}</strong> verified events
          </span>
          <Link
            href="/submit"
            className="text-[11px] font-bold text-[#b51f2a] hover:underline flex items-center gap-1"
          >
            <span>+ Add Your Event</span>
          </Link>
        </div>

        {filteredEvents.length === 0 ? (
          <div
            className={`text-center py-12 rounded-2xl border ${
              isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
            }`}
          >
            <p className="text-sm font-bold text-neutral-400">No events found for this filter</p>
            <button
              onClick={() => {
                setDayFilter("all");
                setCategoryFilter("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-bold text-[#b51f2a] underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const saved = isSaved(evt.id);
            return (
              <article
                key={evt.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#12141c] border-neutral-800 hover:border-neutral-700"
                    : "bg-white border-neutral-200/80 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Event Image Banner */}
                <div className="relative w-full h-44 overflow-hidden bg-neutral-900">
                  <Image
                    src={evt.coverImage}
                    alt={evt.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                      {evt.categoryIcon} {evt.categoryLabel}
                    </span>
                    {evt.isFeatured && (
                      <span className="bg-[#b51f2a] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                        Spotlight
                      </span>
                    )}
                  </div>

                  {/* Bookmark Save Heart */}
                  <button
                    onClick={() => toggleSave(evt.id)}
                    aria-label="Save Event"
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
                      saved
                        ? "bg-[#b51f2a] text-white shadow-lg shadow-red-950/60"
                        : "bg-black/40 text-white hover:bg-black/60"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={saved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>

                  {/* Date & Time Overlay Bar */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <span className="flex items-center gap-1">
                      <span>📅</span> {evt.dayType} • {evt.timeStr}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-md ${
                        evt.isFree ? "bg-emerald-600 text-white" : "bg-white/20 backdrop-blur-md text-white"
                      }`}
                    >
                      {evt.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-4">
                  <h3 className="text-base font-extrabold leading-snug line-clamp-2">{evt.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">{evt.summary}</p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <span className="text-red-500">📍</span>
                    <span className="truncate">
                      {evt.venueName} • <span className="text-neutral-500">{evt.neighborhood}</span>
                    </span>
                  </div>

                  {/* Outbound Direct Link Bar */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/40 flex items-center gap-2">
                    <a
                      href={evt.outboundUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#b51f2a] hover:bg-[#961720] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-colors shadow-sm"
                    >
                      {evt.outboundLabel}
                    </a>
                    <button
                      onClick={() => {
                        const shareUrl = typeof window !== "undefined" ? window.location.href : "";
                        const shareText = `Check out this plan: ${evt.title} at ${evt.venueName} (${evt.dayType})!\n${evt.outboundUrl}`;
                        if (navigator.share) {
                          navigator.share({ title: evt.title, text: shareText, url: evt.outboundUrl }).catch(() => {});
                        } else {
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                            "_blank"
                          );
                        }
                      }}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white"
                          : "bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black"
                      }`}
                      title="Share to WhatsApp"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Floating Shortlist & WhatsApp Poll Bar if items saved */}
      {savedItems.length > 0 && (
        <aside
          aria-label="Weekend Shortlist Actions"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[400px] z-40"
        >
          <div className="bg-[#181a24] text-white p-3 rounded-2xl shadow-2xl border border-red-500/30 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#b51f2a] text-white text-xs font-black flex items-center justify-center">
                {savedItems.length}
              </span>
              <span className="text-xs font-bold">Saved in Shortlist</span>
            </div>
            <Link
              href="/planner"
              className="bg-[#b51f2a] hover:bg-[#961720] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-transform active:scale-95 flex items-center gap-1 shadow-sm"
            >
              <span>Build Circuit / Poll ➔</span>
            </Link>
          </div>
        </aside>
      )}
    </main>
  );
}
