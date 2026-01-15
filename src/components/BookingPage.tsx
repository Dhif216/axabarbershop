import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Check, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useI18n } from "./I18nProvider";
import { SecretAdminButton } from "./SecretAdminButton";

// Helper function to format date in local timezone (not UTC)
const formatLocalDate = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().split('T')[0];
};

interface BookingData {
  service: string;
  date: Date | undefined;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export function BookingPage() {
  const { t, language } = useI18n();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    date: undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const services = [
    {
      id: "Haircut",
      nameKey: "services.haircut",
      price: "25€",
      duration: "45 min",
    },
    {
      id: "Beard Trim",
      nameKey: "services.beard_trim",
      price: "15€",
      duration: "30 min",
    },
    {
      id: "Hair & Beard",
      nameKey: "services.hair_and_beard",
      price: "35€",
      duration: "75 min",
    },
    {
      id: "Styling",
      nameKey: "services.styling",
      price: "20€",
      duration: "15 min",
    },
    {
      id: "Hair Wash",
      nameKey: "services.hairwash",
      price: "10€",
      duration: "15 min",
    },
    {
      id: "Combo",
      nameKey: "services.combo",
      price: "50€",
      duration: "90 min",
    },
  ];

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  // Auto-refresh availability every 10 seconds when a date is selected
  useEffect(() => {
    if (!bookingData.date) return;
    
    const refreshAvailability = async () => {
      const dateStr = bookingData.date ? formatLocalDate(bookingData.date) : undefined;
      try {
        const response = await fetch(`/api/bookings/availability?date=${dateStr}`);
        if (response.ok) {
          const data = await response.json();
          setBookedTimes(data.bookedTimes || []);
        }
      } catch (err) {
        console.error('Failed to refresh availability:', err);
      }
    };

    // Initial fetch
    refreshAvailability();

    // Set up interval to refresh every 10 seconds
    const interval = setInterval(refreshAvailability, 10000);
    return () => clearInterval(interval);
  }, [bookingData.date]);

  const handleDateChange = async (date: Date | undefined) => {
    setBookingData({ ...bookingData, date, time: "" });
    
    if (date) {
      // Check availability for selected date
      const dateStr = formatLocalDate(date);
      try {
        const response = await fetch(`/api/bookings/availability?date=${dateStr}`);
        if (response.ok) {
          const data = await response.json();
          setBookedTimes(data.bookedTimes || []);
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    if (bookedTimes.includes(time)) return; // Can't select booked time
    setError(null);
    setBookingData({ ...bookingData, time });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First, reserve the slot (lock it for 10 minutes)
      const dateStr = bookingData.date ? formatLocalDate(bookingData.date) : undefined;
      const reserveResponse = await fetch('/api/bookings/reserve-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateStr, time: bookingData.time }),
      });

      if (!reserveResponse.ok) {
        const errorData = await reserveResponse.json();
        setError(errorData.error || 'Slot unavailable. Please select another time.');
        // Refresh availability since slot might have been taken
        const availResponse = await fetch(`/api/bookings/availability?date=${dateStr}`);
        if (availResponse.ok) {
          const data = await availResponse.json();
          setBookedTimes(data.bookedTimes || []);
        }
        return;
      }

      const reserved = await reserveResponse.json();
      setReservationId(reserved.reservedSlot.id);

      // Then, create the actual booking
      const bookingResponse = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: bookingData.service,
          date: dateStr,
          time: bookingData.time,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          language: language,
          notes: bookingData.notes,
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Failed to submit booking');
      }

      const result = await bookingResponse.json();
      console.log('Booking submitted successfully:', result);
      setStep(4);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Booking error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handleNext = () => {
    if (step === 1 && !bookingData.service) {
      setError(t('booking.selectServiceError'));
      return;
    }
    if (step === 2 && (!bookingData.date || !bookingData.time)) {
      setError(t('booking.selectDateTimeError'));
      return;
    }
    if (step === 3 && (!bookingData.name || !bookingData.email || !bookingData.phone)) {
      setError(t('booking.fillDetailsError'));
      return;
    }
    setError(null);
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.date && !!bookingData.time;
      case 3:
        return !!bookingData.name && !!bookingData.email && !!bookingData.phone;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, titleKey: "booking.step1" },
    { number: 2, titleKey: "booking.step2" },
    { number: 3, titleKey: "booking.step3" },
    { number: 4, titleKey: "booking.step4" },
  ];

  return (
    <div className="bg-background">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ minHeight: '100vh' }}>
        {/* Left Side - Background Image */}
        <div className="flex items-center justify-center lg:col-span-1" style={{ minHeight: '300px' }}>
          <div 
            className="w-full rounded-lg overflow-hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/back1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: '100%',
              minHeight: 'inherit',
            }}
          />
        </div>

        {/* Right Side - Booking Form */}
        <div className="lg:col-span-2 py-8 px-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step >= s.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step > s.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{s.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      step > s.number ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex-1 text-center ${
                  step >= s.number ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t(s.titleKey)}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-6 sm:p-8 mb-6">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl sm:text-3xl mb-6">{t('booking.selectService')}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() =>
                      setBookingData({ ...bookingData, service: service.id })
                    }
                    className={`p-6 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${
                      bookingData.service === service.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg">{t(service.nameKey)}</h3>
                      <span className="text-primary text-lg">{service.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {service.duration}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl sm:text-3xl mb-6">{t('booking.selectDateTime')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg mb-4">{t('booking.dateLabel')}</h3>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={handleDateChange}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0
                    }
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">{t('booking.timeLabel')}</h3>
                    {bookingData.date && (
                      <button
                        onClick={async () => {
                          const dateStr = bookingData.date ? formatLocalDate(bookingData.date) : undefined;
                          const response = await fetch(`/api/bookings/availability?date=${dateStr}`);
                          if (response.ok) {
                            const data = await response.json();
                            setBookedTimes(data.bookedTimes || []);
                          }
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition"
                        title="Refresh available times"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Refresh
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                    {timeSlots.map((time) => {
                      const isBooked = bookedTimes.includes(time);
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && handleTimeSelect(time)}
                          disabled={isBooked || loading}
                          className={`py-3 px-4 rounded-lg border-2 transition-all ${
                            isBooked
                              ? "border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-50"
                              : bookingData.time === time
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          } ${loading ? "cursor-not-allowed" : ""}`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl sm:text-3xl mb-6">{t('booking.contactDetails')}</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('booking.name')} *</Label>
                  <Input
                    id="name"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    placeholder={t('booking.namePlaceholder')}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('booking.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    placeholder={t('booking.emailPlaceholder')}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('booking.phone')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                    placeholder={t('booking.phonePlaceholder')}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">{t('booking.notes')}</Label>
                  <textarea
                    id="notes"
                    value={bookingData.notes}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, notes: e.target.value })
                    }
                    placeholder={t('booking.notesPlaceholder')}
                    className="mt-2 w-full p-3 border rounded-lg border-border bg-background focus:outline-none focus:border-primary"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl mb-4">{t('booking.booked')}</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t('booking.confirmationMessage')}{" "}
                <span className="text-foreground">{bookingData.email}</span>
              </p>
              <Card className="p-6 bg-card/50 text-left max-w-md mx-auto mb-8">
                <h3 className="text-lg mb-4">{t('booking.details')}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('booking.service')}:</span>
                    <span>
                      {t(
                        services.find((s) => s.id === bookingData.service)?.nameKey || 'services.haircut'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('booking.date')}:</span>
                    <span>
                      {bookingData.date?.toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('booking.time')}:</span>
                    <span>{bookingData.time}</span>
                  </div>
                </div>
              </Card>
              <p className="text-sm text-muted-foreground">
                {t('booking.cancelMessage')}
              </p>
            </div>
          )}
        </Card>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-medium">{t('booking.error') || 'Error'}</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('booking.back')}
            </Button>
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className="gap-2"
              >
                {t('booking.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t('booking.submitting') || 'Submitting...'}
                  </>
                ) : (
                  <>
                    {t('booking.confirm')}
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
      </div>
      <SecretAdminButton />
    </div>
  );
}
