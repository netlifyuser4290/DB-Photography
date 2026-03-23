import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Header from "@/components/Header";
import GooglePhotosGrid from "@/components/GooglePhotosGrid";

export const revalidate = 60;

async function getPhotos() {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
  return data ?? [];
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const photos = await getPhotos();

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="text-accent font-medium flex items-center gap-2 hover:text-accent-dark"
            >
              ← Back to Portfolio
            </Link>
          </div>
          <h1 className="font-display text-4xl text-charcoal text-center mb-12">
            {params.category
              ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Gallery`
              : "Photo Gallery"}
          </h1>
          <GooglePhotosGrid photos={photos} categoryFilter={params.category} />
        </div>
      </main>
    </>
  );
}
