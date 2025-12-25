'use client'
import Image from "next/image";
import PackageCard from "../../components/ui/packageCard";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import OffersSection from "../../components/OfferSection";
import ReviewSection from "../../components/Review";
import EventSection from "../../components/EventSection";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans bg-amber-50">
<Hero></Hero>
<OffersSection></OffersSection>
<EventSection></EventSection>
<ReviewSection></ReviewSection>
<Footer></Footer>
    </div>
  );
}
