
'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Image from 'next/image';

// Define the Photo type based on the expected API response
interface Photo {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: {
      alt?: string;
      show_on_home?: string;
      show_in_recent?: string;
    };
  };
}

async function getPhotos() {
  // Fetch from the correct public photos endpoint
  const res = await fetch('/api/photos');
  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }
  const data = await res.json();
  // Filter photos to only show those marked for the gallery
  return data.resources.filter((photo: Photo) => 
    photo.context?.custom?.show_on_home === 'true' || photo.context?.custom?.show_in_recent === 'true' || photo.context?.custom?.show_in_recent === 'false' || photo.context?.custom?.show_on_home === 'false'
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhotos()
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-8 py-12">
        <h1 className="font-display text-4xl text-center text-charcoal mb-16 relative">
          Gallery
          <span className="block w-[60px] h-[3px] bg-accent mx-auto mt-4" />
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading photos...</p>
        ) : photos.length === 0 ? (
          <p className="text-center text-gray-500">No photos to display. Check the admin panel to add and select photos for the gallery.</p>
        ): (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo: Photo) => (
              <div key={photo.public_id} className="break-inside-avoid">
                <Image
                  src={photo.secure_url}
                  alt={photo.context?.custom?.alt || "DB-Studio photo"}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
