"use client";

import React, { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import { useApp } from "../../context";

function PollContent() {
  const params = useParams();
  const pollId = typeof params?.id === "string" ? params.id : "sat-crew-plan";
  const { isDarkMode, polls, votePoll } = useApp();
  const [hasVoted, setHasVoted] = useState<string | null>(null);

  const poll = polls[pollId] || {
    id: pollId,
    title: "Saturday Evening Plan! 🍻",
    targetDate: "This Saturday (Oct 18)",
    createdBy: "The Crew",
    totalVotes: 4,
    createdAt: "Today",
    options: [
      {
        id: "opt-1",
        title: "The Monsoon Quartet Live Jazz",
        venue: "Skinny Mo's, Southern Ave",
        timeStr: "7:30 PM",
        category: "Live Music",
        votes: 3,
      },
      {
        id: "opt-2",
        title: "Terracotta Pottery Masterclass",
        venue: "Sienna Store & Cafe",
        timeStr: "3:30 PM",
        category: "Workshop",
        votes: 1,
      },
    ],
  };

  const totalVotes = Math.max(poll.totalVotes, 1);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    votePoll(pollId, optionId);
    setHasVoted(optionId);
  };

  const handleShareWhatsApp = () => {
    const pollUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(
      `🗳️ *Vote on our plan for ${poll.targetDate}!* \n${poll.title}\n\n👉 Cast your vote here (takes 2 seconds):\n${pollUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Kothay Jabi? Poll" subtitle="1-Tap Group Consensus" />

      <section className="px-5 py-4 space-y-4">
        {/* Poll Meta Header */}
        <div
          className={`p-4 rounded-2xl border text-center relative overflow-hidden ${
            isDarkMode
              ? "bg-[#141620] border-neutral-800 text-white"
              : "bg-white border-neutral-200/90 text-neutral-900 shadow-xs"
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#b51f2a] text-white px-2.5 py-0.5 rounded-full inline-block">
            Group Decision Engine
          </span>
          <h2 className="text-lg font-black mt-2 leading-tight">{poll.title}</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Target: <strong className="text-red-400">{poll.targetDate}</strong> • Total votes:{" "}
            <strong>{poll.totalVotes}</strong>
          </p>

          <p className="text-[11px] text-neutral-400 mt-2 bg-neutral-900/60 py-1 px-3 rounded-lg border border-neutral-800">
            {hasVoted ? "✅ Thanks for voting! Results updated below." : "👉 Tap any card below to cast your vote:"}
          </p>
        </div>

        {/* Voting Options */}
        <div className="space-y-3">
          {poll.options.map((opt) => {
            const percentage = Math.round((opt.votes / totalVotes) * 100);
            const isMyVote = hasVoted === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => handleVote(opt.id)}
                className={`p-4 rounded-2xl border relative overflow-hidden cursor-pointer transition-all active:scale-98 ${
                  isMyVote
                    ? "border-[#b51f2a] ring-2 ring-red-500/40 bg-[#1a1215]"
                    : isDarkMode
                    ? "bg-[#12141c] border-neutral-800 hover:border-neutral-700"
                    : "bg-white border-neutral-200 hover:border-neutral-300 shadow-xs"
                }`}
              >
                {/* Visual Percentage Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#b51f2a]/15 transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md">
                      {opt.category}
                    </span>
                    <span className="text-xs font-black text-red-500">
                      {opt.votes} votes ({percentage}%)
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold mt-1.5 leading-snug">{opt.title}</h3>

                  <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                    <span className="truncate">📍 {opt.venue}</span>
                    <span className="font-semibold text-neutral-300 shrink-0">🕒 {opt.timeStr}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-800/40">
                    <span
                      className={`text-xs font-bold ${
                        isMyVote ? "text-emerald-400" : "text-neutral-400"
                      }`}
                    >
                      {isMyVote ? "✓ Your Vote" : "Tap to Vote"}
                    </span>
                    <span className="text-[11px] text-red-500 font-bold">Vote 🗳️</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Forward Button */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z" />
          </svg>
          <span>Share Poll in Friends WhatsApp Group ↗</span>
        </button>

        {/* Brand Discovery Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-neutral-500">
            Powered by <strong>Kolkata This Weekend</strong>
          </p>
          <Link
            href="/events"
            className="mt-1 text-xs font-bold text-[#b51f2a] hover:underline inline-block"
          >
            Explore all weekend events in Kolkata ➔
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function PollDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading poll...</div>}>
      <PollContent />
    </Suspense>
  );
}
