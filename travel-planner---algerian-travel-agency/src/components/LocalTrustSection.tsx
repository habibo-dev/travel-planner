import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  FileCheck,
  Award,
  MapPin,
  CheckCircle2,
  Sparkles,
  Lock
} from 'lucide-react';
import { Language, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';

interface LocalTrustSectionProps {
  language: Language;
  agencyInfo: AgencyInformation;
}

export const LocalTrustSection: React.FC<LocalTrustSectionProps> = ({
  language,
  agencyInfo,
}) => {
  const t = getTranslation(language);

  const pillars = [
    {
      id: 'licence',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title_ar: 'رخصة سياحية معتمدة رسميّاً',
      title_fr: 'Agence Agréée par le Ministère',
      title_en: 'Officially Licensed Travel Agency',
      desc_ar: `وكالة أسفار مرخصة برقم ${agencyInfo.license_number} من وزارة السياحة والصناعة التقليدية الجزائرية.`,
      desc_fr: `Licence d'exploitation ministérielle N° ${agencyInfo.license_number} garantissant vos droits légaux.`,
      desc_en: `Licensed under registry ${agencyInfo.license_number} by the Algerian Ministry of Tourism.`,
    },
    {
      id: 'transparence',
      icon: <CreditCard className="w-8 h-8 text-teal-600" />,
      title_ar: 'شفافية كاملة في الأسعار بالدينار (DZD)',
      title_fr: 'Tarifs Transparents en Dinars (DA)',
      title_en: '100% Transparent Pricing in DZD',
      desc_ar: 'جميع أسعار التذاكر والباقات معروضة بالدينار الجزائري شاملة لجميع الضرائب والرسوم، دون أية مفاجآت.',
      desc_fr: 'Tous les prix sont affichés en Dinar Algérien (TTC) sans frais cachés ni mauvaise surprise.',
      desc_en: 'All package and flight prices are clearly stated in DZD inclusive of taxes and fees.',
    },
    {
      id: 'visa',
      icon: <FileCheck className="w-8 h-8 text-indigo-600" />,
      title_ar: 'مساعدة كاملة في التأشيرات',
      title_fr: 'Assistance Visa Passeport Algérien',
      title_en: 'Comprehensive Visa Assistance',
      desc_ar: 'مرافقة دقيقة في ملفات التأشيرات (شنغن، تركيا، دبي، السعودية، إنجلترا) ورفع حظوظ القبول.',
      desc_fr: 'Constitution rigoureuse des dossiers visa (Schengen, Turquie, Dubaï, Arabie) et prises de rendez-vous.',
      desc_en: 'Guidance and document review for visas (Schengen, Turkey, UAE, Saudi, UK) for Algerian travelers.',
    },
    {
      id: 'omra',
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title_ar: 'تأطير ديني واحترافي للعمرة',
      title_fr: 'Encadrement Spirituel pour la Omra',
      title_en: 'Certified Umrah Guidance',
      desc_ar: 'مرشدون أكفاء يرافقون المعتمرين في مكة المكرمة والمدينة المنورة مع فنادق موثوقة قريبة من الحرمين.',
      desc_fr: 'Guides qualifiés accompagnateurs aux Lieux Saints avec sélection d\'hôtels proches du Haram.',
      desc_en: 'Experienced spiritual guides accompanying you throughout Makkah and Madinah.',
    },
    {
      id: 'presence',
      icon: <MapPin className="w-8 h-8 text-rose-600" />,
      title_ar: 'مقر رسمي في وهران',
      title_fr: 'Présence Physique à Oran',
      title_en: 'Physical Office in Oran',
      desc_ar: 'مكتبنا مفتوح لاستقبالكم في إقامة حسناوي بوهران لتوقيع العقود واستلام التذاكر والدفاتر السياحية.',
      desc_fr: 'Locaux physiques à la Résidence Hasnaoui d\'Oran pour vos démarches et la remise de vos billets.',
      desc_en: 'Convenient walk-in headquarters at Résidence Hasnaoui, Oran for in-person service and consultations.',
    },
  ];

  return (
    <section id="trust" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'معايير الثقة والأمان' : 'Garanties & Confiance'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            {t.trust_title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {t.trust_subtitle}
          </p>
        </div>

        {/* 5 Pillars Bento / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const title = language === 'ar' ? pillar.title_ar : language === 'fr' ? pillar.title_fr : pillar.title_en;
            const desc = language === 'ar' ? pillar.desc_ar : language === 'fr' ? pillar.desc_fr : pillar.desc_en;

            return (
              <div
                key={pillar.id}
                className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'ضمان رسمي معتمد' : 'Engagement officiel garanti'}</span>
                </div>
              </div>
            );
          })}

          {/* Quick CTA Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex flex-col justify-between shadow-xl">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold inline-block mb-4">
                🇩🇿 {language === 'ar' ? 'وكالة معتمدة' : 'Agence Agréée'}
              </span>
              <h3 className="text-2xl font-black mb-2">
                {language === 'ar' ? 'هل تخطط لرحلتك القادمة؟' : 'Préparez votre prochain voyage'}
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                {language === 'ar'
                  ? 'فريق من الخبراء في خدمتكم للاستشارة والتوجيه وحجز أفضل البرامج بأسعار تفضيلية.'
                  : 'Nos conseillers sont à votre disposition pour concrétiser votre projet de voyage au meilleur tarif.'}
              </p>
            </div>

            <a
              href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
              className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-emerald-50 font-black text-xs text-center shadow-md transition"
            >
              {t.call_us}: <span dir="ltr">{agencyInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
