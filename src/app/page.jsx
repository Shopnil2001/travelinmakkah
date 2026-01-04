'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import OffersSection from "../../components/OfferSection";
import ReviewSection from "../../components/Review";
import EventSection from "../../components/EventSection";
import PackageCard from "../../components/ui/packageCard";
import HajjServicesSection from "../../components/HajjServicesSection";
import SearchPanel from "../../components/SearchPanel";

export default function Home() {
  const [hajjPackages, setHajjPackages] = useState([]);
  const [umrahPackages, setUmrahPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages');
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

  const handlePackageClick = (category, id) => {
    router.push(`/site/${category}/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <OffersSection />

      {/* Book Flights & Hotels Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23C9A962' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Travel Essentials
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
              Book Flights & <span className="text-[#C9A962]">Hotels</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
              Find the best flights and accommodations for your sacred journey to Makkah and Madinah
            </p>
          </motion.div>

          <SearchPanel variant="compact" />
        </div>
      </section>

      <EventSection />

      {/* Shared Packages Container - Hajj & Umrah */}
      <div className="relative overflow-hidden">
        {/* Shared Background Pattern */}
        <div
          className="absolute inset-0 bg-repeat bg-center opacity-100"
          style={{ backgroundImage: "url('/hajj new-bg.png')" }}
        />
        {/* Warm Premium Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-white/90 to-[#FAF8F5]/95" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white/60" />

        {/* Hajj Packages Section */}
        <section className="relative py-20 lg:py-28 px-6 md:px-12 lg:px-20">
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Sacred Pilgrimage
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
                Our Hajj <span className="text-[#C9A962]">Packages</span>
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
                Choose from our carefully curated Hajj packages designed for a spiritually enriching experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {hajjPackages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    duration={pkg.duration}
                    inclusions={pkg.inclusions}
                    ctaLabel="View Details"
                    onClick={() => handlePackageClick('Hajj', pkg._id)}
                  />
                </motion.div>
              ))}
            </div>

            {!loading && hajjPackages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#6B7280]">No Hajj packages available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Umrah Packages Section */}
        <section className="relative py-20 lg:py-28 px-6 md:px-12 lg:px-20">
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[#1E3A5F] font-semibold text-sm uppercase tracking-[0.2em] mb-4">
                Year-Round Pilgrimage
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
                Our Umrah <span className="text-[#C9A962]">Packages</span>
              </h2>
              <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
                Flexible Umrah packages available throughout the year for your spiritual journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {umrahPackages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    duration={pkg.duration}
                    inclusions={pkg.inclusions}
                    ctaLabel="View Details"
                    onClick={() => handlePackageClick('Umrah', pkg._id)}
                  />
                </motion.div>
              ))}
            </div>

            {!loading && umrahPackages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#6B7280]">No Umrah packages available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <HajjServicesSection />

      <ReviewSection />
      <Footer />
    </div>
  );
}
