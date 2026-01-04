'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Lock, FileText, AlertCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Number of free pages before lock
const FREE_PAGES = 5;

// API base URL
const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

/**
 * PDF Viewer Component with page lock functionality
 *
 * @param {Object} props
 * @param {string} props.section - PDF section: 'HAJJ_GUIDE', 'UMRAH_GUIDE', or 'GENERAL_PDF'
 * @param {string} props.pdfId - Optional specific PDF ID (for GENERAL_PDF with multiple)
 * @param {Object} props.initialPdfData - Optional pre-fetched PDF data (avoids extra API call)
 * @param {string} props.accentColor - Accent color for styling (default: #C9A962)
 * @param {number} props.maxHeight - Maximum height of the viewer (default: 700)
 */
const PdfViewer = ({ section, pdfId, initialPdfData, accentColor = '#C9A962', maxHeight = 700 }) => {
  const router = useRouter();

  // PDF state
  const [pdfData, setPdfData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  // Fetch PDF metadata (or use initialPdfData if provided)
  useEffect(() => {
    // If initialPdfData is provided, use it directly
    if (initialPdfData) {
      setPdfData(initialPdfData);
      // Use fileUrl if available (e.g., for Firebase), fallback to backend stream URL using _id
      if (initialPdfData.fileUrl) {
        setPdfUrl(initialPdfData.fileUrl);
      } else {
        setPdfUrl(`${API_BASE_URL}/pdfs/file/${initialPdfData._id}`);
      }
      setLoading(false);
      return;
    }

    const fetchPdfData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        // Only fetch by section (pdfId should use initialPdfData)
        if (section) {
          response = await fetch(`${API_BASE_URL}/pdfs/section/${section}`);
        } else {
          // No section or initialPdfData provided
          setError('notfound');
          setLoading(false);
          return;
        }

        if (!response.ok) {
          if (response.status === 404) {
            setError('notfound');
            return;
          }
          throw new Error('Failed to load PDF');
        }

        const data = await response.json();
        setPdfData(data);

        // Use fileUrl if available (e.g., for Firebase), fallback to backend stream URL using _id
        if (data.fileUrl) {
          setPdfUrl(data.fileUrl);
        } else {
          setPdfUrl(`${API_BASE_URL}/pdfs/file/${data._id}`);
        }
      } catch (err) {
        console.error('Error fetching PDF:', err);
        setError('Failed to load PDF');
      } finally {
        setLoading(false);
      }
    };

    if (section) {
      fetchPdfData();
    }
  }, [section, initialPdfData]);

  // Handle container resize for responsive width
  useEffect(() => {
    if (!containerRef) return;

    const updateWidth = () => {
      const width = containerRef.clientWidth - 48; // Account for padding
      setPageWidth(Math.min(width, 800)); // Max width of 800px
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [containerRef]);

  // Check if page should be locked
  useEffect(() => {
    setIsLocked(pageNumber > FREE_PAGES);
  }, [pageNumber]);

  // PDF document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Navigation handlers
  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    if (pageNumber >= FREE_PAGES && pageNumber < numPages) {
      // Trying to go beyond free pages - show lock
      setPageNumber(FREE_PAGES + 1);
    } else if (pageNumber < numPages) {
      setPageNumber(prev => Math.min(prev + 1, numPages));
    }
  };

  // Zoom handlers
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  // Handle contact redirect
  const handleContactClick = useCallback(() => {
    const message = `Hello, I would like to request access to the full PDF titled: "${pdfData?.title || 'Guide Document'}"`;
    const encodedMessage = encodeURIComponent(message);
    router.push(`/site/Contact?pdf_message=${encodedMessage}`);
  }, [router, pdfData]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg">
        <div className="p-6 border-b border-[#E8E3DA]">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div
          className="flex items-center justify-center bg-[#FAF8F5]"
          style={{ height: maxHeight }}
        >
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: accentColor }} />
            <p className="text-[#6B7280]">Loading PDF...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (error === 'notfound') {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg">
        <div className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-[#9CA3AF]" />
          <h3 className="text-xl font-serif text-[#2D3339] mb-2">PDF Not Available</h3>
          <p className="text-[#6B7280]">This guide PDF has not been uploaded yet. Please check back later.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg">
        <div className="p-12 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h3 className="text-xl font-serif text-[#2D3339] mb-2">Error Loading PDF</h3>
          <p className="text-[#6B7280]">{error}</p>
        </div>
      </div>
    );
  }

  // No PDF data
  if (!pdfData || !pdfUrl) {
    return null;
  }

  return (
    <div
      className="w-full bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-lg"
      ref={setContainerRef}
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-[#E8E3DA] bg-gradient-to-r from-[#FAF8F5] to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <FileText className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#2D3339]">{pdfData.title}</h3>
              {pdfData.description && (
                <p className="text-sm text-[#6B7280]">{pdfData.description}</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] rounded-lg p-1">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.6}
                className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-[#6B7280]" />
              </button>
              <span className="px-2 text-sm text-[#6B7280] font-medium">{Math.round(scale * 100)}%</span>
              <button
                onClick={zoomIn}
                disabled={scale >= 2.0}
                className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] rounded-lg p-1">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4 text-[#6B7280]" />
              </button>
              <span className="px-3 text-sm text-[#6B7280] font-medium whitespace-nowrap">
                {Math.min(pageNumber, FREE_PAGES)} / {numPages || '?'}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages || isLocked}
                className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>
        </div>

        {/* Free pages indicator */}
        {numPages > FREE_PAGES && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Lock className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-[#6B7280]">
              Free preview: Pages 1-{FREE_PAGES} of {numPages}
            </span>
          </div>
        )}
      </div>

      {/* PDF Content */}
      <div
        className="relative overflow-auto bg-[#2D3339]"
        style={{ maxHeight }}
      >
        <div className="flex justify-center p-6">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            }
            error={
              <div className="flex items-center justify-center p-12 text-white">
                <AlertCircle className="w-8 h-8 mr-3" />
                Failed to load PDF
              </div>
            }
          >
            <Page
              pageNumber={Math.min(pageNumber, FREE_PAGES)}
              scale={scale}
              width={pageWidth || undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl"
            />
          </Document>
        </div>

        {/* Locked Overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ backdropFilter: 'blur(8px)', background: 'rgba(45, 51, 57, 0.85)' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 md:p-10 max-w-md mx-4 text-center shadow-2xl"
              >
                {/* Lock icon */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  <Lock className="w-10 h-10" style={{ color: accentColor }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-[#2D3339] mb-3">
                  Want to Access the Full PDF?
                </h3>

                {/* Description */}
                <p className="text-[#6B7280] mb-6">
                  You've reached the end of the free preview. Contact us to request full access to this guide.
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-6 mb-8 pb-6 border-b border-[#E8E3DA]">
                  <div className="text-center">
                    <div className="text-2xl font-serif" style={{ color: accentColor }}>{FREE_PAGES}</div>
                    <div className="text-xs text-[#9CA3AF]">Free Pages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif" style={{ color: accentColor }}>{numPages}</div>
                    <div className="text-xs text-[#9CA3AF]">Total Pages</div>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={handleContactClick}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
                    boxShadow: `0 10px 30px -10px ${accentColor}80`
                  }}
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </button>

                {/* Back button */}
                <button
                  onClick={() => setPageNumber(FREE_PAGES)}
                  className="mt-4 text-sm text-[#6B7280] hover:text-[#2D3339] transition-colors"
                >
                  Go back to preview
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with page indicator */}
      <div className="p-4 border-t border-[#E8E3DA] bg-[#FAF8F5] flex items-center justify-between text-sm text-[#6B7280]">
        <span>
          {pdfData.originalName || 'PDF Document'}
        </span>
        {numPages > FREE_PAGES && !isLocked && (
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {FREE_PAGES - pageNumber + 1} free pages remaining
          </span>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;