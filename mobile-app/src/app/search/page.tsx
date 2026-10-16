"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, Search as SearchIcon, X, Film, Music, Ticket, Sparkles, ChevronRight } from "lucide-react";
import BottomNavbar from "../components/BottomNavbar";
import { asset } from "../../lib/assets";

const QUICK_TAGS = [
  "Durga Puja Pandals",
  "Chainsaw Man IMAX",
  "Taaza Dandiya",
  "South City Cinema",
  "VIP Puja Passes",
  "Music Festivals",
  "Salt Lake Gigs",
  "Heritage Walks",
];

const SEARCH_DATABASE = [
  {
    id: "1",
    title: "Chainsaw Man: Reze Arc (IMAX)",
    type: "Movie",
    link: "/movies",
    meta: "South City & Mani Square IMAX",
    imageSrc: "/images/csm.jpg",
  },
  {
    id: "2",
    title: "Skinny Mo's Sunset Rooftop Jazz",
    type: "Live Music",
    link: "/events",
    meta: "Southern Avenue • 7:30 PM Sat",
    imageSrc: "/images/real/real-jazz-rooftop.jpg",
  },
  {
    id: "3",
    title: "Peter Cat Chelo Kebab & Jazz Dining",
    type: "Heritage Dining",
    link: "/spots",
    meta: "Park Street • Vintage 1970s",
    imageSrc: "/images/real/real-peter-cat-chelo.jpg",
  },
  {
    id: "4",
    title: "Taaza Dandiya Raas 2026",
    type: "Live Gig",
    link: "/events",
    meta: "Biswa Bangla Mela Prangan",
    imageSrc: "/images/real/real-dandiya-celebration.jpg",
  },
  {
    id: "5",
    title: "South Kolkata VIP Sharad Samman Pass",
    type: "VIP Pass",
    link: "/vip-pass",
    meta: "Ekdalia, Singhi Park & Maddox",
    imageSrc: "/images/pujor-passport.png",
  },
  {
    id: "6",
    title: "Princep Ghat Golden Hour Boat Ride",
    type: "Open Air",
    link: "/spots",
    meta: "Strand Road & River Hooghly",
    imageSrc: "/images/real/real-princep-ghat.jpg",
  },
  {
    id: "7",
    title: "Kolkata Sunset Music Carnival",
    type: "Concert",
    link: "/events",
    meta: "Nicco Park Amphitheatre",
    imageSrc: "/images/real/real-nicco-park-carnival.jpg",
  },
  {
    id: "8",
    title: "Indian Coffee House & Boipada Trail",
    type: "Heritage Walk",
    link: "/spots",
    meta: "College Street • 150-Year Adda",
    imageSrc: "/images/real/real-indian-coffee-house.jpg",
  },
  {
    id: "9",
    title: "Demon Slayer: Infinity Castle",
    type: "Movie",
    link: "/movies",
    meta: "Quest Mall INOX 4DX",
    imageSrc: "/images/demonslayer.jpg",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");

  const filtered = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="w-full max-w-[440px] mx-auto min-h-screen bg-[#ECEFED] text-[#141519] px-4 pb-36 pt-4 font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between py-2 mb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center text-neutral-800 hover:scale-105 active:scale-95 transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
          </Link>
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#141519] lowercase">
              search kolkata
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              events, screenings & spots
            </p>
          </div>
        </div>

        <Link
          href="/notifications"
          className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-center text-neutral-800 hover:scale-105 active:scale-95 transition-all"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={2.2} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF6859] text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
            2
          </span>
        </Link>
      </header>

      {/* Search Input Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-neutral-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.04)] focus-within:border-[#FF6859] transition-all">
          <SearchIcon size={18} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pandals, movies, concerts, passes..."
            className="bg-transparent border-none outline-none w-full text-xs font-semibold text-[#141519] placeholder-neutral-400"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Trending / Quick Filter Tags */}
      {!query && (
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 mb-4">
          <span className="text-[10px] font-bold text-neutral-400 block mb-3 uppercase tracking-wider">
            Trending Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 text-neutral-700 transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[26px] p-8 text-center border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <SearchIcon size={32} className="mx-auto text-neutral-300 mb-2" />
            <p className="text-xs font-bold text-neutral-500">
              No results found for &quot;{query}&quot;. Try exploring trending tags above.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="bg-white rounded-[22px] p-3.5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-3.5 hover:border-neutral-200 transition-all group"
            >
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 border border-neutral-100">
                <Image
                  src={asset(item.imageSrc)}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-[#141519] truncate mt-1 group-hover:text-[#FF6859] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-neutral-500 truncate mt-0.5">
                  {item.meta}
                </p>
              </div>

              <ChevronRight size={16} className="text-neutral-400 group-hover:text-[#141519] transition-colors shrink-0" />
            </Link>
          ))
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
