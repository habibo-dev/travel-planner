import React, { useMemo, useState } from 'react';
import { ArrowRightLeft, Calendar, CheckCircle, Plane, Search, Shield, Users } from 'lucide-react';
import { Language, Currency, OriginLocation, Destination } from '../types';
import { getTranslation } from '../i18n/translations';

interface FlightRequest {
  tripType: 'round' | 'oneWay';
  origin: OriginLocation;
  destination: Destination;
  departureDate: string;
  returnDate?: string;
  cabinClass: string;
  passengers: number;
}

interface FlightSearchSectionProps {
  language: Language;
  currency: Currency;
  originLocations: OriginLocation[];
  destinations: Destination[];
  onRequestFlight: (request: FlightRequest) => void;
}

export const FlightSearchSection: React.FC<FlightSearchSectionProps> = ({
  language,
  currency: _currency,
  originLocations,
  destinations,
  onRequestFlight,
}) => {
  const t = getTranslation(language);
  const isArabic = language === 'ar';

  const [tripType, setTripType] = useState<'round' | 'oneWay'>('round');
  const [selectedOrigin, setSelectedOrigin] = useState(originLocations[0]?.id ?? '');
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]?.id ?? '');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const origin = useMemo(
    () => originLocations.find((item) => item.id === selectedOrigin) ?? originLocations[0],
    [originLocations, selectedOrigin],
  );
  const destination = useMemo(
    () => destinations.find((item) => item.id === selectedDestination) ?? destinations[0],
    [destinations, selectedDestination],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!origin || !destination || !departureDate || (tripType === 'round' && !returnDate)) return;

    setSubmitted(true);
    onRequestFlight({
      tripType,
      origin,
      destination,
      departureDate,
      returnDate: tripType === 'round' ? returnDate : undefined,
      cabinClass,
      passengers,
    });
  };

  return (
    <section id="flights" className="border-b border-slate-200 bg-slate-50 py-16" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <Plane className="h-3.5 w-3.5" />
            <span>{isArabic ? 'طلب بحث عن تذكرة طيران' : 'Recherche de billet d’avion'}</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">{t.flight_search_title}</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            {isArabic
              ? 'أدخل تفاصيل رحلتك وسنبحث عن الخيارات والأسعار المتاحة قبل تأكيد الحجز.'
              : 'Indiquez votre projet de vol. Nous recherchons les options et tarifs disponibles avant toute confirmation.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-5 text-sm font-bold">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="tripType" checked={tripType === 'round'} onChange={() => setTripType('round')} />
                <span>{t.round_trip}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="tripType" checked={tripType === 'oneWay'} onChange={() => setTripType('oneWay')} />
                <span>{t.one_way}</span>
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span>{t.select_cabin}:</span>
              <select value={cabinClass} onChange={(event) => setCabinClass(event.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none">
                <option value="Economy">{t.economy_class}</option>
                <option value="Premium Economy">{t.premium_economy}</option>
                <option value="Business">{t.business_class}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <span className="mb-1 block text-[11px] font-bold text-slate-500">{t.departure_city_label}</span>
              <select value={selectedOrigin} onChange={(event) => setSelectedOrigin(event.target.value)} className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none">
                {originLocations.map((item) => <option key={item.id} value={item.id}>{isArabic ? item.name_ar : item.name_fr} ({item.airport})</option>)}
              </select>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <span className="mb-1 block text-[11px] font-bold text-slate-500">{t.destination_label}</span>
              <select value={selectedDestination} onChange={(event) => setSelectedDestination(event.target.value)} className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none">
                {destinations.filter((item) => item.active).map((item) => <option key={item.id} value={item.id}>{isArabic ? item.name_ar : item.name_fr} ({item.airport})</option>)}
              </select>
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <span className="mb-1 block text-[11px] font-bold text-slate-500"><Calendar className="mr-1 inline h-3.5 w-3.5" />{isArabic ? 'تاريخ الذهاب' : 'Date aller'}</span>
              <input required type="date" value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" />
            </label>

            <label className={`rounded-2xl border border-slate-200 bg-slate-50 p-3 ${tripType === 'oneWay' ? 'opacity-50' : ''}`}>
              <span className="mb-1 block text-[11px] font-bold text-slate-500"><Calendar className="mr-1 inline h-3.5 w-3.5" />{isArabic ? 'تاريخ الإياب' : 'Date retour'}</span>
              <input required={tripType === 'round'} disabled={tripType === 'oneWay'} min={departureDate || undefined} type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none" />
            </label>

            <label className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <span className="mb-1 block text-[11px] font-bold text-slate-500"><Users className="mr-1 inline h-3.5 w-3.5" />{t.travelers_label}</span>
              <select value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => <option key={count} value={count}>{count} {isArabic ? (count === 1 ? 'مسافر' : 'مسافرين') : (count === 1 ? 'voyageur' : 'voyageurs')}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <p className="text-sm font-black">{isArabic ? 'لا نعرض أسعاراً وهمية' : 'Pas de faux tarifs affichés'}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  {isArabic ? 'النتائج والأسعار تتطلب بحثاً فعلياً وتأكيداً من الوكالة أو مزود التذاكر.' : 'Les disponibilités et tarifs doivent être recherchés puis confirmés par l’agence ou un fournisseur de billetterie.'}
                </p>
              </div>
            </div>
            <button type="submit" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-black text-white transition hover:bg-emerald-400 disabled:opacity-50" disabled={!origin || !destination || !departureDate || (tripType === 'round' && !returnDate)}>
              <Search className="h-4 w-4" />
              {isArabic ? 'اطلب البحث عن الرحلة' : 'Demander la recherche'}
            </button>
          </div>

          {submitted && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              <CheckCircle className="h-5 w-5" />
              {isArabic ? 'تم إرسال تفاصيل البحث. أكمل معلومات الاتصال لتلقي الخيارات المتاحة.' : 'Votre demande est prête. Complétez vos coordonnées pour recevoir les options disponibles.'}
            </div>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            {isArabic ? 'بحث مخصص حسب المدينة والتاريخ ودرجة السفر' : 'Recherche personnalisée selon ville, dates et classe'}
          </div>
        </form>
      </div>
    </section>
  );
};
