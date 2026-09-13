import React from 'react';
import {
  Landmark,
  Plane,
  Building,
  Navigation,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Shield,
  Sparkles,
  Award
} from 'lucide-react';
import { Language, Currency, UmrahPackage, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency, createWhatsAppUrl } from '../utils/formatters';

interface UmrahSectionProps {
  language: Language;
  currency: Currency;
  umrahPackages: UmrahPackage[];
  agencyInfo: AgencyInformation;
  onBookUmrah: (pkg: UmrahPackage) => void;
}

export const UmrahSection: React.FC<UmrahSectionProps> = ({
  language,
  currency,
  umrahPackages,
  agencyInfo,
  onBookUmrah,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const umrahHero = {
    ar: {
      title: 'عمرة منظمة براحة واطمئنان',
      description: 'باقات عمرة مختارة بعناية تشمل الإقامة، الرحلات والخدمات الأساسية مع إشراف ديني وطبي متواصل.',
      cta: 'اكتشف باقات العمرة',
    },
    fr: {
      title: 'Votre Omra, organisée avec soin',
      description: 'Des forfaits Omra soigneusement sélectionnés pour vous accompagner tout au long de votre voyage en toute sérénité.',
      cta: 'Découvrir les offres Omra',
    },
    en: {
      title: 'Your Umrah, planned with care',
      description: 'Carefully selected Umrah packages designed to make your spiritual journey comfortable, secure, and organized.',
      cta: 'Explore Umrah Packages',
    },
  }[language];

  return (
    <section id="umrah" className="py-14 sm:py-18 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Islamic geometric pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching Reference */}
        <div className="text-start max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'رحلات الحرمين الشريفين' : 'Pèlerinage & Omra'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
            {t.umrah_faith_title || (language === 'ar' ? 'رحلة الإيمان' : 'Voyage de foi')}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            {t.umrah_faith_desc || (language === 'ar' ? 'عمرة ميسرة مع تأطير رسمي وخدمات متكاملة للحرمين الشريفين.' : 'Omra organisée avec encadrement officiel et services complets.')}
          </p>
        </div>

        {/* Umrah Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {umrahPackages.map((pkg) => {
            const title = language === 'ar' ? pkg.title_ar : language === 'fr' ? pkg.title_fr : pkg.title_en;
            const flightInfo = language === 'ar' ? pkg.flight_information_ar : language === 'fr' ? pkg.flight_information_fr : pkg.flight_information_en;
            const transfers = language === 'ar' ? pkg.transfers_ar : language === 'fr' ? pkg.transfers_fr : pkg.transfers_en;
            const programType = language === 'ar' ? pkg.program_type_ar : language === 'fr' ? pkg.program_type_fr : pkg.program_type_en;
            const depCity = language === 'ar' ? pkg.departure_city_ar : pkg.departure_city;

            const whatsappLink = createWhatsAppUrl({
              phone: agencyInfo.whatsapp,
              language,
              packageName: title,
            });

            return (
              <div
                key={pkg.id}
                id={`umrah-card-${pkg.id}`}
                className={`relative flex flex-col rounded-3xl bg-slate-800/90 border backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/40 ${
                  pkg.featured ? 'border-amber-500/70 ring-2 ring-amber-500/30' : 'border-slate-700'
                }`}
              >
                {/* Header image banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  <div className="absolute top-3 start-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                      {programType}
                    </span>
                  </div>

                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="font-semibold flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-amber-400" />
                      {depCity}
                    </span>
                    <span className="font-bold bg-slate-950/70 px-2.5 py-0.5 rounded-md">
                      {pkg.nights_makkah + pkg.nights_madinah} {language === 'ar' ? 'يوم' : 'jours'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-4">
                      {title}
                    </h3>

                    {/* Proximity to Haram (Crucial Algerian Umrah Requirement) */}
                    <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 mb-4 text-xs">
                      {/* Makkah Hotel & Distance */}
                      <div>
                        <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                          <span className="flex items-center gap-1.5 text-amber-400">
                            <Building className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'مكة المكرمة' : 'La Mecque'} ({pkg.nights_makkah} {language === 'ar' ? 'ليال' : 'nuits'})</span>
                          </span>
                        </div>
                        <p className="text-white font-semibold line-clamp-1">{pkg.makkah_hotel}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                          <Navigation className="w-3 h-3 shrink-0" />
                          <span>{pkg.makkah_distance_to_haram}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-2">
                        <div className="flex items-center justify-between text-slate-300 font-bold mb-1">
                          <span className="flex items-center gap-1.5 text-teal-400">
                            <Building className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'المدينة المنورة' : 'Médine'} ({pkg.nights_madinah} {language === 'ar' ? 'ليال' : 'nuits'})</span>
                          </span>
                        </div>
                        <p className="text-white font-semibold line-clamp-1">{pkg.madinah_hotel}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                          <Navigation className="w-3 h-3 shrink-0" />
                          <span>{pkg.madinah_distance_to_masjid_an_nabawi}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{flightInfo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{transfers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{t.visa_included}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Booking CTAs */}
                  <div className="pt-4 border-t border-slate-700/80">
                    <div className="mb-4">
                      {pkg.old_price_dzd && (
                        <span className="text-xs line-through text-slate-400 font-medium block">
                          {formatCurrency(pkg.old_price_dzd, language, currency)}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400">
                          {formatCurrency(pkg.price_dzd, language, currency)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/ {t.per_person}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onBookUmrah(pkg)}
                        id={`btn-book-umrah-${pkg.id}`}
                        className="py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t.book_umrah_now}</span>
                      </button>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`btn-umrah-whatsapp-${pkg.id}`}
                        className="py-3 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spiritual Guidance & Guarantee Banner */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {language === 'ar'
                  ? 'مرشدون دينيون مرافقون من الجزائر'
                  : 'Encadrement religieux continu et personnalisé'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'ar'
                  ? 'محاضرات توجيهية وإرشاد خطوة بخطوة لطواف وسعي العمرة وزيارات الروضة الشريفة.'
                  : 'Assistance spirituelle et médicale pour accomplir vos rites dans la quiétude.'}
              </p>
            </div>
          </div>

          <a
            href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
            className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold whitespace-nowrap"
          >
            {t.call_us}: <span dir="ltr">{agencyInfo.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
