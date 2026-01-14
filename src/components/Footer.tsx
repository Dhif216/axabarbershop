'use client';

import { useI18n } from './I18nProvider';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              {t('footer.hours')}
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>{t('footer.monday_friday')}</li>
              <li>{t('footer.saturday')}</li>
              <li>{t('footer.sunday')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">{t('footer.contact')}</h3>
            <ul className="text-gray-300 space-y-2">
              <li>📍 Rullakkotori 1 LT 2, 00240 Helsinki</li>
              <li>📞 +358 41 3134978</li>
              <li>📧 info@axabarbershop.com</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              {t('footer.about')}
            </h3>
            <p className="text-gray-300">
              {t('footer.aboutDesc')}
            </p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>{t('footer.copyright')}</div>
          <button
            onClick={() => {
              window.history.pushState(null, '', '/?page=privacy');
              window.location.href = '/?page=privacy';
            }}
            className="text-gray-400 hover:text-blue-400 transition-colors mt-4 md:mt-0"
          >
            {t('nav.privacy')}
          </button>
        </div>
      </div>
    </footer>
  );
}
