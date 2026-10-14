"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

interface WeekendSpot {
  id: string;
  name: string;
  category: "Artisan Cafes" | "Rooftops" | "Heritage Classics" | "Open Air";
  neighborhood: string;
  vibe: string;
  timing: string;
  avgCost: string;
  mustTry: string;
  imageSrc: string;
  tags: string[];
}

const SPOTS_DATA: WeekendSpot[] = [
  {
    id: "sienna",
    name: "Sienna Cafe & Pottery Workshop",
    category: "Artisan Cafes",
    neighborhood: "Hindustan Park, South Kolkata",
    vibe: "Bohemian courtyard with handcrafted ceramics",
    timing: "Open 11:30 AM – 9:00 PM",
    avgCost: "₹900 for two",
    mustTry: "House Pour-over Coffee & Fried Chicken Salad",
    imageSrc: "/images/concert_rock.jpg",
    tags: ["Outdoor Seating", "Pet Friendly", "Work Friendly"],
  },
  {
    id: "roastery",
    name: "Roastery Coffee House",
    category: "Artisan Cafes",
    neighborhood: "Gariahat / Southern Avenue",
    vibe: "Colonial bungalow garden courtyard",
    timing: "Open 8:00 AM – 10:30 PM",
    avgCost: "₹800 for two",
    mustTry: "Cranberry Cold Brew & Onion Rings",
    imageSrc: "/images/concert_summer.jpg",
    tags: ["Morning Coffee", "Garden Courtyard", "Specialty Roasts"],
  },
  {
    id: "peter-cat",
    name: "Peter Cat Restaurant",
    category: "Heritage Classics",
    neighborhood: "Park Street, Central Kolkata",
    vibe: "Warm low-lit 1970s jazz heritage dining",
    timing: "Open 12:00 PM – 11:00 PM",
    avgCost: "₹1,400 for two",
    mustTry: "The Original Chelo Kebab with Butter & Egg",
    imageSrc: "/images/dandiya.jpg",
    tags: ["Legacy Institution", "Cocktails", "Weekend Queues"],
  },
  {
    id: "olypub",
    name: "Olypub (Olympia Bar & Restaurant)",
    category: "Heritage Classics",
    neighborhood: "Park Street, Central Kolkata",
    vibe: "Gritty vintage intellectual pub with cold beer",
    timing: "Open 11:00 AM – 10:30 PM",
    avgCost: "₹700 for two",
    mustTry: "Chateaubriand Beef Steak & Beer Pitcher",
    imageSrc: "/images/concert_ultra.jpg",
    tags: ["Historic Pub", "Budget Friendly", "Park St Icon"],
  },
  {
    id: "capella",
    name: "Capella Skybar & Microbrew",
    category: "Rooftops",
    neighborhood: "Sector V, Salt Lake",
    vibe: "20th floor panoramic cityscape & DJ beats",
    timing: "Open 4:00 PM – 2:00 AM",
    avgCost: "₹2,200 for two",
    mustTry: "Smoked Cocktails & Truffle Woodfire Pizza",
    imageSrc: "/images/musicfest.jpg",
    tags: ["Sunset Views", "Nightclub", "Live Acoustic"],
  },
  {
    id: "princep",
    name: "Princep Ghat & Riverfront Lawns",
    category: "Open Air",
    neighborhood: "Strand Road, River Hooghly",
    vibe: "Greek column monument with wooden boat rides",
    timing: "Best at Sunset 4:30 PM – 7:00 PM",
    avgCost: "Free Entry (Boat: ₹300)",
    mustTry: "Chai in earthen bhar & wooden boat row",
    imageSrc: "/images/durgapuja-river-full.png",
    tags: ["Sunset Spot", "Heritage Monument", "Boat Ride"],
  },
];

export default function WeekendSpotsPage() {
  const { isDarkMode, isSaved, toggleSave } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>("All Spots");

  const filteredSpots = SPOTS_DATA.filter((spot) => {
    if (activeFilter === "All Spots") return true;
    return spot.category === activeFilter;
  });

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-32 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader
        title="Your Weekend Spot"
        subtitle="Handpicked cafes, rooftops & cultural corners"
        showBackButton={true}
      />

      {/* Filter Tabs */}
      <div className="flex gap-2 px-5 pt-3 pb-2 overflow-x-auto scrollbar-none">
        {["All Spots", "Artisan Cafes", "Rooftops", "Heritage Classics", "Open Air"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === cat
                ? "bg-[#c6121f] text-white shadow-xs"
                : isDarkMode
                ? "bg-[#141622] text-neutral-400 hover:text-white border border-neutral-800"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 shadow-2xs"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spots List */}
      <section className="px-5 py-3 space-y-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className={`rounded-[22px] overflow-hidden border transition-all duration-300 hover:shadow-lg ${
              isDarkMode
                ? "bg-[#12141c] border-neutral-800/80 text-white"
                : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
            }`}
          >
            {/* Spot Hero Image */}
            <div className="relative w-full h-[160px] overflow-hidden">
              <Image
                src={spot.imageSrc}
                alt={spot.name}
                fill
                sizes="(max-width: 440px) 400px, 500px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badges on Image */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                <span className="text-[9.5px] font-black uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {spot.category}
                </span>

                <button
                  onClick={() => toggleSave(spot.id)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors cursor-pointer"
                  aria-label="Save Spot"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={isSaved(spot.id) ? "#c6121f" : "none"}
                    stroke={isSaved(spot.id) ? "#c6121f" : "currentColor"}
                    strokeWidth="2"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </button>
              </div>

              {/* Bottom Image Info */}
              <div className="absolute bottom-2.5 inset-x-3.5 z-10 text-white">
                <h3 className="text-base font-extrabold leading-tight drop-shadow-sm">
                  {spot.name}
                </h3>
                <p className="text-[11px] text-neutral-200 mt-0.5 font-medium">
                  📍 {spot.neighborhood}
                </p>
              </div>
            </div>

            {/* Spot Details Body */}
            <div className="p-3.5 text-left space-y-2">
              <p className="text-xs text-neutral-400 leading-snug">
                {spot.vibe}
              </p>

              <div
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                  isDarkMode ? "bg-black/20 border-neutral-800" : "bg-neutral-50 border-neutral-200/60"
                }`}
              >
                <div>
                  <span className="text-[9.5px] font-bold uppercase text-neutral-400 block">
                    Must Order / Tip
                  </span>
                  <span className="text-xs font-bold text-[#c6121f] leading-tight">
                    {spot.mustTry}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9.5px] font-bold uppercase text-neutral-400 block">
                    Average Cost
                  </span>
                  <span className="text-xs font-bold text-inherit">{spot.avgCost}</span>
                </div>
              </div>

              {/* Tags and Timings */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{spot.timing}</span>
                </span>

                <button
                  onClick={() => alert(`Opening navigation map for ${spot.name}!`)}
                  className="text-xs font-bold text-[#c6121f] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Directions</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
