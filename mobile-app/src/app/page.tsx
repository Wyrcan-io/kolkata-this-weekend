"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppHeader from "./components/AppHeader";
import HeroCarousel from "./components/HeroCarousel";
import QuickCategoryRail from "./components/QuickCategoryRail";
import { useApp } from "./context";

// Spotlight Carousel Items with Real Photography & Authentic Editorial Copy
const SPOTLIGHT_ITEMS = [
  {
    id: "csm-imax",
    badge: "Now in Theatres",
    badgeColor: "bg-[#c6121f] text-white",
    title: "Chainsaw Man: Reze Arc (IMAX)",
    desc: "MAPPA's explosive theatrical premiere • INOX Quest & South City Cinema • 88% booked",
    imageSrc: "/images/csm.jpg",
    meta: "⭐ 9.2/10 • 1h 44m • IMAX 3D",
    actionLink: "/movies",
  },
  {
    id: "taaza-dandiya",
    badge: "Tonight's Headliner",
    badgeColor: "bg-amber-600 text-white",
    title: "Taaza Dandiya Raas 2026",
    desc: "Biswa Bangla Mela Prangan • Live folk orchestra, celebrity DJs & street food pavilion",
    imageSrc: "/images/dandiya.jpg",
    meta: "Tonight 7:00 PM • From ₹499 • Selling Fast",
    actionLink: "/events",
  },
  {
    id: "music-fest",
    badge: "Live Concert",
    badgeColor: "bg-purple-600 text-white",
    title: "Kolkata Music Festival Live",
    desc: "Nicco Park Amphitheatre • DJ Arjun Vibes with high-energy EDM & synchronized lasers",
    imageSrc: "/images/musicfest.jpg",
    meta: "Saturday 6:00 PM • Nicco Park • ₹799+",
    actionLink: "/events",
  },
  {
    id: "aot-finale",
    badge: "Exclusive Screening",
    badgeColor: "bg-zinc-800 text-white",
    title: "Attack on Titan: The Final Chapter",
    desc: "The monumental saga finale digitally remastered for immersive big-screen sound",
    imageSrc: "/images/aot.jpg",
    meta: "Priya Cinema & INOX • Special Shows",
    actionLink: "/movies",
  },
];

// Continue items with Real Photographic Thumbnails
const CONTINUE_ITEMS = [
  {
    id: "dandiya",
    title: "Taaza Dandiya Raas",
    subtitle: "Biswa Bangla Mela • 7 PM",
    imageSrc: "/images/dandiya.jpg",
    tag: "Trending",
  },
  {
    id: "csm",
    title: "Chainsaw Man IMAX",
    subtitle: "South City INOX • 10:45 PM",
    imageSrc: "/images/csm.jpg",
    tag: "84% Full",
  },
  {
    id: "orkos",
    title: "Durgotsav at Orkos",
    subtitle: "City Centre 1 Salt Lake",
    imageSrc: "/images/durgotsav-orkos.png",
    tag: "Promoted",
  },
  {
    id: "musicfest",
    title: "Kolkata Music Fest",
    subtitle: "Nicco Park Amphitheatre",
    imageSrc: "/images/musicfest.jpg",
    tag: "Sat 6 PM",
  },
];

export default function DistrictHomePage() {
  const { isDarkMode, isSaved, toggleSave } = useApp();
  const [spotlightIdx, setSpotlightIdx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("food-offers");

  const activeSpotlight = SPOTLIGHT_ITEMS[spotlightIdx];

  return (
    <main
      className={`w-full sm:max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode
          ? "bg-[#090a0f] text-white sm:shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          : "bg-[#fbfbfb] text-neutral-900 sm:shadow-2xl"
      }`}
    >
      {/* Full-Bleed 4:3 Hero Section touching all borders of the phone */}
      <section className="relative w-full aspect-[4/3] overflow-hidden m-0 p-0 border-none select-none">
        <Image
          src="/images/kolkata-hero-4-3.jpg"
          alt="Kolkata This Weekend"
          fill
          sizes="(max-width: 640px) 100vw, 440px"
          className="object-cover"
          priority
        />

        {/* Transparent Navigation Header placed directly on top of hero image */}
        <AppHeader />
      </section>

      {/* Quick Category Rail: Explore, Food Offers, Upcoming Events, Trending Movies */}
      <QuickCategoryRail
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          if (catId === "upcoming-events") setSpotlightIdx(1);
          else if (catId === "trending-movies") setSpotlightIdx(0);
          else if (catId === "food-offers") setSpotlightIdx(2);
          else if (catId === "explore") setSpotlightIdx(3);
        }}
      />

      {/* In the Spotlight Section with generous breathing room */}
      <section className="pt-7 pb-6 overflow-hidden">
        <div className="px-5 pb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#c6121f]">
              Handpicked
            </span>
            <h2 className={`text-[19px] font-extrabold tracking-tight mt-0.5 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              In the Spotlight
            </h2>
          </div>
          <Link href="/events" className="text-xs font-bold text-[#c6121f] no-underline hover:underline flex items-center gap-0.5">
            View All <span>&gt;</span>
          </Link>
        </div>

        {/* Spotlight Carousel with Compact Proportioned Cards */}
        <div className="relative w-full h-[320px] flex items-center justify-center">
          {SPOTLIGHT_ITEMS.map((item, idx) => {
            let transformClass = "";
            if (idx === spotlightIdx) {
              transformClass = "z-10 translate-x-0 scale-100 shadow-2xl shadow-red-950/40";
            } else if (idx === (spotlightIdx - 1 + SPOTLIGHT_ITEMS.length) % SPOTLIGHT_ITEMS.length) {
              transformClass = "z-5 -translate-x-38 scale-[0.86] opacity-60 brightness-75";
            } else {
              transformClass = "z-5 translate-x-38 scale-[0.86] opacity-60 brightness-75";
            }

            return (
              <div
                key={item.id}
                className={`absolute w-[220px] h-[305px] rounded-[22px] overflow-hidden transition-all duration-400 ease-out cursor-pointer flex flex-col justify-between p-4 group ${transformClass} border ${
                  isDarkMode ? "border-white/10" : "border-black/10"
                }`}
                onClick={() => setSpotlightIdx(idx)}
              >
                {/* Poster Photo */}
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="230px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  priority={idx === spotlightIdx}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

                {/* Top Badge & Bookmark */}
                <div className="flex items-center justify-between z-10">
                  <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(item.id);
                    }}
                    className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={isSaved(item.id) ? "#c6121f" : "none"}
                      stroke={isSaved(item.id) ? "#c6121f" : "currentColor"}
                      strokeWidth="2"
                    >
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                  </button>
                </div>

                {/* Bottom Meta */}
                <div className="relative z-10 text-left">
                  <span className="text-[10px] font-bold text-red-300 block mb-0.5">
                    {item.meta}
                  </span>
                  <h3 className="text-[15px] font-extrabold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Title and Description */}
        <div className="mt-3.5 text-center px-6">
          <h3 className={`text-[15px] font-bold mb-0.5 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
            {activeSpotlight.title}
          </h3>
          <p className="text-[12px] text-neutral-400 leading-relaxed max-w-[310px] mx-auto">
            {activeSpotlight.desc}
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {SPOTLIGHT_ITEMS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                  i === spotlightIdx
                    ? "w-6 bg-[#c6121f]"
                    : isDarkMode
                    ? "w-1.5 bg-neutral-800"
                    : "w-1.5 bg-neutral-300"
                }`}
                onClick={() => setSpotlightIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curated 72-Hour Weekend Circuit (Replacing tacky AI buzzwords) */}
      <section className="px-5 py-2">
        <Link href="/planner" className="no-underline">
          <div
            className={`rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01] border ${
              isDarkMode
                ? "bg-gradient-to-r from-[#141622] via-[#1a1215] to-[#141622] border-neutral-800 text-white shadow-lg"
                : "bg-white border-neutral-200/90 text-neutral-900 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-black uppercase tracking-wider text-[#c6121f] bg-red-600/10 px-2 py-0.5 rounded-full">
                  Weekend Circuit
                </span>
                <h3 className="text-[16px] font-black mt-1.5 leading-tight">
                  The 72-Hour Kolkata Itinerary
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Handcrafted 3-stop neighborhood routes tailored for your Saturday & Sunday
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#c6121f] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Featured Section: Your Weekend Spot */}
      <section className="py-3">
        <div className="px-5 pb-2.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#c6121f]">
              Cafes & Heritage
            </span>
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              Your Weekend Spot
            </h2>
          </div>
          <Link href="/spots" className="text-xs font-bold text-[#c6121f] hover:underline no-underline">
            Explore All &gt;
          </Link>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto scroll-smooth pb-2 scrollbar-none">
          {[
            {
              id: "sienna",
              name: "Sienna Cafe & Pottery Studio",
              area: "Hindustan Park",
              imageSrc: "/images/concert_rock.jpg",
              tag: "Artisan Cafe",
            },
            {
              id: "peter-cat",
              name: "Peter Cat (Chelo Kebab)",
              area: "Park Street",
              imageSrc: "/images/dandiya.jpg",
              tag: "Heritage Dining",
            },
            {
              id: "princep",
              name: "Princep Ghat Riverfront",
              area: "Strand Road",
              imageSrc: "/images/durgapuja-river-full.png",
              tag: "Sunset Spot",
            },
          ].map((spot) => (
            <Link key={spot.id} href="/spots" className="no-underline flex-none w-[175px] group">
              <div className="relative w-[175px] h-[115px] rounded-2xl overflow-hidden border border-neutral-700/20 group-hover:scale-102 transition-transform">
                <Image src={spot.imageSrc} alt={spot.name} fill sizes="175px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-white/20">
                  {spot.tag}
                </span>
                <div className="absolute bottom-2 inset-x-2.5 text-white">
                  <h4 className="text-[12.5px] font-bold truncate leading-tight">{spot.name}</h4>
                  <p className="text-[10px] text-neutral-300 truncate">📍 {spot.area}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Continue where you left off (Real Photographic Thumbnails) */}
      <section className="py-3">
        <div className="px-5 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#c6121f]">
              Saved & Recent
            </span>
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              Continue where you left off
            </h2>
          </div>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto scroll-smooth pb-2 scrollbar-none">
          {CONTINUE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`flex-none w-[205px] rounded-2xl p-2.5 flex items-center gap-3 transition-colors border ${
                isDarkMode
                  ? "bg-[#12141c] border-neutral-800/80 shadow-md shadow-black/40"
                  : "bg-white border-neutral-200/70 shadow-xs"
              }`}
            >
              {/* Photo Thumbnail */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-700/30">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] font-black text-[#c6121f] uppercase tracking-wider">
                  {item.tag}
                </span>
                <span className={`text-[12.5px] font-bold truncate mt-0.5 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                  {item.title}
                </span>
                <span className="text-[11px] text-neutral-400 truncate">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekend Live Alerts (Authentic Kolkata Civic & Event Updates) */}
      <section className="py-3 px-5">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              Weekend Live Dispatch
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#c6121f]">Updated 4m ago</span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: "al1",
              tag: "SOUTH KOLKATA TRAFFIC",
              title: "Rashbehari Avenue to Gariahat Diversion Active",
              desc: "One-way grid in effect past 5:00 PM for Tridhara & Singhi Park pandal transit.",
              badge: "Civic Notice",
              link: "/events",
            },
            {
              id: "al2",
              tag: "MIDNIGHT SCREENING",
              title: "Chainsaw Man 11:55 PM Show Added at INOX Quest",
              desc: "Hall 3 opened following instant sellout across all weekend evening slots.",
              badge: "New Tickets",
              link: "/movies",
            },
            {
              id: "al3",
              tag: "VIP ALL-ACCESS",
              title: "Ekdalia & Baghbazar Priority Slots Filling Fast",
              desc: "Over 82% digital queue passes reserved for Saptami & Ashtami evenings.",
              badge: "14 Passes Left",
              link: "/vip-pass",
            },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`p-3.5 rounded-2xl border flex items-center justify-between no-underline transition-all hover:scale-[1.01] ${
                isDarkMode
                  ? "bg-[#12141c] border-neutral-800/80 hover:border-[#c6121f]/60 text-white"
                  : "bg-white border-neutral-200/80 hover:border-red-300 text-neutral-900 shadow-xs"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] font-black uppercase text-[#c6121f] tracking-wider">
                    {item.tag}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    isDarkMode ? "bg-red-950/60 text-red-300" : "bg-red-50 text-red-600"
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-[13.5px] font-bold text-inherit mt-1 leading-snug">{item.title}</h4>
                <p className="text-[11.5px] text-neutral-400 leading-snug">{item.desc}</p>
              </div>

              <span className="text-sm font-bold text-neutral-400 ml-3">&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Durga Puja on BookMyShow (Events & Pandals Carousel) */}
      <section className="py-4">
        {/* Section Header */}
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#c6121f]">
                Official Partner
              </span>
              <h2 className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Durga Puja on BookMyShow
              </h2>
            </div>
            <Link
              href="/events"
              className="text-xs font-bold text-[#c6121f] hover:underline flex items-center gap-0.5 no-underline"
            >
              See All &gt;
            </Link>
          </div>
          <p className="text-xs font-medium text-blue-500 mt-0.5">
            With 20+ exciting bank offers & instant digital e-passes
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="flex gap-3 px-5 overflow-x-auto scroll-smooth pb-3 scrollbar-none">
          {/* Card 1: Pujor Passport */}
          <div className="flex-none w-[145px] cursor-pointer group">
            <div className="relative w-[145px] h-[208px] rounded-2xl overflow-hidden shadow-md border border-neutral-700/20 group-hover:scale-[1.02] transition-transform">
              <Image
                src="/images/pujor-passport.png"
                alt="Pujor Passport"
                fill
                sizes="145px"
                className="object-cover"
                priority
              />
              <span className="absolute top-2 right-2 bg-red-600/90 text-white text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-sm">
                PROMOTED
              </span>
            </div>

            <div className="mt-2 text-left">
              <span className="text-[10.5px] font-medium text-neutral-400 block">
                Thu, 15 Oct onwards
              </span>
              <h4 className={`text-[13px] font-bold leading-tight mt-0.5 truncate ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Pujor Passport
              </h4>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                Multiple Venues: Kolkata
              </p>
            </div>
          </div>

          {/* Card 2: Durgotsav at Orkos City Center 1 Saltlake */}
          <div className="flex-none w-[145px] cursor-pointer group">
            <div className="relative w-[145px] h-[208px] rounded-2xl overflow-hidden shadow-md border border-neutral-700/20 group-hover:scale-[1.02] transition-transform">
              <Image
                src="/images/durgotsav-orkos.png"
                alt="Durgotsav at Orkos"
                fill
                sizes="145px"
                className="object-cover"
              />
              <span className="absolute top-2 right-2 bg-red-600/90 text-white text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-sm">
                PROMOTED
              </span>
            </div>

            <div className="mt-2 text-left">
              <span className="text-[10.5px] font-medium text-neutral-400 block">
                Thu, 15 Oct onwards
              </span>
              <h4 className={`text-[13px] font-bold leading-tight mt-0.5 truncate ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Durgotsav at Orkos
              </h4>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                City Centre 1: Salt Lake
              </p>
            </div>
          </div>

          {/* Card 3: Durgapuja Evening River Cruise */}
          <div className="flex-none w-[145px] cursor-pointer group">
            <div className="relative w-[145px] h-[208px] rounded-2xl overflow-hidden shadow-md border border-neutral-700/20 group-hover:scale-[1.02] transition-transform">
              <Image
                src="/images/durgapuja-river-full.png"
                alt="Durgapuja Evening River Cruise"
                fill
                sizes="145px"
                className="object-cover"
              />
            </div>

            <div className="mt-2 text-left">
              <span className="text-[10.5px] font-medium text-neutral-400 block">
                Wed, 21 Oct onwards
              </span>
              <h4 className={`text-[13px] font-bold leading-tight mt-0.5 truncate ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Durgapuja River Cruise
              </h4>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                Millennium Park Jetty
              </p>
            </div>
          </div>

          {/* Card 4: Taaza Dandiya Raas */}
          <div className="flex-none w-[145px] cursor-pointer group">
            <div className="relative w-[145px] h-[208px] rounded-2xl overflow-hidden shadow-md border border-neutral-700/20 group-hover:scale-[1.02] transition-transform">
              <Image
                src="/images/dandiya.jpg"
                alt="Taaza Dandiya Raas"
                fill
                sizes="145px"
                className="object-cover"
              />
            </div>

            <div className="mt-2 text-left">
              <span className="text-[10.5px] font-medium text-neutral-400 block">
                Tonight • 7:00 PM
              </span>
              <h4 className={`text-[13px] font-bold leading-tight mt-0.5 truncate ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Taaza Dandiya Raas
              </h4>
              <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                Biswa Bangla Mela Prangan
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
