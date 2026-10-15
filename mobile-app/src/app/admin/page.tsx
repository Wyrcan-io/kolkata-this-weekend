"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

export default function AdminConsolePage() {
  const { isDarkMode, submissions, approveSubmission, rejectSubmission, allEvents, polls } = useApp();
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");

  const filteredSubs = submissions.filter((s) => s.status === activeTab);
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Admin Moderation" subtitle="Mobile 1-Click Approval Gate" />

      <section className="px-5 py-4 space-y-4">
        {/* Quick Health Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
            }`}
          >
            <span className="text-xl font-black text-red-500">{allEvents.length}</span>
            <span className="block text-[10px] font-bold text-neutral-400 uppercase mt-0.5">Live Events</span>
          </div>
          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
            }`}
          >
            <span className="text-xl font-black text-amber-500">{pendingCount}</span>
            <span className="block text-[10px] font-bold text-neutral-400 uppercase mt-0.5">Pending</span>
          </div>
          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
            }`}
          >
            <span className="text-xl font-black text-emerald-500">{Object.keys(polls).length}</span>
            <span className="block text-[10px] font-bold text-neutral-400 uppercase mt-0.5">Active Polls</span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          {[
            { id: "pending", label: `Pending (${pendingCount})` },
            { id: "approved", label: "Approved" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-[#b51f2a] text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-3">
          {filteredSubs.length === 0 ? (
            <div
              className={`text-center py-12 rounded-2xl border ${
                isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
              }`}
            >
              <span className="text-2xl block mb-1">🎉</span>
              <p className="text-xs font-bold text-neutral-400">
                No {activeTab} submissions right now.
              </p>
              <Link
                href="/submit"
                className="mt-3 inline-block text-xs font-bold text-[#b51f2a] hover:underline"
              >
                + Test Submit an Event
              </Link>
            </div>
          ) : (
            filteredSubs.map((sub) => (
              <div
                key={sub.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md">
                    {sub.category} • {sub.zone}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">{sub.submittedAt}</span>
                </div>

                <h3 className="text-sm font-extrabold mt-1.5 leading-snug">{sub.title}</h3>

                <div className="mt-2 space-y-1 text-xs text-neutral-400">
                  <p>
                    📍 <strong className="text-neutral-300">{sub.venueName}</strong> ({sub.neighborhood})
                  </p>
                  <p>
                    📅 {sub.dayType} at {sub.timeStr} • 💵 {sub.priceLabel}
                  </p>
                  <p className="truncate text-neutral-500">
                    🔗 <a href={sub.outboundUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{sub.outboundUrl}</a>
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    📱 Submitter contact: <strong className="text-neutral-300">{sub.contactInfo}</strong>
                  </p>
                </div>

                {sub.status === "pending" && (
                  <div className="mt-3.5 pt-3 border-t border-neutral-800/40 flex items-center gap-2">
                    <button
                      onClick={() => approveSubmission(sub.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2 rounded-xl transition-transform active:scale-95 shadow-sm"
                    >
                      ✓ 1-Click Approve & Publish
                    </button>
                    <button
                      onClick={() => rejectSubmission(sub.id)}
                      className="px-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs py-2 rounded-xl transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}

                {sub.status === "approved" && (
                  <div className="mt-2 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <span>✓ Live on feed</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Fast Link to Feed */}
        <div className="pt-2 text-center">
          <Link
            href="/events"
            className="text-xs font-bold text-[#b51f2a] hover:underline"
          >
            ← Back to Live Public Feed
          </Link>
        </div>
      </section>
    </main>
  );
}
