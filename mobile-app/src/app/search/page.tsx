"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

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
    title: "Taaza Dandiya Raas 2026",
    type: "Live Gig",
    link: "/events",
    meta: "Biswa Bangla Mela Prangan",
    imageSrc: "/images/dandiya.jpg",
  },
  {
    id: "3",
    title: "South Kolkata VIP Sharad Samman Pass",
    type: "VIP Pass",
    link: "/vip-pass",
    meta: "Ekdalia, Singhi Park & Maddox",
    imageSrc: "/images/pujor-passport.png",
  },
  {
    id: "4",
    title: "Demon Slayer: Infinity Castle",
    type: "Movie",
    link: "/movies",
    meta: "Quest Mall INOX 4DX",
    imageSrc: "/images/demonslayer.jpg",
  },
  {
    id: "5",
    title: "Kolkata Music Festival Live",
    type: "Concert",
    link: "/events",
    meta: "Nicco Park Amphitheatre",
    imageSrc: "/images/musicfest.jpg",
  },
  {
    id: "6",
    title: "Durgotsav at Orkos City Center",
    type: "Durga Puja",
    link: "/events",
    meta: "City Centre 1: Salt Lake",
    imageSrc: "/images/durgotsav-orkos.png",
  },
];

export default function SearchPage() {
  const { isDarkMode } = useApp();
  const [query, setQuery] = useState<string>("");

  const filtered = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-36 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Search Kolkata" subtitle="Events, Screenings & Passes" />

      {/* Search Input Bar */}
      <div className="px-5 py-3">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white focus-within:border-[#c6121f]"
              : "bg-white border-neutral-200/90 text-neutral-900 shadow-xs focus-within:border-red-400"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pandals, movies, concerts, passes..."
            className="bg-transparent border-none outline-none w-full text-xs font-medium placeholder-neutral-400"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-neutral-400 hover:text-white text-xs">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Trending / Quick Filter Tags */}
      {!query && (
        <div className="px-5 py-2">
          <span className="text-[10px] font-black text-neutral-400 block mb-2.5 uppercase tracking-wider">
            Trending Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#141622] border-neutral-800 text-neutral-300 hover:border-[#c6121f] hover:text-white"
                    : "bg-white border-neutral-200/80 text-neutral-700 hover:border-red-300 shadow-xs"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      <section className="px-5 py-3 flex flex-col gap-2.5">
        <span className="text-[10.5px] font-bold text-neutral-400 block mb-1">
          {query ? `Results for "${query}" (${filtered.length})` : "Curated Index"}
        </span>

        {filtered.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className={`p-3 rounded-2xl border flex items-center justify-between no-underline transition-all hover:scale-[1.01] ${
              isDarkMode
                ? "bg-[#12141c] border-neutral-800/80 hover:border-[#c6121f]/60 text-white"
                : "bg-white border-neutral-200/80 hover:border-red-300 text-neutral-900 shadow-xs"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-700/20">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <span className="text-[9px] font-black text-[#c6121f] uppercase tracking-wider block">
                  {item.type}
                </span>
                <h4 className="text-[13px] font-bold text-inherit truncate leading-tight mt-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{item.meta}</p>
              </div>
            </div>

            <span className="text-xs font-bold text-neutral-400 ml-2">&gt;</span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-neutral-400 text-sm">
            <p>No listings found matching &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1 text-neutral-500">
              Try searching &ldquo;Durga Puja&rdquo;, &ldquo;Chainsaw Man&rdquo;, or &ldquo;Passes&rdquo;
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
