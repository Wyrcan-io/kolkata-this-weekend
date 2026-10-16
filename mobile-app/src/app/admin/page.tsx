"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, MapPin, Calendar, ExternalLink, Phone, Check, X, CheckCircle2, ShieldCheck, Inbox } from "lucide-react";
import { useApp } from "../context";
import BottomNavbar from "../components/BottomNavbar";

export default function AdminConsolePage() {
  const { submissions, approveSubmission, rejectSubmission } = useApp();
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");

  const filteredSubs = submissions.filter((s) => {
    if (activeTab === "all") return true;
    return s.status === activeTab;
  });

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
              curator queue
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              1-click event moderation
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
        {/* Banner Notice */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
              <ShieldCheck size={12} />
              <span>Lead Curator Access</span>
            </span>
            <span className="text-xs text-neutral-400 font-semibold">{submissions.length} Total</span>
          </div>

          <h2 className="text-base font-extrabold text-[#141519] leading-tight">
            Organizer Submissions
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Approving adds the event directly to the live feed and the interactive weekend circuit planner engine.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2">
          {(["pending", "approved", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#141519] text-white shadow-xs"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
              }`}
            >
              {tab} (
              {submissions.filter((s) => (tab === "all" ? true : s.status === tab)).length}
              )
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-3">
          {filteredSubs.length === 0 ? (
            <div className="bg-white rounded-[26px] p-8 text-center border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <Inbox size={32} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-xs font-bold text-neutral-500">
                No {activeTab} submissions right now.
              </p>
              <Link
                href="/submit"
                className="mt-3 inline-block text-xs font-bold text-[#FF6859] hover:underline"
              >
                + Test Submit an Event
              </Link>
            </div>
          ) : (
            filteredSubs.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-[26px] p-5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-full">
                    {sub.category} • {sub.zone}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">{sub.submittedAt}</span>
                </div>

                <h3 className="text-sm font-extrabold text-[#141519] mt-2 leading-snug">{sub.title}</h3>

                <div className="mt-2.5 space-y-1.5 text-xs text-neutral-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-neutral-400 shrink-0" />
                    <span><strong className="text-[#141519]">{sub.venueName}</strong> ({sub.neighborhood})</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-neutral-400 shrink-0" />
                    <span>{sub.dayType} at {sub.timeStr} • {sub.priceLabel}</span>
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-neutral-500">
                    <ExternalLink size={13} className="text-neutral-400 shrink-0" />
                    <a href={sub.outboundUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#FF6859] font-medium">
                      {sub.outboundUrl}
                    </a>
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <Phone size={13} className="text-neutral-400 shrink-0" />
                    <span>Contact: <strong className="text-[#141519]">{sub.contactInfo}</strong></span>
                  </p>
                </div>

                {sub.status === "pending" && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2">
                    <button
                      onClick={() => approveSubmission(sub.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 rounded-xl transition-transform active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check size={14} strokeWidth={2.5} />
                      <span>Approve & Publish</span>
                    </button>
                    <button
                      onClick={() => rejectSubmission(sub.id)}
                      className="px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}

                {sub.status === "approved" && (
                  <div className="mt-3 pt-2 border-t border-neutral-100 text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Live on Kolkata feed</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
