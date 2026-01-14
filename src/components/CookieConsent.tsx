'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from './I18nProvider';

interface CookieConsentProps {
  onNavigate?: (page: string) => void;
}

export function CookieConsent({ onNavigate }: CookieConsentProps) {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('axabarbershop-cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('axabarbershop-cookie-consent', 'all');
    setIsVisible(false);
    // Load Google Analytics if user accepts
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('axabarbershop-cookie-consent', 'essential');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('axabarbershop-cookie-consent', 'rejected');
    setIsVisible(false);
  };

  const handlePrivacyClick = () => {
    if (onNavigate) {
      onNavigate('privacy');
    } else {
      window.location.hash = '#privacy';
    }
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-primary/20 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-white">
              {t('cookies.title')}
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              {t('cookies.description')}
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                <strong>{t('cookies.essential')}:</strong> {t('cookies.essentialDesc')}
              </p>
              <p>
                <strong>{t('cookies.analytics')}:</strong> {t('cookies.analyticsDesc')}
              </p>
              <p className="mt-2">
                <button 
                  onClick={handlePrivacyClick}
                  className="text-primary hover:underline"
                >
                  {t('cookies.privacyPolicy')}
                </button>
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="text-xs flex-1 sm:flex-none"
            >
              {t('cookies.reject')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptEssential}
              className="text-xs flex-1 sm:flex-none"
            >
              {t('cookies.essential')}
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="text-xs flex-1 sm:flex-none"
            >
              {t('cookies.acceptAll')}
            </Button>
          </div>

          <button
            onClick={handleReject}
            className="absolute top-4 right-4 sm:relative text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
