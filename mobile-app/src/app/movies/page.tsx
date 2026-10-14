"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

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
    ageRating: "19",
    bookingRate: "14.2%",
    cumulativeAudience: "920K",
    likesCount: "5,410",
    imageSrc: "/images/aot.jpg",
  },
  {
    id: "csm",
    rank: 1,
    title: "Chainsaw Man – The Movie: Reze Arc",
    ageRating: "15",
    bookingRate: "28.4%",
    cumulativeAudience: "1.4 million",
    likesCount: "8,123",
    imageSrc: "/images/csm.jpg",
  },
  {
    id: "ds",
    rank: 2,
    title: "Demon Slayer: Infinity Castle",
    ageRating: "15",
    bookingRate: "24.1%",
    cumulativeAudience: "1.2 million",
    likesCount: "7,890",
    imageSrc: "/images/demonslayer.jpg",
  },
];

export default function MoviesPage() {
  const { isDarkMode, isSaved, toggleSave } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<string>("Movie Chart");

  const activeMovie = MOVIES[currentIdx];

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-36 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#0b0c10] text-white" : "bg-white text-gray-900"
      }`}
    >
      <AppHeader title="Movies in Kolkata" subtitle="South City, Mani Square, Quest" />

      {/* Sub Tabs: Movie Chart, Now Showing, Coming Soon */}
      <section className="flex items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-4">
          {["Movie Chart", "Now Showing", "Coming Soon"].map((tab) => {
            const isActive = activeSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`relative pb-2 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? isDarkMode
                      ? "text-white"
                      : "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c6121f] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <button className="text-xs font-semibold text-gray-400 hover:text-[#c6121f] flex items-center gap-1">
          See all &gt;
        </button>
      </section>

      {/* 3D Poster Carousel */}
      <section className="relative w-full h-[410px] flex items-center justify-center overflow-hidden my-2">
        {MOVIES.map((movie, idx) => {
          let posClass = "opacity-0 pointer-events-none scale-75";
          if (idx === currentIdx) {
            posClass = "z-10 translate-x-0 scale-100 shadow-2xl shadow-red-900/30";
          } else if (idx === (currentIdx - 1 + MOVIES.length) % MOVIES.length) {
            posClass = "z-5 -translate-x-40 scale-[0.85] opacity-75 brightness-90";
          } else {
            posClass = "z-5 translate-x-40 scale-[0.85] opacity-75 brightness-90";
          }

          const isLiked = isSaved(movie.id);

          return (
            <div
              key={movie.id}
              className={`absolute w-[250px] h-[375px] rounded-[32px] overflow-hidden transition-all duration-400 ease-out cursor-pointer ${posClass}`}
              onClick={() => setCurrentIdx(idx)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={movie.imageSrc}
                  alt={movie.title}
                  fill
                  sizes="250px"
                  priority={idx === 1}
                  className="object-cover"
                />

                {/* Rank Badge */}
                <span className="absolute top-3.5 left-4.5 text-4xl font-black italic text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] z-10">
                  {movie.rank}
                </span>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(movie.id);
                  }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md z-20 cursor-pointer"
                  aria-label="Save Movie"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "#c6121f" : "none"}
                    stroke={isLiked ? "#c6121f" : "#222"}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Movie Meta Information */}
      <section className="text-center px-4 mt-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className={`text-lg font-bold tracking-tight truncate max-w-[280px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {activeMovie.title}
          </h1>
          <span className="bg-amber-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded">
            {activeMovie.ageRating}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <span>🔥 Booking Rate: {activeMovie.bookingRate}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span>Cumulative: {activeMovie.cumulativeAudience}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span>🍿 {activeMovie.likesCount}</span>
        </div>
      </section>

      {/* Real Kolkata Theatres & Today's Showtimes */}
      <section className="px-5 mt-6 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-neutral-700/20">
          <h3 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
            Theatres & Today&apos;s Showtimes
          </h3>
          <span className="text-[11px] font-bold text-[#c6121f]">South & Central Kolkata</span>
        </div>

        {[
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
        ].map((venue, vIdx) => (
          <div
            key={vIdx}
            className={`p-3.5 rounded-2xl border text-left transition-colors ${
              isDarkMode
                ? "bg-[#12141c] border-neutral-800 text-white"
                : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-bold text-inherit leading-snug">{venue.hall}</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">{venue.location}</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                M-Ticket
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {venue.shows.map((show, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => alert(`Selected ${show.time} show at ${venue.hall}!`)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:border-[#c6121f] hover:text-[#c6121f] cursor-pointer ${
                    show.status.includes("Fast")
                      ? "border-amber-500/60 bg-amber-500/10 text-amber-500"
                      : show.status.includes("Midnight")
                      ? "border-purple-500/60 bg-purple-500/10 text-purple-400"
                      : isDarkMode
                      ? "border-neutral-700 bg-neutral-800/60 text-neutral-200"
                      : "border-neutral-200 bg-neutral-50 text-neutral-800"
                  }`}
                >
                  <span>{show.time}</span>
                  <span className="block text-[8.5px] font-medium opacity-80">{show.status}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Book Now Primary Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => alert(`Redirecting to BookMyShow tickets for ${activeMovie.title}!`)}
          className="w-48 h-12 bg-[#c6121f] text-white rounded-full font-bold text-sm shadow-lg shadow-red-600/30 hover:bg-[#a90d18] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Book Tickets</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </main>
  );
}
