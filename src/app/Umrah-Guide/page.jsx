'use client';

import React from 'react';
import Image from 'next/image';

const UmrahGuide = () => {
  const sections = [
    {
      id: 'ihram',
      title: '1. Ihram',
      content: `Ihram marks the moment a pilgrim makes the formal intention to perform Umrah. Entering the state of Ihram begins with cleansing oneself through a complete bath (ghusl), symbolizing purification from all physical impurities.`,
      list: [
        'Men then dress in the two unstitched garments known as the Ridaa and Izaar.',
        'Women may wear any modest clothing that covers their body and head. Women who are menstruating or experiencing postnatal bleeding are also encouraged to perform ghusl.'
      ],
      extra: `After cleansing, the pilgrim performs the obligatory prayer or two rak'aat of Sunnah. Facing the Qibla, they verbally declare their intention before crossing the Meeqat boundary. At this point, all forms of perfume or scented products become prohibited while in Ihram.`,
      prayers: [
        { label: '"Labbayk Allaahumma bi \'Umrah"', translation: "(Here I am, O Allah, for 'Umrah.)" },
        { label: "Then they begin reciting the Talbiyah as taught in the Sunnah:", translation: "" },
        { label: '"Labbayka Allaahumma labbayk, labbayka laa shareeka laka labbayk. Inna al-hamda wa\'n-ni\'mata laka wa\'l-mulk, laa shareeka lak"', translation: "(Here I am, O Allah, here I am. Here I am; you have no partner; here I am. Verily all praise and blessings are Yours, and all sovereignty, you have no partner.)" }
      ]
    },
    {
      id: 'tawaaf',
      title: '2. Tawaaf',
      content: `After entering Masjid al-Haram, the pilgrim should step in with the right foot and recite the entrance dua. They then proceed to the Black Stone (Hajr-e-Aswad) to begin the Tawaaf. The Sunnah is to touch it with the right hand and kiss it. If this is not possible, one may touch it and then kiss the hand, or gesture toward it from a distance.`,
      extra: `During Tawaaf, men must keep the right shoulder uncovered (Idtibaa). This is done by placing the upper cloth under the right arm and draping it over the left shoulder. Men should also perform Ramal—a brisk walk with short steps—during the first three circuits.`,
    },
    {
      id: 'saai',
      title: '3. Saa\'i between Safa and Marwah',
      content: `The pilgrim should then head for the place of Saa'i (Masaa), and when nearing the hill of Safa, they should recite the Quranic verse regarding Safa and Marwah.`,
      list: [
        'Men change into the two fabrics, Ridaa and Izaar.',
        'Women can wear any form of clothing which covers the body and head.'
      ],
      extra: `The pilgrim must climb up the Safa hill to a point where the Ka'bah is visible. They should face the Ka'bah, raise their hands, and supplicate to Allah (SWT).`,
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2d4f43]">
          Complete Umrah <span className="bg-[#00a651] text-white px-3 py-1 rounded-lg">Guide</span>
        </h1>
      </section>

      {/* Hero Content Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-[#00a651] leading-tight">
              How to Perform Umrah: <br /> Detailed Guide
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Umrah is a sacred Islamic pilgrimage and an act of worship dedicated to <strong>Allah (SWT)</strong>. It follows the teachings and Sunnah of the Holy Prophet Muhammad (PBUH). This pilgrimage involves visiting the House of <strong>Allah (SWT)</strong> in Makkah and can be performed at any time of the year.
            </p>
          </div>
          <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="/umrah-mosque.PNG" 
              alt="Madinah Green Dome" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24">
        <h2 className="text-3xl font-serif text-center text-[#2d4f43] mb-12">
          The Umrah comprises of four fundamental pillars
        </h2>

        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.id} className="space-y-6">
              <h3 className="text-2xl font-bold text-[#00a651] border-b border-gray-100 pb-2">
                {section.title}
              </h3>
              <p className="text-[#5a6360] leading-relaxed">
                {section.content}
              </p>

              {section.list && (
                <ul className="list-disc pl-6 space-y-3 text-[#5a6360]">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.extra && (
                <p className="text-[#5a6360] leading-relaxed italic">
                  {section.extra}
                </p>
              )}

              {section.prayers && (
                <div className="bg-[#f6fbf9] p-8 rounded-2xl border-l-4 border-[#00a651] space-y-4">
                  {section.prayers.map((prayer, i) => (
                    <div key={i}>
                      <p className="font-bold text-[#2d4f43]">{prayer.label}</p>
                      {prayer.translation && (
                        <p className="text-sm text-gray-500 italic">{prayer.translation}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 p-8 bg-amber-50 rounded-3xl border border-amber-100 text-center">
          <p className="text-[#2d4f43] text-lg">
            Hopefully, this article proves useful for those planning to perform Umrah soon. <br />
            <strong>May Allah (SWT) accept your duas and good deeds. Ameen!</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default UmrahGuide;