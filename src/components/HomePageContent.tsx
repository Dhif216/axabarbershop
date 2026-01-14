'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from './Navigation';
import { Homepage } from './Homepage';
import { BookingPage } from './BookingPage';
import { ServicesPage } from './ServicesPage';
import { ContactPage } from './ContactPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';

export default function HomePageContent() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState('home');

  // Handle URL params on mount and when searchParams change
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(pageParam);
    }
  }, [searchParams]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState(null, '', page === 'home' ? '/' : `/?page=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {currentPage === 'home' && <Homepage onNavigate={handleNavigate} />}
      {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
      {currentPage === 'booking' && <BookingPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'privacy' && <PrivacyPolicyPage />}
    </div>
  );
}
