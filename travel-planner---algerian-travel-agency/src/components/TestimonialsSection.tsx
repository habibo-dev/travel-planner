import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t = getTranslation(language);
  const isArabic = language === 'ar';

  return (
    <section id="reviews" className="border-b border-slate-200/80 bg-white py-14 sm:py-18" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {t.testimonials_title || (isArabic ? 'آراء المسافرين' : 'Avis voyageurs')}
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
            {isArabic
              ? 'سيتم نشر آراء العملاء الموثقة هنا بعد الحصول على موافقتهم. لا نعرض شهادات أو أرقام تقييم غير موثقة.'
              : 'Les avis clients vérifiés seront publiés ici avec leur accord. Aucun témoignage ou chiffre d’évaluation non vérifié n’est affiché.'}
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600">
            {isArabic ? 'قسم جاهز لإضافة تقييمات موثقة' : 'Section prête pour des avis vérifiés'}
          </div>
        </div>
      </div>
    </section>
  );
};
