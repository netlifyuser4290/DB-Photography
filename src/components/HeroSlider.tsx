"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Photo } from "@/lib/supabase";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
];

interface HeroSliderProps {
  photos?: Photo[];
}

export default function HeroSlider({ photos = [] }: HeroSliderProps) {
  const heroImages =
    photos.length >= 3
      ? photos.slice(0, 6).map((p) => p.image_url)
      : FALLBACK_IMAGES;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  function next() {
    setIndex((i) => (i + 1) % heroImages.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  }

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center text-white bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('${heroImages[index]}')`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="relative z-[2] w-full h-full flex items-center justify-center">
        <button
          type="button"
          onClick={prev}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-[3] text-2xl"
          aria-label="Previous"
        >
          &#10094;
        </button>
        <div className="text-center max-w-[800px] px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up text-white">
            Capturing Timeless Moments
          </h1>
          <p
            className="text-xl mb-10 max-w-[600px] mx-auto animate-fade-in-up text-white"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Professional photography for weddings, portraits, events & commercial projects. Your
            story, beautifully told.
          </p>
          <Link
            href="#gallery"
            className="inline-block bg-gradient-to-r from-accent to-accent-dark text-white py-4 px-12 rounded-[50px] font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            View My Work
          </Link>
        </div>
        <button
          type="button"
          onClick={next}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all z-[3] text-2xl"
          aria-label="Next"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}
