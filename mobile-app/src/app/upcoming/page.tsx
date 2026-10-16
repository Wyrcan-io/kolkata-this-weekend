"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, MapPin, Users, Check, Sparkles } from "lucide-react";
import BottomNavbar from "../components/BottomNavbar";

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
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
              upcoming in kolkata
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              festivals, mega concerts & winter calendar
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

      {/* Hero Season Banner */}
      <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6859] bg-[#FFF2F0] px-2.5 py-0.5 rounded-full border border-red-100">
            Autumn & Winter 2026/27
          </span>
          <span className="text-xs text-neutral-400 font-semibold">Early Access</span>
        </div>

        <h2 className="text-base font-extrabold text-[#141519] leading-tight">
          Kolkata&apos;s Grandest Season is Ahead
        </h2>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
          From the Chandannagar lights of Kali Puja to the winter lights of Park Street and the world-famous Book Fair. Set reminders to get early-bird notifications.
        </p>
      </div>

      {/* Timeline List */}
      <section className="space-y-4">
        {UPCOMING_EVENTS.map((event) => {
          const isSet = !!reminders[event.id];
          return (
            <div
              key={event.id}
              className="bg-white rounded-[26px] overflow-hidden border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all"
            >
              {/* Event Image Banner with Date Tag */}
              <div className="relative w-full h-[160px] overflow-hidden">
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  fill
                  sizes="(max-width: 440px) 400px, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Date & Category Badges */}
                <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                  <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white shadow-sm">
                    {event.dates}
                  </span>

                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {event.category}
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 inset-x-3.5 z-10 text-white">
                  <h3 className="text-base font-extrabold leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300 mt-0.5 font-medium flex items-center gap-1">
                    <MapPin size={11} className="text-[#FFA17E]" />
                    <span>{event.venue}</span>
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 text-left space-y-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {event.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1.5">
                    <Users size={13} />
                    <span>{event.expectedTurnout}</span>
                  </span>

                  <button
                    onClick={() => toggleReminder(event.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSet
                        ? "bg-emerald-600 text-white"
                        : "bg-[#141519] text-white hover:bg-neutral-800 shadow-xs"
                    }`}
                  >
                    {isSet ? (
                      <>
                        <Check size={12} strokeWidth={2.5} />
                        <span>Reminder Set</span>
                      </>
                    ) : (
                      <>
                        <Bell size={12} />
                        <span>Remind Me</span>
                      </>
                    )}
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
