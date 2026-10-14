"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

const PASSES = [
  {
    id: "south-elite",
    title: "South Kolkata VIP Sharad Samman Pass",
    tier: "ALL-ACCESS PRIORITY",
    price: "₹999",
    validity: "Oct 16 (Saptami) – Oct 19 (Dashami) • 5 PM to 4 AM",
    coverage: "Ekdalia Evergreen, Singhi Park, Maddox Square, Mudiali & Shib Mandir",
    perks: [
      "Zero-wait VIP barricade entry (Gate 1)",
      "Priority AC lounge with bottled water",
      "Digital barcode on Apple/Google Wallet",
    ],
    status: "14 Passes Remaining",
    badgeColor: "bg-red-600 text-white",
  },
  {
    id: "north-heritage",
    title: "North Kolkata Bonedi Bari & Rajbari Pass",
    tier: "HERITAGE PATRON",
    price: "₹1,299",
    validity: "Oct 15 (Sasthi) – Oct 18 (Nabami) • 8 AM to 11 PM",
    coverage: "Sovabazar Rajbari, Baghbazar Sarbojanin, Laha Bari & Chhatubabu Latubabu",
    perks: [
      "Exclusive priest Sandhya Aarti seating",
      "Traditional pure-ghee Bhog lunch parcel",
      "Historian-guided walking trail app map",
    ],
    status: "Selling Fast",
    badgeColor: "bg-amber-600 text-white",
  },
  {
    id: "midnight-express",
    title: "Midnight Carnival Fast-Track Pass",
    tier: "NIGHT CIRCUIT",
    price: "₹699",
    validity: "All 4 Nights • 11:00 PM – 5:00 AM",
    coverage: "Sreebhumi Sporting Club, FD Block Salt Lake & Tala Pratyay",
    perks: [
      "Midnight express lane bypasses 3-hour crowd queues",
      "Dedicated two-wheeler & cab drop-off gate",
      "RFID wristband collection at venue counters",
    ],
    status: "Instant E-Ticket",
    badgeColor: "bg-purple-600 text-white",
  },
];

export default function VipPassPage() {
  const { isDarkMode } = useApp();
  const [selectedPass, setSelectedPass] = useState<string>("south-elite");
  const [isReserved, setIsReserved] = useState<Record<string, boolean>>({});

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-36 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="VIP Puja Passes" subtitle="Official Fast-Track Sharad Samman" />

      {/* Hero Notice */}
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
              WBTC & Police Approved
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Autumn 2026</span>
          </div>

          <h2 className="text-[17px] font-extrabold mt-2 leading-tight">
            Skip the 4-Hour Pandal Queues
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Over 2.5 million visitors enter Kolkata's top pandal clusters nightly. Official VIP Passes grant immediate fast-track entrance via reserved security corridors.
          </p>
        </div>
      </div>

      {/* Passes List (Styled as Collectible Digital Ticket Stubs) */}
      <section className="px-5 py-2 flex flex-col gap-4">
        {PASSES.map((pass) => {
          const active = selectedPass === pass.id;
          return (
            <div
              key={pass.id}
              onClick={() => setSelectedPass(pass.id)}
              className={`rounded-[22px] overflow-hidden border transition-all cursor-pointer relative ${
                active
                  ? "border-[#c6121f] shadow-xl shadow-red-950/20 ring-1 ring-[#c6121f]"
                  : isDarkMode
                  ? "border-neutral-800/80 bg-[#12141c]"
                  : "border-neutral-200/80 bg-white shadow-xs"
              }`}
            >
              {/* Ticket Top Banner */}
              <div
                className={`px-4 py-2.5 flex items-center justify-between border-b ${
                  isDarkMode ? "bg-white/[0.03] border-neutral-800" : "bg-neutral-50/80 border-neutral-200/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${pass.badgeColor}`}>
                    {pass.tier}
                  </span>
                  <span className="text-[10px] font-bold text-amber-500">{pass.status}</span>
                </div>
                <span className="text-lg font-black text-[#c6121f]">{pass.price}</span>
              </div>

              {/* Ticket Main Body */}
              <div className="p-4 text-left">
                <h3 className="text-[15px] font-extrabold leading-tight text-inherit">
                  {pass.title}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1.5 font-medium">
                  <span>⏱️</span>
                  <span>{pass.validity}</span>
                </p>

                <div
                  className={`mt-3 p-3 rounded-xl border text-xs ${
                    isDarkMode ? "bg-black/30 border-neutral-800/80" : "bg-neutral-50 border-neutral-200/60"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Verified Pandal Corridors
                  </span>
                  <p className="text-xs font-medium text-inherit leading-snug">
                    {pass.coverage}
                  </p>
                </div>

                <div className="mt-3.5 space-y-1.5">
                  {pass.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                        ✓
                      </span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Reservation Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsReserved((prev) => ({ ...prev, [pass.id]: !prev[pass.id] }));
                  }}
                  className={`mt-4 w-full py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                    isReserved[pass.id]
                      ? "bg-emerald-600 text-white shadow-emerald-900/30"
                      : "bg-[#c6121f] text-white hover:bg-[#a90d18] shadow-red-600/30 active:scale-98"
                  }`}
                >
                  {isReserved[pass.id] ? (
                    <>
                      <span>Digital E-Pass Issued ✓</span>
                      <span className="text-[10px] opacity-80">(Saved to Wallet)</span>
                    </>
                  ) : (
                    <>
                      <span>Get Instant Digital E-Pass</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
