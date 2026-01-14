'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useI18n } from './I18nProvider';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export function KidsWelcome() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Hide on admin page
  if (pathname === '/admin') {
    return null;
  }

  return (
    <>
      {/* Floating Lollipop Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 group"
        aria-label="Kids Welcome"
      >
        {/* Spinning lollipop with glow effect */}
        <div className="relative w-16 h-16 animate-bounce">
          {/* Glow circle */}
          <div className="absolute inset-0 bg-red-400 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity"></div>
          
          {/* Main lollipop button */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow transform group-hover:scale-110 transition-transform">
            <span className="text-3xl animate-spin" style={{ animationDuration: '3s' }}>
              🍭
            </span>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-75 transition-opacity animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in duration-300">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            {/* Header with lollipop */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3 inline-block animate-bounce">🍭</div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">
                {t('kidsWelcome.title')}
              </h2>
              <p className="text-gray-600 text-lg font-medium">
                {t('kidsWelcome.message')}
              </p>
            </div>

            {/* Service Details */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">SERVICE</p>
                  <p className="text-xl font-bold text-gray-800">
                    {t('kidsWelcome.service')}
                  </p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">PRICE</p>
                    <p className="text-2xl font-bold text-red-600">
                      {t('kidsWelcome.price')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">DURATION</p>
                    <p className="text-lg font-bold text-gray-800">
                      {t('kidsWelcome.duration')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-gray-700 mb-6 text-base leading-relaxed">
              {t('kidsWelcome.description')}
            </p>

            {/* Special Features */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-2 border-blue-200">
              <p className="text-sm font-bold text-blue-900 mb-2">✨ Special Features:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Friendly & patient barbers</li>
                <li>✓ Kids-friendly atmosphere</li>
                <li>✓ Free lollipop reward! 🍭</li>
                <li>✓ Fun haircut experience</li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  window.location.href = '/?page=booking';
                }}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg text-lg"
              >
                {t('kidsWelcome.bookNow')}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1 py-3"
              >
                Close
              </Button>
            </div>

            {/* Footer message */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Questions? Call us or email us!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
