"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { useApp } from "../context";

interface NotificationItem {
  id: string;
  category: "VIP Passes" | "Movies" | "Traffic & Pandals" | "Events" | "Civic";
  badge: string;
  badgeColor: string;
  title: string;
  message: string;
  time: string;
  actionText: string;
  actionLink: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    category: "VIP Passes",
    badge: "14 Passes Left",
    badgeColor: "bg-red-600 text-white",
    title: "South Kolkata VIP Sharad Samman Fast Filling",
    message:
      "Priority digital wristband allocations for Ekdalia Evergreen & Singhi Park are 86% claimed for Saptami & Ashtami evenings.",
    time: "10 mins ago",
    actionText: "Reserve Pass",
    actionLink: "/vip-pass",
    read: false,
  },
  {
    id: "n2",
    category: "Movies",
    badge: "Midnight Screening",
    badgeColor: "bg-purple-600 text-white",
    title: "Chainsaw Man 11:55 PM Show Added at INOX Quest",
    message:
      "Hall 3 opened following an immediate sell-out across all South City and Quest weekend slots. Digital M-tickets live now.",
    time: "42 mins ago",
    actionText: "Book Seats",
    actionLink: "/movies",
    read: false,
  },
  {
    id: "n3",
    category: "Traffic & Pandals",
    badge: "Kolkata Police Advisory",
    badgeColor: "bg-amber-600 text-white",
    title: "Rashbehari Avenue to Gariahat One-Way Diversion",
    message:
      "One-way grid in effect starting 5:00 PM for Tridhara & Singhi Park pandal setups. Commuters advised to utilize Southern Avenue corridor.",
    time: "2 hours ago",
    actionText: "View Route",
    actionLink: "/events",
    read: false,
  },
  {
    id: "n4",
    category: "Events",
    badge: "Tonight 7 PM",
    badgeColor: "bg-emerald-600 text-white",
    title: "Taaza Dandiya Raas Gates Open 6:30 PM",
    message:
      "Biswa Bangla Mela Prangan: parking entry allocated via Gate 2. Traditional attire recommended for arena dance circles.",
    time: "3 hours ago",
    actionText: "Event Details",
    actionLink: "/events",
    read: true,
  },
  {
    id: "n5",
    category: "Civic",
    badge: "Weather Dispatch",
    badgeColor: "bg-sky-600 text-white",
    title: "Pleasant Autumn Breeze Forecasted",
    message:
      "Clear evening skies with comfortable 25°C temperatures expected across Kolkata's northern and southern pandal trails tonight.",
    time: "Yesterday",
    actionText: "Plan Circuit",
    actionLink: "/planner",
    read: true,
  },
];

export default function NotificationsPage() {
  const { isDarkMode } = useApp();
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>("All");

  const unreadCount = items.filter((item) => !item.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const markSingleRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  return (
    <main
      className={`w-full max-w-[440px] min-h-screen mx-auto pb-32 relative font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-[#090a0f] text-white" : "bg-[#fbfbfb] text-neutral-900"
      }`}
    >
      <AppHeader
        title="Live Dispatch"
        subtitle={unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up"}
        showBackButton={true}
      />

      {/* Header Actions */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Weekend Newsroom Wire
        </span>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-bold text-[#c6121f] hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 px-5 py-2 overflow-x-auto scrollbar-none">
        {["All", "VIP Passes", "Movies", "Traffic & Pandals", "Events", "Civic"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filter === cat
                ? "bg-[#c6121f] text-white shadow-xs"
                : isDarkMode
                ? "bg-[#141622] text-neutral-400 hover:text-white border border-neutral-800"
                : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 shadow-2xs"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <section className="px-5 py-3 space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => markSingleRead(item.id)}
            className={`p-4 rounded-2xl border transition-all ${
              !item.read
                ? isDarkMode
                  ? "bg-[#141622] border-red-900/40 shadow-sm"
                  : "bg-red-50/30 border-red-200/60 shadow-xs"
                : isDarkMode
                ? "bg-[#12141c]/60 border-neutral-800/80"
                : "bg-white border-neutral-200/70"
            }`}
          >
            {/* Top Meta */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${item.badgeColor}`}>
                  {item.badge}
                </span>
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#c6121f] animate-pulse" />
                )}
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">{item.time}</span>
            </div>

            {/* Title & Message */}
            <h3 className={`text-[13.5px] font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
              {item.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.message}</p>

            {/* Action Link */}
            <div className="mt-3 pt-2.5 border-t border-neutral-700/20 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {item.category}
              </span>
              <Link
                href={item.actionLink}
                className="text-xs font-bold text-[#c6121f] flex items-center gap-1 no-underline hover:underline"
              >
                <span>{item.actionText}</span>
                <span>&gt;</span>
              </Link>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-sm font-semibold">No alerts in this category</p>
            <p className="text-xs mt-1 text-neutral-500">Check back closer to Friday evening</p>
          </div>
        )}
      </section>
    </main>
  );
}
