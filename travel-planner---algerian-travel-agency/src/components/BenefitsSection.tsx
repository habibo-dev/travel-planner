import React from 'react';
import { ShieldCheck, Clock, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface BenefitsSectionProps {
  language: Language;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  const benefits = [
    {
      id: 'benefit-price',
      icon: Award,
      title_ar: 'ضمان أفضل الأسعار',
      title_fr: 'Meilleurs Prix Garantis',
      title_en: 'Best Price Guarantee',
      desc_ar: 'أسعار واضحة ومباشرة بالدينار الجزائري (DZD) بدون أي رسوم خفية أو مفاجآت عند الحجز.',
      desc_fr: 'Tarifs transparents en Dinars Algériens (DA) sans aucun frais caché au moment de la réservation.',
      desc_en: 'Clear and honest pricing in Algerian Dinars (DZD) with no hidden fees or unexpected costs.',
      badge_ar: 'شفافية 100%',
      badge_fr: '100% Transparent',
      badge_en: '100% Transparent',
    },
    {
      id: 'benefit-support',
      icon: Clock,
      title_ar: 'دعم ومتابعة 24/7',
      title_fr: 'Assistance Continue 24/7',
      title_en: '24/7 Dedicated Support',
      desc_ar: 'فريق مستشارينا يرافقكم على مدار الساعة عبر الهاتف وواتساب طوال أيام الأسبوع وقبل وأثناء السفر.',
      desc_fr: 'Notre équipe locale vous accompagne 24h/24 et 7j/7 via téléphone et WhatsApp avant et pendant le voyage.',
      desc_en: 'Our dedicated team assists you around the clock via phone and WhatsApp before and during your trip.',
      badge_ar: 'طوال الأسبوع',
      badge_fr: '7j/7',
      badge_en: '24/7 Active',
    },
    {
      id: 'benefit-license',
      icon: ShieldCheck,
      title_ar: 'وكالة مرخصة ومعتمدة',
      title_fr: 'Agence Agréée et Certifiée',
      title_en: 'Officially Licensed Agency',
      desc_ar: 'وكالة سياحة وأسفار مرخصة رسمياً من وزارة السياحة والصناعة التقليدية الجزائرية وموثقة بالعقد القانوني.',
      desc_fr: 'Agence de tourisme et voyages dûment agréée par le Ministère du Tourisme et de l\'Artisanat.',
      desc_en: 'Fully registered and licensed travel agency recognized by the Algerian Ministry of Tourism.',
      badge_ar: 'اعتماد رسمي',
      badge_fr: 'Agréée État',
      badge_en: 'State Licensed',
    },
    {
      id: 'benefit-custom',
      icon: Sparkles,
      title_ar: 'رحلات مخصصة وباقات متكاملة',
      title_fr: 'Voyages Sur Mesure & Complets',
      title_en: 'Tailored Packages & Tours',
      desc_ar: 'تصميم برامج سفر خاصة للعائلات والأفراد تشمل تذاكر الطيران، الفنادق، التأشيرة والجولات السياحية.',
      desc_fr: 'Programmes personnalisés pour familles et groupes incluant vols, hôtels, visas et excursions guidées.',
      desc_en: 'Customized itineraries crafted for families and solo travelers including flights, hotels, and visas.',
      badge_ar: 'حسب رغبتك',
      badge_fr: 'Personnalisé',
      badge_en: 'Customizable',
    },
  ];

  return (
    <section id="benefits" className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-start">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.why_choose_title || (language === 'ar' ? 'لماذا تختارنا' : 'Pourquoi nous choisir')}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            {language === 'ar'
              ? 'نقدم لك تجربة سفر استثنائية مبنية على الثقة والخبرة.'
              : 'Une expérience de voyage exceptionnelle fondée sur la confiance et l\'expertise.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            const title = language === 'ar' ? item.title_ar : language === 'fr' ? item.title_fr : item.title_en;
            const desc = language === 'ar' ? item.desc_ar : language === 'fr' ? item.desc_fr : item.desc_en;
            const badge = language === 'ar' ? item.badge_ar : language === 'fr' ? item.badge_fr : item.badge_en;

            return (
              <div
                key={item.id}
                id={`benefit-card-${item.id}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center group-hover:scale-108 group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'خدمة مضمونة ومعتمدة' : 'Garantie Travel Planner'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
