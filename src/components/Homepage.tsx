import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Scissors, Clock, MapPin, Star, Phone, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useI18n } from "./I18nProvider";
import { AnimatedText } from "./AnimatedText";

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const { t } = useI18n();
  const services = [
    {
      nameKey: "homepage.haircut",
      price: t('homepage.haircut_price'),
      duration: t('homepage.haircut_duration'),
      descKey: "homepage.haircut_desc",
    },
    {
      nameKey: "homepage.shave",
      price: t('homepage.shave_price'),
      duration: t('homepage.shave_duration'),
      descKey: "homepage.shave_desc",
    },
    {
      nameKey: "homepage.combo",
      price: t('homepage.combo_price'),
      duration: t('homepage.combo_duration'),
      descKey: "homepage.combo_desc",
    },
  ];

  const reviews = [
    {
      nameKey: "homepage.review1_name",
      ratingKey: "homepage.review1_text",
      dateKey: "homepage.review1_date",
      rating: 5,
    },
    {
      nameKey: "homepage.review2_name",
      ratingKey: "homepage.review2_text",
      dateKey: "homepage.review2_date",
      rating: 5,
    },
    {
      nameKey: "homepage.review3_name",
      ratingKey: "homepage.review3_text",
      dateKey: "homepage.review3_date",
      rating: 5,
    },
  ];

  const openingHours = [
    { dayKey: "homepage.monday", hours: "10:00 - 20:00" },
    { dayKey: "homepage.tuesday", hours: "10:00 - 20:00" },
    { dayKey: "homepage.wednesday", hours: "10:00 - 20:00" },
    { dayKey: "homepage.thursday", hours: "10:00 - 20:00" },
    { dayKey: "homepage.friday", hours: "10:00 - 20:00" },
    { dayKey: "homepage.saturday", hours: "10:00 - 18:00" },
    { dayKey: "homepage.sunday", hoursKey: "homepage.closedLabel" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-white tracking-normal leading-tight font-bold">
            {t('hero.title')}
            <br />
            <span className="text-white">{t('hero.subtitle')}</span>
          </h1>
          <div className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            <AnimatedText text={t('hero.description')} className="inline-block" />
          </div>
          <Button
            size="lg"
            onClick={() => onNavigate("booking")}
            className="text-base px-8"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl mb-6">{t('homepage.welcome')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('homepage.welcomeDesc')}
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('homepage.ourServices')}</h2>
            <p className="text-muted-foreground">{t('homepage.ourServicesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
            {/* Left GIF */}
            <div className="hidden md:flex justify-center">
              <img 
                src="/giphy.gif" 
                alt="Barbershop animation"
                className="w-full h-64 object-contain"
              />
            </div>
            
            {/* Services Cards */}
            <div className="md:col-span-4 grid md:grid-cols-1 gap-6">
              {services.map((service) => (
                <Card key={service.nameKey} className="p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-1">{t(service.nameKey)}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-2xl text-primary">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{t(service.descKey)}</p>
                </Card>
              ))}
            </div>
            
            {/* Right GIF */}
            <div className="hidden md:flex justify-center">
              <img 
                src="/giphy.gif" 
                alt="Barbershop animation"
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => onNavigate("services")}>
              {t('homepage.ourServices')}
            </Button>
          </div>
        </div>
      </section>

      {/* Hairstyles Gallery */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('homepage.gallery')}</h2>
            <p className="text-muted-foreground">{t('homepage.galleryDesc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 1, url: "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 1" },
              { id: 2, url: "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 2" },
              { id: 3, url: "https://images.unsplash.com/photo-1578390432942-d323db577792?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 3" },
              { id: 4, url: "https://images.unsplash.com/photo-1654097800183-574ba7368f74?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 4" },
              { id: 5, url: "https://images.unsplash.com/photo-1654097803253-d481b6751f29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 5" },
              { id: 6, url: "https://images.unsplash.com/photo-1463430144406-394c977562d7?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 6" },
              { id: 7, url: "https://images.unsplash.com/photo-1511920771146-1a7271092231?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Hairstyle 7" },
              { id: 8, url: "https://plus.unsplash.com/premium_photo-1741902728626-e00aec0bf055?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhhaXJjdXRzfGVufDB8fDB8fHww", alt: "Hairstyle 8" }
            ].map((item) => (
              <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-muted border border-border hover:border-primary/50 transition-colors">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours & Location */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Opening Hours */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="text-2xl">{t('contact.hours')}</h3>
            </div>
              <div className="space-y-3">
              {openingHours.map((item) => (
                <div
                  key={item.dayKey}
                  className="flex justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{t(item.dayKey)}</span>
                  <span>{item.hoursKey ? t(item.hoursKey) : item.hours}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Location with Map */}
          <div className="space-y-4">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-2xl">{t('contact.location')}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">{t('contact.location')}</p>
                  <p>Rullakkotori 1 LT 2</p>
                  <p>00240 Helsinki</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{t('homepage.phone')}</p>
                  <a href="tel:+358413134978" className="text-primary hover:underline">
                    +358 41 3134978
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{t('homepage.email')}</p>
                  <a href="mailto:info@finnishcuts.fi" className="text-primary hover:underline">
                    info@finnishcuts.fi
                  </a>
                </div>
              </div>
            </Card>

            {/* Map Embed */}
            <Card className="p-0 overflow-hidden h-64">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.6699250457748!2d24.92473017727201!3d60.21929223946815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469209285ded4eef%3A0x59682a136191f23d!2sAXA%20Barbershop!5e0!3m2!1sen!2sfi!4v1768405117769!5m2!1sen!2sfi"
              ></iframe>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('homepage.reviews')}</h2>
            <p className="text-muted-foreground">{t('homepage.reviewsDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.nameKey} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4">{t(review.ratingKey)}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{t(review.nameKey)}</span>
                  <span className="text-muted-foreground">{t(review.dateKey)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl mb-4">{t('homepage.socialMedia')}</h2>
            <p className="text-muted-foreground">{t('homepage.socialMediaDesc')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@axa.parturi/video/7529642451137563926?is_from_webapp=1&sender_device=pc&web_id=7595290176940754454"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <svg className="h-16 w-16 text-white mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.08A6.9 6.9 0 0 0 5 20.1a6.9 6.9 0 0 0 10.52-5.17V10.2a8.8 8.8 0 0 0 5.12 1.7z" />
                  </svg>
                  <p className="text-white font-semibold">{t('homepage.followTiktok')}</p>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/axa.parturi/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <div className="text-center">
                  <svg className="h-16 w-16 text-white mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                  <p className="text-white font-semibold">{t('homepage.followInstagram')}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Scissors className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl mb-6">{t('homepage.readyForNewStyle')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('homepage.bookOnline')}
          </p>
          <Button size="lg" onClick={() => onNavigate("booking")} className="px-8">
            {t('homepage.bookNow')}
          </Button>
        </div>
      </section>
    </div>
  );
}
