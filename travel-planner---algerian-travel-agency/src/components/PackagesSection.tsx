import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Hotel,
  Clock,
  Plane,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language, Currency, TravelPackage } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface PackagesSectionProps {
  language: Language;
  currency: Currency;
  packages: TravelPackage[];
  onBookPackage: (pkg: TravelPackage) => void;
  onSelectPackage?: (pkg: TravelPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  language,
  currency,
  packages,
  onBookPackage,
  onSelectPackage,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  return (
    <section id="packages" className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.section04_title || 'باقات سفر مختارة'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {t.section04_subtitle || 'برامج سياحية متكاملة تشمل الطيران، الإقامة، والجولات السياحية.'}
            </p>
          </div>
        </div>

        {/* 4-column Card Grid matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {packages.slice(0, 4).map((pkg) => {
            const title = language === 'ar' ? pkg.title_ar : language === 'fr' ? pkg.title_fr : pkg.title_en;
            const depCity = language === 'ar' ? pkg.departure_city_ar : pkg.departure_city;

            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image with Tag & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Top Badge: Flight + Hotel Included */}
                  <div className="absolute top-3 start-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs">
                      {language === 'ar' ? 'شامل الطيران والفندق' : 'Vol + Hôtel inclus'}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 end-3">
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-950/70 text-amber-300 backdrop-blur-xs flex items-center gap-1">
                      <span>★</span>
                      <span>{pkg.hotel_stars}.0</span>
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-white text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>
                        {pkg.duration_days} {language === 'ar' ? 'أيام' : 'Jours'}
                      </span>
                    </span>
                    <span className="text-slate-200 text-[10px]">
                      {depCity}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 mb-0.5 block truncate">
                      {pkg.hotel_name}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                      {title}
                    </h3>
                  </div>

                  {/* Price & CTA button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-semibold">
                        {t.starts_from}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {formatCurrency(pkg.price_dzd, language, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => (onSelectPackage ? onSelectPackage(pkg) : onBookPackage(pkg))}
                      id={`btn-pkg-details-${pkg.id}`}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-900 font-bold text-xs transition active:scale-98 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'عرض التفاصيل' : 'Détails'}</span>
                      <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
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
