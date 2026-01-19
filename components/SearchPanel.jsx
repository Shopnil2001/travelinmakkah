'use client';

import React, { useState, useRef, useEffect } from "react";
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

// Date input component
const DateInput = ({ label, value, onChange }) => (
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
        required
        min={new Date().toISOString().split("T")[0]}
        className="w-full pl-12 pr-3 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
      />
    </div>
  </div>
);

// Passenger dropdown component
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

const SearchPanel = ({ variant = "default" }) => {
  const [showPassengers, setShowPassengers] = useState(false);
  const passengersRef = useRef(null);

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [passengers, setPassengers] = useState({
    adults: 2,
    children: 0,
  });

  // Close dropdown when clicking outside
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

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location.trim() || !checkIn || !checkOut) {
      alert("Please fill in destination and dates");
      return;
    }

    const params = new URLSearchParams({
      aid: "304142", // Your Booking.com affiliate ID from V6LaAoQT
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

  const isCompact = variant === "compact";

  return (
    <div className={`w-full ${isCompact ? "" : "py-16 lg:py-20"}`}>
      <div className={`max-w-5xl mx-auto ${isCompact ? "" : "px-4 sm:px-6"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_8px_40px_rgba(30,58,95,0.12)] border border-[#E8E3DA]/60 overflow-visible"
        >
          <div className="p-5 lg:p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-serif text-[#2D3339] mb-2">
                Find Your Perfect Stay
              </h3>
              <p className="text-[#6B7280]">
                Book hotels in Makkah, Madinah, and worldwide through our trusted partner
              </p>
            </div>

            {/* Hotel Search Form */}
            <form onSubmit={handleSearch} className="space-y-6">
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

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DateInput label="Check-in" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                <DateInput label="Check-out" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPanel;