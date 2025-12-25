'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PackageCard = ({
  title,
  price,
  duration,
  inclusions = [],
  ctaLabel = 'More Details',
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
        relative max-w-sm flex flex-col overflow-hidden
        rounded-[40px] border-2 border-[#a7d7c5] bg-white shadow-sm
        bg-[url('/Background.PNG')] bg-repeat
      "
    >
      {/* Title Section */}
      <div className="flex items-center justify-center px-6 py-8">
        <h3 className="text-4xl font-medium text-[#2d4f43] font-serif">
          {title}
        </h3>
      </div>

      {/* Price Banner */}
      <div className="bg-[#ecf7f2] py-6 text-center border-y border-[#d1e9df]">
        <p className="text-[44px] font-medium text-[#4a5551]">
          BDT {Number(price).toLocaleString('en-BD')}
        </p>
      </div>

      {/* Inclusions List */}
      <div className="flex-grow px-10 py-10">
        <ul className="space-y-5">
          {inclusions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check
                className="mt-1 h-5 w-5 shrink-0 text-[#00a651]"
                strokeWidth={3}
              />
              <span className="text-[17px] leading-tight text-[#5a6360] font-normal">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="px-10 pb-12 pt-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="w-full rounded-xl bg-[#00a651] py-4 text-xl font-semibold text-white transition-colors hover:bg-[#008f45] shadow-sm"
        >
          {ctaLabel}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
