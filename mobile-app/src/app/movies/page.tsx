"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, Flame, Users, Sparkles, MapPin, Ticket, Clock, Heart, ChevronRight } from "lucide-react";
import { useApp } from "../context";
import BottomNavbar from "../components/BottomNavbar";
import { asset } from "../../lib/assets";

interface Movie {
  id: string;
  rank: number;
  title: string;
  ageRating: string;
  bookingRate: string;
  cumulativeAudience: string;
  likesCount: string;
  imageSrc: string;
}

const MOVIES: Movie[] = [
  {
    id: "aot",
    rank: 3,
    title: "Attack on Titan: The Final Battle",
    ageRating: "19+",
    bookingRate: "14.2%",
    cumulativeAudience: "920K",
    likesCount: "5.4K",
    imageSrc: "/images/aot.jpg",
  },
  {
    id: "csm",
    rank: 1,
    title: "Chainsaw Man – The Movie: Reze Arc",
    ageRating: "15+",
    bookingRate: "28.4%",
    cumulativeAudience: "1.4M",
    likesCount: "8.1K",
    imageSrc: "/images/csm.jpg",
  },
  {
    id: "ds",
    rank: 2,
    title: "Demon Slayer: Infinity Castle",
    ageRating: "15+",
    bookingRate: "24.1%",
    cumulativeAudience: "1.2M",
    likesCount: "7.9K",
    imageSrc: "/images/demonslayer.jpg",
  },
];

const THEATRES = [
  {
    hall: "INOX South City (IMAX Laser)",
    location: "Prince Anwar Shah Rd • 3.2 km",
    shows: [
      { time: "1:30 PM", status: "Filling" },
      { time: "4:45 PM", status: "Available" },
      { time: "8:00 PM", status: "Fast (94%)" },
      { time: "11:15 PM", status: "Midnight Show" },
    ],
  },
  {
    hall: "INOX Quest Mall (Insignia)",
    location: "Syed Amir Ali Ave • 5.1 km",
    shows: [
      { time: "2:15 PM", status: "Available" },
      { time: "6:30 PM", status: "Fast (88%)" },
      { time: "9:45 PM", status: "Available" },
    ],
  },
  {
    hall: "Priya Cinema",
    location: "Rashbehari Avenue • 4.0 km",
    shows: [
      { time: "3:00 PM", status: "Available" },
      { time: "6:15 PM", status: "Fast (80%)" },
    ],
  },
];

export default function MoviesPage() {
  const { isSaved, toggleSave } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<string>("Movie Chart");

  const activeMovie = MOVIES[currentIdx];

  return (
    <main className="w-full max-w-[440px] mx-auto min-h-screen bg-[#ECEFED] text-[#141519] px-4 pb-36 pt-4 font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between py-2 mb-3">
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
              movies in kolkata
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              south city, quest & priya
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

      {/* Sub Tabs */}
      <section className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {["Movie Chart", "Now Showing", "Coming Soon"].map((tab) => {
            const isActive = activeSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#141519] text-white shadow-sm"
                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] font-bold text-neutral-400">
          Top 3
        </span>
      </section>

      {/* 3D Poster Carousel */}
      <section className="relative w-full h-[380px] flex items-center justify-center overflow-hidden my-2">
        {MOVIES.map((movie, idx) => {
          let posClass = "opacity-0 pointer-events-none scale-75";
          if (idx === currentIdx) {
            posClass = "z-10 translate-x-0 scale-100 shadow-[0_16px_40px_rgba(0,0,0,0.18)]";
          } else if (idx === (currentIdx - 1 + MOVIES.length) % MOVIES.length) {
            posClass = "z-5 -translate-x-36 scale-[0.85] opacity-70 brightness-95";
          } else {
            posClass = "z-5 translate-x-36 scale-[0.85] opacity-70 brightness-95";
          }

          const isLiked = isSaved(movie.id);

          return (
            <div
              key={movie.id}
              className={`absolute w-[240px] h-[350px] rounded-[28px] overflow-hidden transition-all duration-300 ease-out cursor-pointer ${posClass}`}
              onClick={() => setCurrentIdx(idx)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={asset(movie.imageSrc)}
                  alt={movie.title}
                  fill
                  sizes="240px"
                  priority={idx === 1}
                  className="object-cover"
                />

                {/* Rank Badge */}
                <span className="absolute top-3 left-4 text-4xl font-black italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] z-10">
                  #{movie.rank}
                </span>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(movie.id);
                  }}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-20 cursor-pointer transition-transform active:scale-90 ${
                    isLiked
                      ? "bg-gradient-to-tr from-[#FF6E5A] to-[#FFA17E] text-white"
                      : "bg-white/90 backdrop-blur-md text-neutral-800"
                  }`}
                  aria-label="Save Movie"
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.2} />
                </button>

                {/* Bottom title pill on poster */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <span className="text-[10px] font-bold text-[#FFA17E] uppercase tracking-wider block mb-0.5">
                    {movie.ageRating}
                  </span>
                  <h3 className="text-sm font-black leading-tight line-clamp-1">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Movie Meta Information Card */}
      <section className="bg-white rounded-[24px] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 text-center mb-5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-base font-extrabold tracking-tight truncate max-w-[280px] text-[#141519]">
            {activeMovie.title}
          </h2>
          <span className="bg-[#141519] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            {activeMovie.ageRating}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-neutral-500">
          <span className="flex items-center gap-1 text-[#FF6859]">
            <Flame size={14} />
            <span>Rate: {activeMovie.bookingRate}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="flex items-center gap-1">
            <Users size={14} />
            <span>{activeMovie.cumulativeAudience}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="flex items-center gap-1">
            <Sparkles size={14} />
            <span>{activeMovie.likesCount} saves</span>
          </span>
        </div>
      </section>

      {/* Real Kolkata Theatres & Today's Showtimes */}
      <section className="space-y-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black lowercase text-[#141519] flex items-center gap-1.5">
            <Ticket size={16} className="text-[#FF6859]" />
            <span>theatres & today&apos;s showtimes</span>
          </h3>
          <span className="text-[10px] font-bold text-neutral-500">Kolkata South & Central</span>
        </div>

        {THEATRES.map((venue, vIdx) => (
          <div
            key={vIdx}
            className="bg-white rounded-[22px] p-4 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-extrabold text-[#141519] leading-snug">{venue.hall}</h4>
                <p className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                  <MapPin size={11} className="text-neutral-400" />
                  <span>{venue.location}</span>
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                M-Ticket
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {venue.shows.map((show, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => alert(`Selected ${show.time} show at ${venue.hall}`)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    show.status.includes("Fast")
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : show.status.includes("Midnight")
                      ? "border-purple-200 bg-purple-50 text-purple-700"
                      : "border-neutral-200 bg-neutral-50 text-neutral-800"
                  }`}
                >
                  <span>{show.time}</span>
                  <span className="block text-[8.5px] font-medium opacity-75">{show.status}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Book Now Primary Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => alert(`Redirecting to BookMyShow tickets for ${activeMovie.title}!`)}
          className="w-full py-3.5 bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white rounded-2xl font-black text-sm shadow-[0_6px_20px_rgba(255,110,90,0.35)] hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Ticket size={16} />
          <span>Book Tickets via BookMyShow</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
