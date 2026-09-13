import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  const reviews = [
    {
      id: 'review-1',
      name_ar: 'الحاج بلقاسم ومغنية',
      name_fr: 'Hadj Belkacem M.',
      name_en: 'Hadj Belkacem M.',
      city_ar: 'وهران',
      city_fr: 'Oran',
      city_en: 'Oran',
      trip_ar: 'عمرة النخبة 5 نجوم (رمضان)',
      trip_fr: 'Omra 5★ VIP (Ramadan)',
      trip_en: '5★ VIP Umrah (Ramadan)',
      rating: 5,
      comment_ar:
        'بارك الله في وكالة Travel Planner على التنظيم الراقي لعمرتنا. الفندق في مكة كان مطلاً على ساحة الحرم مباشرة والمشرف الجزائري كان يرافقنا في كل خطوة ويسهل أمور كبار السن. تجربة لا تُنسى.',
      comment_fr:
        'Organisation irréprochable pour notre Omra en famille. L\'hôtel à La Mecque était à deux pas de l\'esplanade, avec un encadrement permanent très bienveillant. Merci infiniment à l\'équipe d\'Oran.',
      comment_en:
        'Flawless organization for our family Umrah. The hotel in Makkah was steps away from the courtyard, and the Algerian tour director supported our elderly parents every day.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'review-2',
      name_ar: 'سمية دحماني وعائلتها',
      name_fr: 'Soumia Dahmani & Famille',
      name_en: 'Soumia Dahmani & Family',
      city_ar: 'الجزائر العاصمة',
      city_fr: 'Alger',
      city_en: 'Algiers',
      trip_ar: 'رحلة إسطنبول وبورصة 8 أيام',
      trip_fr: 'Séjour Istanbul & Bursa 8 Jours',
      trip_en: 'Istanbul & Bursa 8 Days',
      rating: 5,
      comment_ar:
        'أول مرة نسافر كعائلة مع وكالة والنتيجة فاقت التوقعات! مواعيد الطيران دقيقة، الفندق في تقسيم كان نظيفاً جداً، والجولات السياحية شملت كل الأماكن المشهورة بدون تعب. أنصح بشدة بالتعامل معهم.',
      comment_fr:
        'Notre premier voyage en famille avec une agence et tout a dépassé nos espérances ! Vols ponctuels, hôtel Taksim très propre et excursions superbes. Je recommande vivement Travel Planner.',
      comment_en:
        'Our first family tour with an agency and the experience exceeded our highest expectations! Punctual flights, clean hotel near Taksim, and wonderful excursions without stress.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'review-3',
      name_ar: 'أمين بن صالح',
      name_fr: 'Amine Bensaou',
      name_en: 'Amine Bensaou',
      city_ar: 'قسنطينة',
      city_fr: 'Constantine',
      city_en: 'Constantine',
      trip_ar: 'باقة دبي والمغامرات الصحراوية',
      trip_fr: 'Séjour Dubaï Aventure & Safari',
      trip_en: 'Dubai Adventure & Desert Safari',
      rating: 5,
      comment_ar:
        'استخرجت التأشيرة الإلكترونية معهم خلال 48 ساعة فقط، وباقة الفندق مع سفاري الصحراء وبرج خليفة كانت بأفضل سعر وجدته بالدينار الجزائري. احترافية عالية وشفافية تامة.',
      comment_fr:
        'Visa électronique obtenu en moins de 48 heures ! Le package avec safari désert et Burj Khalifa offrait le meilleur rapport qualité-prix en Dinars. Service client réactif et très professionnel.',
      comment_en:
        'Electronic tourist visa obtained in under 48 hours! The package including desert safari and Burj Khalifa had the best value in Algerian Dinars. Highly responsive and transparent.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    },
  ];

  return (
    <section id="reviews" className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-start">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.testimonials_title || (language === 'ar' ? 'آراء مسافرينا' : 'Ce que disent nos voyageurs')}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            {language === 'ar'
              ? 'ثقة أكثر من 15,000 مسافر اختاروا وكالتنا لرحلاتهم.'
              : 'La confiance de plus de 15 000 voyageurs qui ont choisi notre agence.'}
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const name = language === 'ar' ? rev.name_ar : language === 'fr' ? rev.name_fr : rev.name_en;
            const city = language === 'ar' ? rev.city_ar : language === 'fr' ? rev.city_fr : rev.city_en;
            const trip = language === 'ar' ? rev.trip_ar : language === 'fr' ? rev.trip_fr : rev.trip_en;
            const comment = language === 'ar' ? rev.comment_ar : language === 'fr' ? rev.comment_fr : rev.comment_en;

            return (
              <div
                key={rev.id}
                id={`testimonial-card-${rev.id}`}
                className="group p-6 rounded-2xl bg-[#F7F8FA] border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: 5 Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300" />
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-5 italic">
                    "{comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {name}
                    </h4>
                    <p className="text-[11px] font-semibold text-emerald-700">
                      {trip} • {city}
                    </p>
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
