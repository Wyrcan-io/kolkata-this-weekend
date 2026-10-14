"use client";

import React, { useState } from "react";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

export default function PlannerPage() {
  const { isDarkMode } = useApp();
  const [day, setDay] = useState<string>("Saturday");
  const [zone, setZone] = useState<string>("South Kolkata");
  const [budget, setBudget] = useState<string>("₹500 - ₹1,500");
  const [vibe, setVibe] = useState<string>("Creative & Food");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-36 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#0b0c10] text-white" : "bg-white text-gray-900"
      }`}
    >
      <AppHeader title="Weekend Circuit" subtitle="Handcrafted 3-Stop Day Itineraries" />

      <section className="px-5 py-3">
        <div
          className={`rounded-2xl p-4 border relative overflow-hidden ${
            isDarkMode
              ? "bg-[#12141c] border-neutral-800 text-white"
              : "bg-white border-neutral-200/80 text-neutral-900 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-black uppercase tracking-wider text-[#c6121f] bg-red-600/10 px-2 py-0.5 rounded-full">
              Kolkata Circuit Engine
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Curated by Locals</span>
          </div>

          <h2 className="text-[17px] font-extrabold mt-2 leading-tight">
            Zero Indecision. Your Perfect Weekend Day.
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Choose your day, neighborhood, and vibe. We map a connected 3-stop route with actual walking distances, food recommendations, and evening highlights.
          </p>
        </div>

        {/* Form Inputs */}
        <div className={`mt-4 rounded-2xl p-4 space-y-3.5 border ${
          isDarkMode ? "bg-[#141620] border-gray-800" : "bg-white border-gray-100 shadow-sm"
        }`}>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">1. When are you heading out?</label>
            <div className="grid grid-cols-3 gap-2">
              {["Tonight", "Saturday", "Sunday"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`py-2 rounded-xl text-xs font-bold transition-colors ${
                    day === d
                      ? "bg-[#c6121f] text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">2. Preferred Area / Hub</label>
            <div className="grid grid-cols-3 gap-2">
              {["South Kolkata", "Salt Lake", "Park Street"].map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`py-2 rounded-xl text-xs font-bold transition-colors ${
                    zone === z
                      ? "bg-[#c6121f] text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">3. Vibe Preference</label>
            <div className="grid grid-cols-2 gap-2">
              {["Creative & Food", "Live Music & Night", "Pandal Hopping", "Quiet Heritage"].map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-colors truncate ${
                    vibe === v
                      ? "bg-[#c6121f] text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-3 py-3 bg-[#c6121f] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-red-600/30 hover:bg-[#a90d18] cursor-pointer"
          >
            Generate Circuit Itinerary →
          </button>
        </div>

        {/* Generated Itinerary Result */}
        {isGenerated && (
          <div className="mt-5 space-y-3">
            <h3 className="text-base font-bold text-[#c6121f]">
              Your Curated {day} Plan for {zone}:
            </h3>

            {/* Stop 1 */}
            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? "bg-[#181a24] border-gray-800" : "bg-red-50/50 border-red-100"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500">STOP 1 • 3:30 PM (Afternoon)</span>
                <span className="text-xs text-gray-400">Coffee & Art</span>
              </div>
              <h4 className="text-sm font-bold mt-1">Sienna Cafe & Pottery Studio</h4>
              <p className="text-xs text-gray-400 mt-0.5">Hindustan Park • Handcrafted cold brew & ceramic gallery</p>
            </div>

            {/* Stop 2 */}
            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? "bg-[#181a24] border-gray-800" : "bg-red-50/50 border-red-100"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500">STOP 2 • 6:30 PM (Evening)</span>
                <span className="text-xs text-gray-400">10 mins walk</span>
              </div>
              <h4 className="text-sm font-bold mt-1">Ekdalia Evergreen VIP Pandal</h4>
              <p className="text-xs text-gray-400 mt-0.5">Gariahat • Giant illumination gates & sanctum view</p>
            </div>

            {/* Stop 3 */}
            <div className={`p-3.5 rounded-xl border ${
              isDarkMode ? "bg-[#181a24] border-gray-800" : "bg-red-50/50 border-red-100"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500">STOP 3 • 8:45 PM (Dinner)</span>
                <span className="text-xs text-gray-400">5 mins cab</span>
              </div>
              <h4 className="text-sm font-bold mt-1">Jungle Biryani & Acoustic Lounge</h4>
              <p className="text-xs text-gray-400 mt-0.5">Southern Avenue • Signature Awadhi Handi Biryani</p>
            </div>

            {/* Viral Growth WhatsApp Share Button (Document Ref) */}
            <a
              href="https://api.whatsapp.com/send?text=Check%20out%20our%20curated%20Kolkata%20Weekend%20Plan%20from%20Kolkata%20This%20Weekend!%20Stop%201:%20Sienna%20Cafe,%20Stop%202:%20Ekdalia%20Evergreen,%20Stop%203:%20Jungle%20Biryani"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full py-3 bg-[#25D366] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 no-underline hover:bg-[#1fb855]"
            >
              <span>📲 Share Plan to WhatsApp Group</span>
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
