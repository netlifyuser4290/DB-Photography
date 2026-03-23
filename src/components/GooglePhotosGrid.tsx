"use client";

import { useState } from "react";
import type { Photo } from "@/lib/supabase";
import Lightbox from "./Lightbox";
import "./GooglePhotosGrid.css";

interface GooglePhotosGridProps {
  photos: Photo[];
  categoryFilter?: string;
}

const CATEGORIES = ["all", "wedding", "portrait", "landscape", "street", "events", "general"];

export default function GooglePhotosGrid({ photos, categoryFilter }: GooglePhotosGridProps) {
  const [filter, setFilter] = useState(categoryFilter || "all");
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filtered =
    filter === "all" ? photos : photos.filter((p) => (p.category || "general").toLowerCase() === filter);

  if (photos.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p className="text-lg">No photos yet. Add some from the admin panel.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat ? "bg-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="google-photos-grid">
        {filtered.map((photo) => (
          <PhotoTile key={photo.id} photo={photo} onClick={() => setLightboxPhoto(photo)} />
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

function PhotoTile({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [span, setSpan] = useState<"landscape" | "portrait-tall" | null>(null);

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect > 1.2) setSpan("landscape");
    else if (aspect < 0.7) setSpan("portrait-tall");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`google-photo-tile ${span || ""}`}
    >
      <img
        src={photo.image_url}
        alt={photo.title || "Photo"}
        className="w-full h-full object-cover block"
        loading="lazy"
        onLoad={handleLoad}
      />
    </button>
  );
}
