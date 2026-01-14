'use client';

import { Suspense } from 'react';
import Head from 'next/head';
import HomePageContent from '../src/components/HomePageContent';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AXA Barbershop",
  image: "https://axabarbershop.fi/favicon.ico",
  description: "Professional barbershop in Helsinki offering expert haircuts, shaves, and grooming services",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rullakkotori 1 LT 2",
    addressLocality: "Helsinki",
    postalCode: "00240",
    addressCountry: "FI"
  },
  telephone: "+358401234567",
  email: "info@axabarbershop.fi",
  url: "https://axabarbershop.fi",
  priceRange: "$$",
  areaServed: "Helsinki",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00"
    }
  ],
  sameAs: [
    "https://www.facebook.com/axabarbershop",
    "https://www.instagram.com/axabarbershop"
  ],
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Markus K."
      },
      datePublished: "2025-12-31",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5"
      },
      reviewBody: "Best barber in Helsinki! Professional and friendly service."
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Timo S."
      },
      datePublished: "2025-11-30",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5"
      },
      reviewBody: "Excellent fade haircut. I will definitely come back!"
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background text-foreground dark flex items-center justify-center">Loading...</div>}>
        <HomePageContent />
      </Suspense>
    </>
  );
}
