'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Loader2, AlertCircle } from 'lucide-react';

// API base URL
const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

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
          <div className="w-12 h-12 border-4 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading PDF Viewer...</p>
        </div>
      </div>
    </div>
  )
});

const GuidelineBookPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdfId, setSelectedPdfId] = useState(null);

  // Fetch all GENERAL_PDF documents
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pdfs/general`);
        if (!response.ok) {
          throw new Error('Failed to load PDFs');
        }
        const data = await response.json();
        setPdfs(data);

        // Auto-select first PDF if available
        if (data.length > 0) {
          setSelectedPdfId(data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching PDFs:', err);
        setError('Failed to load guideline books');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-white to-[#FDF8F0] pb-24 overflow-hidden">
      {/* Decorative Islamic Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern-guideline" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="#C9A962" strokeWidth="1"/>
              <circle cx="40" cy="40" r="12" fill="none" stroke="#C9A962" strokeWidth="0.5"/>
              <path d="M40 0L40 28M40 52L40 80M0 40L28 40M52 40L80 40" stroke="#C9A962" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-guideline)"/>
        </svg>
      </div>

      {/* Header Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-12 lg:px-20">
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#C9A962" strokeWidth="1"/>
            <circle cx="50" cy="50" r="32" stroke="#C9A962" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="absolute top-20 right-16 w-20 h-20 opacity-10">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L80 40L40 80L0 40Z" stroke="#C9A962" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A962]"></div>
                <span className="text-[#C9A962] font-medium text-sm tracking-[0.3em] uppercase">
                  Sacred Resources
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A962]"></div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#2D3339] mb-6 tracking-tight">
                Complete
                <span className="block mt-2">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#C9A962] to-[#D4BC82] bg-clip-text text-transparent">
                      Guideline Book
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                      <path d="M0 6C50 6 50 2 100 2C150 2 150 10 200 10" stroke="#C9A962" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[#6B7280] max-w-2xl mx-auto text-lg md:text-xl"
              >
                Access our comprehensive collection of pilgrimage guides, duas, and essential resources
                for your sacred journey to Makkah and Madinah.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#C9A962]" />
                <p className="text-[#6B7280]">Loading guideline books...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-serif text-[#2D3339] mb-2">Error Loading Books</h3>
                <p className="text-[#6B7280]">{error}</p>
              </div>
            </div>
          ) : pdfs.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <BookOpen className="w-20 h-20 mx-auto mb-6 text-[#C9A962]/40" />
                <h3 className="text-2xl font-serif text-[#2D3339] mb-3">No Guideline Books Available</h3>
                <p className="text-[#6B7280] max-w-md mx-auto">
                  Our guideline books are being prepared. Please check back soon for comprehensive
                  pilgrimage guides and resources.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* PDF List Sidebar */}
              {pdfs.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-4"
                >
                  <div className="lg:sticky lg:top-28">
                    <h3 className="text-lg font-serif text-[#2D3339] mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#C9A962]" />
                      Available Guides
                    </h3>

                    <div className="space-y-3">
                      {pdfs.map((pdf, index) => (
                        <motion.button
                          key={pdf._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedPdfId(pdf._id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedPdfId === pdf._id
                              ? 'border-[#C9A962] bg-[#C9A962]/5 shadow-lg'
                              : 'border-[#E8E3DA] bg-white hover:border-[#C9A962]/50 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                selectedPdfId === pdf._id
                                  ? 'bg-[#C9A962] text-white'
                                  : 'bg-[#FAF8F5] text-[#C9A962]'
                              }`}
                            >
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium truncate ${
                                selectedPdfId === pdf._id ? 'text-[#C9A962]' : 'text-[#2D3339]'
                              }`}>
                                {pdf.title}
                              </h4>
                              {pdf.description && (
                                <p className="text-sm text-[#6B7280] line-clamp-2 mt-1">
                                  {pdf.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PDF Viewer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={pdfs.length > 1 ? 'lg:col-span-8' : 'lg:col-span-12'}
              >
                {selectedPdfId ? (
                  <PdfViewer
                    initialPdfData={pdfs.find(p => p._id === selectedPdfId)}
                    accentColor="#C9A962"
                    maxHeight={700}
                  />
                ) : (
                  <div className="bg-white rounded-2xl border border-[#E8E3DA] p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
                    <h3 className="text-xl font-serif text-[#2D3339] mb-2">Select a Guide</h3>
                    <p className="text-[#6B7280]">Choose a guideline book from the list to view its contents.</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#1E3A5F] to-[#152a45] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full border border-[#C9A962]"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full border border-white"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span className="text-[#C9A962] text-sm tracking-[0.2em] uppercase">Need More Help?</span>
              <svg className="w-6 h-6 text-[#C9A962]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Ready to Begin Your <span className="text-[#C9A962]">Sacred Journey?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experienced guides is here to help you plan the perfect
              Hajj or Umrah pilgrimage. Contact us for personalized assistance.
            </p>

            <a
              href="/site/Contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8954F] text-white font-semibold rounded-xl hover:shadow-[0_10px_40px_-10px_rgba(201,169,98,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GuidelineBookPage;
