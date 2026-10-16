"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";
import {
  Coffee,
  Wine,
  Compass,
  Sun,
  Clock,
  Wallet,
  Sparkles,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";

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
    imageSrc: "/images/real/real-pottery-studio.jpg",
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
    imageSrc: "/images/real/real-roastery-coffee.jpg",
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
    imageSrc: "/images/real/real-peter-cat-chelo.jpg",
    tags: ["Legacy Institution", "Cocktails", "Weekend Queues"],
  },
  {
    id: "indian-coffee-house",
    name: "Indian Coffee House",
    category: "Heritage Classics",
    neighborhood: "College Street, Central Kolkata",
    vibe: "150-year-old intellectual high-ceiling adda",
    timing: "Open 9:00 AM – 8:30 PM",
    avgCost: "₹250 for two",
    mustTry: "Infusion Black Coffee & Mutton Kabiraji",
    imageSrc: "/images/real/real-indian-coffee-house.jpg",
    tags: ["Historic Adda", "Legacy", "Boipada"],
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
    imageSrc: "/images/real/real-olypub-bar.jpg",
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
    imageSrc: "/images/real/real-capella-skybar.jpg",
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
    imageSrc: "/images/real/real-princep-ghat.jpg",
    tags: ["Sunset Spot", "Heritage Monument", "Boat Ride"],
  },
  {
    id: "kumartuli",
    name: "Kumartuli Artisan Quarter",
    category: "Open Air",
    neighborhood: "Shobhabazar, North Kolkata",
    vibe: "Centuries-old clay sculptors & alleyway craft",
    timing: "Best 10:00 AM – 5:00 PM",
    avgCost: "Free Walking",
    mustTry: "Clay studio visit & Ganga river breeze",
    imageSrc: "/images/real/real-kumartuli-artisan.jpg",
    tags: ["Artisan Soul", "Heritage Walk", "Photography"],
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial & Maidan",
    category: "Open Air",
    neighborhood: "Queens Way, Maidan",
    vibe: "Imperial marble monument with manicured lawns",
    timing: "Open 5:30 AM – 7:00 PM",
    avgCost: "₹50 entry",
    mustTry: "Sunset lake stroll & horse carriage trot",
    imageSrc: "/images/real/real-victoria-memorial.jpg",
    tags: ["Monument", "Green Gardens", "Golden Hour"],
  },
];

export default function WeekendSpotsPage() {
  const { isSaved, toggleSave, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>("All Spots");

  const filteredSpots = SPOTS_DATA.filter((spot) => {
    if (activeFilter === "All Spots") return true;
    return spot.category === activeFilter;
  });

  const categoryFilters = [
    { id: "All Spots", label: "All Spots", icon: Sparkles },
    { id: "Artisan Cafes", label: "Artisan Cafes", icon: Coffee },
    { id: "Rooftops", label: "Rooftops", icon: Wine },
    { id: "Heritage Classics", label: "Heritage Classics", icon: Compass },
    { id: "Open Air", label: "Open Air", icon: Sun },
  ];

  return (
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pb-36">
        <AppHeader
          title="city spots"
          subtitle="handpicked cafes & rooftops"
          showBackButton={true}
        />

        {/* Filter Pills */}
        <div className="flex gap-1.5 pt-3 pb-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {categoryFilters.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-[#181a1e] text-white shadow-xs"
                    : "bg-white/80 text-[#555d66] hover:bg-white border border-black/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeFilter === cat.id ? "text-[#ff8f7d]" : "text-[#717882]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spots List */}
        <section className="space-y-4 mt-2">
          {filteredSpots.map((spot) => {
            const saved = isSaved(spot.id);
            return (
              <article
                key={spot.id}
                className="rounded-[26px] overflow-hidden bg-white border border-black/5 shadow-sm transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Spot Hero Image */}
                <div className="relative w-full h-[170px] overflow-hidden bg-[#181a1e]">
                  <Image
                    src={spot.imageSrc}
                    alt={spot.name}
                    fill
                    sizes="(max-width: 440px) 420px, 440px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[9.5px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20">
                    {spot.category}
                  </span>

                  {/* Bookmark Save Heart */}
                  <button
                    onClick={() => {
                      toggleSave(spot.id);
                      showToast(saved ? "Removed from saved" : "Saved spot to your weekend!");
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-transform active:scale-90 cursor-pointer ${
                      saved
                        ? "bg-[#ff6859] border-[#ff6859] text-white"
                        : "bg-black/40 border-white/20 text-white hover:bg-black/60"
                    }`}
                    title={saved ? "Remove from shortlist" : "Save spot"}
                    aria-label="Save"
                  >
                    <Heart className={`w-4 h-4 ${saved ? "fill-white text-white" : "text-white"}`} />
                  </button>

                  {/* Neighborhood Over Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                    <span className="flex items-center gap-1 drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#ff8f7d]" />
                      <span>{spot.neighborhood}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[15.5px] font-bold text-[#1a1d20] leading-snug tracking-tight mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-[11.5px] text-[#555d66] leading-relaxed mb-3">
                    {spot.vibe}
                  </p>

                  {/* Must Try Highlight */}
                  <div className="bg-[#ecefed] rounded-[16px] p-2.5 mb-3 flex items-start gap-2">
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#ff6859] bg-[#ff6859]/15 px-1.5 py-0.5 rounded-full flex-shrink-0">
                      Must Try
                    </span>
                    <span className="text-[11px] font-semibold text-[#1a1d20] leading-tight">
                      {spot.mustTry}
                    </span>
                  </div>

                  {/* Timing & Cost Info Row */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#717882] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ff6859]" />
                      <span>{spot.timing}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#1a1d20]">
                      <Wallet className="w-3.5 h-3.5 text-[#717882]" />
                      <span>{spot.avgCost}</span>
                    </span>
                  </div>

                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-black/5">
                    {spot.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#ecefed] text-[#717882] text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
