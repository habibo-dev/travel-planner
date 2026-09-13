import React from 'react';
import { Landmark, Plane, Building, Navigation, MessageCircle, Calendar } from 'lucide-react';
import { Language, Currency, UmrahPackage, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';
import { createWhatsAppUrl } from '../utils/formatters';

interface UmrahSectionProps { language: Language; currency: Currency; umrahPackages: UmrahPackage[]; agencyInfo: AgencyInformation; onBookUmrah: (pkg: UmrahPackage) => void; }

export const UmrahSection: React.FC<UmrahSectionProps> = ({ language, umrahPackages, agencyInfo, onBookUmrah }) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';
  return (
    <section id="umrah" className="py-14 sm:py-18 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3"><Landmark className="w-3.5 h-3.5" /><span>{language === 'ar' ? 'طلبات العمرة' : language === 'fr' ? 'Demandes Omra' : 'Umrah requests'}</span></div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">{t.umrah_faith_title || (language === 'ar' ? 'رحلة العمرة' : 'Votre Omra')}</h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">{language === 'ar' ? 'استكشف برامج العمرة وأرسل طلبك. تفاصيل الفندق والطيران والسعر والتوفر يجب تأكيدها من الوكالة قبل الحجز.' : language === 'fr' ? 'Consultez les programmes Omra et envoyez une demande. Hôtel, vols, tarif et disponibilité doivent être confirmés par l’agence avant réservation.' : 'Explore Umrah programmes and send a request. Hotel, flights, pricing and availability must be confirmed by the agency before booking.'}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {umrahPackages.map((pkg) => {
            const title = language === 'ar' ? pkg.title_ar : language === 'fr' ? pkg.title_fr : pkg.title_en;
            const flightInfo = language === 'ar' ? pkg.flight_information_ar : language === 'fr' ? pkg.flight_information_fr : pkg.flight_information_en;
            const transfers = language === 'ar' ? pkg.transfers_ar : language === 'fr' ? pkg.transfers_fr : pkg.transfers_en;
            const depCity = language === 'ar' ? pkg.departure_city_ar : pkg.departure_city;
            const whatsappLink = createWhatsAppUrl({ phone: agencyInfo.whatsapp, language, packageName: title });
            return (
              <div key={pkg.id} className="relative flex flex-col rounded-3xl bg-slate-800/90 border border-slate-700 overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900"><img src={pkg.image} alt={title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" /><div className="absolute top-3 start-3"><span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950">{language === 'ar' ? 'برنامج نموذجي' : language === 'fr' ? 'Programme exemple' : 'Example programme'}</span></div><div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-slate-200"><span className="font-semibold flex items-center gap-1"><Plane className="w-3.5 h-3.5 text-amber-400" />{depCity}</span><span className="font-bold bg-slate-950/70 px-2.5 py-0.5 rounded-md">{pkg.nights_makkah + pkg.nights_madinah} {language === 'ar' ? 'ليال' : 'nuits'}</span></div></div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div><h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-4">{title}</h3><div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-xs"><div><div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1"><Building className="w-3.5 h-3.5" />{language === 'ar' ? 'مكة المكرمة' : 'La Mecque'} ({pkg.nights_makkah} {language === 'ar' ? 'ليال' : 'nuits'})</div><p className="text-white font-semibold">{pkg.makkah_hotel}</p><div className="mt-1 flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]"><Navigation className="w-3 h-3" />{pkg.makkah_distance_to_haram}</div></div><div className="border-t border-slate-800 pt-2"><div className="flex items-center gap-1.5 text-teal-400 font-bold mb-1"><Building className="w-3.5 h-3.5" />{language === 'ar' ? 'المدينة المنورة' : 'Médine'} ({pkg.nights_madinah} {language === 'ar' ? 'ليال' : 'nuits'})</div><p className="text-white font-semibold">{pkg.madinah_hotel}</p><div className="mt-1 flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]"><Navigation className="w-3 h-3" />{pkg.madinah_distance_to_masjid_an_nabawi}</div></div></div><div className="space-y-1.5 text-xs text-slate-300"><div className="flex items-center gap-2"><Plane className="w-4 h-4 text-amber-400" />{flightInfo}</div><div className="flex items-center gap-2"><Navigation className="w-4 h-4 text-amber-400" />{transfers}</div></div></div>
                  <div className="pt-4 border-t border-slate-700/80"><p className="text-xs text-slate-400 mb-4">{language === 'ar' ? 'السعر والتوفر والخدمات النهائية حسب الطلب والتأكيد.' : language === 'fr' ? 'Tarif, disponibilité et services finaux sur demande et confirmation.' : 'Final pricing, availability and services are subject to request and confirmation.'}</p><div className="grid grid-cols-2 gap-2"><button onClick={() => onBookUmrah(pkg)} className="py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{language === 'ar' ? 'اطلب البرنامج' : language === 'fr' ? 'Demander' : 'Request'}</button><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="py-3 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</a></div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
