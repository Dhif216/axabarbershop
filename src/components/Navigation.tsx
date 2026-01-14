'use client';

import { Menu, X, Lock } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useI18n } from './I18nProvider';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}
export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navItems = [
    { name: t('nav.home'), value: 'home' },
    { name: t('nav.services'), value: 'services' },
    { name: t('nav.booking'), value: 'booking' },
    { name: t('nav.contact'), value: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-xl tracking-wider text-primary hover:text-primary/80 transition-colors font-bold"
          >
            AXA BARBERSHOP
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  console.log('Navigating to:', item.value);
                  onNavigate(item.value);
                }}
                className={`transition-colors ${
                  currentPage === item.value
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Button onClick={() => onNavigate('booking')} size="sm">
              {t('nav.booking')}
            </Button>
            
            {/* Language Switcher */}
            <div className="flex gap-2 ml-4 border-l border-border pl-4">
              <button
                onClick={() => setLanguage('fi')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'fi'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                FI
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* Admin Icon */}
            <a 
              href="/admin" 
              className="ml-2 p-2 rounded hover:bg-foreground/10 transition-colors text-foreground/70 hover:text-foreground"
              title="Admin"
            >
              <Lock className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 transition-colors ${
                    currentPage === item.value
                      ? 'text-primary'
                      : 'text-foreground/70'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => {
                  onNavigate('booking');
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                {t('nav.booking')}
              </Button>
              
              {/* Mobile Language Switcher */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setLanguage('fi');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 rounded font-medium transition-colors ${
                    language === 'fi'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  Suomi
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 rounded font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Mobile Admin Link */}
              <a 
                href="/admin" 
                className="flex items-center gap-2 py-2 px-3 rounded mt-4 pt-4 border-t border-border text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
              >
                <Lock className="h-5 w-5" />
                <span>Admin</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
