"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, Film, Bookmark, Plus, Layers, ArrowLeft, Bell, Share2, Compass, Heart, ChevronRight } from "lucide-react";
import BottomNavbar from "../components/BottomNavbar";

interface CollectionSection {
  id: string;
  name: string;
  categoryTag: string;
  countText: string;
  icon: React.ElementType;
  accentColor: string;
  cards: {
    title: string;
    subtitle: string;
    imageSrc: string;
  }[];
}

const COLLECTIONS: CollectionSection[] = [
  {
    id: "anime",
    name: "Anime & Manga Releases",
    categoryTag: "Otaku Hotlist",
    countText: "4 titles",
    icon: Sparkles,
    accentColor: "from-[#FF6E5A] to-[#FFA17E]",
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
  {
    id: "events",
    name: "Kolkata Weekend Events",
    categoryTag: "Live Experiences",
    countText: "4 events",
    icon: Calendar,
    accentColor: "from-purple-500 to-indigo-500",
    cards: [
      {
        title: "Kolkata Music Festival 2026",
        subtitle: "Nicco Park Live Concert",
        imageSrc: "/images/real/real-nicco-park-carnival.jpg",
      },
      {
        title: "Taaza Dandiya Raas Night",
        subtitle: "Biswa Bangla Mela Prangan",
        imageSrc: "/images/real/real-dandiya-celebration.jpg",
      },
      {
        title: "Pujor Passport Pandal Pass",
        subtitle: "12 VIP Pandals Access",
        imageSrc: "/images/pujor-passport.png",
      },
      {
        title: "Durgotsav at Orkos Live",
        subtitle: "City Centre 1 Salt Lake",
        imageSrc: "/images/real/real-festival-lights.jpg",
      },
    ],
  },
  {
    id: "movies",
    name: "Blockbuster Movies",
    categoryTag: "Theatre & IMAX",
    countText: "4 movies",
    icon: Film,
    accentColor: "from-amber-500 to-rose-500",
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
  { id: "all", label: "All Collections" },
  { id: "anime", label: "Anime" },
  { id: "events", label: "Events" },
  { id: "movies", label: "Movies" },
];

export default function HotlistsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCollections =
    activeTab === "all"
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.id === activeTab);

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
              curated hotlists
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              handpicked by kolkata editors
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

      {/* Filter Tabs Bar */}
      <section className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#141519] text-white shadow-sm"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* Collections Vertical Stack */}
      <section className="space-y-6">
        {filteredCollections.map((col) => {
          const IconComponent = col.icon;
          return (
            <div
              key={col.id}
              className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${col.accentColor} text-white flex items-center justify-center shadow-sm`}>
                    <IconComponent size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {col.categoryTag}
                    </span>
                    <h3 className="text-base font-extrabold text-[#141519] leading-tight">
                      {col.name}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                  {col.countText}
                </span>
              </div>

              {/* Fanned / Scrollable Cards Carousel */}
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1 -mx-1 px-1">
                {col.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="relative w-[130px] h-[180px] shrink-0 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-neutral-100"
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      sizes="130px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[9px] font-bold text-[#FFA17E] uppercase tracking-wider truncate">
                        {card.subtitle}
                      </span>
                      <h4 className="text-xs font-bold leading-tight line-clamp-2 mt-0.5">
                        {card.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Card Action Bar */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => alert(`View all items in ${col.name}`)}
                  className="font-bold text-[#FF6859] hover:text-[#e05041] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ChevronRight size={14} />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Saved collection to bookmarks")}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Bookmark"
                  >
                    <Bookmark size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: col.name,
                          url: window.location.href,
                        });
                      } else {
                        alert("Collection link copied to clipboard!");
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Share"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
