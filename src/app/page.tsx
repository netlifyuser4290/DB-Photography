
import { v2 as cloudinary } from 'cloudinary';
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeGallery from "@/components/HomeGallery";
import Team from "@/components/Team";
import Preloader from "@/components/Preloader";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fetch all photos with context
async function getPhotos() {
  console.log("Attempting to fetch photos from Cloudinary...");
  console.log("Using Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "MISSING");

  try {
    const { resources } = await cloudinary.api.resources({
      type: "upload",
      context: true, // Fetch context data
      max_results: 100,
    });
    console.log(`Found ${resources.length} photos with context.`);
    resources.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return resources;
  } catch (error) {
    console.error("Error fetching photos from Cloudinary:", error);
    return []; // Return an empty array on error
  }
}

export default async function HomePage() {
  const photos = await getPhotos();

  // Filter photos based on their context
  const homePagePhotos = photos.filter(
    (p: any) => p.context?.custom?.show_on_home === 'true'
  );
  const recentWorkPhotos = photos.filter(
    (p: any) => p.context?.custom?.show_in_recent === 'true'
  );

  return (
    <>
      <Preloader />
      <Header />

      <HeroSlider photos={homePagePhotos} />

      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Image Column */}
            <div className="md:w-1/2">
              <div className="relative group">
                <img
                  src={homePagePhotos[0]?.secure_url}
                  alt="DB Photography session"
                  className="rounded-xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Text Column */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-display text-gray-800 mb-6 leading-tight">
                Where Moments <span className="text-accent">Become Art</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that photography is more than just capturing an image; it's about preserving an emotion, a fleeting glance, a timeless story. At DB Photography, we are artisans of light and shadow, dedicated to transforming your most cherished moments into exquisite, heirloom-quality art.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our approach is a symphony of creative vision and technical precision. We meticulously craft each composition, ensuring every photograph is not just a picture, but a masterpiece of personal storytelling.
              </p>
              <a
                href="/gallery"
                className="inline-block bg-accent text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-accent-dark hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Discover Our Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      <HomeGallery photos={recentWorkPhotos} />

      <Team />

      {/* Contact Section */}
      <section id='contact' className='py-[120px] bg-gradient-to-br from-charcoal to-[#1a252f] text-white text-center'>
        <div className='max-w-[700px] mx-auto px-8'>
          <h2 className='font-display text-4xl text-white mb-12'>Contact Me</h2>
          <p className='text-lg mb-12'>
            Ready to capture your special moments? Get in touch to book a session or inquire about
            my services.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12'>
            <div className='p-8 bg-white/5 rounded-2xl backdrop-blur transition-transform hover:-translate-y-1'>
              <span className='text-4xl text-accent block mb-4'>✉</span>
              <p>
                Email:{" "}
                <a href='mailto:dhruvbadlawala@gmail.com' className='text-accent hover:text-white'>
                  dhruvbadlawala@gmail.com
                </a>
              </p>
            </div>
            <div className='p-8 bg-white/5 rounded-2xl backdrop-blur transition-transform hover:-translate-y-1'>
              <span className='text-4xl text-accent block mb-4'>📞</span>
              <p>
                Phone:{" "}
                <a href='tel:+919876543210' className='text-accent hover:text-white'>
                  +91 98765 43210
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-[#1a252f] text-gray-400 text-center py-12 px-8 text-base'>
        <p>
          © {new Date().getFullYear()} DB Photography. All rights reserved. | Designed by Dhruv
          Badlawala |{" "}
          {/* <Link href="/admin" className="text-accent font-semibold hover:text-white">
            Admin
          </Link> */}
        </p>
      </footer>
    </>
  );
}
