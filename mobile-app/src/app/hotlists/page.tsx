"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CollectionSection {
  id: string;
  name: string;
  emoji: string;
  categoryTag: string;
  countText: string;
  podiumGradient: string;
  podiumBorder: string;
  cards: {
    title: string;
    subtitle: string;
    imageSrc: string;
  }[];
}

const COLLECTIONS: CollectionSection[] = [
  // 1st: Anime
  {
    id: "anime",
    name: "Anime & Manga Releases",
    emoji: "⚡",
    categoryTag: "Otaku Hotlist",
    countText: "4 titles",
    podiumGradient: "from-pink-400/40 via-rose-300/40 to-amber-300/45",
    podiumBorder: "border-pink-200/60 shadow-[0_8px_30px_rgba(244,114,182,0.18)]",
    cards: [
      {
        title: "Chainsaw Man: Reze Arc",
        subtitle: "MAPPA Studio",
        imageSrc: "/images/csm.jpg",
      },
      {
        title: "Attack on Titan: The Movie",
        subtitle: "Final Chapter",
        imageSrc: "/images/aot.jpg",
      },
      {
        title: "Demon Slayer: Infinity Castle",
        subtitle: "ufotable",
        imageSrc: "/images/demonslayer.jpg",
      },
      {
        title: "Jujutsu Kaisen: Malevolent",
        subtitle: "Gojo vs Sukuna",
        imageSrc: "/images/jjk.jpg",
      },
    ],
  },
  // 2nd: Events
  {
    id: "events",
    name: "Kolkata Weekend Events",
    emoji: "🎉",
    categoryTag: "Live Experiences",
    countText: "4 events",
    podiumGradient: "from-purple-400/40 via-violet-300/40 to-sky-300/45",
    podiumBorder: "border-purple-200/60 shadow-[0_8px_30px_rgba(168,85,247,0.18)]",
    cards: [
      {
        title: "Kolkata Music Festival 2026",
        subtitle: "Nicco Park Live Concert",
        imageSrc: "/images/musicfest.jpg",
      },
      {
        title: "Taaza Dandiya Raas Night",
        subtitle: "Biswa Bangla Mela Prangan",
        imageSrc: "/images/dandiya.jpg",
      },
      {
        title: "Pujor Passport Pandal Pass",
        subtitle: "12 VIP Pandals Access",
        imageSrc: "/images/pujor-passport.png",
      },
      {
        title: "Durgotsav at Orkos Live",
        subtitle: "City Centre 1 Salt Lake",
        imageSrc: "/images/durgotsav-orkos.png",
      },
    ],
  },
  // 3rd: Movies
  {
    id: "movies",
    name: "Blockbuster Movies",
    emoji: "🎬",
    categoryTag: "Theatre & IMAX",
    countText: "4 movies",
    podiumGradient: "from-amber-400/40 via-orange-300/40 to-rose-300/45",
    podiumBorder: "border-amber-200/60 shadow-[0_8px_30px_rgba(251,146,60,0.18)]",
    cards: [
      {
        title: "Chainsaw Man: Reze Arc",
        subtitle: "IMAX Laser South City",
        imageSrc: "/images/csm.jpg",
      },
      {
        title: "Demon Slayer 4DX",
        subtitle: "Quest Mall INOX",
        imageSrc: "/images/demonslayer.jpg",
      },
      {
        title: "Attack on Titan: The Movie",
        subtitle: "Priya Cinema Rashbehari",
        imageSrc: "/images/aot.jpg",
      },
      {
        title: "Jujutsu Kaisen",
        subtitle: "Mani Square PVR",
        imageSrc: "/images/jjk.jpg",
      },
    ],
  },
];

const FILTER_TABS = [
  { id: "all", label: "All (52)" },
  { id: "anime", label: "Anime (4)" },
  { id: "events", label: "Events (3)" },
  { id: "movies", label: "Movies (3)" },
];

export default function HotlistsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCollections =
    activeTab === "all"
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.id === activeTab);

  return (
    <main className="w-full max-w-[440px] min-h-screen mx-auto bg-[#F7F3EB] text-[#292524] pb-32 relative font-sans select-none overflow-x-hidden">
      {/* Top Header matching reference */}
      <header className="px-6 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-white/80 border border-[#e5ded2] flex items-center justify-center text-[#292524] hover:bg-white transition-colors"
            title="Back to Home"
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
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#1c1917]">
              My Library
            </h1>
            <p className="text-xs font-medium text-[#78716c] mt-0.5">52 items</p>
          </div>
        </div>

        {/* Right Badges: Gift badge + Illustrated Owl Mascot */}
        <div className="flex items-center gap-3">
          {/* Gift Icon with notification bubble */}
          <div className="relative w-10 h-10 rounded-full bg-white/80 border border-[#e5ded2] flex items-center justify-center shadow-xs cursor-pointer hover:bg-white transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b86927"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#b86927] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#F7F3EB]">
              1
            </span>
          </div>

          {/* Illustrated Cute Owl Mascot sitting on book */}
          <div className="relative w-11 h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <svg width="44" height="48" viewBox="0 0 44 48" fill="none">
              <path d="M7 40C14 38 22 40 22 44C22 40 30 38 37 40V43C30 41 22 43 22 46C22 43 14 41 7 43V40Z" fill="#e7ded0" stroke="#a38260" strokeWidth="1.5" />
              <ellipse cx="22" cy="22" rx="13" ry="15" fill="#a87442" />
              <ellipse cx="22" cy="26" rx="8" ry="9" fill="#fdf8f0" />
              <polygon points="12,10 16,14 11,15" fill="#87582b" />
              <polygon points="32,10 28,14 33,15" fill="#87582b" />
              <circle cx="17" cy="18" r="4.5" fill="#ffffff" stroke="#52391e" strokeWidth="1.2" />
              <circle cx="27" cy="18" r="4.5" fill="#ffffff" stroke="#52391e" strokeWidth="1.2" />
              <circle cx="17.5" cy="18" r="2" fill="#1c1917" />
              <circle cx="26.5" cy="18" r="2" fill="#1c1917" />
              <polygon points="20.5,21 23.5,21 22,23.5" fill="#f97316" />
            </svg>
          </div>
        </div>
      </header>

      {/* Filter Tabs Bar */}
      <section className="px-6 py-2 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-bold tracking-tight transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs ${
                isActive
                  ? "bg-[#b86927] text-white shadow-sm shadow-[#b86927]/30"
                  : "bg-[#ece5d8] text-[#57534e] hover:bg-[#e4dbcc]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* "+ New Collection" Action Button */}
      <div className="px-6 pt-3 pb-1">
        <button
          onClick={() => alert("Add a new custom collection...")}
          className="text-[13.5px] font-bold text-[#b86927] hover:text-[#96521a] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="text-base font-bold leading-none">+</span>
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections Vertical Stack: 1. Anime, 2. Events, 3. Movies */}
      <section className="px-6 py-4 space-y-12">
        {filteredCollections.map((col) => (
          <div key={col.id} className="flex flex-col items-center">
            {/* The Shelf / Podium Stage */}
            <div className="relative w-full h-[220px] flex items-end justify-center">
              
              {/* Visible Fanned Cards with real image posters poking out from the basket */}
              <div className="absolute inset-x-0 bottom-10 flex items-end justify-center z-10 px-2">
                {col.cards.map((card, idx) => {
                  const total = col.cards.length;
                  // Dynamic rotation and offset for clean fanned book basket
                  const maxRot = total === 4 ? 18 : 14;
                  const stepRot = (maxRot * 2) / (total - 1 || 1);
                  const rot = -maxRot + idx * stepRot;

                  const maxOffset = total === 4 ? 76 : 60;
                  const stepOffset = (maxOffset * 2) / (total - 1 || 1);
                  const xOffset = -maxOffset + idx * stepOffset;

                  return (
                    <div
                      key={idx}
                      className="absolute bottom-1 w-[96px] h-[142px] rounded-[14px] overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-4 hover:scale-110 cursor-pointer border-2 border-white/80"
                      style={{
                        transform: `translateX(${xOffset}px) rotate(${rot}deg)`,
                        zIndex: 10 + idx,
                        boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
                      }}
                      title={card.title}
                    >
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-1.5">
                        <span className="text-[7.5px] font-black uppercase text-amber-300 tracking-wider truncate">
                          {card.subtitle}
                        </span>
                        <h4 className="text-[9px] font-bold text-white leading-tight line-clamp-2">
                          {card.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* FROSTED GLASS PODIUM / BASKET CONTAINER (Clean, Translucent, Visually Distinct) */}
              <div
                className={`relative z-20 w-full h-[95px] rounded-[28px] bg-gradient-to-r ${col.podiumGradient} backdrop-blur-md border ${col.podiumBorder} flex items-center justify-between px-5 shadow-md`}
              >
                {/* Left side: Category Tag inside Basket */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#78350f]">
                    {col.categoryTag}
                  </span>
                  <span className="text-xs font-bold text-[#1c1917]/90">
                    Collection Basket
                  </span>
                </div>

                {/* Right Action Buttons (+ and •••) directly from screenshot */}
                <div className="flex flex-col gap-1.5">
                  {/* Plus Button */}
                  <button
                    onClick={() => alert(`Add item to ${col.name}`)}
                    className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#292524] shadow-xs flex items-center justify-center text-lg font-bold transition-transform active:scale-95 cursor-pointer"
                    aria-label="Add item"
                  >
                    +
                  </button>
                  {/* Three Dots Button */}
                  <button
                    onClick={() => alert(`Options for ${col.name}`)}
                    className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#292524] shadow-xs flex items-center justify-center text-sm font-bold tracking-widest transition-transform active:scale-95 cursor-pointer"
                    aria-label="Options"
                  >
                    •••
                  </button>
                </div>
              </div>
            </div>

            {/* Collection Title & Count Label underneath */}
            <div className="text-center mt-3">
              <h3 className="text-base font-extrabold text-[#1c1917] flex items-center justify-center gap-1.5">
                <span>{col.name}</span>
                <span>{col.emoji}</span>
              </h3>
              <p className="text-xs font-semibold text-[#8c827a] mt-0.5 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>{col.countText}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Floating Orange Layer/Stack FAB Button (Bottom Right) */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => alert("Reorder collections")}
          className="w-13 h-13 rounded-full bg-[#b86927] hover:bg-[#a15a1f] text-white shadow-lg shadow-[#b86927]/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Layer Stack"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>
      </div>
    </main>
  );
}
