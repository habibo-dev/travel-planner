import React from 'react';
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { Language, Currency, Deal } from '../types';
import { getTranslation } from '../i18n/translations';

interface DealsSectionProps {
  language: Language;
  currency: Currency;
  deals?: Deal[];
  onBookDeal: (deal: { title: string; destination: string; price: number }) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ language, onBookDeal }) => {
  const t = getTranslation(language);
  const requests = [
    { id: 'istanbul', ar: 'إسطنبول', fr: 'Istanbul', en: 'Istanbul', image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=900&q=80' },
    { id: 'dubai', ar: 'دبي', fr: 'Dubaï', en: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80' },
    { id: 'antalya', ar: 'أنطاليا', fr: 'Antalya', en: 'Antalya', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80' },
  ];

  return (
    <section id="deals" className="py-14 sm:py-18 bg-[#F7F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2.5">
            <MessageCircle className="w-3 h-3" />
            <span>{language === 'ar' ? 'طلبات عروض' : language === 'fr' ? 'Demandes de devis' : 'Quote requests'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{t.hot_deals_title || (language === 'ar' ? 'خطط رحلتك' : 'Préparez votre voyage')}</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">{language === 'ar' ? 'اختر وجهة وأرسل طلبك للحصول على تفاصيل وسعر مؤكد من الوكالة.' : language === 'fr' ? 'Choisissez une destination et demandez un devis. Le prix et la disponibilité sont confirmés par l’agence.' : 'Choose a destination and request a quote. Price and availability are confirmed by the agency.'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((item) => {
            const title = language === 'ar' ? item.ar : language === 'fr' ? item.fr : item.en;
            return (
              <div key={item.id} className="group rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img src={item.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 start-3 text-white text-sm font-bold flex items-center gap-1.5"><MapPin className="w-4 h-4" />{title}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-900">{language === 'ar' ? `رحلة إلى ${title}` : language === 'fr' ? `Voyage à ${title}` : `Trip to ${title}`}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{language === 'ar' ? 'التواريخ، الفندق، الطيران والسعر حسب الطلب.' : language === 'fr' ? 'Dates, hôtel, vols et tarif selon votre demande.' : 'Dates, hotel, flights and pricing according to your request.'}</p>
                  <button onClick={() => onBookDeal({ title, destination: title, price: 0 })} className="mt-5 w-full py-3 rounded-xl bg-slate-950 hover:bg-emerald-600 text-white font-bold text-xs transition flex items-center justify-center gap-2">
                    <span>{language === 'ar' ? 'اطلب عرضاً' : language === 'fr' ? 'Demander un devis' : 'Request a quote'}</span><ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
