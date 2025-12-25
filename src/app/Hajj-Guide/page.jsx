'use client';

import React from 'react';
import Image from 'next/image';

const HajjGuide = () => {
  const sections = [
    {
      title: "Preparation and entering Ihram",
      items: [
        "Preparation: Begin with spiritual and physical preparations, including sincere repentance, settling debts, and ensuring good health.",
        "Intention (Niyyah): Make a sincere intention to perform Hajj solely for Allah.",
        "Ihram: After a purifying bath and trimming nails/hair, wear the Ihram garments (two white seamless cloths for men; modest, loose clothing for women) and enter the state of ritual purity.",
        "Talbiyah: Recite the Talbiyah continuously: 'Labbayka Allaahumma labbayk, Labbayka laa shareeka laka labbayk. Inna al-hamda, wa n-imata, Laka wal mulk, Laa shareeka lak.'"
      ]
    },
    {
      title: "Days of Hajj",
      items: [
        "8th of Dhul-Hijjah: Travel to Mina and spend the day there in prayer and rest.",
        "9th of Dhul-Hijjah (Day of Arafah): Travel to Arafat. This is a crucial day of worship and supplication. After sunset, proceed to Muzdalifah.",
        "10th of Dhul-Hijjah: After Fajr prayer, move from Muzdalifah to Mina. Perform the Ramy ritual at the Jamarat al-Aqaba (stoning of the largest pillar). After stoning, offer an animal sacrifice (Qurbani), then shave or trim your hair."
      ]
    },
    {
      title: "Post-stoning and completion",
      items: [
        "Tawaf al-Ifadah: Travel to Makkah to perform the Tawaf (seven circuits around the Kaaba) and Sa'i (running between Safa and Marwa).",
        "Return to Mina: After completing the Tawaf and Sa'i, return to Mina and spend the night.",
        "Subsequent days: On the 11th and 12th of Dhul-Hijjah, repeat the Ramy ritual for all three Jamarat. You may leave Mina after the second day if you wish, but you must have completed the rituals."
      ]
    },
    {
      title: "Final steps",
      items: [
        "Farewell Tawaf (Tawaf al-Wida): Before leaving Makkah, perform the Farewell Tawaf. This is the final ritual, and it is not performed by those who perform the other Tawaf in the correct order, but by the others."
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-4xl md:text-5xl font-serif text-[#2d4f43]">
          Complete Hajj <span className="bg-[#00a651] text-white px-4 py-1 rounded-lg">Guide</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif text-[#00a651] leading-tight">
              How to Perform Hajj: <br /> Detailed Guide
            </h1>
            <p className="text-[#5a6360] leading-relaxed text-lg">
              Hajj, meaning 'pilgrimage' in Arabic, is the sacred journey to the holy city of <strong>Makkah</strong>. It is an obligation for every Muslim who is physically and financially able, and it must be performed during the first ten days of <strong>Dhu al-Hijjah</strong>, the final month of the Islamic lunar calendar. Considered one of the greatest acts of worship, Hajj nurtures goodness, humility, inner peace, and sincere devotion to <strong>Allah</strong>.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative h-[450px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="/hajj-hero.PNG" 
              alt="Makkah Clock Tower and Kaaba" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24">
        <h2 className="text-3xl font-serif text-center text-[#2d4f43] mb-12">
          The Hajj comprises of four fundamental pillars
        </h2>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-bold text-[#00a651] font-serif">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#5a6360] leading-relaxed">
                    <span className="text-[#00a651] mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Closing Note */}
        <div className="mt-16 p-10 bg-emerald-50 rounded-[40px] border border-emerald-100 text-center">
          <p className="text-[#2d4f43] text-lg italic">
            "May Allah (SWT) accept your pilgrimage and grant you Hajj Mabrur. Ameen."
          </p>
        </div>
      </section>
    </div>
  );
};

export default HajjGuide;