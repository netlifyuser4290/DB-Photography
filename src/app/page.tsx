
import { v2 as cloudinary } from 'cloudinary';
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeGallery from "@/components/HomeGallery";

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
      <Header />

      <HeroSlider photos={homePagePhotos} />

      {/* About Section */}
      <section id='about' className='py-[120px] bg-gradient-to-br from-gray-50 to-gray-100 text-center'>
        <div className='max-w-[1200px] mx-auto px-8'>
          <h2 className='font-display text-4xl text-charcoal mb-16 relative'>
            About DB Photography
            <span className='block w-[60px] h-[3px] bg-accent mx-auto mt-4' />
          </h2>
          <div className='max-w-[900px] mx-auto'>
            <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
              With years of professional experience, I specialize in creating stunning images that
              capture the true essence of your most cherished moments. Every photograph tells a
              story.
            </p>
            <p className='text-xl text-gray-600 leading-relaxed'>
              From intimate weddings to corporate events, I bring passion, creativity, and technical
              expertise to every shoot.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <HomeGallery photos={recentWorkPhotos} />

      {/* Services Section */}
      <section id='services' className='py-[120px] bg-gray-50'>
        <div className='max-w-[1200px] mx-auto px-8'>
          <h2 className='font-display text-4xl text-center text-charcoal mb-16 relative'>
            Photography Services
            <span className='block w-[60px] h-[3px] bg-accent mx-auto mt-4' />
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12'>
            <div className='bg-white p-10 rounded-[20px] text-center shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-t-4 border-transparent hover:border-accent'>
              <span className='text-5xl text-accent mb-6 block'>❤</span>
              <h3 className='font-display text-2xl mb-4 text-charcoal'>Wedding Photography</h3>
              <p className='text-gray-600'>
                Capturing the magic of your special day with timeless wedding photography.
              </p>
            </div>
            <div className='bg-white p-10 rounded-[20px] text-center shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-t-4 border-transparent hover:border-accent'>
              <span className='text-5xl text-accent mb-6 block'>👤</span>
              <h3 className='font-display text-2xl mb-4 text-charcoal'>Portrait Photography</h3>
              <p className='text-gray-600'>
                Professional portraits that showcase your personality and style.
              </p>
            </div>
            <div className='bg-white p-10 rounded-[20px] text-center shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-t-4 border-transparent hover:border-accent'>
              <span className='text-5xl text-accent mb-6 block'>💼</span>
              <h3 className='font-display text-2xl mb-4 text-charcoal'>Event Photography</h3>
              <p className='text-gray-600'>
                Documenting corporate events, conferences, and social gatherings.
              </p>
            </div>
            <div className='bg-white p-10 rounded-[20px] text-center shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-4 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-t-4 border-transparent hover:border-accent'>
              <span className='text-5xl text-accent mb-6 block'>📦</span>
              <h3 className='font-display text-2xl mb-4 text-charcoal'>Product Photography</h3>
              <p className='text-gray-600'>
                High-quality product images that make your brand stand out.
              </p>
            </div>
          </div>
        </div>
      </section>

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
