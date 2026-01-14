'use client';

import Link from 'next/link';
import { useI18n } from '../../src/components/I18nProvider';

const services = [
  {
    id: 1,
    nameKey: 'services.haircut',
    descKey: 'services.haircut_desc',
    price: 25,
    duration: '30 mins',
    icon: '✂',
  },
  {
    id: 2,
    nameKey: 'services.beard',
    descKey: 'services.beard_desc',
    price: 20,
    duration: '20 mins',
    icon: '🧔',
  },
  {
    id: 3,
    nameKey: 'services.shave',
    descKey: 'services.shave_desc',
    price: 30,
    duration: '30 mins',
    icon: '🪒',
  },
  {
    id: 4,
    nameKey: 'services.combo',
    descKey: 'services.combo_desc',
    price: 40,
    duration: '50 mins',
    icon: '⭐',
  },
];

export default function Services() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-400">
            Professional grooming services tailored for you
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {t(service.nameKey)}
                </h3>
                <p className="text-gray-300 mb-4">{t(service.descKey)}</p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-semibold">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{t('services.price')}</p>
                    <p className="text-3xl font-bold text-blue-400">
                      ${service.price}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Barbers</h3>
              <p className="text-gray-400">
                Trained professionals with years of experience in modern barbering techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Latest Trends
              </h3>
              <p className="text-gray-400">
                Stay updated with current styles and grooming trends.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-3">Quality Products</h3>
              <p className="text-gray-400">
                Premium grooming products for the best results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Book?
          </h2>
          <Link
            href="/booking"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
