import React, { useState } from 'react';
import {
  MapPin,
  Plane,
  Clock,
  ArrowRight,
  Sparkles,
  Landmark,
  Globe2,
  Calendar
} from 'lucide-react';
import { Language, Currency, Destination } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface DestinationsSectionProps {
  language: Language;
  currency: Currency;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onBookDestination: (dest: Destination) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  language,
  currency,
  destinations,
  onSelectDestination,
  onBookDestination,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';
  const [activeFilter, setActiveFilter] = useState<'all' | 'international' | 'religious'>('all');

  const filtered = destinations.filter((d) => {
    if (activeFilter === 'all') return true;
    return d.category === activeFilter;
  });

  return (
    <section id="destinations" className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.section02_title || 'اكتشف العالم'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {t.dest_subtitle || 'رحلات مباشرة وعروض استثنائية من كافة المطارات الجزائرية.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200/80 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              id="filter-dest-all"
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filter_all}
            </button>
            <button
              onClick={() => setActiveFilter('international')}
              id="filter-dest-intl"
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition cursor-pointer ${
                activeFilter === 'international'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filter_international}
            </button>
            <button
              onClick={() => setActiveFilter('religious')}
              id="filter-dest-religious"
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition cursor-pointer ${
                activeFilter === 'religious'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.filter_religious}
            </button>
          </div>
        </div>

        {/* Asymmetric Destination Grid matching Reference Proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {filtered.map((dest, idx) => {
            const name = language === 'ar' ? dest.name_ar : language === 'fr' ? dest.name_fr : dest.name_en;
            const country = language === 'ar' ? dest.country_ar : language === 'fr' ? dest.country_fr : dest.country_en;
            const isParisOrFirst = idx === 0;

            return (
              <div
                key={dest.id}
                id={`destination-card-${dest.id}`}
                onClick={() => onSelectDestination(dest)}
                className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[300px] ${
                  isParisOrFirst
                    ? 'sm:col-span-2 lg:col-span-6 lg:min-h-[420px]'
                    : 'lg:col-span-3 lg:min-h-[340px]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={dest.image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent group-hover:from-slate-950/95 transition-colors" />

                {/* Top Tags */}
                <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/25">
                    {country}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-950/60 text-slate-200 backdrop-blur-md">
                    {dest.airport}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <h3 className={`font-black tracking-tight mb-1 text-white group-hover:text-amber-200 transition ${isParisOrFirst ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{country}</span>
                      </span>
                      <span>·</span>
                      <span className="font-bold text-amber-300">
                        {t.starts_from} {formatCurrency(dest.starting_price_dzd, language, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Circular Subtle Arrow Button matching reference */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-950 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 shrink-0">
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
