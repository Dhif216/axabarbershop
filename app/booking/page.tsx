'use client';

import { useState } from 'react';
import Navigation from '../../src/components/Navigation';
import { BookingPage } from '../../src/components/BookingPage';

export default function BookingPageRoute() {
  const [currentPage] = useState('booking');

  const handleNavigate = (page: string) => {
    window.history.pushState(null, '', page === 'home' ? '/' : `/?page=${page}`);
    window.location.href = page === 'home' ? '/' : `/?page=${page}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <BookingPage />
    </div>
  );
}
