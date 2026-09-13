import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface StoriesSectionProps {
  language: Language;
  onReadStory?: (storyId: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ language, onReadStory }) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const stories = [
    {
      id: 'story-istanbul',
      category_ar: 'دليل سياحي',
      category_fr: 'Guide Pratique',
      category_en: 'Travel Guide',
      read_time_ar: '5 دقائق قراءة',
      read_time_fr: '5 min de lecture',
      read_time_en: '5 min read',
      date_ar: '10 سبتمبر 2026',
      date_fr: '10 Septembre 2026',
      date_en: 'Sept 10, 2026',
      title_ar: 'دليل زيارة إسطنبول للمسافر الجزائري: التأشيرة، أفضل الفنادق، وأماكن التسوق',
      title_fr: 'Guide d\'Istanbul pour voyageurs algériens : Visas, meilleurs hôtels et shopping',
      title_en: 'Istanbul Travel Guide for Algerians: Visas, Top Hotels & Shopping Districts',
      excerpt_ar:
        'كل ما تحتاج معرفته عن صرف العملة، بطاقة إسطنبول للمواصلات، والمطاعم الحلال القريبة من ميدان تقسيم والسلطان أحمد.',
      excerpt_fr:
        'Conseils essentiels pour le change de devises, les transports urbains et les quartiers idéaux pour un séjour familial réussi.',
      excerpt_en:
        'Everything you need to know about currency exchange, public transit cards, and family-friendly neighborhoods near Taksim and Sultanahmet.',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-umrah',
      category_ar: 'مناسك وإرشادات',
      category_fr: 'Rites & Conseils',
      category_en: 'Umrah & Spirituality',
      read_time_ar: '7 دقائق قراءة',
      read_time_fr: '7 min de lecture',
      read_time_en: '7 min read',
      date_ar: '05 سبتمبر 2026',
      date_fr: '05 Septembre 2026',
      date_en: 'Sept 05, 2026',
      title_ar: 'نصائح وإرشادات عملية لأداء مناسك العمرة الأولى بكل سكينة ويسر',
      title_fr: 'Conseils pratiques pour accomplir votre première Omra en toute sérénité',
      title_en: 'Practical Steps and Advice for Performing Your First Umrah with Peace of Mind',
      excerpt_ar:
        'خطوات الإحرام، أوقات الطواف المفضلة لتفادي الزحام، واشتراطات أمتعة السفر مع عبوات ماء زمزم للرحلات المباشرة.',
      excerpt_fr:
        'Guide étape par étape sur l\'Ihram, les créneaux idéaux pour le Tawaf et la gestion des bagages pour l\'eau de Zamzam.',
      excerpt_en:
        'Step-by-step guidance on Ihram, recommended hours for Tawaf to avoid crowds, and airline luggage rules for Zamzam water.',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'story-dubai',
      category_ar: 'عطلات عائلية',
      category_fr: 'Vacances Famille',
      category_en: 'Family Holidays',
      read_time_ar: '4 دقائق قراءة',
      read_time_fr: '4 min de lecture',
      read_time_en: '4 min read',
      date_ar: '28 أغسطس 2026',
      date_fr: '28 Août 2026',
      date_en: 'Aug 28, 2026',
      title_ar: 'أفضل الأنشطة الترفيهية في دبي المناسبة للعائلات والأطفال في عطلة الخريف',
      title_fr: 'Top des activités familiales à Dubaï : Parcs aquatiques, safari et gratte-ciels',
      title_en: 'Best Family & Kids Activities in Dubai: Theme Parks, Desert Safari & Observatories',
      excerpt_ar:
        'برنامج يومي متوازن يشمل نافورة دبي الراقصة، حديقة الزهور المعجزة، وسفاري الرمال الحمراء مع مراعاة راحة الصغار.',
      excerpt_fr:
        'Itinéraire équilibré alliant shopping détaxé, spectacles des fontaines et parcs d\'attractions inoubliables.',
      excerpt_en:
        'A balanced itinerary combining tax-free shopping, Dubai fountain shows, Miracle Garden, and desert safari experiences.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="stories" className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-start">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.stories_title || (language === 'ar' ? 'قصص وتجارب السفر' : 'Récits de voyage')}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            {t.stories_subtitle || (language === 'ar' ? 'نصائح وإرشادات وأدلة شاملة لوجهاتكم المفضلة.' : 'Conseils et guides complets pour vos destinations favorites.')}
          </p>
        </div>

        {/* 3 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => {
            const title = language === 'ar' ? story.title_ar : language === 'fr' ? story.title_fr : story.title_en;
            const excerpt = language === 'ar' ? story.excerpt_ar : language === 'fr' ? story.excerpt_fr : story.excerpt_en;
            const category = language === 'ar' ? story.category_ar : language === 'fr' ? story.category_fr : story.category_en;
            const readTime = language === 'ar' ? story.read_time_ar : language === 'fr' ? story.read_time_fr : story.read_time_en;

            return (
              <article
                key={story.id}
                id={`story-card-${story.id}`}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-50 w-full overflow-hidden bg-slate-900">
                  <img
                    src={story.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3.5 start-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-white/90 text-slate-900 backdrop-blur-xs shadow-xs">
                      {category}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-3 start-3.5 flex items-center gap-1.5 text-white text-[11px] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{readTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2 mb-2">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'اقرأ الدليل كاملاً' : 'Lire l\'article'}</span>
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
