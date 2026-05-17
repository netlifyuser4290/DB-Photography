
'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { Photo } from "@/types";

async function getPhotos() {
  const res = await fetch('/api/admin/photos');
  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }
  const data = await res.json();
  return data.resources;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos().then(setPhotos);
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-8 py-12">
        <h1 className="font-display text-4xl text-center text-charcoal mb-16 relative">
          Gallery
          <span className="block w-[60px] h-[3px] bg-accent mx-auto mt-4" />
        </h1>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo: Photo) => (
            <div key={photo.public_id} className="break-inside-avoid">
              <img
                src={photo.secure_url}
                alt={photo.context?.title || "DB-Studio photo"}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
