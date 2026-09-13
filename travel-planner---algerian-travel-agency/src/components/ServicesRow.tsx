import React from 'react';
import {
  Plane,
  Building2,
  Briefcase,
  Landmark,
  Palmtree,
  Compass,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Language, ServiceCategory } from '../types';
import { getTranslation } from '../i18n/translations';

interface ServicesRowProps {
  language: Language;
  services: ServiceCategory[];
  onSelectService: (serviceId: string) => void;
}

export const ServicesRow: React.FC<ServicesRowProps> = ({
  language,
  services,
  onSelectService,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const defaultServices = [
    {
      id: 'flights',
      icon: <Plane className="w-5 h-5 text-emerald-600" />,
      title_ar: t.service_flights || 'تذاكر الطيران',
      title_fr: t.service_flights || "Billets d'avion",
      title_en: t.service_flights || 'Flights',
      desc_ar: 'رحلات مباشرة بأفضل الأسعار',
      desc_fr: 'Vols directs au meilleur prix',
      desc_en: 'Direct flights at best rates',
    },
    {
      id: 'hotels',
      icon: <Building2 className="w-5 h-5 text-teal-600" />,
      title_ar: t.service_hotels || 'الفنادق',
      title_fr: t.service_hotels || 'Hôtels',
      title_en: t.service_hotels || 'Hotels',
      desc_ar: 'إقامات 4 و5 نجوم مختارة',
      desc_fr: 'Séjours 4 & 5 étoiles',
      desc_en: 'Selected 4 & 5 star stays',
    },
    {
      id: 'packages',
      icon: <Briefcase className="w-5 h-5 text-emerald-700" />,
      title_ar: t.service_packages || 'الباقات',
      title_fr: t.service_packages || 'Packages',
      title_en: t.service_packages || 'Packages',
      desc_ar: 'برامج سياحية متكاملة',
      desc_fr: 'Circuits tout compris',
      desc_en: 'Complete vacation tours',
    },
    {
      id: 'umrah',
      icon: <Landmark className="w-5 h-5 text-amber-600" />,
      title_ar: t.service_umrah || 'العمرة',
      title_fr: t.service_umrah || 'Omra',
      title_en: t.service_umrah || 'Umrah',
      desc_ar: 'عمرة ميسرة وتأطير رسمي',
      desc_fr: 'Pèlerinages encadrés',
      desc_en: 'Organized sacred trips',
    },
    {
      id: 'beach',
      icon: <Palmtree className="w-5 h-5 text-sky-600" />,
      title_ar: t.service_beach || 'عطلات الشاطئ',
      title_fr: t.service_beach || 'Séjours plage',
      title_en: t.service_beach || 'Beach Escapes',
      desc_ar: 'استرخاء في أرقى الشواطئ',
      desc_fr: 'Détente en bord de mer',
      desc_en: 'Relaxing coastal getaways',
    },
    {
      id: 'adventure',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      title_ar: t.service_adventure || 'المغامرات',
      title_fr: t.service_adventure || 'Aventure',
      title_en: t.service_adventure || 'Adventure',
      desc_ar: 'استكشاف الطبيعة والأنشطة',
      desc_fr: 'Randonnées et découvertes',
      desc_en: 'Exploration & nature trails',
    },
    {
      id: 'city',
      icon: <MapPin className="w-5 h-5 text-rose-500" />,
      title_ar: t.service_city || 'المدن',
      title_fr: t.service_city || 'City Breaks',
      title_en: t.service_city || 'City Breaks',
      desc_ar: 'عطلات نهاية الأسبوع بالمدن',
      desc_fr: 'Escapades urbaines',
      desc_en: 'Exciting weekend city tours',
    },
  ];

  return (
    <section id="services-row-section" className="py-12 sm:py-16 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t.section01_title || 'اكتشف رحلتك بطريقتك'}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {t.section01_subtitle || 'اختر الخدمة التي تناسب رحلتك.'}
          </p>
        </div>

        {/* 7 Services Grid with compact, clean cards matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {defaultServices.map((service) => {
            const title = language === 'ar' ? service.title_ar : language === 'fr' ? service.title_fr : service.title_en;
            const desc = language === 'ar' ? service.desc_ar : language === 'fr' ? service.desc_fr : service.desc_en;

            return (
              <button
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onSelectService(service.id)}
                className="group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-emerald-50/40 border border-slate-200/70 hover:border-emerald-300 transition-all shadow-2xs hover:shadow-md cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 group-hover:bg-white shadow-2xs border border-slate-100 flex items-center justify-center mb-2.5 group-hover:scale-108 transition-transform">
                  {service.icon}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 mb-1 line-clamp-1">
                  {title}
                </h3>

                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed font-normal">
                  {desc}
                </p>

                <div className="mt-2 text-[9px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>{language === 'ar' ? 'استكشف' : 'Explorer'}</span>
                  <ArrowRight className={`w-2.5 h-2.5 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
