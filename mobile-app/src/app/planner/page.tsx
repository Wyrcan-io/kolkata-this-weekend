"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";
import { generateCircuit } from "../../lib/data";

export default function PlannerPage() {
  const { isDarkMode, savedItems, allEvents, createPoll, showToast } = useApp();
  const [day, setDay] = useState<string>("Saturday");
  const [zone, setZone] = useState<string>("South Kolkata");
  const [vibe, setVibe] = useState<string>("Creative & Food");
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [createdPollId, setCreatedPollId] = useState<string | null>(null);

  const activeCircuit = generateCircuit(day, zone, vibe);

  const handleShareWhatsApp = () => {
    const lines = [
      `🎉 *Our Kolkata Weekend Plan (${day})*`,
      `📍 *Zone:* ${activeCircuit.zone}`,
      `💰 *Est. Budget:* ${activeCircuit.totalEstimatedCost} / person`,
      `🚶 ${activeCircuit.walkingNote}`,
      "",
      ...activeCircuit.stops.map(
        (stop, i) =>
          `*${i + 1}. ${stop.timeSlot} — ${stop.title}*\n   📍 ${stop.venueName} (${stop.neighborhood})\n   💵 Est: ${stop.estimatedCost}`
      ),
      "",
      `👉 Details & map: https://kolkatathisweekend.com/planner`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCreateGroupPoll = () => {
    if (savedItems.length === 0) {
      showToast("Save at least 1-2 events to create a group poll!");
      return;
    }
    const pollId = createPoll(`Saturday Plan with Friends! 🎉`, day, savedItems);
    setCreatedPollId(pollId);
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Weekend Circuit" subtitle="3-Stop Connected Day Plans" />

      <section className="px-5 py-3">
        {/* Banner Intro */}
        <div
          className={`rounded-2xl p-4 border relative overflow-hidden ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white"
              : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#b51f2a] px-2 py-0.5 rounded-full">
              Kolkata Circuit Engine
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">Zero Indecision</span>
          </div>

          <h2 className="text-base font-extrabold mt-2 leading-tight">
            Stop asking &quot;Kothay jabi?&quot; Here is your day.
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Choose your day, neighborhood, and vibe. We map a connected 3-stop route with actual walking distances, food recommendations, and evening highlights.
          </p>
        </div>

        {/* Form Selectors */}
        <div
          className={`mt-4 rounded-2xl p-4 space-y-3.5 border ${
            isDarkMode ? "bg-[#141620] border-neutral-800" : "bg-white border-neutral-200 shadow-xs"
          }`}
        >
          {/* 1. Day Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              1. When are you heading out?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Tonight", "Saturday", "Sunday"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    day === d
                      ? "bg-[#b51f2a] text-white shadow-md shadow-red-950/40"
                      : isDarkMode
                      ? "bg-neutral-900 text-neutral-400 hover:text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Zone Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              2. Preferred Area / Hub
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "South Kolkata", label: "South CCU" },
                { id: "Salt Lake & New Town", label: "Salt Lake" },
                { id: "Park Street & Central", label: "Park Street" },
              ].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    zone === z.id
                      ? "bg-[#b51f2a] text-white shadow-md shadow-red-950/40"
                      : isDarkMode
                      ? "bg-neutral-900 text-neutral-400 hover:text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Vibe Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              3. Vibe Preference
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "Creative & Food", label: "🎨 Creative" },
                { id: "Live Music & Night", label: "🎵 Music/Gigs" },
                { id: "Quiet Heritage", label: "🏛️ Heritage" },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                    vibe === v.id
                      ? "bg-[#b51f2a] text-white shadow-md shadow-red-950/40"
                      : isDarkMode
                      ? "bg-neutral-900 text-neutral-400 hover:text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Circuit Plan */}
        {isGenerated && activeCircuit && (
          <div className="mt-5 space-y-4">
            {/* Circuit Header */}
            <div
              className={`p-4 rounded-2xl border ${
                isDarkMode ? "bg-[#181a24] border-neutral-800" : "bg-neutral-50 border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  Verified Route
                </span>
                <span className="text-xs font-bold text-neutral-400">
                  Est. Budget: <strong className="text-white">{activeCircuit.totalEstimatedCost}</strong>
                </span>
              </div>
              <h3 className="text-base font-extrabold mt-1 text-white">{activeCircuit.title}</h3>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                <span>🚶</span> {activeCircuit.walkingNote}
              </p>

              {/* Share to WhatsApp CTA Button */}
              <button
                onClick={handleShareWhatsApp}
                className="mt-3.5 w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" />
                </svg>
                <span>Share Full Itinerary to WhatsApp ↗</span>
              </button>
            </div>

            {/* 3-Stop Timeline Cards */}
            <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-neutral-800">
              {activeCircuit.stops.map((stop, index) => (
                <div
                  key={index}
                  className={`relative pl-9 pr-4 py-3.5 rounded-2xl border transition-all ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 hover:border-neutral-700"
                      : "bg-white border-neutral-200 shadow-xs"
                  }`}
                >
                  {/* Timeline Stop Badge */}
                  <div className="absolute left-2.5 top-4 w-4 h-4 rounded-full bg-[#b51f2a] text-white text-[9px] font-black flex items-center justify-center ring-4 ring-[#090a0f]">
                    {index + 1}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#b51f2a]">{stop.timeSlot}</span>
                    <span className="text-[10px] font-bold bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
                      {stop.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold mt-1">{stop.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{stop.description}</p>

                  <div className="mt-2.5 flex items-center justify-between text-xs font-semibold text-neutral-400 pt-2 border-t border-neutral-800/40">
                    <span className="truncate">
                      📍 {stop.venueName}
                    </span>
                    <a
                      href={stop.outboundLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b51f2a] font-bold hover:underline shrink-0 text-[11px]"
                    >
                      Map / Info ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viral WhatsApp Poll Section */}
        <div
          className={`mt-6 p-4 rounded-2xl border ${
            isDarkMode ? "bg-[#141620] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🗳️</span>
            <div>
              <h4 className="text-sm font-extrabold">Can&apos;t agree on where to go?</h4>
              <p className="text-xs text-neutral-400">
                Turn your saved shortlist into a 1-tap WhatsApp poll for friends to vote on!
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
            <span>
              Shortlisted events: <strong className="text-red-500">{savedItems.length}</strong>
            </span>
            <Link href="/events" className="text-[#b51f2a] font-bold hover:underline text-[11px]">
              + Save More Events
            </Link>
          </div>

          {createdPollId ? (
            <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs">
              <p className="font-bold">✅ Group Poll Created!</p>
              <div className="mt-2 flex items-center gap-2">
                <Link
                  href={`/poll/${createdPollId}`}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  View Poll ↗
                </Link>
                <button
                  onClick={() => {
                    const pollUrl = `${window.location.origin}/poll/${createdPollId}`;
                    const text = encodeURIComponent(
                      `Hey! Vote on where we should go this weekend:\n${pollUrl}`
                    );
                    window.open(`https://wa.me/?text=${text}`, "_blank");
                  }}
                  className="bg-[#25D366] text-black font-extrabold px-3 py-1.5 rounded-lg text-xs"
                >
                  Send on WhatsApp ↗
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCreateGroupPoll}
              className="mt-3 w-full bg-[#b51f2a] hover:bg-[#961720] text-white font-extrabold text-xs py-2.5 rounded-xl transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Generate WhatsApp Group Poll 🗳️</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
