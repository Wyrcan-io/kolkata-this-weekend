"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "../context";

interface TimelineEvent {
  id: string;
  badge: "PREMIUM" | "VIP" | "SPECIAL" | "POPULAR";
  badgeColor: string;
  title: string;
  genre: string;
  time: string;
  dateStr: string;
  venue: string;
  price: string;
  attendeesCount: number;
  interestedCount: number;
  status: "Going NOW" | "Tonight" | "Past" | "Draft";
  imageSrc: string;
  about: string;
  avatars: string[];
}

const EVENTS_DATA: TimelineEvent[] = [
  {
    id: "fuji-rock",
    badge: "PREMIUM",
    badgeColor: "bg-white/20 backdrop-blur-md text-white border border-white/25",
    title: "Fuji Rock Festival 2026",
    genre: "Rock & Electronic",
    time: "19:00 PM",
    dateStr: "Fri 16 Oct 2026, 19:00 PM",
    venue: "Nicco Park Amphitheatre, Kolkata",
    price: "$40 - $70",
    attendeesCount: 45,
    interestedCount: 18,
    status: "Going NOW",
    imageSrc: "/images/concert_rock.jpg",
    about:
      "The premier open-air rock & electronic experience featuring headliners from Tokyo to Kolkata. Immersive soundscapes, laser projections, and food village.",
    avatars: ["/images/avatars/user1.jpg", "/images/avatars/user2.jpg", "/images/avatars/user3.jpg"],
  },
  {
    id: "ultra-music",
    badge: "VIP",
    badgeColor: "bg-[#c6121f] text-white shadow-sm shadow-red-950/50",
    title: "Ultra Music Festival",
    genre: "Electronic music",
    time: "19:00 PM",
    dateStr: "Sat 17 Oct 2026, 19:00 PM",
    venue: "Biswa Bangla Mela Prangan, Kolkata",
    price: "₹1,499 onwards",
    attendeesCount: 12,
    interestedCount: 29,
    status: "Going NOW",
    imageSrc: "/images/concert_ultra.jpg",
    about:
      "Global EDM powerhouse bringing top international DJs, massive LED stage pyrotechnics, and dedicated VIP hospitality lounges.",
    avatars: ["/images/avatars/user2.jpg", "/images/avatars/user3.jpg", "/images/avatars/user4.jpg"],
  },
  {
    id: "summerfest",
    badge: "VIP",
    badgeColor: "bg-[#c6121f] text-white shadow-sm shadow-red-950/50",
    title: "Summerfest Kolkata Live",
    genre: "Electronic music",
    time: "19:00 PM",
    dateStr: "Sun 18 Oct 2026, 19:00 PM",
    venue: "Eco Park Open Grounds, New Town",
    price: "₹899 onwards",
    attendeesCount: 8,
    interestedCount: 15,
    status: "Going NOW",
    imageSrc: "/images/concert_summer.jpg",
    about:
      "The weekend sundowner festival by the lake. Deep house, live acoustic sets, craft brew stalls, and artisan food trucks.",
    avatars: ["/images/avatars/user1.jpg", "/images/avatars/user4.jpg", "/images/avatars/user2.jpg"],
  },
  {
    id: "dandiya-raas",
    badge: "SPECIAL",
    badgeColor: "bg-amber-500 text-white shadow-sm",
    title: "Taaza Dandiya Raas 2026",
    genre: "Folk & Live Dhol",
    time: "18:30 PM",
    dateStr: "Fri 16 Oct onwards, 18:30 PM",
    venue: "Biswa Bangla Convention Grounds",
    price: "₹499 onwards",
    attendeesCount: 61,
    interestedCount: 34,
    status: "Going NOW",
    imageSrc: "/images/dandiya.jpg",
    about:
      "Kolkata's largest Navratri & Durga Puja Dandiya arena with celebrity DJs, authentic Gujarati food, and traditional folk dance circles.",
    avatars: ["/images/avatars/user3.jpg", "/images/avatars/user1.jpg", "/images/avatars/user2.jpg"],
  },
];

export default function RightNowEventsPage() {
  const { isDarkMode, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState<"All" | "Now" | "Past" | "Draft">("All");
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [bookedState, setBookedState] = useState<Record<string, boolean>>({});

  // Filter events according to active tab
  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeTab === "All") return true;
    if (activeTab === "Now") return event.status === "Going NOW";
    if (activeTab === "Past") return event.status === "Past";
    if (activeTab === "Draft") return event.status === "Draft";
    return true;
  });

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-36 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#0b0c10] text-white" : "bg-[#fafafa] text-gray-900"
      }`}
    >
      {/* TOP HEADER BAR (Mockup Header: Menu icon, Bell icon, User avatar with Red dot) */}
      <header className="px-5 pt-4 pb-2 flex items-center justify-between">
        {/* Left: Clear Back Button */}
        <Link
          href="/"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isDarkMode ? "bg-neutral-800/80 hover:bg-neutral-700 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
          }`}
          title="Back to Home"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        {/* Center / Right Icons: Bell & Avatar with Red Status Dot */}
        <div className="flex items-center gap-3">
          {/* Notification Bell linking to /notifications */}
          <Link
            href="/notifications"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Notifications"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </Link>

          {/* User Profile Avatar with Red Badge Dot */}
          <div
            onClick={toggleTheme}
            className="relative cursor-pointer group"
            title="Switch Theme (Dark / Light)"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <Image
                src="/images/avatars/user1.jpg"
                alt="User Profile"
                width={36}
                height={36}
                className="object-cover"
                priority
              />
            </div>
            {/* Red Live/Online Dot on top right */}
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#c6121f] border-2 border-white dark:border-[#0b0c10]" />
          </div>
        </div>
      </header>

      {/* FILTER TABS (All • Now  Past  Draft) */}
      <section className="px-5 pt-3 pb-1">
        <div className="flex items-center gap-5">
          {(["All", "Now", "Past", "Draft"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-1.5 pb-1 font-semibold transition-all cursor-pointer ${
                  isActive
                    ? isDarkMode
                      ? "text-white text-lg font-bold"
                      : "text-gray-950 text-lg font-bold"
                    : isDarkMode
                    ? "text-gray-500 hover:text-gray-300 text-[15px]"
                    : "text-gray-400 hover:text-gray-600 text-[15px]"
                }`}
              >
                <span>{tab}</span>
                {/* Red dot indicator for active tab (as shown in reference image "All •") */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6121f] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* SUBTITLE: Events list */}
      <div className="px-5 pt-3 pb-2">
        <h3
          className={`text-[13px] font-medium tracking-wide ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Events list
        </h3>
      </div>

      {/* TIMELINE & EVENT CARDS LIST */}
      <section className="px-4 py-2 relative">
        {/* Continuous Dashed Vertical Timeline Track */}
        <div
          className={`absolute left-[38px] top-4 bottom-10 w-[1.5px] border-l-[1.5px] border-dashed ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        />

        <div className="space-y-5 relative">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              {/* LEFT TIMELINE COLUMN: Going NOW + Stacked Attendee Avatars + Count */}
              <div className="flex flex-col items-center w-[58px] flex-shrink-0 z-10 pt-1">
                {/* Red 'Going NOW' label */}
                <span className="text-[9px] font-extrabold text-[#c6121f] uppercase tracking-wider text-center leading-tight mb-2">
                  {event.status}
                </span>

                {/* Overlapping Attendee Avatars Stack */}
                <div className="flex flex-col items-center -space-y-2 mb-1.5">
                  {event.avatars.map((av, i) => (
                    <div
                      key={i}
                      className="w-5.5 h-5.5 rounded-full overflow-hidden border-[1.5px] border-white dark:border-[#0b0c10] shadow-sm relative"
                    >
                      <Image
                        src={av}
                        alt="Attendee"
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Attendee Count Indicator */}
                <span
                  className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full text-center ${
                    isDarkMode
                      ? "text-gray-400 bg-gray-900 border border-gray-800"
                      : "text-gray-500 bg-gray-100 border border-gray-200/80"
                  }`}
                >
                  {event.attendeesCount}
                </span>
              </div>

              {/* RIGHT HERO CARD (Full-bleed photographic background with badge, title, and genre/time) */}
              <div
                onClick={() => setSelectedEvent(event)}
                className={`flex-1 h-[152px] rounded-[22px] overflow-hidden relative cursor-pointer group shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.99] border ${
                  isDarkMode ? "border-white/10" : "border-black/5"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={event.imageSrc}
                  alt={event.title}
                  fill
                  sizes="(max-width: 440px) 300px, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Dark Contrast Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                {/* Card Content */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between z-10 text-white">
                  {/* Top Badge (PREMIUM / VIP) */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${event.badgeColor}`}
                    >
                      {event.badge}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Bookmarked ${event.title}!`);
                      }}
                      className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
                      aria-label="Bookmark"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Text: Title and Genre / Time */}
                  <div className="text-left">
                    <h4 className="text-[15.5px] font-bold text-white tracking-tight leading-tight line-clamp-1 drop-shadow-sm">
                      {event.title}
                    </h4>
                    <p className="text-[11.5px] text-gray-200/90 font-medium flex items-center gap-1.5 mt-1">
                      <span>🎵</span>
                      <span>
                        {event.genre} • {event.time}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLOATING ACTION BUTTON (Red '+' FAB in bottom right, exactly matching mockup) */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-5 z-40 w-13 h-13 rounded-full bg-gradient-to-tr from-[#c6121f] to-[#ff4757] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(198,18,31,0.5)] ring-4 ring-red-500/20 active:scale-95 hover:scale-105 transition-all cursor-pointer"
        aria-label="Create Event or Filter"
        title="Host or Submit an Event"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* EVENT DETAIL MODAL (Matching Screen 2 in the mockup: Boomtown Fair Details) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-page-enter">
          <div
            className={`w-full max-w-[440px] max-h-[90vh] rounded-t-[32px] p-5 overflow-y-auto pb-10 shadow-2xl transition-all ${
              isDarkMode ? "bg-[#141620] text-white" : "bg-white text-gray-900"
            }`}
          >
            {/* Header: Back / Close button & location */}
            <div className="flex items-center justify-between pb-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode ? "bg-white/10 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                ✕
              </button>
              <div className="text-center">
                <span className="text-[11px] text-gray-400 font-semibold block">
                  📍 {selectedEvent.venue.split(",")[0]}
                </span>
                <h3 className="text-base font-bold text-inherit leading-tight">
                  {selectedEvent.title}
                </h3>
              </div>
              <div className="w-9 h-9" />
            </div>

            {/* Hero Card inside Modal */}
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-lg mt-2">
              <Image
                src={selectedEvent.imageSrc}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {selectedEvent.badge}
                  </span>
                  <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded">
                    {selectedEvent.price}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-black text-white">{selectedEvent.title}</h2>
                  <p className="text-xs text-gray-200 mt-0.5">
                    🎵 {selectedEvent.genre} • {selectedEvent.time}
                  </p>
                  <p className="text-[11px] text-red-300 font-semibold mt-1">
                    👥 {selectedEvent.attendeesCount} going • {selectedEvent.interestedCount} interested
                  </p>
                </div>
              </div>
            </div>

            {/* "Get your ticket [Book]" action row */}
            <div
              className={`flex items-center justify-between p-3.5 rounded-2xl mt-4 border ${
                isDarkMode ? "bg-[#181a26] border-gray-800" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div>
                <h4 className="text-sm font-bold text-inherit">Get your ticket</h4>
                <p className="text-xs text-gray-400">
                  {selectedEvent.attendeesCount} going • {selectedEvent.interestedCount} interested
                </p>
              </div>

              <button
                onClick={() =>
                  setBookedState((prev) => ({
                    ...prev,
                    [selectedEvent.id]: !prev[selectedEvent.id],
                  }))
                }
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  bookedState[selectedEvent.id]
                    ? "bg-green-600 text-white"
                    : "bg-[#0b0c10] text-white hover:bg-black dark:bg-[#c6121f]"
                }`}
              >
                {bookedState[selectedEvent.id] ? "Booked ✓" : "Book"}
              </button>
            </div>

            {/* Date & Time */}
            <div className="mt-4 flex items-start gap-3">
              <span className="text-xl">📅</span>
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase">Date & Time</h5>
                <p className="text-sm font-semibold mt-0.5 text-inherit">
                  {selectedEvent.dateStr}
                </p>
              </div>
            </div>

            {/* About */}
            <div className="mt-4 flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase">About</h5>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                  {selectedEvent.about}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 w-full py-3 bg-[#c6121f] text-white rounded-full font-bold text-xs tracking-wider uppercase hover:bg-red-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL (When FAB is pressed) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-page-enter">
          <div
            className={`w-full max-w-[380px] rounded-3xl p-5 shadow-2xl border ${
              isDarkMode ? "bg-[#141620] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-base font-bold text-inherit">Submit Pandal / Live Gig</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-red-500 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Host an event or list your Durga Puja pandal carnival on Kolkata This Weekend.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Event submitted for Kolkata This Weekend curation review.");
                setShowCreateModal(false);
              }}
              className="space-y-3 mt-4"
            >
              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  Event / Pandal Title
                </label>
                <input
                  required
                  placeholder="e.g. South Kolkata Live Sundowner"
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDarkMode ? "bg-[#1c1f2e] border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  Venue / Location
                </label>
                <input
                  required
                  placeholder="e.g. Biswa Bangla Mela Prangan"
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDarkMode ? "bg-[#1c1f2e] border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  Date & Time
                </label>
                <input
                  required
                  placeholder="e.g. This Saturday • 7:00 PM"
                  className={`w-full px-3 py-2 text-xs rounded-xl border outline-none ${
                    isDarkMode ? "bg-[#1c1f2e] border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#c6121f] text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors"
              >
                Publish to Right Now Feed 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
