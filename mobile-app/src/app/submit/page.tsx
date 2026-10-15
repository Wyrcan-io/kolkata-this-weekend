"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";
import { EventCategory, CityZone } from "../../lib/types";

export default function SubmitEventPage() {
  const { isDarkMode, addSubmission } = useApp();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<EventCategory>("music");
  const [zone, setZone] = useState<CityZone>("South Kolkata");
  const [venueName, setVenueName] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [dayType, setDayType] = useState<"Friday" | "Saturday" | "Sunday">("Saturday");
  const [timeStr, setTimeStr] = useState<string>("7:00 PM");
  const [priceLabel, setPriceLabel] = useState<string>("₹399");
  const [outboundUrl, setOutboundUrl] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Simulated AI Multimodal Flyer Extractor (Gemini 1.5 Flash Preview)
  const handleSimulateAI = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setTitle("Lake Market Sunset Acoustic & Open Mic");
      setCategory("music");
      setZone("South Kolkata");
      setVenueName("Lake Club Lawn");
      setNeighborhood("Southern Avenue");
      setDayType("Sunday");
      setTimeStr("5:30 PM");
      setPriceLabel("FREE (Registration required)");
      setOutboundUrl("https://instagram.com/kolkataopenmic");
      setContactInfo("9831000000");
      setIsExtracting(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !venueName) return;

    addSubmission({
      title,
      category,
      zone,
      venueName,
      neighborhood: neighborhood || venueName,
      dayType,
      timeStr,
      priceLabel: priceLabel || "FREE",
      outboundUrl: outboundUrl || "https://instagram.com",
      contactInfo: contactInfo || "Organizer Direct",
      flyerImage: "/images/concert_summer.jpg",
    });

    setIsSuccess(true);
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Submit an Event" subtitle="Zero-Friction Ingestion" />

      <section className="px-5 py-4">
        {/* Intro Banner */}
        <div
          className={`p-4 rounded-2xl border ${
            isDarkMode ? "bg-[#141620] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#b51f2a] text-white px-2 py-0.5 rounded-full">
              Organizer Dropzone
            </span>
            <span className="text-[11px] text-neutral-400 font-semibold">100% Free Listing</span>
          </div>

          <h2 className="text-base font-extrabold mt-2 leading-tight">
            Have a gig, workshop, or event in Kolkata?
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Upload your poster or flyer. Our AI extracts dates, venue, and ticket prices in seconds, then routes it to our 1-click moderation queue.
          </p>

          {/* AI Instant Auto-Fill Trigger */}
          <button
            type="button"
            onClick={handleSimulateAI}
            disabled={isExtracting}
            className="mt-3.5 w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs py-2.5 px-3 rounded-xl border border-neutral-700/80 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <span>{isExtracting ? "⏳ Extracting details..." : "✨ Auto-Fill Sample Flyer with AI"}</span>
          </button>
        </div>

        {isSuccess ? (
          <div
            className={`mt-5 p-6 rounded-2xl border text-center ${
              isDarkMode ? "bg-[#12141c] border-emerald-500/40" : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <span className="text-4xl block mb-2">🎉</span>
            <h3 className="text-base font-extrabold text-emerald-400">Submission Received!</h3>
            <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
              Your event &quot;<strong>{title}</strong>&quot; has been sent to our Kolkata curator queue. It will appear on the live feed within 2 hours.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/admin"
                className="bg-[#b51f2a] hover:bg-[#961720] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Review in Admin Console ➔
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setTitle("");
                  setVenueName("");
                }}
                className="text-xs text-neutral-400 hover:underline py-1"
              >
                Submit another event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {/* Event Title */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Skinny Mo's Friday Jazz & Cocktails"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                    : "bg-white border-neutral-200 text-neutral-900 focus:border-red-400"
                }`}
              />
            </div>

            {/* Category & Day Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                >
                  <option value="music">🎵 Live Music</option>
                  <option value="workshops">🎨 Workshop</option>
                  <option value="theatre">🎭 Theatre/Film</option>
                  <option value="heritage">🏛️ Heritage Walk</option>
                  <option value="nightlife">🍹 Nightlife</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Day
                </label>
                <select
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value as any)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                >
                  <option value="Friday">Friday (Tonight)</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>

            {/* Zone & Venue Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  City Zone
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as CityZone)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                >
                  <option value="South Kolkata">South Kolkata</option>
                  <option value="Salt Lake & New Town">Salt Lake / New Town</option>
                  <option value="Park Street & Central">Park Street / Central</option>
                  <option value="North Kolkata">North Kolkata</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7:30 PM"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                />
              </div>
            </div>

            {/* Venue Name & Neighborhood */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sienna Cafe"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                  Price / Free
                </label>
                <input
                  type="text"
                  placeholder="e.g. FREE or ₹499"
                  value={priceLabel}
                  onChange={(e) => setPriceLabel(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDarkMode
                      ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                      : "bg-white border-neutral-200 text-neutral-900"
                  }`}
                />
              </div>
            </div>

            {/* Outbound Link */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Outbound Action Link (Instagram / Ticket / Form)
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/your-event-post"
                value={outboundUrl}
                onChange={(e) => setOutboundUrl(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                  isDarkMode
                    ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                    : "bg-white border-neutral-200 text-neutral-900"
                }`}
              />
            </div>

            {/* WhatsApp Contact */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
                Organizer WhatsApp / Phone (Private verification)
              </label>
              <input
                type="text"
                placeholder="e.g. 9830123456"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none ${
                  isDarkMode
                    ? "bg-[#12141c] border-neutral-800 text-white focus:border-[#b51f2a]"
                    : "bg-white border-neutral-200 text-neutral-900"
                }`}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#b51f2a] hover:bg-[#961720] text-white font-extrabold text-xs py-3 rounded-2xl transition-transform active:scale-98 shadow-sm"
            >
              Submit Event for Free Verification 🚀
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
