"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Sparkles, CheckCircle2, Send, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "../context";
import { CityZone } from "../../lib/types";
import BottomNavbar from "../components/BottomNavbar";

export default function SubmitEventPage() {
  const { addSubmission } = useApp();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"music" | "workshops" | "theatre" | "heritage" | "nightlife">("music");
  const [dayType, setDayType] = useState<"Friday" | "Saturday" | "Sunday">("Saturday");
  const [timeStr, setTimeStr] = useState("7:00 PM");
  const [zone, setZone] = useState<CityZone>("South Kolkata");
  const [neighborhood, setNeighborhood] = useState("");
  const [venueName, setVenueName] = useState("");
  const [priceLabel, setPriceLabel] = useState("₹300 entry");
  const [outboundUrl, setOutboundUrl] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const [isExtracting, setIsExtracting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulateAI = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setTitle("Monsoon Jazz Sessions Vol. 4");
      setCategory("music");
      setDayType("Saturday");
      setTimeStr("8:00 PM");
      setZone("South Kolkata");
      setNeighborhood("Southern Avenue");
      setVenueName("Skinny Mo's Jazz Club");
      setPriceLabel("₹499 (Beverage included)");
      setOutboundUrl("https://instagram.com/skinnymosjazz");
      setContactInfo("curator@skinnymos.in");
      setIsExtracting(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !venueName) {
      alert("Please enter at least an event title and venue name!");
      return;
    }

    addSubmission({
      title,
      category,
      dayType,
      timeStr,
      zone,
      neighborhood: neighborhood || "Kolkata Central",
      venueName,
      priceLabel: priceLabel || "Free",
      outboundUrl: outboundUrl || "https://instagram.com",
      contactInfo: contactInfo || "Instagram DM",
    });

    setIsSuccess(true);
  };

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
              submit your event
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              free curation & live verification
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
        {/* Banner Intro */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck size={12} />
              <span>Free Community Listing</span>
            </span>
            <span className="text-xs text-neutral-400 font-semibold">&lt; 2hr Turnaround</span>
          </div>

          <h2 className="text-base font-extrabold text-[#141519] leading-tight">
            Hosting a gig, workshop, or flea in Kolkata?
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Drop your details or poster link. Our team reviews submissions within 2 hours for instant inclusion on the weekend feed.
          </p>

          {/* AI Instant Auto-Fill Trigger */}
          <button
            type="button"
            onClick={handleSimulateAI}
            disabled={isExtracting}
            className="mt-4 w-full bg-neutral-100 hover:bg-neutral-200 text-[#141519] font-bold text-xs py-2.5 px-3 rounded-2xl border border-neutral-200/80 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            <Sparkles size={14} className="text-[#FF6859]" />
            <span>{isExtracting ? "Extracting details..." : "Auto-Fill Sample Flyer with AI"}</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-[26px] p-6 text-center border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-base font-extrabold text-[#141519]">Submission Received!</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Your event &quot;<strong>{title}</strong>&quot; has been sent to our Kolkata curator queue. It will appear on the live feed after quick verification.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/admin"
                className="bg-[#141519] hover:bg-neutral-800 text-white text-xs font-bold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Review in Admin Console</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setTitle("");
                  setVenueName("");
                }}
                className="text-xs font-semibold text-neutral-500 hover:text-[#141519] py-1 cursor-pointer"
              >
                Submit another event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 space-y-4">
            {/* Event Title */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Skinny Mo's Sunset Rooftop Jazz"
                className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-[#141519] focus:outline-none focus:border-[#FF6859]"
              />
            </div>

            {/* Category & Day Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                >
                  <option value="music">Live Music</option>
                  <option value="workshops">Workshop</option>
                  <option value="theatre">Theatre & Film</option>
                  <option value="heritage">Heritage Walk</option>
                  <option value="nightlife">Nightlife</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Day
                </label>
                <select
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                >
                  <option value="Friday">Friday (Tonight)</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>

            {/* Time & Price Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Time
                </label>
                <input
                  type="text"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  placeholder="e.g. 7:30 PM"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Ticket Price / Entry
                </label>
                <input
                  type="text"
                  value={priceLabel}
                  onChange={(e) => setPriceLabel(e.target.value)}
                  placeholder="e.g. FREE or ₹499"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                />
              </div>
            </div>

            {/* Zone & Neighborhood */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Zone
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                >
                  <option value="South Kolkata">South Kolkata</option>
                  <option value="North Kolkata">North Kolkata</option>
                  <option value="Park Street & Central">Park Street & Central</option>
                  <option value="Salt Lake & New Town">Salt Lake & New Town</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Southern Avenue"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
                />
              </div>
            </div>

            {/* Venue Name */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Venue Name *
              </label>
              <input
                type="text"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. TopCat CCU, Sienna Cafe, Skinny Mo's"
                className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-[#141519] focus:outline-none focus:border-[#FF6859]"
              />
            </div>

            {/* Ticket Link / Social */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Link to Tickets / Instagram Post
              </label>
              <input
                type="url"
                value={outboundUrl}
                onChange={(e) => setOutboundUrl(e.target.value)}
                placeholder="https://instagram.com/p/... or insider.in/..."
                className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
              />
            </div>

            {/* Submitter Contact */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Your Contact (WhatsApp / Phone / IG Handle)
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="e.g. @kolkatamusiclive or 98300xxxxx"
                className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-[#141519] focus:outline-none focus:border-[#FF6859]"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white font-black text-xs py-3.5 px-4 rounded-2xl transition-transform active:scale-98 shadow-md shadow-red-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              <span>Submit Event for Free Verification</span>
            </button>
          </form>
        )}
      </section>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
