import React, { useState } from 'react';
import {
  Search,
  PlaneTakeoff,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { Language, OriginLocation, Destination } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeroProps {
  language: Language;
  originLocations: OriginLocation[];
  destinations: Destination[];
  onSearch: (params: {
    departure: string;
    destination: string;
    dates: string;
    travelers: number;
    tab: 'packages' | 'flights' | 'umrah';
  }) => void;
  onExploreDestinations: () => void;
  onViewDeals: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  originLocations,
  destinations,
  onSearch,
  onExploreDestinations,
  onViewDeals,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const [activeTab, setActiveTab] = useState<'packages' | 'flights' | 'umrah'>('packages');
  const [selectedDeparture, setSelectedDeparture] = useState<string>('oran');
  const [selectedDestination, setSelectedDestination] = useState<string>('istanbul');
  const [travelDates, setTravelDates] = useState<string>('2026-10-15');
  const [travelersCount, setTravelersCount] = useState<number>(2);

  const heroContent = {
    ar: {
      eyebrow: 'اكتشف • سافر • استمتع',
      headline: 'رحلتك تبدأ من هنا',
      description: 'اكتشف وجهات مميزة وعروض سفر مختارة بعناية لرحلتك القادمة.',
      primary_cta: 'اكتشف الوجهات',
      secondary_cta: 'شاهد الباقات',
      floating_title: 'الوجهة القادمة',
      floating_subtitle: 'مغامرات جديدة',
    },
    fr: {
      eyebrow: 'DÉCOUVRIR • VOYAGER • PROFITER',
      headline: 'Votre voyage commence ici',
      description: 'Découvrez des destinations exceptionnelles et des offres soigneusement sélectionnées.',
      primary_cta: 'Découvrir les destinations',
      secondary_cta: 'Voir les forfaits',
      floating_title: 'Prochaine étape',
      floating_subtitle: 'Nouvelles aventures',
    },
    en: {
      eyebrow: 'EXPLORE • DISCOVER • TRAVEL',
      headline: 'Your Journey Starts Here',
      description: 'Discover exceptional destinations and carefully selected travel offers.',
      primary_cta: 'Explore Destinations',
      secondary_cta: 'View Packages',
      floating_title: 'Next Stop',
      floating_subtitle: 'New Adventures',
    },
  }[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      departure: selectedDeparture,
      destination: selectedDestination,
      dates: travelDates,
      travelers: travelersCount,
      tab: activeTab,
    });
  };

  return (
    <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background with cinematic airplane wing above clouds during golden hour */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2000&q=85"
          alt="Airplane wing over clouds"
          className="w-full h-full object-cover object-center scale-102"
        />
        {/* Subtle darkening overlay for maximum readability */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split Area: Typography on Left & Floating Side Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 sm:mb-14">
          {/* Main Hero Typography */}
          <div className="lg:col-span-8 text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-amber-300 text-xs font-bold tracking-widest mb-4 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{heroContent.eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none mb-4 drop-shadow-sm">
              {heroContent.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-100/90 font-medium leading-relaxed max-w-2xl mb-7 drop-shadow-xs">
              {heroContent.description}
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onExploreDestinations}
                id="hero-primary-cta"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-lg shadow-black/20 transition active:scale-98 cursor-pointer"
              >
                <span>{heroContent.primary_cta}</span>
                <ArrowRight className={`w-4 h-4 ms-2 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={onViewDeals}
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm border border-white/35 backdrop-blur-md transition active:scale-98 cursor-pointer"
              >
                <span>{heroContent.secondary_cta}</span>
              </button>
            </div>
          </div>

          {/* Floating Side Card */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div
              id="hero-floating-card"
              onClick={onExploreDestinations}
              className="group cursor-pointer max-w-xs w-full p-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-md font-bold">
                    <PlaneTakeoff className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-amber-300 tracking-wide uppercase">
                      {heroContent.floating_title}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-amber-200 transition">
                      {heroContent.floating_subtitle}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition">
                  <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-200">
                <span>{language === 'ar' ? 'رحلات مباشرة أسبوعية' : 'Vols directs hebdomadaires'}</span>
                <span className="font-bold text-amber-300">DZD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Search Bar anchored at bottom of hero */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl p-3.5 sm:p-5 shadow-2xl text-slate-900 border border-white/80">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Departure City */}
            <div className="lg:col-span-3 flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/60 transition">
              <label htmlFor="search-departure" className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{t.departure_city_label}</span>
              </label>
              <select
                id="search-departure"
                value={selectedDeparture}
                onChange={(e) => setSelectedDeparture(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-hidden cursor-pointer"
              >
                {originLocations.map((loc) => (
                  <option key={loc.id} value={loc.id} className="text-slate-900">
                    {language === 'ar' ? loc.name_ar : language === 'fr' ? loc.name_fr : loc.name_en} ({loc.airport})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="lg:col-span-3 flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/60 transition">
              <label htmlFor="search-destination" className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{t.destination_label}</span>
              </label>
              <select
                id="search-destination"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-hidden cursor-pointer"
              >
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id} className="text-slate-900">
                    {language === 'ar' ? dest.name_ar : language === 'fr' ? dest.name_fr : dest.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Dates */}
            <div className="lg:col-span-2 flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/60 transition">
              <label htmlFor="search-dates" className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>{t.travel_dates_label}</span>
              </label>
              <input
                type="date"
                id="search-dates"
                value={travelDates}
                onChange={(e) => setTravelDates(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Travelers */}
            <div className="lg:col-span-2 flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/60 transition">
              <label htmlFor="search-travelers" className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-600" />
                <span>{t.travelers_label}</span>
              </label>
              <select
                id="search-travelers"
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full bg-transparent font-bold text-slate-900 text-xs sm:text-sm focus:outline-hidden cursor-pointer"
              >
                <option value={1}>1 {language === 'ar' ? 'مسافر' : 'person'}</option>
                <option value={2}>2 {language === 'ar' ? 'مسافرين' : 'people'}</option>
                <option value={3}>3 {language === 'ar' ? 'مسافرين' : 'people'}</option>
                <option value={4}>4 {language === 'ar' ? 'مسافرين' : 'people'}</option>
                <option value={5}>5+ {language === 'ar' ? 'عائلة' : 'group'}</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                id="hero-search-submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span className="whitespace-nowrap">{t.search_cta}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
