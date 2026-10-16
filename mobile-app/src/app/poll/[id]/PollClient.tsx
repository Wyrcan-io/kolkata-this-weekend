"use client";

import React, { useState } from "react";
import AppHeader from "../../components/AppHeader";
import { useApp } from "../../context";
import {
  MessageSquare,
  Play,
  Pause,
  CheckCircle2,
  Share2,
  Users,
  Music,
  Palette,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";

export default function PollClient({ pollId }: { pollId: string }) {
  const { polls, votePoll, showToast } = useApp();
  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(40);

  const poll = polls[pollId] || {
    id: pollId,
    title: "Saturday Evening Plan",
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
    showToast("Vote recorded for the crew!");
  };

  const handleShareWhatsApp = () => {
    const pollUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(
      `*Vote on our plan for ${poll.targetDate}!* \n${poll.title}\n\nCast your vote here:\n${pollUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const soundwaveBars = [6, 14, 20, 10, 26, 32, 18, 14, 28, 22, 12, 24, 30, 26, 16, 20, 14, 10];

  return (
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pb-36">
        <AppHeader
          title="kothay jabi? poll"
          subtitle="crew consensus"
          showBackButton={true}
        />

        {/* Chat Bubble / Poll Card styled like Dribbble Left Phone */}
        <div className="bg-[#181a1e] text-white rounded-[28px] p-5 border border-white/10 shadow-lg mt-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#ff8f7d]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#ff6859]">
                  Kolkata Crew Poll
                </span>
                <h2 className="text-[15.5px] font-bold text-white tracking-tight leading-tight">
                  {poll.title}
                </h2>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between py-2 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#ff6859]" />
              <span>{poll.targetDate}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>{poll.totalVotes} votes cast</span>
            </span>
          </div>

          {/* Playable Venue Sound Preview */}
          <div className="bg-[#24282f] border border-white/5 rounded-full px-3.5 py-1.5 flex items-center justify-between gap-3 shadow-inner my-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer flex-shrink-0"
              title={isPlayingAudio ? "Pause Preview" : "Play Venue Sax Preview"}
            >
              {isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-black text-black" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
              )}
            </button>

            {/* Soundwave Bars */}
            <div className="flex items-center gap-[2.5px] h-5 px-1 flex-1">
              {soundwaveBars.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h * 0.75}px` }}
                  className={`w-[2px] rounded-full transition-all ${
                    (i / soundwaveBars.length) * 100 <= audioProgress ? "bg-[#ff7657]" : "bg-white/20"
                  } ${isPlayingAudio ? "animate-waveform-1" : ""}`}
                />
              ))}
            </div>

            <span className="text-[10px] text-neutral-400 font-mono">0:45</span>
          </div>

          {/* Helper Message */}
          <p className="text-[11px] text-neutral-400 py-1 font-medium">
            {hasVoted ? "Thanks for voting! Live crew percentages updated below:" : "Tap any card below to cast your vote:"}
          </p>

          {/* Voting Options */}
          <div className="space-y-2.5 mt-2">
            {poll.options.map((opt, idx) => {
              const percentage = Math.round((opt.votes / totalVotes) * 100);
              const isMyVote = hasVoted === opt.id;
              const Icon = idx === 0 ? Music : Palette;

              return (
                <div
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  className={`p-3.5 rounded-[22px] border relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] ${
                    isMyVote
                      ? "bg-[#ff6859]/20 border-[#ff6859]"
                      : "bg-white/5 hover:bg-white/10 border-white/5"
                  }`}
                >
                  {/* Progress bar background fill */}
                  <div
                    style={{ width: `${percentage}%` }}
                    className="absolute inset-y-0 left-0 bg-white/5 rounded-[22px] pointer-events-none transition-all duration-500"
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMyVote ? "bg-[#ff6859] text-white" : "bg-white/10 text-white"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-white leading-tight">
                          {opt.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10.5px] text-neutral-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#ff8f7d]" />
                            <span>{opt.venue}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{opt.timeStr}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 ml-2">
                      <span className="text-[14px] font-extrabold text-[#ff8f7d] block leading-none">
                        {percentage}%
                      </span>
                      <span className="text-[10px] text-neutral-400 font-semibold">
                        {opt.votes} votes
                      </span>
                    </div>
                  </div>

                  {isMyVote && (
                    <div className="relative z-10 mt-2 flex items-center gap-1 text-[10.5px] font-bold text-[#ff8f7d]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Your vote cast</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Share to WhatsApp Button */}
          <button
            onClick={handleShareWhatsApp}
            className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-[#ff6e5a] to-[#ffa17e] text-white font-bold text-[12.5px] flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Poll to WhatsApp Group</span>
          </button>
        </div>
      </main>
    </div>
  );
}
