import React from 'react';
import { Sparkles, ArrowRight, Clock, MapPin, Tag } from 'lucide-react';
import { Language, Currency, Deal } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface DealsSectionProps {
  language: Language;
  currency: Currency;
  deals?: Deal[];
  onBookDeal: (deal: { title: string; destination: string; price: number }) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  language,
  currency,
  onBookDeal,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const defaultHotDeals = [
    {
      id: 'deal-istanbul',
      title_ar: 'إسطنبول الساحرة 8 أيام',
      title_fr: 'Istanbul Magique 8 Jours',
      title_en: 'Magical Istanbul 8 Days',
      destination_ar: 'إسطنبول، تركيا',
      destination_fr: 'Istanbul, Turquie',
      destination_en: 'Istanbul, Türkiye',
      departure_ar: 'وهران / الجزائر',
      departure_fr: 'Oran / Alger',
      departure_en: 'Oran / Algiers',
      duration_ar: '8 أيام / 7 ليال',
      duration_fr: '8 Jours / 7 Nuits',
      duration_en: '8 Days / 7 Nights',
      image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
      price_dzd: 65000,
      old_price_dzd: 82000,
      discount: 20,
    },
    {
      id: 'deal-dubai',
      title_ar: 'دبي - إقامة وتسوق 7 أيام',
      title_fr: 'Dubaï Shopping & Safari 7 Jours',
      title_en: 'Dubai Shopping & Safari 7 Days',
      destination_ar: 'دبي، الإمارات',
      destination_fr: 'Dubaï, Émirats',
      destination_en: 'Dubai, UAE',
      departure_ar: 'الجزائر / وهران',
      departure_fr: 'Alger / Oran',
      departure_en: 'Algiers / Oran',
      duration_ar: '7 أيام / 6 ليال',
      duration_fr: '7 Jours / 6 Nuits',
      duration_en: '7 Days / 6 Nights',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      price_dzd: 79000,
      old_price_dzd: 94000,
      discount: 15,
    },
    {
      id: 'deal-antalya',
      title_ar: 'أنطاليا - منتجع شاطئي 7 أيام',
      title_fr: 'Antalya Plage & Détente 7 Jours',
      title_en: 'Antalya Beach Resort 7 Days',
      destination_ar: 'أنطاليا، تركيا',
      destination_fr: 'Antalya, Turquie',
      destination_en: 'Antalya, Türkiye',
      departure_ar: 'وهران / الجزائر',
      departure_fr: 'Oran / Alger',
      departure_en: 'Oran / Algiers',
      duration_ar: '7 أيام / 6 ليال',
      duration_fr: '7 Jours / 6 Nuits',
      duration_en: '7 Days / 6 Nights',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      price_dzd: 72000,
      old_price_dzd: 96000,
      discount: 25,
    },
  ];

  return (
    <section id="deals" className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold mb-2.5">
              <Tag className="w-3 h-3 text-rose-600" />
              <span>{language === 'ar' ? 'لفترة محدودة' : 'Offres Limitées'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.hot_deals_title || (language === 'ar' ? 'عروض لا تفوّت' : 'Offres à ne pas manquer')}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {language === 'ar' ? 'عروض حصرية لفترة محدودة بأسعار خاصة للمسافرين الجزائريين.' : 'Offres exclusives limitées à des tarifs exceptionnels.'}
            </p>
          </div>
        </div>

        {/* 3 Hot Deals Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {defaultHotDeals.map((deal) => {
            const title = language === 'ar' ? deal.title_ar : language === 'fr' ? deal.title_fr : deal.title_en;
            const dest = language === 'ar' ? deal.destination_ar : language === 'fr' ? deal.destination_fr : deal.destination_en;
            const dep = language === 'ar' ? deal.departure_ar : language === 'fr' ? deal.departure_fr : deal.departure_en;
            const duration = language === 'ar' ? deal.duration_ar : language === 'fr' ? deal.duration_fr : deal.duration_en;

            return (
              <div
                key={deal.id}
                id={`deal-card-${deal.id}`}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Photo with Discount Badge */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={deal.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Red/Rose Discount Badge */}
                  <div className="absolute top-3.5 start-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md flex items-center gap-1">
                      <span>-{deal.discount}%</span>
                    </span>
                  </div>

                  {/* Destination Tag */}
                  <div className="absolute bottom-3 start-3.5 end-3.5 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-bold drop-shadow-xs">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>{dest}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-200 bg-slate-900/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{duration}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {language === 'ar' ? `انطلاق مباشر من: ${dep}` : `Départ: ${dep}`}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-xs line-through text-slate-400 font-semibold">
                        {formatCurrency(deal.old_price_dzd, language, currency)}
                      </span>
                      <span className="text-xl font-black text-emerald-600">
                        {formatCurrency(deal.price_dzd, language, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onBookDeal({
                          title,
                          destination: dest,
                          price: deal.price_dzd,
                        })
                      }
                      id={`btn-book-deal-${deal.id}`}
                      className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-bold text-xs transition active:scale-98 flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>{language === 'ar' ? 'احجز الآن' : 'Réserver'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
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
