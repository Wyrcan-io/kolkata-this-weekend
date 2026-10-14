"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import { useApp, LocationInfo } from "../context";

const POPULAR_NEIGHBORHOODS: { hub: string; locations: LocationInfo[] }[] = [
  {
    hub: "South Kolkata",
    locations: [
      { area: "Ballygunge & Gariahat", subArea: "South Kolkata • Pandal & Food Hub" },
      { area: "Hindustan Park", subArea: "South Kolkata • Artisan Cafes & Boutiques" },
      { area: "Southern Avenue & Lake", subArea: "South Kolkata • Cafes & Joggers Trail" },
      { area: "Jodhpur Park", subArea: "South Kolkata • Quiet Neighborhood" },
    ],
  },
  {
    hub: "Central Kolkata",
    locations: [
      { area: "Park Street & Camac St", subArea: "Central Kolkata • Heritage Dining & Pubs" },
      { area: "Esplanade & Dharmatala", subArea: "Central Kolkata • Metro Junction & Shopping" },
      { area: "Bowbazar & College St", subArea: "Central Kolkata • Books & Traditional Sweets" },
    ],
  },
  {
    hub: "Salt Lake & New Town",
    locations: [
      { area: "Action Area III", subArea: "New Town, Kolkata • Tech Hub & Malls" },
      { area: "Sector V (Tech Hub)", subArea: "Salt Lake • Rooftop Lounges & Gigs" },
      { area: "City Centre 1 & BD Block", subArea: "Salt Lake • Retail & Food Courtyards" },
      { area: "Eco Park & Convention Ctr", subArea: "New Town • Open Concert Grounds" },
    ],
  },
  {
    hub: "North Kolkata",
    locations: [
      { area: "Baghbazar & Shyambazar", subArea: "North Kolkata • Traditional Heritage Pandals" },
      { area: "Sovabazar Rajbari", subArea: "North Kolkata • Bonedi Bari Culture" },
      { area: "Hatibagan", subArea: "North Kolkata • Theatre & Street Markets" },
    ],
  },
];

export default function LocationPage() {
  const { isDarkMode, location, setLocation } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const handleSelect = (loc: LocationInfo) => {
    setLocation(loc);
    router.back();
  };

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setLocation({
        area: "Action Area III (Auto-detected)",
        subArea: "GPS: New Town, Kolkata 700160",
      });
      setIsDetecting(false);
      router.back();
    }, 600);
  };

  const filteredHubs = POPULAR_NEIGHBORHOODS.map((group) => ({
    ...group,
    locations: group.locations.filter(
      (loc) =>
        loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.subArea.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.locations.length > 0);

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-32 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Select Location" subtitle="Choose your Kolkata neighborhood" showBackButton={true} />

      {/* Swiggy Style Search Bar */}
      <div className="px-5 pt-4 pb-2">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white focus-within:border-[#c6121f]"
              : "bg-white border-neutral-200/90 text-neutral-900 shadow-xs focus-within:border-red-400"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-neutral-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search area, neighborhood or landmark..."
            className="bg-transparent border-none outline-none w-full text-xs font-medium placeholder-neutral-400"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-neutral-400 hover:text-white text-xs">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* GPS Current Location Button (Swiggy Style) */}
      <div className="px-5 py-2">
        <button
          onClick={handleAutoDetect}
          disabled={isDetecting}
          className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 hover:border-[#c6121f] text-white"
              : "bg-white border-neutral-200 hover:border-red-300 text-neutral-900 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600/10 text-[#c6121f] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isDetecting ? "animate-spin" : ""}>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3m0 14v3m10-10h-3M5 12H2" />
              </svg>
            </div>
            <div>
              <span className="text-[13px] font-extrabold text-[#c6121f] block leading-tight">
                {isDetecting ? "Detecting location..." : "Use Current Location"}
              </span>
              <span className="text-[11px] text-neutral-400">Using device GPS / Wi-Fi</span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#c6121f]">&gt;</span>
        </button>
      </div>

      {/* Currently Active Location */}
      <div className="px-5 pt-2 pb-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
          Active Location
        </span>
        <div
          className={`p-3 rounded-xl border flex items-center justify-between ${
            isDarkMode ? "bg-red-950/20 border-red-900/40 text-white" : "bg-red-50/50 border-red-200 text-neutral-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9e0c17] to-[#ff4155] flex items-center justify-center flex-shrink-0 shadow-xs">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C7.58 2 4 5.58 4 10C4 15.35 10.3 21.32 11.45 22.42C11.75 22.71 12.25 22.71 12.55 22.42C13.7 21.32 20 15.35 20 10C20 5.58 16.42 2 12 2Z"
                  fill="currentColor"
                />
                <circle cx="12" cy="9.5" r="2.5" fill="#c6121f" />
                <circle cx="12" cy="9.5" r="1.2" fill="white" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold leading-tight">{location.area}</h4>
              <p className="text-[10.5px] text-neutral-400">{location.subArea}</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-[#c6121f] uppercase px-2.5 py-1 rounded-full bg-white dark:bg-black/60 shadow-2xs border border-red-500/20">
            Selected
          </span>
        </div>
      </div>

      {/* Kolkata Neighborhood Hubs List */}
      <section className="px-5 py-3 space-y-4">
        {filteredHubs.map((group) => (
          <div key={group.hub}>
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
              {group.hub}
            </h3>
            <div className="space-y-1.5">
              {group.locations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(loc)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    location.area === loc.area
                      ? "border-[#c6121f] bg-red-600/10 font-bold"
                      : isDarkMode
                      ? "bg-[#12141c] border-neutral-800/80 hover:border-neutral-700 text-white"
                      : "bg-white border-neutral-200/70 hover:border-neutral-300 text-neutral-900 shadow-2xs"
                  }`}
                >
                  <div>
                    <h4 className="text-[13px] font-bold leading-tight text-inherit">{loc.area}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{loc.subArea}</p>
                  </div>
                  <span className="text-xs text-neutral-400">&gt;</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
