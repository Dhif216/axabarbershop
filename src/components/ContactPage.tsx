import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { useState } from "react";
import { useI18n } from "./I18nProvider";

export function ContactPage() {
  const { t, language } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: language,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to send message");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const openingHours = [
    { day: "Maanantai", hours: "10:00 - 20:00" },
    { day: "Tiistai", hours: "10:00 - 20:00" },
    { day: "Keskiviikko", hours: "10:00 - 20:00" },
    { day: "Torstai", hours: "10:00 - 20:00" },
    { day: "Perjantai", hours: "10:00 - 20:00" },
    { day: "Lauantai", hours: "10:00 - 18:00" },
    { day: "Sunnuntai", hours: "Suljettu" },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6">{t('contact.title')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('contact.fillForm')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2">{t('contact.location')}</h3>
                  <p className="text-muted-foreground mb-4">
                    Rullakkotori 1 LT 2
                    <br />
                    00240 Helsinki
                    <br />
                    Suomi
                  </p>
                  <a
                    href="https://maps.app.goo.gl/soGV3Q7V8zp45avB9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2">{t('contact.phone')}</h3>
                  <a
                    href="tel:+358413134978"
                    className="text-primary hover:underline text-lg"
                  >
                    +358 41 3134978
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2">{t('contact.email')}</h3>
                  <a
                    href="mailto:info@finnishcuts.fi"
                    className="text-primary hover:underline text-lg"
                  >
                    info@finnishcuts.fi
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-4">{t('contact.hours')}</h3>
                  <div className="space-y-2">
                    {openingHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between text-sm py-1"
                      >
                        <span className="text-muted-foreground">{item.day}</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl mb-2">{t('contact.message')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('contact.fillForm')}
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl mb-2 font-semibold">{t('contact.messageSent')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.thankYou')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="contact-name">{t('contact.name')} *</Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t('contact.name')}
                      required
                      disabled={loading}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">{t('contact.emailAddress')} *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nimi@esimerkki.fi"
                      required
                      disabled={loading}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">{t('contact.messageText')} *</Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t('contact.messageText')}
                      rows={6}
                      required
                      disabled={loading}
                      className="mt-2"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('contact.send')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
