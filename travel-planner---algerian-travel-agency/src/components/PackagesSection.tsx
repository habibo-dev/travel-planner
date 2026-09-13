import React from 'react';
import { Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { Language, Currency, TravelPackage } from '../types';
import { getTranslation } from '../i18n/translations';

interface PackagesSectionProps {
  language: Language;
  currency: Currency;
  packages: TravelPackage[];
  onBookPackage: (pkg: TravelPackage) => void;
  onSelectPackage?: (pkg: TravelPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ language, packages, onBookPackage, onSelectPackage }) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';
  return (
    <section id="packages" className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{t.section04_title || (language === 'ar' ? 'باقات سفر مختارة' : 'Programmes de voyage')}</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{language === 'ar' ? 'نماذج برامج يمكن تكييفها حسب التواريخ والميزانية والتوفر.' : language === 'fr' ? 'Des exemples de programmes adaptables selon vos dates, votre budget et les disponibilités.' : 'Example programmes adaptable to your dates, budget and availability.'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {packages.slice(0, 4).map((pkg) => {
            const title = language === 'ar' ? pkg.title_ar : language === 'fr' ? pkg.title_fr : pkg.title_en;
            const depCity = language === 'ar' ? pkg.departure_city_ar : pkg.departure_city;
            return (
              <div key={pkg.id} className="group flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img src={pkg.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 start-3"><span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/75 text-white">{language === 'ar' ? 'مثال قابل للتخصيص' : language === 'fr' ? 'Exemple à personnaliser' : 'Customizable example'}</span></div>
                  <div className="absolute bottom-2.5 start-3 end-3 flex items-center justify-between text-white text-[11px]"><span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-400" />{pkg.duration_days} {language === 'ar' ? 'أيام' : 'jours'}</span><span className="text-slate-200 text-[10px]">{depCity}</span></div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-700 mb-0.5 block truncate">{pkg.hotel_name}</span>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">{title}</h3>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div><span className="block text-[10px] text-slate-400 font-semibold">{language === 'ar' ? 'السعر والتوفر حسب الطلب' : language === 'fr' ? 'Tarif sur demande' : 'Price on request'}</span></div>
                    <button onClick={() => (onSelectPackage ? onSelectPackage(pkg) : onBookPackage(pkg))} className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-900 font-bold text-xs transition flex items-center gap-1 cursor-pointer"><MessageCircle className="w-3 h-3" /><span>{language === 'ar' ? 'اطلب التفاصيل' : language === 'fr' ? 'Demander' : 'Request'}</span><ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} /></button>
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
