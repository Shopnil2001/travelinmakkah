'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import PdfViewer to avoid SSR issues with react-pdf
const PdfViewer = dynamic(() => import('../../../../components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg">
      <div className="p-6 border-b border-[#E8E3DA]">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex items-center justify-center bg-[#FAF8F5]" style={{ height: 500 }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D4A84B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading PDF Viewer...</p>
        </div>
      </div>
    </div>
  )
});

const UmrahGuide = () => {
  const sections = [
    {
      step: "01",
      id: 'ihram',
      title: 'Ihram',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4V28M8 8L16 4L24 8M6 12H26M8 28H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: `Ihram marks the moment a pilgrim makes the formal intention to perform Umrah. Entering the state of Ihram begins with cleansing oneself through a complete bath (ghusl), symbolizing purification from all physical impurities.`,
      items: [
        { label: "For Men", text: "Dress in the two unstitched garments known as the Ridaa and Izaar." },
        { label: "For Women", text: "Wear any modest clothing that covers the body and head. Women who are menstruating or experiencing postnatal bleeding are also encouraged to perform ghusl." }
      ],
      extra: `After cleansing, the pilgrim performs the obligatory prayer or two rak'aat of Sunnah. Facing the Qibla, they verbally declare their intention before crossing the Meeqat boundary. At this point, all forms of perfume or scented products become prohibited while in Ihram.`,
      prayers: [
        { label: '"Labbayk Allaahumma bi \'Umrah"', translation: "(Here I am, O Allah, for 'Umrah.)" },
        { label: "Then they begin reciting the Talbiyah as taught in the Sunnah:", translation: "" },
        { label: '"Labbayka Allaahumma labbayk, labbayka laa shareeka laka labbayk. Inna al-hamda wa\'n-ni\'mata laka wa\'l-mulk, laa shareeka lak"', translation: "(Here I am, O Allah, here I am. Here I am; you have no partner; here I am. Verily all praise and blessings are Yours, and all sovereignty, you have no partner.)" }
      ]
    },
    {
      step: "02",
      id: 'tawaaf',
      title: 'Tawaaf',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
          <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 6V2M16 30V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      content: `After entering Masjid al-Haram, the pilgrim should step in with the right foot and recite the entrance dua. They then proceed to the Black Stone (Hajr-e-Aswad) to begin the Tawaaf. The Sunnah is to touch it with the right hand and kiss it. If this is not possible, one may touch it and then kiss the hand, or gesture toward it from a distance.`,
      items: [
        { label: "Idtibaa", text: "During Tawaaf, men must keep the right shoulder uncovered. This is done by placing the upper cloth under the right arm and draping it over the left shoulder." },
        { label: "Ramal", text: "Men should perform Ramal—a brisk walk with short steps—during the first three circuits around the Ka'bah." }
      ],
    },
    {
      step: "03",
      id: 'saai',
      title: "Sa'i between Safa and Marwah",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 24L10 16L16 20L22 12L28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="4" cy="24" r="2" fill="currentColor"/>
          <circle cx="28" cy="8" r="2" fill="currentColor"/>
        </svg>
      ),
      content: `The pilgrim should then head for the place of Sa'i (Masa'a), and when nearing the hill of Safa, they should recite the Quranic verse regarding Safa and Marwah.`,
      items: [
        { label: "At Safa", text: "The pilgrim must climb up the Safa hill to a point where the Ka'bah is visible. They should face the Ka'bah, raise their hands, and supplicate to Allah (SWT)." },
        { label: "The Walk", text: "Walk between Safa and Marwah seven times. Men should hasten their pace between the green markers." }
      ],
    },
    {
      step: "04",
      id: 'halq',
      title: 'Halq or Taqsir',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 16L13 23L26 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      content: `After completing Sa'i, the pilgrim must shave or trim their hair to complete the Umrah rituals.`,
      items: [
        { label: "For Men", text: "It is recommended to shave the head completely (Halq), though trimming the hair short (Taqsir) is also permissible." },
        { label: "For Women", text: "Women should trim a small portion of their hair, approximately the length of a fingertip." }
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF5] via-white to-[#FDF8F0] pb-24 overflow-hidden">
      {/* Decorative Islamic Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern-gold" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#8B7355" strokeWidth="1"/>
              <circle cx="30" cy="30" r="8" fill="none" stroke="#8B7355" strokeWidth="1"/>
              <path d="M30 0L30 22M30 38L30 60M0 30L22 30M38 30L60 30" stroke="#8B7355" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-gold)"/>
        </svg>
      </div>

      {/* Header Section */}
      <section className="relative pt-20 pb-16 text-center">
        {/* Decorative Arc */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10">
          <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 300C0 134.315 134.315 0 300 0C465.685 0 600 134.315 600 300" stroke="#D4A84B" strokeWidth="2"/>
            <path d="M50 300C50 161.929 161.929 50 300 50C438.071 50 550 161.929 550 300" stroke="#D4A84B" strokeWidth="1"/>
            <path d="M100 300C100 189.543 189.543 100 300 100C410.457 100 500 189.543 500 300" stroke="#D4A84B" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="relative z-10">
          <span className="inline-block text-[#D4A84B] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            The Lesser Pilgrimage
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2d4f43] tracking-tight">
            Complete Umrah
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-6 py-2">Guide</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4A84B] to-[#C49B3B] rounded-xl transform -skew-x-3"></span>
              </span>
            </span>
          </h1>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4A84B] to-transparent"></div>
                <span className="text-[#D4A84B] text-sm font-medium tracking-wider uppercase">Understanding Umrah</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] leading-[1.2]">
                How to Perform Umrah: <br />
                <span className="text-[#D4A84B]">A Detailed Guide</span>
              </h2>
            </div>
            <p className="text-[#5a6360] leading-[1.9] text-lg">
              Umrah is a sacred Islamic pilgrimage and an act of worship dedicated to <strong className="text-[#2d4f43] font-medium">Allah (SWT)</strong>. It follows the teachings and Sunnah of the Holy Prophet Muhammad (PBUH).
            </p>
            <p className="text-[#5a6360] leading-[1.9] text-lg">
              This pilgrimage involves visiting the House of <strong className="text-[#2d4f43] font-medium">Allah (SWT)</strong> in Makkah and can be performed at any time of the year, unlike Hajj which has specific dates.
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-serif text-[#D4A84B]">4</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Pillars</div>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-[#D4A84B]/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#D4A84B]">7</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Circuits</div>
              </div>
              <div className="w-px bg-gradient-to-b from-transparent via-[#D4A84B]/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#D4A84B]">∞</div>
                <div className="text-xs text-[#5a6360] tracking-wider uppercase mt-1">Rewards</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4A84B]/20 via-transparent to-[#2d4f43]/10 rounded-[3rem] transform rotate-2"></div>
              <div className="absolute -inset-4 border-2 border-[#D4A84B]/20 rounded-[3rem] transform -rotate-1"></div>

              <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_-15px_rgba(212,168,75,0.3)]">
                <Image
                  src="/umrah-mosque.PNG"
                  alt="Madinah Green Dome"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d4f43]/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-[#D4A84B]/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A84B] to-[#C49B3B] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#5a6360]">Perform</div>
                    <div className="font-serif text-[#2d4f43] font-medium">Anytime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[#D4A84B] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Step by Step
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] mb-6">
            The Four Fundamental Pillars of Umrah
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4A84B] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className="group relative bg-white rounded-3xl shadow-[0_4px_40px_-10px_rgba(45,79,67,0.1)] hover:shadow-[0_8px_60px_-10px_rgba(212,168,75,0.2)] transition-all duration-500 overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#D4A84B] to-[#C49B3B] rounded-l-3xl"></div>

              <div className="p-8 md:p-10 pl-10 md:pl-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8">
                  {/* Step number */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FDF8F0] to-[#FEF6E8] flex items-center justify-center border border-[#D4A84B]/10 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl font-serif text-[#D4A84B] font-medium">{section.step}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#D4A84B] text-white flex items-center justify-center">
                        {section.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#2d4f43] group-hover:text-[#D4A84B] transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* Main Content */}
                <p className="text-[#5a6360] leading-[1.8] mb-6">
                  {section.content}
                </p>

                {/* Items Grid */}
                {section.items && (
                  <div className="grid gap-4 mb-6">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="relative pl-6 py-4 pr-4 bg-gradient-to-r from-[#FFFBF5] to-transparent rounded-xl border-l-2 border-[#D4A84B]/30 hover:border-[#D4A84B] hover:from-[#FDF8F0] transition-all duration-300"
                      >
                        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4A84B]"></div>
                        <p className="text-[#5a6360] leading-[1.8]">
                          <strong className="text-[#2d4f43] font-medium">{item.label}:</strong>{' '}
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Extra Content */}
                {section.extra && (
                  <p className="text-[#5a6360] leading-[1.8] italic border-l-2 border-[#D4A84B]/20 pl-4 mb-6">
                    {section.extra}
                  </p>
                )}

                {/* Prayers/Duas Section */}
                {section.prayers && (
                  <div className="bg-gradient-to-br from-[#FDF8F0] to-[#FEF6E8] p-6 md:p-8 rounded-2xl border border-[#D4A84B]/20 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-[#D4A84B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                      <span className="text-sm font-medium text-[#D4A84B] tracking-wider uppercase">Sacred Supplications</span>
                    </div>
                    {section.prayers.map((prayer, i) => (
                      <div key={i} className="space-y-1">
                        <p className="font-serif text-[#2d4f43] font-medium leading-relaxed">{prayer.label}</p>
                        {prayer.translation && (
                          <p className="text-sm text-[#5a6360] italic pl-4 border-l-2 border-[#D4A84B]/20">{prayer.translation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative corner pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 0L100 100L0 100" stroke="#8B7355" strokeWidth="2"/>
                  <path d="M100 25L100 100L25 100" stroke="#8B7355" strokeWidth="1.5"/>
                  <path d="M100 50L100 100L50 100" stroke="#8B7355" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Dua Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-16 mt-20">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <svg className="w-16 h-16 text-[#D4A84B]/20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L36 16H48L38 24L42 36L32 28L22 36L26 24L16 16H28L32 4Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="bg-gradient-to-br from-[#2d4f43] to-[#1a332d] rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dua-pattern-gold" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dua-pattern-gold)"/>
              </svg>
            </div>

            <div className="relative z-10">
              <div className="text-[#D4A84B] mb-6">
                <svg className="w-10 h-10 mx-auto opacity-60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-white/80 text-lg mb-4">
                Hopefully, this guide proves useful for those planning to perform Umrah.
              </p>
              <p className="text-white/90 text-xl md:text-2xl font-serif leading-relaxed mb-6">
                May Allah (SWT) accept your duas and good deeds.
              </p>
              <p className="text-[#D4A84B] text-2xl md:text-3xl font-serif">
                Ameen!
              </p>
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4A84B]/40"></div>
                <div className="w-2 h-2 rounded-full bg-[#D4A84B]/60"></div>
                <div className="w-2 h-2 rounded-full bg-[#D4A84B]/40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Guide Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-16 mt-20">
        <div className="text-center mb-10">
          <span className="inline-block text-[#D4A84B] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Download Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2d4f43] mb-4">
            Complete Umrah Guide PDF
          </h2>
          <p className="text-[#5a6360] max-w-xl mx-auto">
            Access our comprehensive Umrah guide document with detailed instructions,
            duas, and step-by-step procedures.
          </p>
        </div>

        <PdfViewer section="UMRAH_GUIDE" accentColor="#D4A84B" maxHeight={600} />
      </section>
    </div>
  );
};

export default UmrahGuide;