import Link from "next/link";
import type { Photo } from "@/lib/supabase";

interface HomeGalleryProps {
  photos: Photo[];
}

const CATEGORIES = [
  { id: "wedding", title: "Wedding Moments", desc: "Romantic wedding photography", icon: "fa-heart" },
  { id: "portrait", title: "Portrait Sessions", desc: "Professional headshots & portraits", icon: "fa-user" },
  { id: "events", title: "Corporate Events", desc: "Business events & conferences", icon: "fa-briefcase" },
  { id: "landscape", title: "Landscape", desc: "Stunning scenery & nature", icon: "fa-mountain-sun" },
  { id: "street", title: "Street Photography", desc: "Urban moments & candid shots", icon: "fa-city" },
  { id: "general", title: "Lifestyle Shoots", desc: "Candid lifestyle photography", icon: "fa-camera" },
];

export default function HomeGallery({ photos }: HomeGalleryProps) {
  // Get one photo per category for preview, or use first 6 photos
  const getPhotosForPreview = () => {
    if (photos.length === 0) return CATEGORIES.map((c) => ({ ...c, imageUrl: null }));
    const byCategory: Record<string, Photo> = {};
    for (const p of photos) {
      const cat = (p.category || "general").toLowerCase();
      if (!byCategory[cat]) byCategory[cat] = p;
    }
    return CATEGORIES.map((c) => ({
      ...c,
      imageUrl: byCategory[c.id]?.image_url ?? photos[CATEGORIES.indexOf(c) % photos.length]?.image_url ?? null,
    }));
  };

  const previewItems = getPhotosForPreview();

  return (
    <section id="gallery" className="py-[120px] bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="font-display text-4xl text-center mb-16 text-charcoal relative">
          Recent Work
          <span className="block w-[60px] h-[3px] bg-accent mx-auto mt-4" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              href={`/gallery?category=${item.id}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-[20px] shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-400 hover:-translate-y-4 hover:shadow-[0_35px_70px_rgba(0,0,0,0.25)] cursor-pointer">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-[350px] object-cover transition-transform duration-400 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-[350px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-6xl text-gray-400">
                      {item.icon === "fa-heart" && "❤"}
                      {item.icon === "fa-user" && "👤"}
                      {item.icon === "fa-briefcase" && "💼"}
                      {item.icon === "fa-mountain-sun" && "🏔"}
                      {item.icon === "fa-city" && "🏙"}
                      {item.icon === "fa-camera" && "📷"}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white py-10 px-8 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <div className="font-display text-2xl mb-2">{item.title}</div>
                  <div className="text-white/90">{item.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-gradient-to-r from-accent to-accent-dark text-white py-3 px-8 rounded-[50px] font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 transition-all"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
