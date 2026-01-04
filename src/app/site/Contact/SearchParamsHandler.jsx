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
    }
  }, [pdfMessage, onPdfMessage]);

  return null; // This component only handles side effects
}