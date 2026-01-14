'use client';

import { useI18n } from '../../src/components/I18nProvider';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Content */}
            <div>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                With over 15 years of experience in the barbering industry, AXA Barbershop 
                has become a trusted name for quality grooming services. Our team is 
                committed to providing the best haircuts, beard trims, and shaves in a 
                comfortable and welcoming environment.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We believe in combining traditional barbering techniques with modern 
                styling to give our clients the best of both worlds.
              </p>
            </div>

            {/* Right Stats */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-blue-400 mb-8">
                By The Numbers
              </h3>

              <div className="mb-8">
                <div className="text-4xl font-bold text-blue-400">1000+</div>
                <p className="text-gray-300 text-lg">Happy Customers</p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold text-blue-400">15</div>
                <p className="text-gray-300 text-lg">Years of Experience</p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold text-blue-400">8</div>
                <p className="text-gray-300 text-lg">Professional Barbers</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-blue-400">4.9</div>
                <p className="text-gray-300 text-lg">⭐ Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white">
                  👨‍💼
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Master Barber {i}
                </h3>
                <p className="text-gray-400 mb-4">Specialist</p>
                <p className="text-sm text-gray-500">
                  Expert in modern cuts and traditional shaves
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Location</h3>
              <p className="text-gray-300 mb-4 flex items-center">
                <span className="text-2xl mr-3">📍</span>
                {t('footer.address')}
              </p>
              <p className="text-gray-300 mb-4 flex items-center">
                <span className="text-2xl mr-3">📞</span>
                {t('footer.phone')}
              </p>
              <p className="text-gray-300 flex items-center">
                <span className="text-2xl mr-3">📧</span>
                info@axabarbershop.com
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">
                {t('footer.hours')}
              </h3>
              <p className="text-gray-300 mb-3">{t('footer.monday_friday')}</p>
              <p className="text-gray-300 mb-3">{t('footer.saturday')}</p>
              <p className="text-gray-300">{t('footer.sunday')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
