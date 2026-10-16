"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, ShieldCheck, Clock, Check, Ticket, ChevronRight, Sparkles } from "lucide-react";
import BottomNavbar from "../components/BottomNavbar";

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
    badgeColor: "bg-[#FF6859] text-white",
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
  const [selectedPass, setSelectedPass] = useState<string>("south-elite");
  const [isReserved, setIsReserved] = useState<Record<string, boolean>>({});

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
              vip puja passes
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              official fast-track access
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

      {/* Hero Notice */}
      <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6859] bg-[#FFF2F0] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-red-100">
            <ShieldCheck size={12} />
            <span>Police & WBTC Approved</span>
          </span>
          <span className="text-xs text-neutral-400 font-semibold">Autumn 2026</span>
        </div>

        <h2 className="text-base font-extrabold text-[#141519] leading-tight">
          Skip the 4-Hour Pandal Queues
        </h2>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
          Over 2.5 million visitors enter Kolkata&apos;s top pandal clusters nightly. Official VIP Passes grant immediate fast-track entrance via reserved security corridors.
        </p>
      </div>

      {/* Passes List (Styled as Collectible Digital Ticket Stubs) */}
      <section className="space-y-4">
        {PASSES.map((pass) => {
          const active = selectedPass === pass.id;
          return (
            <div
              key={pass.id}
              onClick={() => setSelectedPass(pass.id)}
              className={`bg-white rounded-[26px] p-5 border transition-all cursor-pointer relative overflow-hidden ${
                active
                  ? "border-[#FF6859] shadow-[0_6px_28px_rgba(255,104,89,0.15)] ring-1 ring-[#FF6859]"
                  : "border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-200"
              }`}
            >
              {/* Ticket Top Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${pass.badgeColor}`}>
                    {pass.tier}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600">{pass.status}</span>
                </div>
                <span className="text-lg font-black text-[#141519]">{pass.price}</span>
              </div>

              {/* Ticket Main Body */}
              <div className="pt-3 text-left">
                <h3 className="text-sm font-extrabold leading-tight text-[#141519]">
                  {pass.title}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1.5 font-medium">
                  <Clock size={12} className="text-neutral-400 shrink-0" />
                  <span>{pass.validity}</span>
                </p>

                <div className="mt-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Verified Pandal Corridors
                  </span>
                  <p className="text-xs font-semibold text-neutral-700 leading-snug">
                    {pass.coverage}
                  </p>
                </div>

                <div className="mt-3.5 space-y-1.5">
                  {pass.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                        <Check size={10} strokeWidth={3} />
                      </div>
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
                  className={`mt-4 w-full py-3 rounded-2xl font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 ${
                    isReserved[pass.id]
                      ? "bg-emerald-600 text-white"
                      : "bg-[#141519] text-white hover:bg-neutral-800 active:scale-98"
                  }`}
                >
                  {isReserved[pass.id] ? (
                    <>
                      <Check size={14} strokeWidth={2.5} />
                      <span>Digital E-Pass Issued (Saved to Wallet)</span>
                    </>
                  ) : (
                    <>
                      <Ticket size={14} />
                      <span>Get Instant Digital E-Pass</span>
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
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
