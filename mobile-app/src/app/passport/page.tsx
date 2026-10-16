"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Coffee,
  Footprints,
  Landmark,
  Car,
  Utensils,
  Sparkles,
  Download,
  Share2,
  Check,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context";
import BottomNavbar from "../components/BottomNavbar";

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
    icon: Coffee,
  },
  {
    id: "south_commando",
    title: "South CCU Commando",
    tagline: "Walked 35,000 steps from Gariahat to Chetla",
    icon: Footprints,
  },
  {
    id: "north_purist",
    title: "North Heritage Purist",
    tagline: "Baghbazar, Rajbari & pure Dhunuchi naach",
    icon: Landmark,
  },
  {
    id: "midnight_jumper",
    title: "Midnight VIP Jumper",
    tagline: "Hit Sreebhumi at 3:30 AM with car convoy",
    icon: Car,
  },
  {
    id: "food_first",
    title: "Food First, Pandal Second",
    tagline: "Came for the Egg Roll, stayed for the lighting",
    icon: Utensils,
  },
];

export default function PujoPassportPage() {
  const { showToast } = useApp();
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
    ctx.strokeStyle = "#FF6859";
    ctx.strokeRect(40, 40, 1000, 1840);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E05041";
    ctx.strokeRect(52, 52, 976, 1816);

    // Decorative corner notches
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = "#FF6859";
      ctx.fillRect(x - 12, y - 12, 24, 24);
    };
    drawCorner(52, 52);
    drawCorner(1028, 52);
    drawCorner(52, 1868);
    drawCorner(1028, 1868);

    // 3. Top Banner: Official Stamp Header
    ctx.fillStyle = "#141519";
    ctx.fillRect(80, 80, 920, 110);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PUJOR PASSPORT • পূজোর পাসপোর্ট 2026", 540, 150);

    ctx.font = "600 24px sans-serif";
    ctx.fillStyle = "#FFA17E";
    ctx.fillText("OFFICIAL KOLKATA PANDAL HOPPING CERTIFICATION", 540, 178);

    // 4. Passport Holder Section
    ctx.textAlign = "left";
    ctx.fillStyle = "#5C5252";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("PASSPORT ISSUED TO:", 90, 250);

    ctx.fillStyle = "#141519";
    ctx.font = "900 68px sans-serif";
    ctx.fillText((userName || "Kolkata Hopper").toUpperCase(), 90, 320);

    // 5. Archetype Stamp Badge
    ctx.save();
    ctx.translate(540, 420);
    ctx.rotate(-0.02);

    ctx.fillStyle = "#FFF4F2";
    ctx.strokeStyle = "#FF6859";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(-450, -55, 900, 110, 20);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#FF6859";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText(selectedArch.title.toUpperCase(), 0, 5);

    ctx.font = "600 22px sans-serif";
    ctx.fillStyle = "#555";
    ctx.fillText(`"${selectedArch.tagline}"`, 0, 36);
    ctx.restore();

    // 6. Circular Rubber Postmark
    ctx.save();
    ctx.translate(900, 280);
    ctx.rotate(0.12);
    ctx.strokeStyle = "rgba(255, 104, 89, 0.75)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 75, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 104, 89, 0.85)";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("KOLKATA G.P.O.", 0, -25);
    ctx.font = "900 22px sans-serif";
    ctx.fillText("OCT 2026", 0, 5);
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("VERIFIED", 0, 30);
    ctx.restore();

    // 7. Stats Overview Bar
    ctx.fillStyle = "#141519";
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

      // Stamp Outer Background
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#EADFD5";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(px, py, cardW, cardH, 12);
      ctx.fill();
      ctx.stroke();

      // Top Stamp Accent
      ctx.fillStyle = p.zone === "South" ? "#FF6859" : p.zone === "North" ? "#D48806" : "#2B7A4B";
      ctx.fillRect(px, py, cardW, 10);

      // Pandal Zone Pill
      ctx.fillStyle = p.zone === "South" ? "#FFF2F0" : p.zone === "North" ? "#FFF6E5" : "#E8F5E9";
      ctx.beginPath();
      ctx.roundRect(px + 14, py + 22, 105, 26, 6);
      ctx.fill();

      ctx.fillStyle = p.zone === "South" ? "#FF6859" : p.zone === "North" ? "#945D04" : "#1B5E35";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.zone.toUpperCase(), px + 66, py + 40);

      // Pandal Name
      ctx.textAlign = "left";
      ctx.fillStyle = "#141519";
      ctx.font = "bold 24px sans-serif";

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

      // Cancellation Mark
      ctx.strokeStyle = "rgba(255, 104, 89, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(px + 14, py + 160, 140, 32, 6);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 104, 89, 0.85)";
      ctx.font = "900 16px sans-serif";
      ctx.fillText("HOPPED", px + 35, py + 182);

      ctx.restore();
    }

    // 9. Bottom Official Authenticator Footer
    const footerY = 1680;
    ctx.fillStyle = "#141519";
    ctx.fillRect(80, footerY, 920, 160);

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 34px sans-serif";
    ctx.fillText("KOLKATA THIS WEEKEND", 540, footerY + 55);

    ctx.fillStyle = "#FFA17E";
    ctx.font = "600 22px sans-serif";
    ctx.fillText("kolkatathisweekend.com/passport", 540, footerY + 95);

    ctx.font = "500 18px sans-serif";
    ctx.fillStyle = "#C8BFBF";
    ctx.fillText("Generate your own Pujo Passport & discover weekend plans", 540, footerY + 130);

    const dataUrl = canvas.toDataURL("image/png");
    setPreviewDataUrl(dataUrl);
    setIsGenerating(false);
    showToast("Pujor Passport Generated! Ready to share");
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
              pujor passport
            </h1>
            <p className="text-xs font-semibold text-neutral-500">
              official story card generator
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
        {/* Intro Banner */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white px-2.5 py-0.5 rounded-full">
              Pujo Wrapped
            </span>
            <span className="text-xs text-neutral-500 font-semibold">9:16 Story Canvas</span>
          </div>

          <h2 className="text-base font-extrabold text-[#141519] leading-tight">
            How many pandals did you actually hit this year?
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Select your pandals, rolls, and archetype. Generate an authentic postal-stamped card to share on Instagram & WhatsApp.
          </p>
        </div>

        {/* Step 1: Name & Archetype */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              Your Name / Nickname
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Abhirup"
              className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-[#141519] focus:outline-none focus:border-[#FF6859]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider">
              Your Pujo Archetype
            </label>
            <div className="space-y-2">
              {ARCHETYPES.map((arch) => {
                const IconComp = arch.icon;
                const isSelected = archetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => setArchetype(arch.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#FFF4F2] border-[#FF6859] shadow-xs"
                        : "bg-neutral-50 border-neutral-200/60 hover:bg-neutral-100"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#FF6859] text-white" : "bg-white text-neutral-600 border border-neutral-200/60"
                    }`}>
                      <IconComp size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-extrabold text-[#141519] block truncate">
                        {arch.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 block truncate">
                        {arch.tagline}
                      </span>
                    </div>
                    {isSelected && <Check size={16} className="text-[#FF6859] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 2: Pandals Checklist */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Pandals You Visited ({selectedPandals.length})
            </label>
            <span className="text-[10px] font-semibold text-neutral-500">Tap to toggle</span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar pr-0.5">
            {PANDALS.map((pandal) => {
              const isChecked = selectedPandals.includes(pandal.id);
              return (
                <button
                  key={pandal.id}
                  onClick={() => togglePandal(pandal.id)}
                  className={`p-2.5 rounded-xl text-left border text-[11px] font-bold transition-all truncate flex items-center justify-between cursor-pointer ${
                    isChecked
                      ? "bg-[#141519] text-white border-[#141519]"
                      : "bg-neutral-50 border-neutral-200/60 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <span className="truncate">{pandal.name}</span>
                  {isChecked ? (
                    <Check size={12} className="shrink-0 ml-1 text-white" />
                  ) : (
                    <Plus size={12} className="shrink-0 ml-1 text-neutral-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Food & Steps Stats */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 mb-1">
                <Utensils size={11} className="text-[#FF6859]" />
                <span>Rolls</span>
              </label>
              <input
                type="number"
                min={0}
                max={20}
                value={rollsCount}
                onChange={(e) => setRollsCount(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-center text-[#141519] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 mb-1">
                <Sparkles size={11} className="text-amber-500" />
                <span>Phuchkas</span>
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={phuchkaCount}
                onChange={(e) => setPhuchkaCount(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-center text-[#141519] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 mb-1">
                <Footprints size={11} className="text-emerald-500" />
                <span>Est. Steps</span>
              </label>
              <input
                type="number"
                step={1000}
                value={estimatedSteps}
                onChange={(e) => setEstimatedSteps(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs font-bold text-center text-[#141519] focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={generatePassportCard}
            disabled={isGenerating}
            className="w-full bg-[#141519] hover:bg-neutral-800 text-white font-extrabold text-xs py-3 rounded-2xl transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={15} />
            <span>{isGenerating ? "Rendering Passport..." : "Update & Render Passport"}</span>
          </button>
        </div>

        {/* Live Card Preview */}
        {previewDataUrl && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold text-[#141519] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#FF6859]" />
                <span>9:16 Instagram Story Preview</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-500">1080 × 1920 HD</span>
            </div>

            <div className="relative w-full aspect-[9/16] rounded-[26px] overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewDataUrl}
                alt="Pujor Passport Card"
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleDownload}
                className="bg-white hover:bg-neutral-50 border border-neutral-200 text-[#141519] font-bold text-xs py-3 rounded-2xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download size={15} />
                <span>Save Image</span>
              </button>
              <button
                onClick={handleShareStory}
                className="bg-gradient-to-r from-[#FF6E5A] to-[#FFA17E] text-white font-black text-xs py-3 rounded-2xl transition-transform active:scale-98 flex items-center justify-center gap-1.5 shadow-md shadow-red-200 cursor-pointer"
              >
                <Share2 size={15} />
                <span>Share Story</span>
              </button>
            </div>
          </div>
        )}

        {/* Bridge to Weekend Engine */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100 text-center">
          <div className="w-10 h-10 rounded-full bg-[#FFF4F2] text-[#FF6859] flex items-center justify-center mx-auto mb-2">
            <Sparkles size={20} />
          </div>
          <h4 className="text-sm font-extrabold text-[#141519]">
            Pujo is done, but the weekend isn&apos;t!
          </h4>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Discover upcoming live gigs, artisan cafes & weekend circuits across Kolkata.
          </p>
          <Link
            href="/events"
            className="mt-3.5 inline-flex items-center gap-1.5 bg-[#141519] text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <span>Explore Events</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Floating Bottom Navigation */}
      <BottomNavbar />
    </main>
  );
}
