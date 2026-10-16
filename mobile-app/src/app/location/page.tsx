"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import { useApp, LocationInfo } from "../context";
import {
  MapPin,
  Navigation,
  Search,
  X,
  CheckCircle2,
  ChevronRight,
  Compass,
} from "lucide-react";

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
  const { location, setLocation } = useApp();
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
    }, 500);
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
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pb-36">
        <AppHeader
          title="select location"
          subtitle="choose your kolkata neighborhood"
          showBackButton={true}
        />

        {/* Search Bar */}
        <div className="pt-3 pb-2">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white border border-black/5 text-[#1a1d20] shadow-2xs focus-within:ring-2 focus-within:ring-[#ff6859]/30">
            <Search className="w-4 h-4 text-[#717882]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area, neighborhood or landmark..."
              className="w-full bg-transparent text-[12px] font-medium focus:outline-none placeholder:text-[#9aa0a6]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-black cursor-pointer p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* GPS Auto-Detect Button */}
        <div className="py-2">
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="w-full p-3.5 rounded-[22px] bg-white border border-black/5 shadow-sm flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ff6859]/15 text-[#ff6859] flex items-center justify-center flex-shrink-0">
                <Navigation className={`w-4 h-4 ${isDetecting ? "animate-spin" : ""}`} />
              </div>
              <div>
                <span className="text-[13px] font-bold text-[#ff6859] block leading-tight">
                  {isDetecting ? "Detecting location..." : "Use Current Location"}
                </span>
                <span className="text-[10.5px] text-[#717882]">
                  Using device GPS / Wi-Fi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#717882]" />
          </button>
        </div>

        {/* Active Selected Location */}
        <div className="py-2">
          <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#717882] block mb-1.5">
            Active Location
          </span>
          <div className="p-3.5 rounded-[20px] bg-[#181a1e] text-white border border-white/10 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#ff8f7d]" />
              <div>
                <span className="text-[13px] font-bold block leading-tight">
                  {location.area}
                </span>
                <span className="text-[10.5px] text-neutral-400">
                  {location.subArea}
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          </div>
        </div>

        {/* Neighborhood Groups */}
        <div className="space-y-4 mt-2">
          {filteredHubs.map((hub) => (
            <div key={hub.hub}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#717882] block mb-2 px-1">
                {hub.hub}
              </span>
              <div className="space-y-2">
                {hub.locations.map((loc) => {
                  const isActive = location.area === loc.area;
                  return (
                    <div
                      key={loc.area}
                      onClick={() => handleSelect(loc)}
                      className={`p-3.5 rounded-[20px] border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-white border-[#ff6859] shadow-sm"
                          : "bg-white/80 hover:bg-white border-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Compass className={`w-4 h-4 ${isActive ? "text-[#ff6859]" : "text-[#717882]"}`} />
                        <div>
                          <h4 className="text-[13px] font-bold text-[#1a1d20] leading-tight">
                            {loc.area}
                          </h4>
                          <span className="text-[10.5px] text-[#717882]">
                            {loc.subArea}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-[#ff6859]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
