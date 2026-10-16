"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "./context";
import {
  MapPin,
  Bell,
  Sparkles,
  Music,
  Palette,
  Coffee,
  Film,
  Ticket,
  Share2,
  Heart,
  X,
  Star,
  Play,
  Pause,
  MessageSquare,
  ArrowRight,
  Clock,
  Radio,
} from "lucide-react";

// Curated Hero Spotlight Cards matching Dribbble Deck Aesthetic
const SPOTLIGHT_HEROES = [
  {
    id: "skinny-mos-jazz",
    title: "Chasing sunsets & rooftop jazz at Southern Ave",
    venue: "Skinny Mo's Jazz Club",
    neighborhood: "Southern Avenue",
    category: "Live Music",
    price: "₹499 (Drink incl.)",
    image: "/images/friendly/hero-chasing-sunsets.jpg",
    tags: ["CraftBeer", "Rooftop", "BebopJazz", "Cocktails"],
    time: "Saturday 7:30 PM",
    attendees: 38,
    outboundUrl: "https://instagram.com/skinnymosjazz",
  },
  {
    id: "taaza-dandiya",
    title: "Taaza Dandiya Raas: Folk orchestra & EDM headliner",
    venue: "Biswa Bangla Mela Prangan",
    neighborhood: "EM Bypass",
    category: "Headliner Gig",
    price: "₹499+ entry",
    image: "/images/dandiya.jpg",
    tags: ["LiveFolk", "CelebrityDJs", "StreetFood", "Trending"],
    time: "Tonight 7:00 PM",
    attendees: 120,
    outboundUrl: "https://instagram.com/taazadandiya",
  },
  {
    id: "sienna-pottery",
    title: "Terracotta wheel throwing & glaze masterclass",
    venue: "Sienna Store & Cafe",
    neighborhood: "Hindustan Park",
    category: "Workshop",
    price: "₹850 (All clay incl.)",
    image: "/images/friendly/chat-friends-drinks.jpg",
    tags: ["Pottery", "PourOverCoffee", "Courtyard", "PetFriendly"],
    time: "Saturday 3:30 PM",
    attendees: 16,
    outboundUrl: "https://forms.google.com/sample-sienna",
  },
  {
    id: "csm-imax",
    title: "Chainsaw Man: Reze Arc IMAX 3D Premiere",
    venue: "INOX Quest Mall & South City",
    neighborhood: "Park Circus",
    category: "IMAX Cinema",
    price: "From ₹380",
    image: "/images/csm.jpg",
    tags: ["IMAX3D", "AnimePremiere", "88%Booked", "LateNight"],
    time: "Daily 10:45 PM",
    attendees: 84,
    outboundUrl: "https://in.bookmyshow.com",
  },
  {
    id: "heritage-walk",
    title: "College street tram & vintage cafe photowalk",
    venue: "Indian Coffee House & Tram Depot",
    neighborhood: "College Street",
    category: "Heritage Walk",
    price: "Free Entry",
    image: "/images/friendly/chat-friends-sun.jpg",
    tags: ["35mmFilm", "StreetChai", "OldKolkata", "TramRide"],
    time: "Sunday 7:00 AM",
    attendees: 29,
    outboundUrl: "https://instagram.com/calcuttaheritagewalks",
  },
];

export default function MobileAppHomePage() {
  const { isSaved, toggleSave, location, showToast } = useApp();

  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [pollVotes, setPollVotes] = useState({ opt1: 6, opt2: 3 });
  const [hasVoted, setHasVoted] = useState<string | null>(null);

  const hero = SPOTLIGHT_HEROES[heroIdx];
  const nextHero = SPOTLIGHT_HEROES[(heroIdx + 1) % SPOTLIGHT_HEROES.length];

  const handleNextHero = () => {
    setHeroIdx((prev) => (prev + 1) % SPOTLIGHT_HEROES.length);
  };

  const handleLikeHero = (e: React.MouseEvent) => {
    toggleSave(hero.id);
    showToast(`Saved "${hero.title.slice(0, 24)}..." to your weekend!`);

    // Floating heart particle animation
    const newHeart = { id: Date.now(), x: (Math.random() - 0.5) * 36 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  const handleShareHero = () => {
    const text = encodeURIComponent(
      `Check out "${hero.title}" at ${hero.venue} this weekend! Discovered on Kolkata This Weekend: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCastVote = (opt: "opt1" | "opt2") => {
    if (hasVoted) return;
    setHasVoted(opt);
    setPollVotes((prev) => ({
      ...prev,
      [opt]: prev[opt] + 1,
    }));
    showToast("Vote recorded for Saturday crew plan!");
  };

  const categoryPills = [
    { id: "all", label: "All Drops", icon: Sparkles },
    { id: "music", label: "Live Music", icon: Music },
    { id: "workshops", label: "Workshops", icon: Palette },
    { id: "cafes", label: "Heritage Cafes", icon: Coffee },
    { id: "movies", label: "IMAX Movies", icon: Film },
    { id: "passes", label: "Puja Passes", icon: Ticket },
  ];

  const soundwaveBars = [6, 14, 20, 10, 26, 32, 18, 14, 28, 22, 12, 24, 30, 26, 16, 20, 14, 10];

  return (
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Centered Mobile App Container */}
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pt-3 pb-36">
        
        {/* TOP HEADER: Location Selector | kolkata this weekend | Notification Bell with Badge 2 */}
        <header className="flex items-center justify-between py-2 border-b border-black/5">
          {/* Location Area Selector */}
          <Link
            href="/location"
            className="flex items-center gap-1.5 text-[#1a1d20] hover:opacity-75 transition cursor-pointer no-underline min-w-0"
            title="Change neighborhood in Kolkata"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-xs flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#ff6859]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-bold text-[#1a1d20] leading-none truncate">
                {location.area}
              </span>
              <span className="text-[10px] text-[#717882] font-semibold leading-tight truncate">
                {location.subArea}
              </span>
            </div>
          </Link>

          {/* Clean lowercase wordmark matching Dribbble reference */}
          <h1 className="text-[18px] font-bold tracking-tight text-[#1a1d20] lowercase flex-shrink-0">
            kolkata this weekend
          </h1>

          {/* Notification Bell with Badge 2 */}
          <Link
            href="/notifications"
            className="relative w-8 h-8 flex items-center justify-center text-[#1a1d20] hover:opacity-75 transition no-underline flex-shrink-0"
            title="Weekend alerts & passes"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-[#1a1d20]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f6804a] text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs">
              2
            </span>
          </Link>
        </header>

        {/* CURATION & ATTENDEE STRIP */}
        <section className="flex items-center justify-between py-2.5">
          {/* Avatar Stack of Crew Members */}
          <div className="flex items-center -space-x-2">
            {["/images/friendly/room-user-amber.jpg", "/images/friendly/room-user-yellow.jpg", "/images/friendly/room-user-blonde.jpg"].map((src, i) => (
              <div
                key={i}
                className="relative w-7 h-7 rounded-full overflow-hidden border-[2px] border-[#ecefed] shadow-xs"
              >
                <Image
                  src={src}
                  alt="Crew"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="relative w-7 h-7 rounded-full bg-[#dbe1de] border-[2px] border-[#ecefed] text-[#1a1d20] text-[10px] font-bold flex items-center justify-center shadow-xs">
              +{hero.attendees}
            </div>
          </div>

          {/* Live Weekend Status */}
          <div className="text-right">
            <div className="text-[12.5px] font-bold text-[#1a1d20] leading-tight flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>{hero.time}</span>
            </div>
            <div className="text-[10.5px] text-[#717882] font-semibold">
              {hero.neighborhood} • Verified Drop
            </div>
          </div>
        </section>

        {/* QUICK CATEGORY PILLS (Frosted Capsule Aesthetics with Lucide Icons) */}
        <section className="py-1.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 -mx-1 px-1">
          {categoryPills.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? "bg-[#181a1e] text-white shadow-sm"
                    : "bg-white/80 text-[#555d66] hover:bg-white border border-black/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${selectedFilter === cat.id ? "text-white" : "text-[#717882]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </section>

        {/* THE SHOWSTOPPER HERO EXPERIENCE CARD (Dribbble Deck Centerpiece) */}
        <section className="pt-2">
          <div className="relative w-full aspect-[3.7/4.6] max-h-[430px] rounded-[30px] overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.22)] flex flex-col justify-between p-4 sm:p-5 group">
            {/* Cover Photography */}
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 440px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            />

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75 pointer-events-none" />

            {/* Top Text Content Overlay */}
            <div className="relative z-10 pt-1">
              <span className="inline-block bg-[#f6804a] text-white text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 shadow-xs">
                {hero.category}
              </span>

              <h2 className="text-white text-[25px] sm:text-[28px] font-bold leading-[1.12] tracking-tight drop-shadow-md max-w-[290px]">
                {hero.title}
              </h2>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-black/40 backdrop-blur-md text-white/95 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/80" />
                  <span>{hero.venue}</span>
                </span>
                <span className="bg-black/40 backdrop-blur-md text-white/95 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
                  <Ticket className="w-3 h-3 text-white/80" />
                  <span>{hero.price}</span>
                </span>
                {hero.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-black/35 backdrop-blur-md text-white/90 text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating Action Dock inside card at bottom */}
            <div className="relative z-10 self-center w-full max-w-[280px] bg-[#1a1c20]/95 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center justify-between shadow-2xl">
              {/* Skip / Next */}
              <button
                onClick={handleNextHero}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition cursor-pointer"
                title="Pass to next drop"
                aria-label="Next event"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Star / Save to Shortlist */}
              <button
                onClick={() => {
                  toggleSave(hero.id);
                  showToast(isSaved(hero.id) ? "Removed from saved" : "Saved to your weekend!");
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-90 cursor-pointer ${
                  isSaved(hero.id)
                    ? "text-amber-400 bg-amber-400/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title="Save event to shortlist"
                aria-label="Save"
              >
                <Star className={`w-4 h-4 ${isSaved(hero.id) ? "fill-amber-400 text-amber-400" : "text-white"}`} />
              </button>

              {/* Share to WhatsApp */}
              <button
                onClick={handleShareHero}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition cursor-pointer"
                title="Share with crew on WhatsApp"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>

              {/* Glowing Sunset Gradient Heart Like Button */}
              <div className="relative">
                {floatingHearts.map((h) => (
                  <span
                    key={h.id}
                    style={{ left: `calc(50% + ${h.x}px)` }}
                    className="absolute -top-3 pointer-events-none animate-float-heart"
                  >
                    <Heart className="w-5 h-5 fill-[#ff6859] text-[#ff6859]" />
                  </span>
                ))}

                <button
                  onClick={handleLikeHero}
                  className="relative px-4 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#ff6e5a] via-[#ff8863] to-[#ffa17e] shadow-[0_4px_18px_rgba(255,118,87,0.55)] hover:brightness-110 active:scale-95"
                  title="Like event"
                  aria-label="Like"
                >
                  <Heart className="w-4 h-4 fill-white text-white drop-shadow-xs" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT DROP TEASER BAR */}
        <section className="mt-2.5">
          <div
            onClick={handleNextHero}
            className="bg-white/70 hover:bg-white/95 rounded-[22px] px-3.5 py-2.5 flex items-center justify-between border border-white/70 shadow-xs cursor-pointer transition-all active:scale-[0.99]"
            title="Tap to skip to next drop"
          >
            <div className="flex items-center -space-x-2">
              {["/images/friendly/room-user-locs.jpg", "/images/friendly/room-user-wavy.jpg", "/images/friendly/room-user-curls.jpg"].map((src, i) => (
                <div
                  key={i}
                  className="relative w-6 h-6 rounded-full overflow-hidden border-[2px] border-white shadow-xs"
                >
                  <Image
                    src={src}
                    alt="Member"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="relative w-6 h-6 rounded-full bg-[#dbe1de] border-[2px] border-white text-[#1a1d20] text-[9.5px] font-bold flex items-center justify-center">
                +14
              </div>
            </div>

            <div className="text-right">
              <div className="text-[12px] font-bold text-[#1a1d20] leading-tight flex items-center justify-end gap-1">
                <span>Next: {nextHero.title.slice(0, 24)}...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6804a]" />
              </div>
              <div className="text-[10px] text-[#717882] font-semibold">
                {nextHero.venue} • {nextHero.neighborhood}
              </div>
            </div>
          </div>
        </section>

        {/* "KOTHAY JABI?" WHATSAPP CREW POLL (Dribbble Chat & Audio Card Style) */}
        <section className="mt-5">
          <div className="bg-[#181a1e] text-white rounded-[26px] p-4 border border-white/10 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#ff6859]" />
                </div>
                <div>
                  <h3 className="text-[13.5px] font-bold text-white tracking-tight">
                    Kothay Jabi? Saturday Crew Poll
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    14 WhatsApp groups in Kolkata active now
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            </div>

            {/* Playable Venue Sound Snippet */}
            <div className="mt-3 bg-[#24282f] border border-white/5 rounded-full px-3 py-1.5 flex items-center justify-between gap-3 shadow-inner">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition cursor-pointer flex-shrink-0"
                title={isPlayingAudio ? "Pause Audio Note" : "Play Venue Sax Preview"}
              >
                {isPlayingAudio ? (
                  <Pause className="w-3.5 h-3.5 fill-black text-black" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                )}
              </button>

              {/* Animated Soundwave */}
              <div className="flex items-center gap-[2.5px] h-5 px-1 flex-1">
                {soundwaveBars.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h * 0.75}px` }}
                    className={`w-[2px] rounded-full transition-all ${
                      (i / soundwaveBars.length) * 100 <= audioProgress ? "bg-[#ff7657]" : "bg-white/25"
                    } ${isPlayingAudio ? "animate-waveform-1" : ""}`}
                  />
                ))}
              </div>

              <span className="text-[10px] text-neutral-400 font-mono">0:45</span>
            </div>

            {/* Interactive Poll Options */}
            <div className="mt-3 space-y-2">
              <button
                onClick={() => handleCastVote("opt1")}
                className={`w-full text-left p-3 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between ${
                  hasVoted === "opt1"
                    ? "bg-[#ff6859]/20 border-[#ff6859] text-white"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Music className="w-3.5 h-3.5 text-[#ff8f7d]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold">Skinny Mo&apos;s Live Bebop Jazz</div>
                    <div className="text-[10px] text-neutral-400">Southern Ave • 7:30 PM Sat</div>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[#ff8f7d]">
                  {pollVotes.opt1} votes
                </span>
              </button>

              <button
                onClick={() => handleCastVote("opt2")}
                className={`w-full text-left p-3 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between ${
                  hasVoted === "opt2"
                    ? "bg-[#ff6859]/20 border-[#ff6859] text-white"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-200"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Palette className="w-3.5 h-3.5 text-[#ff8f7d]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold">Sienna Terracotta Pottery Masterclass</div>
                    <div className="text-[10px] text-neutral-400">Hindustan Park • 3:30 PM Sat</div>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[#ff8f7d]">
                  {pollVotes.opt2} votes
                </span>
              </button>
            </div>

            {/* Link to Full Poll */}
            <div className="mt-3 pt-2 flex items-center justify-between border-t border-white/5 text-[11px]">
              <span className="text-neutral-400">
                Total {pollVotes.opt1 + pollVotes.opt2} votes cast
              </span>
              <Link
                href="/poll/sat-crew-plan"
                className="text-[#ff7657] font-bold hover:underline no-underline flex items-center gap-1"
              >
                <span>Share with Friends</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* DURGA PUJA PASSES & VIP SPOTLIGHTS */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#ff6859]">
                Featured Experience
              </span>
              <h3 className="text-[16px] font-bold tracking-tight text-[#1a1d20]">
                Durga Puja & River Cruises
              </h3>
            </div>
            <Link
              href="/events"
              className="text-[11.5px] font-bold text-[#ff6859] hover:underline no-underline flex items-center gap-0.5"
            >
              <span>See all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Carousel Cards */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Card 1: Pujor Passport */}
            <Link
              href="/passport"
              className="flex-none w-[150px] group no-underline text-[#1a1d20]"
            >
              <div className="relative w-[150px] h-[210px] rounded-[22px] overflow-hidden shadow-md border border-black/5 group-hover:scale-102 transition-transform">
                <Image
                  src="/images/pujor-passport.png"
                  alt="Pujor Passport"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 bg-[#ff6859] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                  FAST PASS
                </span>
              </div>
              <div className="mt-2">
                <h4 className="text-[12.5px] font-bold leading-tight truncate">
                  Pujor Passport 2026
                </h4>
                <p className="text-[10.5px] text-[#717882] truncate">
                  VIP Pandal Access
                </p>
              </div>
            </Link>

            {/* Card 2: Durgotsav at Orkos */}
            <Link
              href="/events"
              className="flex-none w-[150px] group no-underline text-[#1a1d20]"
            >
              <div className="relative w-[150px] h-[210px] rounded-[22px] overflow-hidden shadow-md border border-black/5 group-hover:scale-102 transition-transform">
                <Image
                  src="/images/durgotsav-orkos.png"
                  alt="Durgotsav at Orkos"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 bg-[#181a1e] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                  SALT LAKE
                </span>
              </div>
              <div className="mt-2">
                <h4 className="text-[12.5px] font-bold leading-tight truncate">
                  Durgotsav at Orkos
                </h4>
                <p className="text-[10.5px] text-[#717882] truncate">
                  City Centre 1
                </p>
              </div>
            </Link>

            {/* Card 3: River Cruise */}
            <Link
              href="/events"
              className="flex-none w-[150px] group no-underline text-[#1a1d20]"
            >
              <div className="relative w-[150px] h-[210px] rounded-[22px] overflow-hidden shadow-md border border-black/5 group-hover:scale-102 transition-transform">
                <Image
                  src="/images/durgapuja-river-full.png"
                  alt="Durgapuja River Cruise"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-[12.5px] font-bold leading-tight truncate">
                  River Hooghly Cruise
                </h4>
                <p className="text-[10.5px] text-[#717882] truncate">
                  Millennium Park Jetty
                </p>
              </div>
            </Link>

            {/* Card 4: Taaza Dandiya */}
            <Link
              href="/events"
              className="flex-none w-[150px] group no-underline text-[#1a1d20]"
            >
              <div className="relative w-[150px] h-[210px] rounded-[22px] overflow-hidden shadow-md border border-black/5 group-hover:scale-102 transition-transform">
                <Image
                  src="/images/dandiya.jpg"
                  alt="Taaza Dandiya Raas"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <h4 className="text-[12.5px] font-bold leading-tight truncate">
                  Taaza Dandiya Raas
                </h4>
                <p className="text-[10.5px] text-[#717882] truncate">
                  Biswa Bangla Mela
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* CURATED WEEKEND SPOTS */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold tracking-tight text-[#1a1d20]">
              Curated City Corners
            </h3>
            <Link
              href="/spots"
              className="text-[11.5px] font-bold text-[#ff6859] hover:underline no-underline flex items-center gap-0.5"
            >
              <span>All 18 spots</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/spots"
              className="group block relative aspect-square rounded-[22px] overflow-hidden shadow-xs no-underline"
            >
              <Image
                src="/images/friendly/chat-friends-drinks.jpg"
                alt="Sienna Cafe"
                fill
                sizes="200px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                <span className="text-[12px] font-bold leading-tight">Sienna & Roastery</span>
                <span className="text-[10px] text-white/80">Courtyard & Specialty Coffee</span>
              </div>
            </Link>

            <Link
              href="/spots"
              className="group block relative aspect-square rounded-[22px] overflow-hidden shadow-xs no-underline"
            >
              <Image
                src="/images/friendly/chat-friends-sun.jpg"
                alt="Park Street Classics"
                fill
                sizes="200px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                <span className="text-[12px] font-bold leading-tight">Park Street Classics</span>
                <span className="text-[10px] text-white/80">Peter Cat & Olypub Jazz</span>
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
