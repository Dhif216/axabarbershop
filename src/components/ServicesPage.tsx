import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Scissors, Clock, Sparkles, Cog } from "lucide-react";
import { useI18n } from "./I18nProvider";

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t, language } = useI18n();
  
  const services = [
    {
      icon: Scissors,
      nameKey: "services.haircut",
      descKey: "services.haircut_desc",
      price: "35€",
      duration: "45 min",
      includesKey: [
        "services.includes_haircut_1",
        "services.includes_haircut_2",
        "services.includes_haircut_3",
        "services.includes_haircut_4",
      ],
    },
    {
      icon: Sparkles,
      nameKey: "services.beard",
      descKey: "services.beard_desc",
      price: "25€",
      duration: "30 min",
      includesKey: [
        "services.includes_beard_1",
        "services.includes_beard_2",
        "services.includes_beard_3",
        "services.includes_beard_4",
      ],
    },
    {
      icon: Scissors,
      nameKey: "services.combo",
      descKey: "services.combo_desc",
      price: "55€",
      duration: "75 min",
      includesKey: [
        "services.includes_combo_1",
        "services.includes_combo_2",
        "services.includes_combo_3",
        "services.includes_combo_4",
      ],
    },
    {
      icon: Cog,
      nameKey: "services.styling",
      descKey: "services.styling_desc",
      price: "15€",
      duration: "15 min",
      includesKey: [
        "services.includes_styling_1",
        "services.includes_styling_2",
        "services.includes_styling_3",
        "services.includes_styling_4",
      ],
    },
    {
      icon: Scissors,
      nameKey: "services.beard_trim",
      descKey: "services.beard_trim_desc",
      price: "20€",
      duration: "20 min",
      includesKey: [
        "services.includes_trim_1",
        "services.includes_trim_2",
        "services.includes_trim_3",
        "services.includes_trim_4",
      ],
    },
    {
      icon: Sparkles,
      nameKey: "services.coloring",
      descKey: "services.coloring_desc",
      price: "45€",
      duration: "60 min",
      includesKey: [
        "services.includes_color_1",
        "services.includes_color_2",
        "services.includes_color_3",
        "services.includes_color_4",
      ],
    },
    {
      icon: Sparkles,
      nameKey: "services.facial",
      descKey: "services.facial_desc",
      price: "40€",
      duration: "45 min",
      includesKey: [
        "services.includes_facial_1",
        "services.includes_facial_2",
        "services.includes_facial_3",
        "services.includes_facial_4",
      ],
    },
    {
      icon: Scissors,
      nameKey: "services.kids_cut",
      descKey: "services.kids_cut_desc",
      price: "25€",
      duration: "30 min",
      includesKey: [
        "services.includes_kids_1",
        "services.includes_kids_2",
        "services.includes_kids_3",
        "services.includes_kids_4",
      ],
    },
  ];

  return (
    <div 
      className="min-h-screen py-12 px-4 bg-background relative overflow-hidden"
      style={{
        backgroundImage: 'url(/back2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .float-1 { animation: float 3s ease-in-out infinite; }
        .float-2 { animation: float 4s ease-in-out infinite; animation-delay: 0.5s; }
        .float-3 { animation: float 3.5s ease-in-out infinite; animation-delay: 1s; }
        .float-4 { animation: float 4s ease-in-out infinite; animation-delay: 0.2s; }
        .float-5 { animation: float 3.5s ease-in-out infinite; animation-delay: 0.7s; }
        .float-6 { animation: float 3s ease-in-out infinite; animation-delay: 1.2s; }
        .float-7 { animation: float 4s ease-in-out infinite; animation-delay: 0.4s; }
        .float-8 { animation: float 3.5s ease-in-out infinite; animation-delay: 0.9s; }
      `}</style>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-white drop-shadow-lg">{t('services.title')}</h1>
            <p className="text-lg text-gray-100 drop-shadow-lg">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const floatClass = `float-${(idx % 8) + 1}`;
            return (
              <div
                key={service.nameKey}
                className={`${floatClass} group flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 backdrop-blur-lg border border-white/30 hover:bg-black/50 hover:border-white/50 transition-all duration-300 hover:shadow-2xl cursor-pointer`}
              >
                {/* Icon Circle */}
                <div className="mb-6 p-5 rounded-full bg-gradient-to-br from-white/20 to-white/10 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Service Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors drop-shadow">
                  {t(service.nameKey)}
                </h3>

                {/* Price and Duration */}
                <div className="flex gap-4 justify-center mb-4 w-full text-sm">
                  <div className="px-3 py-1 rounded-full bg-white/20 text-white font-semibold drop-shadow">
                    {service.price}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/15 text-white/90 flex items-center gap-1 drop-shadow">
                    <Clock className="h-3 w-3" />
                    {service.duration}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-100 mb-4 group-hover:text-white transition-colors drop-shadow">
                  {t(service.descKey)}
                </p>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-full my-4" />

                {/* Includes Preview */}
                <div className="text-xs text-gray-200 space-y-1">
                  {service.includesKey.map((key, kidx) => (
                    <p key={kidx} className="flex items-center gap-2 justify-center drop-shadow">
                      <span className="w-1 h-1 bg-white rounded-full" />
                      {t(key)}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" onClick={() => onNavigate("booking")} className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-bold px-8 py-4 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}
