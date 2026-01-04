"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Building2,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  Search,
  ArrowRightLeft,
  Minus,
  Plus,
} from "lucide-react";

// Date input component - defined outside to prevent recreation on each render
const DateInput = ({ label, value, onChange, disabled = false }) => (
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
        disabled={disabled}
        className={`w-full pl-12 pr-3 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ minWidth: "150px" }}
      />
    </div>
  </div>
);

// Passenger dropdown component - defined outside to prevent recreation on each render
const PassengerDropdown = ({
  isHotel = false,
  showPassengers,
  setShowPassengers,
  passengers,
  updatePassengers,
  totalPassengers,
  passengersRef,
}) => (
  <div className="relative" ref={passengersRef}>
    <button
      onClick={() => setShowPassengers(!showPassengers)}
      className="w-full flex items-center gap-3 px-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] hover:border-[#1E3A5F] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
    >
      <Users className="w-5 h-5 text-[#C9A962] flex-shrink-0" />
      <span className="flex-1 text-left truncate">
        {isHotel
          ? `${passengers.adults} Adults, ${passengers.children} Children`
          : `${totalPassengers} ${totalPassengers === 1 ? "Traveler" : "Travelers"}`}
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
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-[#E8E3DA] shadow-[0_12px_40px_rgba(30,58,95,0.15)] p-4 min-w-[280px]"
          style={{ zIndex: 9999 }}
        >
          {/* Adults */}
          <div className="flex items-center justify-between py-3 border-b border-[#E8E3DA]">
            <div>
              <p className="font-semibold text-[#2D3339]">Adults</p>
              <p className="text-sm text-[#6B7280]">
                {isHotel ? "Age 18+" : "Age 12+"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updatePassengers("adults", -1)}
                className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={passengers.adults <= 1}
              >
                <Minus className="w-4 h-4 text-[#1E3A5F]" />
              </button>
              <span className="w-8 text-center font-semibold text-[#2D3339]">
                {passengers.adults}
              </span>
              <button
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
              <p className="text-sm text-[#6B7280]">
                {isHotel ? "Age 0-17" : "Age 0-11"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updatePassengers("children", -1)}
                className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={passengers.children <= 0}
              >
                <Minus className="w-4 h-4 text-[#1E3A5F]" />
              </button>
              <span className="w-8 text-center font-semibold text-[#2D3339]">
                {passengers.children}
              </span>
              <button
                onClick={() => updatePassengers("children", 1)}
                className="w-9 h-9 rounded-full border-2 border-[#E8E3DA] flex items-center justify-center hover:border-[#1E3A5F] hover:bg-[#F8FAFC] transition-all"
              >
                <Plus className="w-4 h-4 text-[#1E3A5F]" />
              </button>
            </div>
          </div>

          <button
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

const SearchPanel = ({ variant = "default" }) => {
  const [activeTab, setActiveTab] = useState("flights");
  const [showPassengers, setShowPassengers] = useState(false);
  const [tripType, setTripType] = useState("roundtrip");
  const passengersRef = useRef(null);

  // Flight form state
  const [flightForm, setFlightForm] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
  });

  // Hotel form state
  const [hotelForm, setHotelForm] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
  });

  // Passengers state
  const [passengers, setPassengers] = useState({
    adults: 1,
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

  const totalPassengers = passengers.adults + passengers.children;

  const swapLocations = () => {
    setFlightForm((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const isCompact = variant === "compact";

  // Common props for PassengerDropdown
  const passengerDropdownProps = {
    showPassengers,
    setShowPassengers,
    passengers,
    updatePassengers,
    totalPassengers,
    passengersRef,
  };

  return (
    <div className={`w-full ${isCompact ? "" : "py-16 lg:py-20"}`}>
      <div className={`max-w-5xl mx-auto ${isCompact ? "" : "px-4 sm:px-6"}`}>
        {/* Panel Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl lg:rounded-3xl shadow-[0_8px_40px_rgba(30,58,95,0.12)] border border-[#E8E3DA]/60"
          style={{ overflow: "visible" }}
        >
          {/* Tabs */}
          <div className="flex border-b border-[#E8E3DA]">
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 lg:py-5 text-base font-semibold transition-all duration-300 relative ${
                activeTab === "flights"
                  ? "text-[#1E3A5F] bg-[#F8FAFC]"
                  : "text-[#6B7280] hover:text-[#2D3339] hover:bg-[#FAF8F5]"
              }`}
            >
              <Plane
                className={`w-5 h-5 transition-colors ${
                  activeTab === "flights" ? "text-[#C9A962]" : ""
                }`}
              />
              <span>Flights</span>
              {activeTab === "flights" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1E3A5F] to-[#C9A962]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("hotels")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 lg:py-5 text-base font-semibold transition-all duration-300 relative ${
                activeTab === "hotels"
                  ? "text-[#1E3A5F] bg-[#F8FAFC]"
                  : "text-[#6B7280] hover:text-[#2D3339] hover:bg-[#FAF8F5]"
              }`}
            >
              <Building2
                className={`w-5 h-5 transition-colors ${
                  activeTab === "hotels" ? "text-[#C9A962]" : ""
                }`}
              />
              <span>Hotels</span>
              {activeTab === "hotels" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1E3A5F] to-[#C9A962]"
                />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-5 lg:p-8" style={{ overflow: "visible" }}>
            <AnimatePresence mode="wait">
              {activeTab === "flights" ? (
                <motion.div
                  key="flights"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "visible" }}
                >
                  {/* Trip Type Toggle */}
                  <div className="flex gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="tripType"
                          checked={tripType === "roundtrip"}
                          onChange={() => setTripType("roundtrip")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            tripType === "roundtrip"
                              ? "border-[#1E3A5F] bg-[#1E3A5F]"
                              : "border-[#E8E3DA] group-hover:border-[#C9A962]"
                          }`}
                        >
                          {tripType === "roundtrip" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#2D3339]">
                        Round Trip
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="radio"
                          name="tripType"
                          checked={tripType === "oneway"}
                          onChange={() => setTripType("oneway")}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            tripType === "oneway"
                              ? "border-[#1E3A5F] bg-[#1E3A5F]"
                              : "border-[#E8E3DA] group-hover:border-[#C9A962]"
                          }`}
                        >
                          {tripType === "oneway" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#2D3339]">
                        One Way
                      </span>
                    </label>
                  </div>

                  {/* Flight Form - Stacked Layout for Better Responsiveness */}
                  <div className="space-y-4">
                    {/* Origin & Destination Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                      {/* Origin */}
                      <div>
                        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          From
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                          <input
                            type="text"
                            placeholder="City or Airport"
                            value={flightForm.origin}
                            onChange={(e) =>
                              setFlightForm({ ...flightForm, origin: e.target.value })
                            }
                            className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Swap Button */}
                      <button
                        onClick={swapLocations}
                        className="absolute left-1/2 top-[calc(50%+12px)] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border-2 border-[#E8E3DA] rounded-full flex items-center justify-center hover:border-[#C9A962] hover:bg-[#FDF9F3] transition-all duration-200 shadow-md hidden sm:flex"
                      >
                        <ArrowRightLeft className="w-4 h-4 text-[#1E3A5F]" />
                      </button>

                      {/* Destination */}
                      <div>
                        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          To
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                          <input
                            type="text"
                            placeholder="City or Airport"
                            value={flightForm.destination}
                            onChange={(e) =>
                              setFlightForm({
                                ...flightForm,
                                destination: e.target.value,
                              })
                            }
                            className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dates & Travelers Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Depart Date */}
                      <DateInput
                        label="Depart"
                        value={flightForm.departDate}
                        onChange={(e) =>
                          setFlightForm({
                            ...flightForm,
                            departDate: e.target.value,
                          })
                        }
                      />

                      {/* Return Date */}
                      <DateInput
                        label="Return"
                        value={flightForm.returnDate}
                        onChange={(e) =>
                          setFlightForm({
                            ...flightForm,
                            returnDate: e.target.value,
                          })
                        }
                        disabled={tripType === "oneway"}
                      />

                      {/* Travelers */}
                      <div style={{ overflow: "visible" }}>
                        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          Travelers
                        </label>
                        <PassengerDropdown {...passengerDropdownProps} />
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="mt-6 flex justify-center lg:justify-end">
                    <button className="group w-full lg:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(30,58,95,0.25)] hover:shadow-[0_12px_32px_rgba(30,58,95,0.35)] hover:from-[#2A4A73] hover:to-[#1E3A5F] transition-all duration-300 transform hover:-translate-y-0.5">
                      <Search className="w-5 h-5" />
                      <span>Search Flights</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hotels"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "visible" }}
                >
                  {/* Hotel Form - Stacked Layout */}
                  <div className="space-y-4">
                    {/* Destination Row */}
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                        Destination
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A962]" />
                        <input
                          type="text"
                          placeholder="City or Hotel Name"
                          value={hotelForm.location}
                          onChange={(e) =>
                            setHotelForm({ ...hotelForm, location: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-4 bg-[#FAF8F5] border-2 border-[#E8E3DA] rounded-xl text-[#2D3339] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E3A5F] focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Dates & Guests Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Check-in */}
                      <DateInput
                        label="Check-in"
                        value={hotelForm.checkIn}
                        onChange={(e) =>
                          setHotelForm({
                            ...hotelForm,
                            checkIn: e.target.value,
                          })
                        }
                      />

                      {/* Check-out */}
                      <DateInput
                        label="Check-out"
                        value={hotelForm.checkOut}
                        onChange={(e) =>
                          setHotelForm({
                            ...hotelForm,
                            checkOut: e.target.value,
                          })
                        }
                      />

                      {/* Guests */}
                      <div style={{ overflow: "visible" }}>
                        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          Guests
                        </label>
                        <PassengerDropdown {...passengerDropdownProps} isHotel />
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="mt-6 flex justify-center lg:justify-end">
                    <button className="group w-full lg:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73] text-white font-semibold rounded-xl shadow-[0_8px_24px_rgba(30,58,95,0.25)] hover:shadow-[0_12px_32px_rgba(30,58,95,0.35)] hover:from-[#2A4A73] hover:to-[#1E3A5F] transition-all duration-300 transform hover:-translate-y-0.5">
                      <Search className="w-5 h-5" />
                      <span>Search Hotels</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPanel;
