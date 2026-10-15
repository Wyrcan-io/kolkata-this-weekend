"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import BottomNavbar from "./components/BottomNavbar";
import { KolkataEvent, EventSubmission, WhatsAppPoll } from "../lib/types";
import { INITIAL_EVENTS } from "../lib/data";

export interface LocationInfo {
  area: string;
  subArea: string;
}

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  savedItems: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Dynamic Events & Admin
  allEvents: KolkataEvent[];
  submissions: EventSubmission[];
  addSubmission: (submission: Omit<EventSubmission, "id" | "status" | "submittedAt">) => void;
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string) => void;
  // WhatsApp Polls
  polls: Record<string, WhatsAppPoll>;
  createPoll: (title: string, targetDate: string, eventIds: string[]) => string;
  votePoll: (pollId: string, optionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [savedItems, setSavedItems] = useState<string[]>(["skinny-mos-jazz", "sienna-pottery-workshop"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState<KolkataEvent[]>(INITIAL_EVENTS);
  const [submissions, setSubmissions] = useState<EventSubmission[]>([
    {
      id: "sub-seed-1",
      title: "Gariahat Rooftop Standup Trials",
      category: "theatre",
      zone: "South Kolkata",
      venueName: "Madox Corner Loft",
      neighborhood: "Ballygunge",
      dayType: "Saturday",
      timeStr: "8:00 PM",
      priceLabel: "₹250 entry",
      outboundUrl: "https://instagram.com/madoxcomedy",
      contactInfo: "9830123456",
      status: "pending",
      submittedAt: "Just now",
    },
  ]);
  const [polls, setPolls] = useState<Record<string, WhatsAppPoll>>({
    "sat-crew-plan": {
      id: "sat-crew-plan",
      title: "Saturday Evening Plan! 🍻",
      targetDate: "This Saturday (Oct 18)",
      createdBy: "Abhirup",
      totalVotes: 3,
      createdAt: "Today",
      options: [
        {
          id: "opt-1",
          title: "The Monsoon Quartet Live Jazz",
          venue: "Skinny Mo's, Southern Ave",
          timeStr: "7:30 PM",
          category: "Live Music",
          votes: 2,
        },
        {
          id: "opt-2",
          title: "Terracotta Pottery Masterclass",
          venue: "Sienna Store & Cafe",
          timeStr: "3:30 PM",
          category: "Workshop",
          votes: 1,
        },
      ],
    },
  });

  const [location, setLocation] = useState<LocationInfo>({
    area: "South Kolkata",
    subArea: "Southern Avenue & Park St",
  });

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem("ktw_saved_events");
      if (storedSaved) {
        setSavedItems(JSON.parse(storedSaved));
      }
      const storedTheme = localStorage.getItem("ktw_theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      }
      const storedSubmissions = localStorage.getItem("ktw_submissions");
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }
      const storedPolls = localStorage.getItem("ktw_polls");
      if (storedPolls) {
        setPolls(JSON.parse(storedPolls));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ktw_theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("ktw_saved_events", JSON.stringify(updated));
      } catch {}
      showToast(exists ? "Removed from Shortlist" : "Saved to Weekend Shortlist! ❤️");
      return updated;
    });
  };

  const isSaved = (id: string) => savedItems.includes(id);

  // Submission pipeline
  const addSubmission = (sub: Omit<EventSubmission, "id" | "status" | "submittedAt">) => {
    const newSub: EventSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      status: "pending",
      submittedAt: "Just now",
    };
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem("ktw_submissions", JSON.stringify(updated));
    } catch {}
    showToast("Event submitted! Pending 1-click admin approval.");
  };

  const approveSubmission = (id: string) => {
    const target = submissions.find((s) => s.id === id);
    if (!target) return;

    // Convert to live event
    const newEvent: KolkataEvent = {
      id: `live-${Date.now()}`,
      title: target.title,
      slug: target.title.toLowerCase().replace(/\s+/g, "-"),
      summary: `Submitted by community organizer for ${target.neighborhood}.`,
      category: target.category,
      categoryLabel: target.category.toUpperCase(),
      categoryIcon: target.category === "music" ? "🎵" : target.category === "workshops" ? "🎨" : "🎭",
      vibe: "Community Verified",
      zone: target.zone,
      neighborhood: target.neighborhood,
      venueName: target.venueName,
      venueAddress: target.venueName + ", " + target.neighborhood,
      dayType: target.dayType,
      timeStr: target.timeStr,
      isTonight: target.dayType === "Friday",
      isSaturday: target.dayType === "Saturday",
      isSunday: target.dayType === "Sunday",
      isFree: target.priceLabel.toLowerCase().includes("free"),
      priceLabel: target.priceLabel,
      priceAmount: 0,
      coverImage: target.flyerImage || "/images/concert_summer.jpg",
      outboundUrl: target.outboundUrl,
      outboundType: target.outboundUrl.includes("instagram") ? "instagram" : "bookmyshow",
      outboundLabel: "View Details & Entry ↗",
      isFeatured: false,
      attendeesCount: 1,
      tags: ["Community Pick", target.neighborhood],
    };

    setAllEvents((prev) => [newEvent, ...prev]);
    const updatedSubs = submissions.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s));
    setSubmissions(updatedSubs);
    try {
      localStorage.setItem("ktw_submissions", JSON.stringify(updatedSubs));
    } catch {}
    showToast(`Approved "${target.title}"! Now live on feed.`);
  };

  const rejectSubmission = (id: string) => {
    const updatedSubs = submissions.map((s) => (s.id === id ? { ...s, status: "rejected" as const } : s));
    setSubmissions(updatedSubs);
    try {
      localStorage.setItem("ktw_submissions", JSON.stringify(updatedSubs));
    } catch {}
    showToast("Submission rejected.");
  };

  // WhatsApp Poll Generator
  const createPoll = (title: string, targetDate: string, eventIds: string[]): string => {
    const pollId = `poll-${Date.now().toString(36)}`;
    const selectedEvents = allEvents.filter((e) => eventIds.includes(e.id));
    
    const newPoll: WhatsAppPoll = {
      id: pollId,
      title: title || "Weekend Plan with Friends! 🎉",
      targetDate: targetDate || "This Weekend",
      createdBy: "You",
      totalVotes: 0,
      createdAt: "Today",
      options: selectedEvents.map((evt, idx) => ({
        id: `opt-${idx + 1}`,
        title: evt.title,
        venue: evt.venueName,
        timeStr: evt.timeStr,
        category: evt.categoryLabel,
        votes: 0,
      })),
    };

    const updatedPolls = { ...polls, [pollId]: newPoll };
    setPolls(updatedPolls);
    try {
      localStorage.setItem("ktw_polls", JSON.stringify(updatedPolls));
    } catch {}
    showToast("WhatsApp Group Poll Created! 🎉");
    return pollId;
  };

  const votePoll = (pollId: string, optionId: string) => {
    const poll = polls[pollId];
    if (!poll) return;

    const updatedOptions = poll.options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    const updatedPoll: WhatsAppPoll = {
      ...poll,
      totalVotes: poll.totalVotes + 1,
      options: updatedOptions,
    };

    const updatedPolls = { ...polls, [pollId]: updatedPoll };
    setPolls(updatedPolls);
    try {
      localStorage.setItem("ktw_polls", JSON.stringify(updatedPolls));
    } catch {}
    showToast("Vote recorded! 🗳️");
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        savedItems,
        toggleSave,
        isSaved,
        location,
        setLocation,
        toastMessage,
        showToast,
        allEvents,
        submissions,
        addSubmission,
        approveSubmission,
        rejectSubmission,
        polls,
        createPoll,
        votePoll,
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-300 relative ${
          isDarkMode ? "dark bg-[#090a0f]" : "bg-[#fbfbfb]"
        }`}
      >
        {/* Floating Toast Alert */}
        {toastMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-[#b51f2a] text-white px-4 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-red-400/30">
              <span>✨</span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        <div className="animate-page-enter">
          {children}
        </div>

        <BottomNavbar />
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
