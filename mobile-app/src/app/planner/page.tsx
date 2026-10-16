"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Palette,
  Music,
  Landmark,
  Footprints,
  MapPin,
  Share2,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context";
import { generateCircuit } from "../../lib/data";
import BottomNavbar from "../components/BottomNavbar";
import { asset } from "../../lib/assets";

export default function PlannerPage() {
  const { savedItems, createPoll, showToast } = useApp();
  const [day, setDay] = useState<string>("Saturday");
  const [zone, setZone] = useState<string>("South Kolkata");
  const [vibe, setVibe] = useState<string>("Creative & Food");
  const [isGenerated] = useState<boolean>(true);
  const [createdPollId, setCreatedPollId] = useState<string | null>(null);

  const activeCircuit = generateCircuit(day, zone, vibe);

  const handleShareWhatsApp = () => {
    const lines = [
      `*Our Kolkata Weekend Plan (${day})*`,
      `Zone: ${activeCircuit.zone}`,
      `Est. Budget: ${activeCircuit.totalEstimatedCost} / person`,
      `Walking: ${activeCircuit.walkingNote}`,
      "",
      ...activeCircuit.stops.map(
        (stop, i) =>
          `*${i + 1}. ${stop.timeSlot} — ${stop.title}*\n   Venue: ${stop.venueName} (${stop.neighborhood})\n   Est: ${stop.estimatedCost}`
      ),
      "",
      `Details & map: https://kolkatathisweekend.com/planner`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCreateGroupPoll = () => {
    if (savedItems.length === 0) {
      showToast("Save at least 1-2 events to create a group poll!");
      return;
    }
    const pollId = createPoll(`Saturday Plan with Friends`, day, savedItems);
    setCreatedPollId(pollId);
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
              weekend circuit
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              3-stop connected day plans
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

      <section className="space-y-4">
        {/* Banner Intro */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white px-2.5 py-0.5 rounded-full">
              Kolkata Circuit Engine
            </span>
            <span className="text-xs text-neutral-400 font-semibold">Zero Indecision</span>
          </div>

          <h2 className="text-base font-extrabold text-[#141519] leading-tight">
            Stop asking &quot;Kothay jabi?&quot; Here is your day.
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Choose your day, neighborhood, and vibe. We map a connected 3-stop route with actual walking distances, food recommendations, and evening highlights.
          </p>
        </div>

        {/* Form Selectors */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 space-y-4">
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
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    day === d
                      ? "bg-[#141519] text-white shadow-xs"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
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
              2. Preferred Zone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["South Kolkata", "Park Street & Central", "North Kolkata", "Salt Lake & New Town"].map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all truncate text-center cursor-pointer ${
                    zone === z
                      ? "bg-[#141519] text-white shadow-xs"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Vibe Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              3. Vibe Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Creative & Food", label: "Creative", icon: Palette },
                { id: "Live Music & Night", label: "Music & Gigs", icon: Music },
                { id: "Quiet Heritage", label: "Heritage", icon: Landmark },
              ].map((v) => {
                const IconComponent = v.icon;
                const isSelected = vibe === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVibe(v.id)}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-[#FFF4F2] text-[#FF6859] border border-[#FF6859] shadow-xs"
                        : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
                    }`}
                  >
                    <IconComponent size={15} />
                    <span className="truncate">{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generated Circuit Plan */}
        {isGenerated && activeCircuit && (
          <div className="space-y-4">
            {/* Circuit Header */}
            <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 overflow-hidden">
              <div className="relative w-full h-28 rounded-2xl overflow-hidden mb-3.5">
                <Image
                  src={asset("/images/real/real-kolkata-tram.jpg")}
                  alt="Kolkata Circuit"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 text-white">
                  <span className="text-xs font-black tracking-wide">
                    {activeCircuit.zone} • {day} Connected Trail
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Verified Route
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  Est. Budget: <strong className="text-[#141519]">{activeCircuit.totalEstimatedCost}</strong>
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#141519] mt-1">{activeCircuit.title}</h3>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                <Footprints size={13} className="text-[#FF6859]" />
                <span>{activeCircuit.walkingNote}</span>
              </p>

              {/* Share to WhatsApp CTA Button */}
              <button
                onClick={handleShareWhatsApp}
                className="mt-4 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm cursor-pointer"
              >
                <Share2 size={15} />
                <span>Share Full Itinerary to WhatsApp</span>
              </button>
            </div>

            {/* 3-Stop Timeline Cards */}
            <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-neutral-200">
              {activeCircuit.stops.map((stop, index) => (
                <div
                  key={index}
                  className="relative pl-9 pr-4 py-3.5 bg-white rounded-[22px] border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all"
                >
                  {/* Timeline Stop Badge */}
                  <div className="absolute left-2.5 top-4 w-4 h-4 rounded-full bg-[#141519] text-white text-[9px] font-black flex items-center justify-center ring-4 ring-[#ECEFED]">
                    {index + 1}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#FF6859]">{stop.timeSlot}</span>
                    <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full">
                      {stop.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#141519] mt-1">{stop.title}</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">{stop.description}</p>

                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-neutral-500 pt-2 border-t border-neutral-100">
                    <span className="truncate flex items-center gap-1">
                      <MapPin size={11} className="text-neutral-400" />
                      <span>{stop.venueName}</span>
                    </span>
                    <a
                      href={stop.outboundLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6859] font-bold hover:underline shrink-0 text-[11px] flex items-center gap-0.5"
                    >
                      <span>Map / Info</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Group WhatsApp Poll Section */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF4F2] text-[#FF6859] flex items-center justify-center shrink-0">
              <Users size={18} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#141519]">Can&apos;t agree on where to go?</h4>
              <p className="text-xs text-neutral-500">
                Turn your saved shortlist into a 1-tap WhatsApp poll for friends to vote on.
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
            <span>
              Shortlisted events: <strong className="text-[#FF6859]">{savedItems.length}</strong>
            </span>
            <Link href="/events" className="text-[#FF6859] font-bold hover:underline text-[11px]">
              + Save More Events
            </Link>
          </div>

          {createdPollId ? (
            <div className="mt-3.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Group Poll Created!</span>
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <Link
                  href={`/poll/${createdPollId}`}
                  className="bg-[#141519] text-white font-bold px-3 py-2 rounded-xl text-xs hover:bg-neutral-800"
                >
                  View Poll
                </Link>
                <button
                  onClick={() => {
                    const pollUrl = `${window.location.origin}/poll/${createdPollId}`;
                    const text = encodeURIComponent(
                      `Hey! Vote on where we should go this weekend:\n${pollUrl}`
                    );
                    window.open(`https://wa.me/?text=${text}`, "_blank");
                  }}
                  className="bg-[#25D366] text-white font-bold px-3 py-2 rounded-xl text-xs hover:bg-[#20ba59]"
                >
                  Send on WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCreateGroupPoll}
              className="mt-3.5 w-full bg-[#141519] hover:bg-neutral-800 text-white font-extrabold text-xs py-3 rounded-2xl transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Users size={14} />
              <span>Generate WhatsApp Group Poll</span>
            </button>
          )}
        </div>
      </section>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
