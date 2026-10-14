"use client";

import React, { useState } from "react";
import Image from "next/image";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

interface UpcomingEvent {
  id: string;
  month: string;
  dates: string;
  title: string;
  category: "Film Fest" | "Mega Concert" | "Cultural Festival" | "Heritage Carnival";
  venue: string;
  desc: string;
  imageSrc: string;
  expectedTurnout: string;
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "kali-puja",
    month: "OCTOBER 2026",
    dates: "Oct 24 – Oct 26",
    title: "Barasat & Naihati Kali Puja Mega Circuit",
    category: "Heritage Carnival",
    venue: "Barasat & Naihati Central Corridors",
    desc: "Renowned for the grandest illuminated laser pandals in Eastern India with Chandannagar lighting displays.",
    imageSrc: "/images/dandiya.jpg",
    expectedTurnout: "500K+ visitors",
  },
  {
    id: "kiff",
    month: "NOVEMBER 2026",
    dates: "Nov 06 – Nov 13",
    title: "32nd Kolkata International Film Festival (KIFF)",
    category: "Film Fest",
    venue: "Nandan, Rabindra Sadan & Sisir Mancha",
    desc: "Over 180 curated world cinema masterpieces, retrospectives, and director Q&A sessions across heritage auditoriums.",
    imageSrc: "/images/aot.jpg",
    expectedTurnout: "Delegate Passes Live Soon",
  },
  {
    id: "arijit-live",
    month: "NOVEMBER 2026",
    dates: "Nov 28 (Saturday)",
    title: "Arijit Singh Homecoming Live Concert",
    category: "Mega Concert",
    venue: "Aquatica / Eco Park Open Grounds",
    desc: "The monumental open-air winter concert with a 40-piece live acoustic symphony orchestra.",
    imageSrc: "/images/musicfest.jpg",
    expectedTurnout: "Phase 1 Early Bird",
  },
  {
    id: "park-st-xmas",
    month: "DECEMBER 2026",
    dates: "Dec 20 – Jan 01",
    title: "Park Street Christmas & Carnival Lights",
    category: "Cultural Festival",
    venue: "Allen Park & Entire Park Street Corridor",
    desc: "Kolkata's legendary neon fairy-light boulevard, live street food stalls, choir carols, and brass bands.",
    imageSrc: "/images/concert_summer.jpg",
    expectedTurnout: "Free Open Boulevard",
  },
  {
    id: "boimela",
    month: "JANUARY 2027",
    dates: "Jan 27 – Feb 07",
    title: "49th International Kolkata Book Fair (Boimela)",
    category: "Cultural Festival",
    venue: "Boimela Prangan, Central Park Salt Lake",
    desc: "The world's largest non-trade book fair with over 1,000 publishers, literary debates, and evening tea addas.",
    imageSrc: "/images/pujor-passport.png",
    expectedTurnout: "2.8 Million attendees",
  },
];

export default function UpcomingPage() {
  const { isDarkMode } = useApp();
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-32 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader
        title="Upcoming in Kolkata"
        subtitle="City festivals, mega concerts & winter calendar"
        showBackButton={true}
      />

      {/* Hero Season Banner */}
      <div className="px-5 py-3">
        <div
          className={`rounded-2xl p-4 border relative overflow-hidden ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white"
              : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-[#c6121f] bg-red-600/10 px-2 py-0.5 rounded-full">
              Autumn & Winter 2026/27
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Early Access</span>
          </div>

          <h2 className="text-[16.5px] font-extrabold mt-2 leading-tight">
            Kolkata's Grandest Season is Ahead
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            From the Chandannagar lights of Kali Puja to the winter lights of Park Street and the world-famous Book Fair. Set reminders to get early-bird notifications.
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <section className="px-5 py-2 space-y-4">
        {UPCOMING_EVENTS.map((event) => {
          const isSet = !!reminders[event.id];
          return (
            <div
              key={event.id}
              className={`rounded-[22px] overflow-hidden border transition-all ${
                isDarkMode
                  ? "bg-[#12141c] border-neutral-800/80 text-white"
                  : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
              }`}
            >
              {/* Event Image Banner with Date Tag */}
              <div className="relative w-full h-[150px] overflow-hidden">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  fill
                  sizes="(max-width: 440px) 400px, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Date & Category Badges */}
                <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                  <span className="text-[9.5px] font-black uppercase px-2.5 py-1 rounded-full bg-red-600 text-white shadow-sm">
                    {event.dates}
                  </span>

                  <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {event.category}
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-2.5 inset-x-3.5 z-10 text-white">
                  <h3 className="text-base font-extrabold leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300 mt-0.5 font-medium">
                    📍 {event.venue}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-3.5 text-left space-y-2.5">
                <p className="text-xs text-neutral-400 leading-snug">
                  {event.desc}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-700/20">
                  <span className="text-[11px] font-bold text-amber-500">
                    👥 {event.expectedTurnout}
                  </span>

                  <button
                    onClick={() => toggleReminder(event.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSet
                        ? "bg-emerald-600 text-white"
                        : "bg-[#c6121f] text-white hover:bg-red-700 shadow-xs"
                    }`}
                  >
                    <span>{isSet ? "Reminder Set ✓" : "Remind Me 🔔"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
