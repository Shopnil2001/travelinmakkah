// src/app/site/Contact/SearchParamsHandler.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchParamsHandler({ onPdfMessage }) {
  const searchParams = useSearchParams();
  const pdfMessage = searchParams.get('pdf_message');

  useEffect(() => {
    if (pdfMessage) {
      onPdfMessage(decodeURIComponent(pdfMessage));
      
      // Optional: Clean the URL without reloading
      // window.history.replaceState({}, '', window.location.pathname);
    }
  }, [pdfMessage]); // ← Only runs when pdfMessage changes

  // Remove dependency on onPdfMessage to avoid unnecessary re-runs
  // (onPdfMessage is stable from parent)

  return null;
}