
import { cloudinary } from "@/lib/cloudinary";
import Header from "@/components/Header";
import { Photo } from "../admin/page";

async function getPhotos() {
  const { resources } = await cloudinary.api.resources({
    type: "upload",
    prefix: "db-studio",
    max_results: 100,
  });
  resources.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return resources;
}

export default async function GalleryPage() {
  const photos = await getPhotos();

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
