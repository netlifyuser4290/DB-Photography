
import Link from "next/link";
import Image from "next/image";

// Define the Photo type based on Cloudinary's API response
export interface Photo {
  secure_url: string;
  context?: {
    custom?: {
      category?: string;
      show_in_recent?: string;
    };
  };
}


interface HomeGalleryProps {
  photos: Photo[];
}

const CATEGORIES = [
  { id: "wedding", title: "Wedding Photography", desc: "Your Love Story, Perfectly Told" },
  { id: "pre-wedding", title: "Pre-Wedding Photography", desc: "The Journey Begins" },
  { id: "maternity-baby", title: "Maternity & Baby Shoots", desc: "Cherishing Every Milestone" },
  { id: "product", title: "Product Photography", desc: "Elevate Your Brand" },
  { id: "modeling", title: "Modeling", desc: "Showcase Your Best Self" },
  { id: "interior", title: "Interior", desc: "Showcase Your Best Self" },
];

export default function HomeGallery({ photos }: HomeGalleryProps) {
  const getPhotoForCategory = (categoryId: string) => {
    const categoryPhotos = photos.filter(p => p.context?.custom?.category === categoryId);
    return categoryPhotos[0] ?? photos.find(p => p.context?.custom?.show_in_recent === 'true') ?? null;
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => {
            const photo = getPhotoForCategory(category.id);
            return (
              <div key={category.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                <Link href={`/gallery?category=${category.id}`}>
                  {photo ? (
                    <Image
                      src={photo.secure_url}
                      alt={category.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-display mb-2">{category.title}</h3>
                      <p className="text-lg">{category.desc}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
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
