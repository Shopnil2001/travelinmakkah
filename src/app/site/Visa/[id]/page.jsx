'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Globe, Clock, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';

const VisaDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/visas/${id}`);
        setVisa(res.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Globe className="animate-spin text-[#64B5F6]" /></div>;
  if (!visa) return <div className="text-center py-20">Visa not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img src={visa.imageUrl} className="w-full h-full object-cover" alt={visa.title} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <button 
              onClick={() => router.back()}
              className="absolute top-8 left-8 flex items-center gap-2 text-white bg-white/20 hover:bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl transition-all"
            >
              <ChevronLeft size={20} /> Back
            </button>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{visa.title}</h1>
            <p className="text-blue-100 text-xl font-medium uppercase tracking-widest">{visa.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Visa</h2>
              {visa.description}
            </div>
            
            {/* Hardcoded Benefits/Features for visual appeal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {['Fast Processing', 'Guaranteed Service', 'Expert Consultation', 'Secure Payment'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                  <CheckCircle2 className="text-[#64B5F6]" />
                  <span className="font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact/Action Sidebar */}
       
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;