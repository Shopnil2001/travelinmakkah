'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const VisaPage = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const res = await api.get('/visas');
        setVisas(res.data);
      } catch (error) {
        console.error('Error fetching visas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-[#64B5F6] animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Simple Centered Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Visa <span className="text-[#64B5F6]">Process</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose your visa category and start your journey with ease.
          </p>
        </div>

        {/* Grid matching the requested style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <motion.div
              key={visa._id}
              whileHover={{ y: -10 }}
              onClick={() => router.push(`/site/Visa/${visa._id}`)}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-100/50 border border-gray-100 cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={visa.imageUrl} 
                  alt={visa.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#64B5F6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                  {visa.title}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#64B5F6] transition-colors">
                  {visa.subtitle}
                </h3>
                
                <div className="flex items-center text-[#64B5F6] font-bold gap-2">
                  Learn More <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisaPage;