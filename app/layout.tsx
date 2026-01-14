import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "../src/components/I18nProvider";
import { CookieConsent } from "../src/components/CookieConsent";
import { KidsWelcome } from "../src/components/KidsWelcome";
import Footer from "../src/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://axabarbershop.fi"),
  title: "AXA Barbershop Helsinki - Professional Hair Cutting & Shaving Services | Parturipalvelu",
  description: "AXA Barbershop in Helsinki offers professional haircuts, shaves, and grooming services. Expert barbers with premium quality products. Book your appointment online. | AXA Parturipalvelu Helsingissä tarjoaa ammattimaisia hiustenleikkaus-, parranajo- ja grooming-palveluita.",
  keywords: [
    "barbershop Helsinki",
    "haircut Helsinki",
    "barber Helsinki",
    "men's haircut",
    "shave service",
    "grooming Helsinki",
    "fade haircut",
    "beard trimming",
    "parturi Helsinki",
    "parturipalvelu",
    "hiustenleikkaus Helsinki",
    "parranajo",
    "miesten parturi",
    "fade-leikkaus",
    "parran trimmaaus",
    "grooming Helsingin",
    "parturikauppa",
    "parturia Helsinki",
  ],
  authors: [{ name: "AXA Barbershop" }],
  creator: "AXA Barbershop",
  publisher: "AXA Barbershop",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "AXA Barbershop Helsinki - Premium Barber Services | Ammattilainen Parturipalvelu",
    description: "Professional barbershop in Helsinki. Expert haircuts, shaves, and grooming with premium quality products. | Ammattimainen parturipalvelu Helsingissä. Asiantuntija hiustenleikkaukset ja parranajot.",
    url: "https://axabarbershop.fi",
    images: [
      {
        url: "/favicon.ico",
        width: 200,
        height: 200,
        alt: "AXA Barbershop Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "AXA Barbershop Helsinki",
    description: "Professional barbershop in Helsinki. Book your appointment online. | Ammattimainen parturipalvelu Helsingissä.",
    creator: "@AXABarbershop",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://axabarbershop.fi",
    languages: {
      en: "https://axabarbershop.fi/en",
      fi: "https://axabarbershop.fi/fi",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "theme-color": "#1F4D3A",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
                page_title: document.title,
              });
            `,
          }}
        />
      </head>
      <body>
        <I18nProvider>
          <main>{children}</main>
          <KidsWelcome />
          <CookieConsent />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
