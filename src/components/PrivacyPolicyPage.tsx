'use client';

import { useI18n } from "./I18nProvider";

export function PrivacyPolicyPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('privacy.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('privacy.lastUpdated')}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section1Title')}</h2>
            <p className="text-muted-foreground leading-relaxed">{t('privacy.section1Content')}</p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section2Title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section2Intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>{t('privacy.section2Item1')}</li>
              <li>{t('privacy.section2Item2')}</li>
              <li>{t('privacy.section2Item3')}</li>
              <li>{t('privacy.section2Item4')}</li>
              <li>{t('privacy.section2Item5')}</li>
            </ul>
          </section>

          {/* Purpose of Data Processing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section3Title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section3Intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>{t('privacy.section3Item1')}</li>
              <li>{t('privacy.section3Item2')}</li>
              <li>{t('privacy.section3Item3')}</li>
              <li>{t('privacy.section3Item4')}</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section4Title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section4Content')}</p>
            <div className="bg-card p-4 rounded-lg space-y-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">{t('privacy.cookieEssential')}</h4>
                <p className="text-muted-foreground">{t('privacy.cookieEssentialDesc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('privacy.cookieAnalytics')}</h4>
                <p className="text-muted-foreground">{t('privacy.cookieAnalyticsDesc')}</p>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section5Title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section5Intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>{t('privacy.section5Item1Title')}:</strong> {t('privacy.section5Item1Desc')}</li>
              <li><strong>{t('privacy.section5Item2Title')}:</strong> {t('privacy.section5Item2Desc')}</li>
              <li><strong>{t('privacy.section5Item3Title')}:</strong> {t('privacy.section5Item3Desc')}</li>
              <li><strong>{t('privacy.section5Item4Title')}:</strong> {t('privacy.section5Item4Desc')}</li>
              <li><strong>{t('privacy.section5Item5Title')}:</strong> {t('privacy.section5Item5Desc')}</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section6Title')}</h2>
            <p className="text-muted-foreground">{t('privacy.section6Content')}</p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section7Title')}</h2>
            <p className="text-muted-foreground">{t('privacy.section7Content')}</p>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section8Title')}</h2>
            <p className="text-muted-foreground">{t('privacy.section8Content')}</p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section9Title')}</h2>
            <p className="text-muted-foreground">{t('privacy.section9Content')}</p>
          </section>

          {/* Contact Information */}
          <section className="bg-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('privacy.section10Title')}</h2>
            <p className="text-muted-foreground mb-4">{t('privacy.section10Intro')}</p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>{t('privacy.contactName')}:</strong> AXA Barbershop</p>
              <p><strong>{t('privacy.contactAddress')}:</strong> Rullakkotori 1 LT 2, 00240 Helsinki, Finland</p>
              <p><strong>{t('privacy.contactEmail')}:</strong> info@axabarbershop.fi</p>
              <p><strong>{t('privacy.contactPhone')}:</strong> +358 41 3134978</p>
            </div>
          </section>

          {/* GDPR Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('privacy.gdprTitle')}</h2>
            <p className="text-muted-foreground">{t('privacy.gdprContent')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
