"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "../context";
import AppHeader from "../components/AppHeader";
import { asset } from "../../lib/assets";
import {
  Search,
  Calendar,
  MapPin,
  Ticket,
  Heart,
  Share2,
  Sparkles,
  Music,
  Palette,
  Film,
  Compass,
  Plus,
  X,
  ExternalLink,
  Flame,
} from "lucide-react";

export default function EventsTimelinePage() {
  const { allEvents, isSaved, toggleSave, showToast } = useApp();
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

  const handleShare = (evt: any) => {
    const text = encodeURIComponent(
      `Check out "${evt.title}" at ${evt.venueName} this weekend! Details on Kolkata This Weekend: ${window.location.origin}/events/`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const dayTabs = [
    { id: "all", label: "All Weekend", icon: Sparkles },
    { id: "tonight", label: "Tonight (Fri)", icon: Flame },
    { id: "saturday", label: "Saturday", icon: Calendar },
    { id: "sunday", label: "Sunday", icon: Calendar },
  ];

  const categoryPills = [
    { id: "all", label: "All Vibes", icon: Sparkles },
    { id: "music", label: "Live Music", icon: Music },
    { id: "workshops", label: "Workshops", icon: Palette },
    { id: "theatre", label: "Film & Arts", icon: Film },
    { id: "heritage", label: "Walks", icon: Compass },
    { id: "nightlife", label: "Nightlife", icon: Sparkles },
  ];

  return (
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pb-36">
        <AppHeader
          title="weekend events"
          subtitle={`${filteredEvents.length} verified drops`}
          showBackButton={true}
          rightAction={
            <Link
              href="/submit"
              className="flex items-center gap-1 text-[11.5px] font-bold text-[#ff6859] hover:underline px-2.5 py-1 bg-white rounded-full border border-black/5 shadow-2xs no-underline"
              title="Add an event"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </Link>
          }
        />

        {/* Date Filter Tabs */}
        <section className="pt-3 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
            {dayTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDayFilter(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    dayFilter === tab.id
                      ? "bg-[#181a1e] text-white shadow-xs"
                      : "bg-white/80 text-[#555d66] hover:bg-white border border-black/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${dayFilter === tab.id ? "text-[#ff8f7d]" : "text-[#717882]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Category Pills */}
        <section className="pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
            {categoryPills.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? "bg-[#ff6859] text-white shadow-xs"
                      : "bg-white/80 text-[#555d66] hover:bg-white border border-black/5"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search Input Bar */}
        <section className="pb-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-black/5 text-[#1a1d20] shadow-2xs focus-within:ring-2 focus-within:ring-[#ff6859]/30">
            <Search className="w-4 h-4 text-[#717882]" />
            <input
              type="text"
              placeholder="Search events, venues, Park St, jazz..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium focus:outline-none placeholder:text-[#9aa0a6]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-black cursor-pointer p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* Events Feed */}
        <section className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 rounded-[26px] bg-white border border-black/5 p-6">
              <p className="text-[13px] font-bold text-[#717882]">No events found for this filter</p>
              <button
                onClick={() => {
                  setDayFilter("all");
                  setCategoryFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-[11.5px] font-bold text-[#ff6859] underline cursor-pointer"
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
                  className="rounded-[26px] overflow-hidden bg-white border border-black/5 shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                >
                  {/* Event Cover Image */}
                  <div className="relative w-full h-44 overflow-hidden bg-[#181a1e]">
                    <Image
                      src={asset(evt.coverImage || "/images/real/real-jazz-rooftop.jpg")}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 440px) 420px, 440px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Category & Spotlight Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-black/50 backdrop-blur-md text-white text-[9.5px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20">
                        {evt.categoryLabel}
                      </span>
                      {evt.isFeatured && (
                        <span className="bg-[#ff6859] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                          Spotlight
                        </span>
                      )}
                    </div>

                    {/* Bookmark Save Heart */}
                    <button
                      onClick={() => {
                        toggleSave(evt.id);
                        showToast(saved ? "Removed from saved" : "Saved to your weekend!");
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-transform active:scale-90 cursor-pointer ${
                        saved
                          ? "bg-[#ff6859] border-[#ff6859] text-white"
                          : "bg-black/40 border-white/20 text-white hover:bg-black/60"
                      }`}
                      title={saved ? "Remove from shortlist" : "Save to shortlist"}
                      aria-label="Save"
                    >
                      <Heart className={`w-4 h-4 ${saved ? "fill-white text-white" : "text-white"}`} />
                    </button>

                    {/* Venue & Day Badge Over Image */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                      <span className="flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#ff8f7d]" />
                        <span>{evt.venueName}</span>
                      </span>
                      <span className="bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
                        {evt.dayType} • {evt.timeStr}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <h3 className="text-[15px] font-bold text-[#1a1d20] leading-snug tracking-tight mb-1.5">
                      {evt.title}
                    </h3>
                    <p className="text-[11.5px] text-[#555d66] leading-relaxed line-clamp-2 mb-3">
                      {evt.summary}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      <span className="bg-[#ecefed] text-[#1a1d20] text-[10.5px] font-semibold px-2 py-0.5 rounded-full">
                        {evt.neighborhood}
                      </span>
                      <span className="bg-[#ff6859]/15 text-[#ff6859] text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                        {evt.priceLabel}
                      </span>
                      {evt.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="bg-[#ecefed] text-[#717882] text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-2.5 border-t border-black/5 flex items-center justify-between">
                      <button
                        onClick={() => handleShare(evt)}
                        className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#717882] hover:text-[#1a1d20] cursor-pointer"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>

                      <a
                        href={evt.outboundUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#ff6859] hover:underline no-underline"
                      >
                        <span>{evt.outboundLabel}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
