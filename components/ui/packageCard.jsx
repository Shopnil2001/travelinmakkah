'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const PackageCard = ({
  title,
  price,
  duration,
  inclusions = [],
  ctaLabel = 'View Details',
  onClick,
  affiliatedLink,
}) => {
  const handleClick = () => {
    if (affiliatedLink && affiliatedLink.trim()) {
      window.open(affiliatedLink.trim(), '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        backgroundImage: "url('/test2.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-[#E8E3DA] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(30,58,95,0.1)] transition-all duration-400
                 before:absolute before:inset-0 before:bg-white/75 before:z-0"
    >
      {/* HEADER */}
      <div className="relative z-10 px-6 pt-6 pb-4 text-center">
        <h3 className="text-2xl font-display font-medium text-[#2D3339] mb-1">
          {title}
        </h3>
        {duration && (
          <p className="text-sm text-[#6B7280]">{duration} {Number(duration) === 1 ? 'Day' : 'Days'}</p>
        )}
      </div>

      {/* PRICE */}
      <div className="relative z-10 bg-gradient-to-br from-[#1E3A5F] to-[#152A45] py-4 text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-[#C9A962] text-sm font-medium">BDT</span>
          <span className="text-white text-3xl font-display font-semibold">
            {Number(price).toLocaleString('en-BD')}
          </span>
        </div>
        <p className="text-white/60 text-xs mt-1">per person</p>
      </div>

      {/* INCLUSIONS */}
      <div className="relative z-10 flex-grow px-6 py-7">
        <p className="text-xs uppercase tracking-[0.15em] text-[#1E3A5F] font-semibold mb-4">
          Package Includes
        </p>
        <ul className="space-y-3">
          {inclusions.slice(0, 6).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mt-1">
                <Check className="w-3 h-3 text-[#1E3A5F]" strokeWidth={2} />
              </div>
              <span className="text-[#4B5563] text-sm leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="relative z-10 px-6 pb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A73 100%)',
            boxShadow: '0 2px 10px rgba(30, 58, 95, 0.2)',
          }}
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
