"use client";

import { useState } from "react";
import type { Photo } from "@/lib/supabase";
import Lightbox from "./Lightbox";

interface PhotoGridProps {
  photos: Photo[];
}

const CATEGORIES = [
  "all",
  "portrait",
  "landscape",
  "street",
  "events",
  "wedding",
  "general",
];

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [filter, setFilter] = useState("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filtered =
    filter === "all"
      ? photos
      : photos.filter((p) => p.category?.toLowerCase() === filter);

  if (photos.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-warm/50">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-warm/20 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-warm/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="font-display text-xl text-warm/60">No photos yet</p>
        <p className="text-sm mt-1">Add your work from the admin panel</p>
      </div>
    );
  }

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-accent text-charcoal"
                : "bg-warm/5 text-warm/70 hover:bg-warm/10 hover:text-warm"
            }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
        {filtered.map((photo, i) => (
          <div
            key={photo.id}
            className="gallery-tile break-inside-avoid mb-5 animate-fade-in opacity-0"
            style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s` }}
          >
            <button
              onClick={() => setLightboxPhoto(photo)}
              className="block w-full text-left group"
            >
              <div className="relative overflow-hidden rounded-sm bg-charcoal/50">
                <img
                  src={photo.image_url}
                  alt={photo.title || "Photo"}
                  className="w-full h-auto object-cover aspect-[4/5] sm:aspect-[3/4]"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <span className="font-display text-lg text-white font-medium">
                    {photo.title || "Untitled"}
                  </span>
                  {photo.description && (
                    <span className="text-white/80 text-sm mt-0.5 line-clamp-2">
                      {photo.description}
                    </span>
                  )}
                  <span className="text-accent/90 text-xs mt-2 uppercase tracking-wider">
                    View
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          photos={filtered}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={(p) => setLightboxPhoto(p)}
        />
      )}
    </>
  );
}
