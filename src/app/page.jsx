'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import OffersSection from "../../components/OfferSection";
import ReviewSection from "../../components/Review";
import EventSection from "../../components/EventSection";
import PackageCard from "../../components/ui/packageCard";

export default function Home() {
  const [hajjPackages, setHajjPackages] = useState([]);
  const [umrahPackages, setUmrahPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages');
        // Filter packages based on category field from your database
        setHajjPackages(res.data.filter(pkg => pkg.category === 'Hajj'));
        setUmrahPackages(res.data.filter(pkg => pkg.category === 'Umrah'));
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Handler for navigation
  const handlePackageClick = (category, id) => {
    // Navigates to /site/Hajj/[id] or /site/Umrah/[id]
    router.push(`/site/${category}/${id}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <Hero />
      <OffersSection />
      <EventSection />

      {/* HAJJ PACKAGES SECTION */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              Our Hajj <span className="text-[#64B5F6]">Packages</span>
            </h2>
            <div className="h-1 w-20 bg-[#64B5F6] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {hajjPackages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                title={pkg.title}
                price={pkg.price}
                duration={pkg.duration}
                inclusions={pkg.inclusions}
                ctaLabel="More Details"
                onClick={() => handlePackageClick('Hajj', pkg._id)}
              />
            ))}
          </div>
          {!loading && hajjPackages.length === 0 && (
            <p className="text-center text-gray-500 py-10">No Hajj packages available at the moment.</p>
          )}
        </div>
      </section>

      {/* UMRAH PACKAGES SECTION */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-[#fcfdfd]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              Our Umrah <span className="text-[#64B5F6]">Packages</span>
            </h2>
            <div className="h-1 w-20 bg-[#64B5F6] mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {umrahPackages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                title={pkg.title}
                price={pkg.price}
                duration={pkg.duration}
                inclusions={pkg.inclusions}
                ctaLabel="More Details"
                onClick={() => handlePackageClick('Umrah', pkg._id)}
              />
            ))}
          </div>
          {!loading && umrahPackages.length === 0 && (
            <p className="text-center text-gray-500 py-10">No Umrah packages available at the moment.</p>
          )}
        </div>
      </section>

      <ReviewSection />
      <Footer />
    </div>
  );
}