"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import AppHeader from "./AppHeader";

interface HeroSlideItem {
  id: string;
  imageSrc: string;
  alt: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "hero-main",
    imageSrc: "/images/kolkata-hero-16-9.jpg",
    alt: "Kolkata This Weekend - Weekend City Guide & Passes",
  },
  {
    id: "hero-your-weekend",
    imageSrc: "/images/hero-your-weekend.jpg",
    alt: "Your Weekend. Your Kolkata. Follow Kolkata This Weekend for your next city adventure.",
  },
  {
    id: "hero-always-happening",
    imageSrc: "/images/hero-always-happening.jpg",
    alt: "There's Always Something Happening. We help you discover.",
  },
  {
    id: "hero-make-it-count",
    imageSrc: "/images/hero-make-it-count.jpg",
    alt: "Make Every Weekend Count. Turn ordinary days into unforgettable experiences.",
  },
];

// Infinite track with cloned boundary slides [CloneLast, ...Originals, CloneFirst]
const EXTENDED_SLIDES: HeroSlideItem[] = [
  { ...HERO_SLIDES[HERO_SLIDES.length - 1], id: "clone-prev" },
  ...HERO_SLIDES,
  { ...HERO_SLIDES[0], id: "clone-next" },
];

export default function HeroCarousel() {
  // Start at index 1 (which maps to the first original slide)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isInteracting = useRef(false);

  const totalOriginals = HERO_SLIDES.length;

  // Active indicator dot index (0 to 3)
  const activeDotIndex = (currentIndex - 1 + totalOriginals) % totalOriginals;

  const handleNext = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // When transition finishes on a clone, seamlessly jump to the real slide without animation
  const handleTransitionEnd = () => {
    if (currentIndex >= EXTENDED_SLIDES.length - 1) {
      // Reached next clone -> instantly jump to first real slide (index 1)
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached prev clone -> instantly jump to last real slide (index totalOriginals)
      setWithTransition(false);
      setCurrentIndex(totalOriginals);
    }
  };

  // Re-enable transition on the next tick after instantaneous jump
  useEffect(() => {
    if (!withTransition) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [withTransition]);

  // Smooth Auto-advance timer (every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe gestures for fluid manual scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    isInteracting.current = true;
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minDistance = 45;

      if (diff > minDistance) {
        handleNext();
      } else if (diff < -minDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    isInteracting.current = false;
    setIsPaused(false);
  };

  return (
    <section
      className="relative w-full aspect-[16/9] overflow-hidden m-0 p-0 border-none select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Kolkata This Weekend Highlights Auto Carousel"
    >
      {/* Infinite Smooth Carousel Track */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex w-full h-full will-change-transform ${
          withTransition
            ? "transition-transform duration-[1050ms] ease-[cubic-bezier(0.25,1,0.4,1)]"
            : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {EXTENDED_SLIDES.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="relative w-full h-full flex-shrink-0 min-w-full overflow-hidden"
          >
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 100vw, 440px"
              className="object-cover"
              priority={index <= 2}
            />
          </div>
        ))}
      </div>

      {/* Transparent Navigation Header placed directly on top of the carousel */}
      <AppHeader />

      {/* Subtle Bottom Slide Indicator Pills */}
      <div className="absolute bottom-2.5 left-0 right-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setWithTransition(true);
              setCurrentIndex(idx + 1);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              activeDotIndex === idx
                ? "w-6 h-1.5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
                : "w-1.5 h-1.5 bg-white/45 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
