"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

interface Pandal {
  id: string;
  name: string;
  zone: "South" | "North" | "East/Salt Lake";
  highlight: string;
}

const PANDALS: Pandal[] = [
  // South Kolkata
  { id: "maddox", name: "Maddox Square", zone: "South", highlight: "The Ultimate Adda" },
  { id: "ekdalia", name: "Ekdalia Evergreen", zone: "South", highlight: "Chandelier & Traditional Pratima" },
  { id: "singhi", name: "Singhi Park", zone: "South", highlight: "Spectacular Illuminations" },
  { id: "suruchi", name: "Suruchi Sangha", zone: "South", highlight: "Artistic State Theme" },
  { id: "tridhara", name: "Tridhara Sammilani", zone: "South", highlight: "Concept & Aesthetics" },
  { id: "mudiali", name: "Mudiali Club", zone: "South", highlight: "Floral Architecture" },
  { id: "shibmandir", name: "Shib Mandir", zone: "South", highlight: "Lake Road Craftsmanship" },
  { id: "chetla", name: "Chetla Agrani", zone: "South", highlight: "Grand Sculptures" },
  { id: "badamtala", name: "Badamtala Ashar Sangha", zone: "South", highlight: "Creative Heritage" },
  { id: "deshapriya", name: "Deshapriya Park", zone: "South", highlight: "Mammoth Scale" },

  // North Kolkata
  { id: "baghbazar", name: "Baghbazar Sarbojanin", zone: "North", highlight: "Ekchala & Classic Dhaak" },
  { id: "sovabazar", name: "Sovabazar Rajbari", zone: "North", highlight: "Centuries of Bonedi Aristocracy" },
  { id: "kumartuli", name: "Kumartuli Park", zone: "North", highlight: "Artisan Soul" },
  { id: "collegesq", name: "College Square", zone: "North", highlight: "Lakeside Neon Glory" },
  { id: "mohammadali", name: "Mohammad Ali Park", zone: "North", highlight: "Illuminated Palace" },
  { id: "ahiritola", name: "Ahiritola Sarbojanin", zone: "North", highlight: "Riverbank Legacy" },
  { id: "tala", name: "Tala Pratyay", zone: "North", highlight: "Contemporary Fine Art" },
  { id: "hatibagan", name: "Hatibagan Sarbojanin", zone: "North", highlight: "North Kolkata Staple" },

  // East & Salt Lake
  { id: "sreebhumi", name: "Sreebhumi Sporting", zone: "East/Salt Lake", highlight: "Mega Crowd Phenomenon" },
  { id: "fdblock", name: "FD Block Salt Lake", zone: "East/Salt Lake", highlight: "Grand Fair & Theme" },
  { id: "bjblock", name: "BJ Block Salt Lake", zone: "East/Salt Lake", highlight: "Family Adda Central" },
  { id: "dumdumtarun", name: "Dum Dum Park Tarun Dal", zone: "East/Salt Lake", highlight: "Avant-garde Visuals" },
  { id: "dumdumbharat", name: "Dum Dum Park Bharat Chakra", zone: "East/Salt Lake", highlight: "Installation Masterpiece" },
  { id: "netaji", name: "Netaji Sporting (Lake Town)", zone: "East/Salt Lake", highlight: "Illuminated Clock Tower" },
];

const ARCHETYPES = [
  {
    id: "maddox_chillar",
    title: "Maddox Adda Champion",
    tagline: "8 hours at Maddox, 2 pandals actually seen",
    icon: "☕",
  },
  {
    id: "south_commando",
    title: "South CCU Commando",
    tagline: "Walked 35,000 steps from Gariahat to Chetla",
    icon: "🏃",
  },
  {
    id: "north_purist",
    title: "North Heritage Purist",
    tagline: "Baghbazar, Rajbari & pure Dhunuchi naach",
    icon: "🏛️",
  },
  {
    id: "midnight_jumper",
    title: "Midnight VIP Jumper",
    tagline: "Hit Sreebhumi at 3:30 AM with car convoy",
    icon: "🚗",
  },
  {
    id: "food_first",
    title: "Food First, Pandal Second",
    tagline: "Came for the Egg Roll, stayed for the lighting",
    icon: "🌯",
  },
];

export default function PujoPassportPage() {
  const { isDarkMode, showToast } = useApp();
  const [userName, setUserName] = useState<string>("Abhirup");
  const [archetype, setArchetype] = useState<string>("maddox_chillar");
  const [selectedPandals, setSelectedPandals] = useState<string[]>([
    "maddox",
    "ekdalia",
    "singhi",
    "baghbazar",
    "sreebhumi",
    "tridhara",
  ]);
  const [rollsCount, setRollsCount] = useState<number>(4);
  const [phuchkaCount, setPhuchkaCount] = useState<number>(18);
  const [estimatedSteps, setEstimatedSteps] = useState<number>(28000);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const togglePandal = (id: string) => {
    setSelectedPandals((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Generate 1080 x 1920 Instagram Story Canvas
  const generatePassportCard = () => {
    setIsGenerating(true);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const selectedArch = ARCHETYPES.find((a) => a.id === archetype) || ARCHETYPES[0];

    // 1. Background: Warm Aged Paper Texture & Gradients
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGrad.addColorStop(0, "#FFFDF9");
    bgGrad.addColorStop(0.3, "#FFF8EE");
    bgGrad.addColorStop(0.8, "#F7EFE3");
    bgGrad.addColorStop(1, "#EFE2D0");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Vintage Postal Outer Double Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#B51F2A";
    ctx.strokeRect(40, 40, 1000, 1840);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#8F2028";
    ctx.strokeRect(52, 52, 976, 1816);

    // Decorative corner notches
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = "#B51F2A";
      ctx.fillRect(x - 12, y - 12, 24, 24);
    };
    drawCorner(52, 52);
    drawCorner(1028, 52);
    drawCorner(52, 1868);
    drawCorner(1028, 1868);

    // 3. Top Banner: Official Stamp Header
    ctx.fillStyle = "#B51F2A";
    ctx.fillRect(80, 80, 920, 110);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PUJOR PASSPORT • পূজোর পাসপোর্ট 2026", 540, 150);

    ctx.font = "600 24px sans-serif";
    ctx.fillStyle = "#FFD9D9";
    ctx.fillText("OFFICIAL KOLKATA PANDAL HOPPING CERTIFICATION", 540, 178);

    // 4. Passport Holder Section
    ctx.textAlign = "left";
    ctx.fillStyle = "#5C5252";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("PASSPORT ISSUED TO:", 90, 250);

    ctx.fillStyle = "#241C1C";
    ctx.font = "900 68px sans-serif";
    ctx.fillText((userName || "Kolkata Hopper").toUpperCase(), 90, 320);

    // 5. Archetype Stamp Badge (Rubber Stamp Look)
    ctx.save();
    ctx.translate(540, 420);
    ctx.rotate(-0.03); // Slight tilt

    ctx.fillStyle = "#FFF2F2";
    ctx.strokeStyle = "#B51F2A";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(-450, -55, 900, 110, 20);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#B51F2A";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText(`${selectedArch.icon} ${selectedArch.title.toUpperCase()}`, 0, 5);

    ctx.font = "600 22px sans-serif";
    ctx.fillStyle = "#802025";
    ctx.fillText(`"${selectedArch.tagline}"`, 0, 36);
    ctx.restore();

    // 6. Circular Vintage Rubber Postmark
    ctx.save();
    ctx.translate(900, 280);
    ctx.rotate(0.12);
    ctx.strokeStyle = "rgba(181, 31, 42, 0.75)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(181, 31, 42, 0.85)";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("KOLKATA G.P.O.", 0, -25);
    ctx.font = "900 22px sans-serif";
    ctx.fillText("OCT 2026", 0, 5);
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("★ VERIFIED ★", 0, 30);
    ctx.restore();

    // 7. Stats Overview Bar
    ctx.fillStyle = "#241C1C";
    ctx.beginPath();
    ctx.roundRect(80, 500, 920, 120, 16);
    ctx.fill();

    const stats = [
      { label: "PANDALS HOPPED", val: `${selectedPandals.length} Venues` },
      { label: "ROLLS DEVOURED", val: `${rollsCount} Rolls` },
      { label: "PHUCHKAS", val: `${phuchkaCount} Pcs` },
      { label: "EST. STEPS", val: `${(estimatedSteps / 1000).toFixed(0)}k Steps` },
    ];

    stats.forEach((st, idx) => {
      const x = 120 + idx * 225;
      ctx.textAlign = "left";
      ctx.fillStyle = "#C8BFBF";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(st.label, x, 545);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 32px sans-serif";
      ctx.fillText(st.val, x, 588);
    });

    // 8. Stamped Postal Grid for Selected Pandals
    ctx.fillStyle = "#5C5252";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`VERIFIED VISAS & PANDAL STAMPS (${selectedPandals.length} VISITED):`, 90, 675);

    const stampList = PANDALS.filter((p) => selectedPandals.includes(p.id));
    const maxStampsToShow = Math.min(stampList.length, 12);

    const cols = 3;
    const startX = 90;
    const startY = 705;
    const cardW = 285;
    const cardH = 210;
    const gap = 22;

    for (let i = 0; i < maxStampsToShow; i++) {
      const p = stampList[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const px = startX + col * (cardW + gap);
      const py = startY + row * (cardH + gap);

      // Stamp Outer Background with Jagged Border imitation
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#EADFD5";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(px, py, cardW, cardH, 12);
      ctx.fill();
      ctx.stroke();

      // Top Stamp Accent
      ctx.fillStyle = p.zone === "South" ? "#B51F2A" : p.zone === "North" ? "#D48806" : "#2B7A4B";
      ctx.fillRect(px, py, cardW, 10);

      // Pandal Zone Pill
      ctx.fillStyle = p.zone === "South" ? "#F7E3E1" : p.zone === "North" ? "#FFF6E5" : "#E8F5E9";
      ctx.beginPath();
      ctx.roundRect(px + 14, py + 22, 105, 26, 6);
      ctx.fill();

      ctx.fillStyle = p.zone === "South" ? "#B51F2A" : p.zone === "North" ? "#945D04" : "#1B5E35";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.zone.toUpperCase(), px + 66, py + 40);

      // Pandal Name
      ctx.textAlign = "left";
      ctx.fillStyle = "#241C1C";
      ctx.font = "bold 24px sans-serif";

      // Wrap text if needed
      const words = p.name.split(" ");
      if (words.length > 2) {
        ctx.fillText(words.slice(0, 2).join(" "), px + 14, py + 80);
        ctx.fillText(words.slice(2).join(" "), px + 14, py + 108);
      } else {
        ctx.fillText(p.name, px + 14, py + 86);
      }

      ctx.fillStyle = "#807373";
      ctx.font = "500 16px sans-serif";
      ctx.fillText(p.highlight, px + 14, py + 142, cardW - 28);

      // Rubber Cancellation Mark across the stamp
      ctx.strokeStyle = "rgba(181, 31, 42, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(px + 14, py + 160, 140, 32, 6);
      ctx.stroke();

      ctx.fillStyle = "rgba(181, 31, 42, 0.85)";
      ctx.font = "900 16px sans-serif";
      ctx.fillText("✓ HOPPED", px + 35, py + 182);

      ctx.restore();
    }

    // 9. Bottom Official Authenticator Footer
    const footerY = 1680;
    ctx.fillStyle = "#B51F2A";
    ctx.fillRect(80, footerY, 920, 160);

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 34px sans-serif";
    ctx.fillText("KOLKATA THIS WEEKEND", 540, footerY + 55);

    ctx.fillStyle = "#FFE8E8";
    ctx.font = "600 22px sans-serif";
    ctx.fillText("kolkatathisweekend.com/passport", 540, footerY + 95);

    ctx.font = "500 18px sans-serif";
    ctx.fillStyle = "#FFC2C2";
    ctx.fillText("Generate your own Pujo 2026 Passport & discover weekend plans", 540, footerY + 130);

    const dataUrl = canvas.toDataURL("image/png");
    setPreviewDataUrl(dataUrl);
    setIsGenerating(false);
    showToast("Pujor Passport Generated! Ready to share 📸");
  };

  useEffect(() => {
    generatePassportCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (!previewDataUrl) return;
    const a = document.createElement("a");
    a.href = previewDataUrl;
    a.download = `pujo-passport-${userName.toLowerCase() || "kolkata"}.png`;
    a.click();
    showToast("Downloaded 9:16 Story Image!");
  };

  const handleShareStory = async () => {
    if (!previewDataUrl) return;

    try {
      const res = await fetch(previewDataUrl);
      const blob = await res.blob();
      const file = new File([blob], "pujor-passport-2026.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Pujo 2026 Passport",
          text: `Here is my official Kolkata Pujo Passport! Generated on kolkatathisweekend.com/passport`,
          files: [file],
        });
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-44 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader title="Pujor Passport 2026" subtitle="Viral Instagram Story Generator" />

      <section className="px-5 py-4 space-y-4">
        {/* Intro Banner */}
        <div
          className={`p-4 rounded-2xl border ${
            isDarkMode ? "bg-[#141620] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#b51f2a] text-white px-2 py-0.5 rounded-full">
              Pujo Wrapped
            </span>
            <span className="text-[11px] text-neutral-400 font-medium">9:16 Story Canvas</span>
          </div>

          <h2 className="text-base font-extrabold mt-1.5 leading-tight">
            How many pandals did you actually hit this year?
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Select your pandals, rolls, and archetype. Generate an authentic vintage postal-stamped card to share on Instagram & WhatsApp!
          </p>
        </div>

        {/* Step 1: Name & Archetype */}
        <div
          className={`p-4 rounded-2xl border space-y-3 ${
            isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1 uppercase tracking-wider">
              Your Name / Nickname
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Abhirup"
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-bold focus:outline-none ${
                isDarkMode
                  ? "bg-[#141620] border-neutral-700 text-white focus:border-[#b51f2a]"
                  : "bg-white border-neutral-200 text-neutral-900"
              }`}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              Your Pujo Archetype
            </label>
            <div className="space-y-1.5">
              {ARCHETYPES.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setArchetype(arch.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                    archetype === arch.id
                      ? "bg-[#b51f2a]/15 border-[#b51f2a] text-white"
                      : isDarkMode
                      ? "bg-[#141620] border-neutral-800 text-neutral-400"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700"
                  }`}
                >
                  <span className="text-lg">{arch.icon}</span>
                  <div className="flex-1">
                    <span className="text-xs font-extrabold block">{arch.title}</span>
                    <span className="text-[10px] text-neutral-500 block">{arch.tagline}</span>
                  </div>
                  {archetype === arch.id && <span className="text-red-500 text-xs font-black">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Pandals Checklist */}
        <div
          className={`p-4 rounded-2xl border ${
            isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Pandals You Visited ({selectedPandals.length})
            </label>
            <span className="text-[10px] text-neutral-500">Tap to toggle</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto no-scrollbar pr-1">
            {PANDALS.map((pandal) => {
              const isChecked = selectedPandals.includes(pandal.id);
              return (
                <button
                  key={pandal.id}
                  onClick={() => togglePandal(pandal.id)}
                  className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all truncate flex items-center justify-between ${
                    isChecked
                      ? "bg-[#b51f2a] text-white border-[#b51f2a]"
                      : isDarkMode
                      ? "bg-[#141620] border-neutral-800 text-neutral-400 hover:text-white"
                      : "bg-neutral-100 border-neutral-200 text-neutral-700"
                  }`}
                >
                  <span className="truncate">{pandal.name}</span>
                  <span className="text-[10px] shrink-0 ml-1">{isChecked ? "✓" : "+"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Food & Steps Stats */}
        <div
          className={`p-4 rounded-2xl border space-y-3 ${
            isDarkMode ? "bg-[#12141c] border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-neutral-400 block mb-1">🌯 Rolls</label>
              <input
                type="number"
                min={0}
                max={20}
                value={rollsCount}
                onChange={(e) => setRollsCount(Number(e.target.value))}
                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center ${
                  isDarkMode ? "bg-[#141620] border-neutral-700" : "bg-neutral-100 border-neutral-200"
                }`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 block mb-1">🥔 Phuchkas</label>
              <input
                type="number"
                min={0}
                max={100}
                value={phuchkaCount}
                onChange={(e) => setPhuchkaCount(Number(e.target.value))}
                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center ${
                  isDarkMode ? "bg-[#141620] border-neutral-700" : "bg-neutral-100 border-neutral-200"
                }`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 block mb-1">🚶 Est. Steps</label>
              <input
                type="number"
                step={1000}
                value={estimatedSteps}
                onChange={(e) => setEstimatedSteps(Number(e.target.value))}
                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center ${
                  isDarkMode ? "bg-[#141620] border-neutral-700" : "bg-neutral-100 border-neutral-200"
                }`}
              />
            </div>
          </div>

          <button
            onClick={generatePassportCard}
            disabled={isGenerating}
            className="w-full bg-[#b51f2a] hover:bg-[#961720] text-white font-extrabold text-xs py-3 rounded-xl transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-2"
          >
            <span>{isGenerating ? "⏳ Rendering Passport..." : "🎨 Update & Render Passport"}</span>
          </button>
        </div>

        {/* Live Card Preview */}
        {previewDataUrl && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-400">✨ 9:16 Instagram Story Preview</span>
              <span className="text-[10px] text-neutral-500">1080 × 1920 HD</span>
            </div>

            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewDataUrl}
                alt="Pujor Passport Card"
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleDownload}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>📥</span> Save Image
              </button>
              <button
                onClick={handleShareStory}
                className="bg-[#E1306C] hover:bg-[#C13584] text-white font-black text-xs py-3 rounded-xl transition-transform active:scale-98 flex items-center justify-center gap-1.5 shadow-md shadow-pink-950/40"
              >
                <span>📸</span> Share Story ↗
              </button>
            </div>
          </div>
        )}

        {/* Bridge to Weekend Engine */}
        <div
          className={`p-4 rounded-2xl border text-center ${
            isDarkMode ? "bg-[#141620] border-neutral-800" : "bg-neutral-50 border-neutral-200"
          }`}
        >
          <span className="text-xl block mb-1">🎉</span>
          <h4 className="text-xs font-extrabold text-white">Pujo is done, but the weekend isn&apos;t!</h4>
          <p className="text-[11px] text-neutral-400 mt-1">
            Discover upcoming live gigs, artisan cafes & weekend circuits across Kolkata.
          </p>
          <Link
            href="/events"
            className="mt-3 inline-block bg-[#b51f2a] text-white text-xs font-bold py-2 px-4 rounded-xl hover:bg-[#961720] transition-colors"
          >
            Explore What&apos;s Happening This Weekend ➔
          </Link>
        </div>
      </section>
    </main>
  );
}
