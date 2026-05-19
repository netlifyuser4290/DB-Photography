
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Dhruv Badlawala',
    role: 'Founder & Lead Photographer',
    bio: 'With over 6 years of experience in wedding and commercial photography, Dhruv has an eye for detail and a passion for capturing the essence of every moment. His work is a blend of traditional techniques and modern innovation, creating images that are both timeless and unique.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Preet Patel',
    role: 'Lead Photographer',
    bio: 'Specializing in wedding photography for the past 4 years, Preet has a natural talent for capturing the beauty and emotion of your special day. His approach is unobtrusive, allowing him to capture candid moments that truly reflect the joy and love of the occasion.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Chikki',
    role: 'Product Photographer',
    bio: 'With over 5 years of experience in product photography, Chikki is the creative force behind our commercial product shoots. His expertise lies in highlighting the unique features of each product, creating images that stand out in a competitive market.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Team() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-gray-800">Meet Our Creative Team</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We are a team of passionate photographers dedicated to capturing your most precious moments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative text-center">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-xl shadow-xl p-6 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:-bottom-16">
                <h3 className="text-2xl font-display text-gray-800 mb-2">{member.name}</h3>
                <p className="text-accent font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
