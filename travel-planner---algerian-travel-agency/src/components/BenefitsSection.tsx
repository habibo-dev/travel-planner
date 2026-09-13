import React from 'react';
import { ShieldCheck, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface BenefitsSectionProps { language: Language; }

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ language }) => {
  const t = getTranslation(language);
  const benefits = [
    {
      icon: MessageCircle,
      title_ar: 'طلب سفر واضح', title_fr: 'Une demande simple', title_en: 'Simple travel requests',
      desc_ar: 'أرسل وجهتك وتواريخك واحتياجاتك، ثم تواصل مع الوكالة لتأكيد التفاصيل.',
      desc_fr: 'Indiquez votre destination, vos dates et vos besoins, puis échangez avec l’agence pour confirmer les détails.',
      desc_en: 'Share your destination, dates and needs, then confirm the details with the agency.',
    },
    {
      icon: Clock,
      title_ar: 'متابعة قبل السفر', title_fr: 'Suivi avant le départ', title_en: 'Pre-trip follow-up',
      desc_ar: 'نظّم طلبك في مكان واحد واحتفظ بالمعلومات المهمة إلى حين تأكيد الحجز.',
      desc_fr: 'Centralisez votre demande et gardez les informations importantes jusqu’à la confirmation.',
      desc_en: 'Keep your request and important details together until your booking is confirmed.',
    },
    {
      icon: ShieldCheck,
      title_ar: 'معلومات قابلة للتحقق', title_fr: 'Informations vérifiables', title_en: 'Verifiable information',
      desc_ar: 'لا نعتمد في العرض على أسعار أو مواعيد أو توفر غير مؤكد. التفاصيل النهائية يثبتها المكتب.',
      desc_fr: 'Pas de promesse sur des prix, horaires ou disponibilités non confirmés. Les détails finaux sont validés par l’agence.',
      desc_en: 'No unconfirmed promises about prices, schedules or availability. Final details are validated by the agency.',
    },
    {
      icon: Sparkles,
      title_ar: 'خيارات حسب الطلب', title_fr: 'Options sur demande', title_en: 'Options on request',
      desc_ar: 'اطلب رحلة منظمة، فندقاً، تذكرة أو برنامجاً مخصصاً حسب احتياجاتك.',
      desc_fr: 'Demandez un voyage organisé, un hôtel, un billet ou un programme personnalisé selon vos besoins.',
      desc_en: 'Request an organized trip, hotel, ticket or tailored itinerary based on your needs.',
    },
  ];

  return (
    <section id="benefits" className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 text-start">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.why_choose_title || (language === 'ar' ? 'لماذا تختارنا' : 'Pourquoi nous choisir')}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            {language === 'ar' ? 'تجربة رقمية واضحة تساعدك على إرسال طلب السفر ومتابعته.' : language === 'fr' ? 'Une expérience digitale claire pour préparer et transmettre votre demande de voyage.' : 'A clear digital experience for preparing and submitting your travel request.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            const title = language === 'ar' ? item.title_ar : language === 'fr' ? item.title_fr : item.title_en;
            const desc = language === 'ar' ? item.desc_ar : language === 'fr' ? item.desc_fr : item.desc_en;
            return (
              <div key={title} className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug mb-2">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
