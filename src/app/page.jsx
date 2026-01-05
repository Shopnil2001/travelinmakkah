'use client'

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Calendar,
  Users,
  ChevronDown,
  Search,
  Minus,
  Plus,
} from "lucide-react";
import api from "@/lib/api";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import OffersSection from "../../components/OfferSection";
import ReviewSection from "../../components/Review";
import EventSection from "../../components/EventSection";
import PackageCard from "../../components/ui/packageCard";
import HajjServicesSection from "../../components/HajjServicesSection";

// Date Input Component
const DateInput = ({ label, value, onChange, min }) => (
  <div className="flex-1 min-w-0">
    <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
      {label}
    </label>
    <div className="relative">
      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962] pointer-events-none" />
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        required
        className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
      />
    </div>
  </div>
);

// Passenger Dropdown Component
const PassengerDropdown = ({
  showPassengers,
  setShowPassengers,
  passengers,
  updatePassengers,
  passengersRef,
}) => {
  const totalGuests = passengers.adults + passengers.children;

  return (
    <div className="relative" ref={passengersRef}>
      <button
        type="button"
        onClick={() => setShowPassengers(!showPassengers)}
        className="w-full flex items-center gap-3 px-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] hover:border-[#1E3A5F] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
      >
        <Users className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
        <span className="flex-1 text-left truncate">
          {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
          {passengers.children > 0 && ` (${passengers.children} Child${passengers.children > 1 ? 'ren' : ''})`}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#6B7280] flex-shrink-0 transition-transform duration-200 ${
            showPassengers ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {showPassengers && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-[#E8E3DA] shadow-[0_12px_40px_rgba(30,58,95,0.15)] p-4 min-w-[280px] z-50"
          >
            {/* Adults */}
            <div className="flex items-center justify-between py-3 border-b border-[#E8E3DA]">
              <div>
                <p className="font-semibold text-[#2D3339]">Adults</p>
                <p className="text-sm text-[#6B7280]">Age 18+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updatePassengers("adults", -1)}
                  disabled={passengers.adults <= 1}
                  className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4 text-[#1E3A5F]" />
                </button>
                <span className="w-8 text-center font-semibold text-[#2D3339]">
                  {passengers.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengers("adults", 1)}
                  className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all"
                >
                  <Plus className="w-4 h-4 text-[#1E3A5F]" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-[#2D3339]">Children</p>
                <p className="text-sm text-[#6B7280]">Age 0–17</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updatePassengers("children", -1)}
                  disabled={passengers.children <= 0}
                  className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4 text-[#1E3A5F]" />
                </button>
                <span className="w-8 text-center font-semibold text-[#2D3339]">
                  {passengers.children}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengers("children", 1)}
                  className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all"
                >
                  <Plus className="w-4 h-4 text-[#1E3A5F]" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPassengers(false)}
              className="w-full mt-3 py-2.5 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#2A4A73] transition-colors"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [hajjPackages, setHajjPackages] = useState([]);
  const [umrahPackages, setUmrahPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hotel Search State
  const [showPassengers, setShowPassengers] = useState(false);
  const passengersRef = useRef(null);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [passengers, setPassengers] = useState({
    adults: 2,
    children: 0,
  });

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

  // Close passenger dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (passengersRef.current && !passengersRef.current.contains(event.target)) {
        setShowPassengers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePassengers = (type, increment) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + increment),
    }));
  };

  const handleHotelSearch = (e) => {
    e.preventDefault();

    if (!location.trim() || !checkIn || !checkOut) {
      alert("Please fill in destination and dates");
      return;
    }

    const params = new URLSearchParams({
      aid: "304142", // Your Booking.com affiliate ID
      ss: location,
      checkin: checkIn,
      checkout: checkOut,
      group_adults: passengers.adults,
      group_children: passengers.children,
      no_rooms: 1,
      sb_travel_purpose: "leisure",
    });

    const searchUrl = `https://www.booking.com/searchresults.html?${params.toString()}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <OffersSection />

      {/* Book Hotels Section - Full Featured */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
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
              Accommodation Partner
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[#2D3339]">
              Book Hotels with <span className="text-[#C9A962]">Booking.com</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-4">
              Find the perfect accommodation in Makkah, Madinah, and worldwide for your sacred journey
            </p>
          </motion.div>

          {/* Full Featured Hotel Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-[#E8E3DA]"
          >
            <form onSubmit={handleHotelSearch} className="space-y-6">
              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                  Destination
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                  <input
                    type="text"
                    placeholder="e.g. Makkah, Madinah, Jeddah"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Dates & Guests Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DateInput
                  label="Check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
                <DateInput
                  label="Check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split("T")[0]}
                />
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                    Guests
                  </label>
                  <PassengerDropdown
                    showPassengers={showPassengers}
                    setShowPassengers={setShowPassengers}
                    passengers={passengers}
                    updatePassengers={updatePassengers}
                    passengersRef={passengersRef}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(30,58,95,0.25)] hover:shadow-[0_12px_32px_rgba(30,58,95,0.35)] hover:from-[#2A4A73] hover:to-[#1E3A5F] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Hotels on Booking.com</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <EventSection />

      {/* Hajj & Umrah Packages - unchanged */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-repeat bg-center opacity-100"
          style={{ backgroundImage: "url('/hajj new-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white/60" />

        {/* Hajj Packages */}
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

        {/* Umrah Packages */}
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