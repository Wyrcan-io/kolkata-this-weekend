"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import {
  Bell,
  Ticket,
  Film,
  AlertTriangle,
  Calendar,
  CloudSun,
  CheckCheck,
  ArrowRight,
  Clock,
} from "lucide-react";

interface NotificationItem {
  id: string;
  category: "VIP Passes" | "Movies" | "Traffic & Pandals" | "Events" | "Civic";
  badge: string;
  title: string;
  message: string;
  time: string;
  actionText: string;
  actionLink: string;
  read: boolean;
  icon: any;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    category: "VIP Passes",
    badge: "14 Passes Left",
    title: "South Kolkata VIP Sharad Samman Fast Filling",
    message:
      "Priority digital wristband allocations for Ekdalia Evergreen & Singhi Park are 86% claimed for Saptami & Ashtami evenings.",
    time: "10 mins ago",
    actionText: "Reserve Pass",
    actionLink: "/vip-pass",
    read: false,
    icon: Ticket,
  },
  {
    id: "n2",
    category: "Movies",
    badge: "Midnight Screening",
    title: "Chainsaw Man 11:55 PM Show Added at INOX Quest",
    message:
      "Hall 3 opened following an immediate sell-out across all South City and Quest weekend slots. Digital M-tickets live now.",
    time: "42 mins ago",
    actionText: "Book Seats",
    actionLink: "/movies",
    read: false,
    icon: Film,
  },
  {
    id: "n3",
    category: "Traffic & Pandals",
    badge: "Kolkata Police Advisory",
    title: "Rashbehari Avenue to Gariahat One-Way Diversion",
    message:
      "One-way grid in effect starting 5:00 PM for Tridhara & Singhi Park pandal setups. Commuters advised to utilize Southern Avenue corridor.",
    time: "2 hours ago",
    actionText: "View Route",
    actionLink: "/events",
    read: false,
    icon: AlertTriangle,
  },
  {
    id: "n4",
    category: "Events",
    badge: "Tonight 7 PM",
    title: "Taaza Dandiya Raas Gates Open 6:30 PM",
    message:
      "Biswa Bangla Mela Prangan: parking entry allocated via Gate 2. Traditional attire recommended for arena dance circles.",
    time: "3 hours ago",
    actionText: "Event Details",
    actionLink: "/events",
    read: true,
    icon: Calendar,
  },
  {
    id: "n5",
    category: "Civic",
    badge: "Weather Dispatch",
    title: "Pleasant Autumn Breeze Forecasted",
    message:
      "Clear evening skies with comfortable 25°C temperatures expected across Kolkata's northern and southern pandal trails tonight.",
    time: "Yesterday",
    actionText: "Plan Circuit",
    actionLink: "/planner",
    read: true,
    icon: CloudSun,
  },
];

export default function NotificationsPage() {
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
    <div className="w-full min-h-screen bg-[#ecefed] text-[#1a1d20] flex flex-col font-sans select-none overflow-x-hidden">
      <main className="w-full max-w-[440px] mx-auto min-h-screen flex flex-col justify-start relative px-4 sm:px-5 pb-36">
        <AppHeader
          title="live dispatch"
          subtitle={unreadCount > 0 ? `${unreadCount} unread dispatches` : "all caught up"}
          showBackButton={true}
          rightAction={
            unreadCount > 0 ? (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] font-bold text-[#ff6859] hover:underline cursor-pointer px-2 py-1 bg-white rounded-full border border-black/5 shadow-2xs"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            ) : null
          }
        />

        {/* Curation Wire Header */}
        <div className="flex items-center justify-between pt-3 pb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#717882]">
            Weekend Newsroom Wire
          </span>
          <span className="text-[11px] font-semibold text-[#717882] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#ff6859]" />
            <span>Updated live</span>
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 py-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {["All", "VIP Passes", "Movies", "Traffic & Pandals", "Events", "Civic"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#181a1e] text-white shadow-xs"
                  : "bg-white/80 text-[#555d66] hover:bg-white border border-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notification Cards List */}
        <div className="space-y-3 mt-3">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => markSingleRead(item.id)}
                className={`p-4 rounded-[24px] border transition-all duration-300 relative shadow-sm ${
                  !item.read
                    ? "bg-[#181a1e] text-white border-white/10"
                    : "bg-white text-[#1a1d20] border-black/5"
                }`}
              >
                {/* Header row inside card */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        !item.read ? "bg-white/10 text-[#ff8f7d]" : "bg-[#ecefed] text-[#717882]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span
                      className={`text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        !item.read
                          ? "bg-[#ff6859]/25 text-[#ff8f7d] border border-[#ff6859]/30"
                          : "bg-black/5 text-[#717882]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-medium ${!item.read ? "text-neutral-400" : "text-[#717882]"}`}>
                      {item.time}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#f6804a] animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className={`text-[13.5px] font-bold leading-snug mb-1 ${!item.read ? "text-white" : "text-[#1a1d20]"}`}>
                  {item.title}
                </h3>
                <p className={`text-[11.5px] leading-relaxed mb-3 ${!item.read ? "text-neutral-300" : "text-[#555d66]"}`}>
                  {item.message}
                </p>

                {/* Action Link Footer */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${!item.read ? "text-neutral-400" : "text-[#717882]"}`}>
                    {item.category}
                  </span>
                  <Link
                    href={item.actionLink}
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#ff6859] hover:underline no-underline"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
