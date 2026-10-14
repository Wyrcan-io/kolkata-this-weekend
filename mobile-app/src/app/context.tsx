"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import BottomNavbar from "./components/BottomNavbar";

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [savedItems, setSavedItems] = useState<string[]>(["dandiya", "csm"]);
  const [location, setLocation] = useState<LocationInfo>({
    area: "Action Area III",
    subArea: "New Town, Kolkata",
  });
  const pathname = usePathname();

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const toggleSave = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedItems.includes(id);

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
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-300 relative ${
          isDarkMode ? "dark bg-[#090a0f]" : "bg-[#fbfbfb]"
        }`}
      >
        {/* Animated Page Transition Container triggered by pathname changes */}
        <div key={pathname} className="animate-page-enter">
          {children}
        </div>

        {/* Global Fixed Floating Bottom Navbar: clean centered island without BMS or District */}
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
