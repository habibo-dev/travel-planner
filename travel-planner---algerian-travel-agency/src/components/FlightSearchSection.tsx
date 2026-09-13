import React, { useState } from 'react';
import {
  Plane,
  ArrowRightLeft,
  Calendar,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Language, Currency, OriginLocation, Destination, FlightSearchResult } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface FlightSearchSectionProps {
  language: Language;
  currency: Currency;
  originLocations: OriginLocation[];
  destinations: Destination[];
  onBookFlight: (flight: FlightSearchResult) => void;
}

export const FlightSearchSection: React.FC<FlightSearchSectionProps> = ({
  language,
  currency,
  originLocations,
  destinations,
  onBookFlight,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const [tripType, setTripType] = useState<'round' | 'oneWay'>('round');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('oran');
  const [selectedDest, setSelectedDest] = useState<string>('istanbul');
  const [depDate, setDepDate] = useState<string>('2026-10-20');
  const [retDate, setRetDate] = useState<string>('2026-10-28');
  const [cabinClass, setCabinClass] = useState<string>('Economy');
  const [passengers, setPassengers] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  // Realistic flights departing Algerian airports
  const flightsDatabase: FlightSearchResult[] = [
    {
      id: 'fl-ah-101',
      airline: 'الخطوط الجوية الجزائرية · Air Algérie',
      airline_logo_text: 'AH',
      flight_number: 'AH 3016',
      origin_city: language === 'ar' ? 'وهران (ORN)' : 'Oran (ORN)',
      origin_airport: 'ORN',
      destination_city: language === 'ar' ? 'إسطنبول (IST)' : 'Istanbul (IST)',
      destination_airport: 'IST',
      departure_time: '10:30',
      arrival_time: '16:15',
      duration: '3h 45m',
      stops: 0,
      stops_text_ar: 'مباشر بدون توقف',
      stops_text_fr: 'Vol direct',
      stops_text_en: 'Direct flight',
      price_dzd: 68500,
      cabin_class: cabinClass,
    },
    {
      id: 'fl-tk-202',
      airline: 'الخطوط الجوية التركية · Turkish Airlines',
      airline_logo_text: 'TK',
      flight_number: 'TK 1410',
      origin_city: language === 'ar' ? 'الجزائر (ALG)' : 'Algiers (ALG)',
      origin_airport: 'ALG',
      destination_city: language === 'ar' ? 'إسطنبول (IST)' : 'Istanbul (IST)',
      destination_airport: 'IST',
      departure_time: '14:20',
      arrival_time: '19:50',
      duration: '3h 30m',
      stops: 0,
      stops_text_ar: 'مباشر · يشمل وجبة ساخنة',
      stops_text_fr: 'Direct · Repas chaud inclus',
      stops_text_en: 'Direct · Hot meal included',
      price_dzd: 74200,
      cabin_class: cabinClass,
    },
    {
      id: 'fl-ah-303',
      airline: 'الخطوط الجوية الجزائرية · Air Algérie',
      airline_logo_text: 'AH',
      flight_number: 'AH 1060',
      origin_city: language === 'ar' ? 'وهران (ORN)' : 'Oran (ORN)',
      origin_airport: 'ORN',
      destination_city: language === 'ar' ? 'باريس (CDG)' : 'Paris (CDG)',
      destination_airport: 'CDG',
      departure_time: '08:15',
      arrival_time: '11:45',
      duration: '2h 30m',
      stops: 0,
      stops_text_ar: 'مباشر بدون توقف',
      stops_text_fr: 'Vol direct',
      stops_text_en: 'Direct flight',
      price_dzd: 49800,
      cabin_class: cabinClass,
    },
    {
      id: 'fl-ek-404',
      airline: 'طيران الإمارات · Emirates',
      airline_logo_text: 'EK',
      flight_number: 'EK 758',
      origin_city: language === 'ar' ? 'الجزائر (ALG)' : 'Algiers (ALG)',
      origin_airport: 'ALG',
      destination_city: language === 'ar' ? 'دبي (DXB)' : 'Dubai (DXB)',
      destination_airport: 'DXB',
      departure_time: '15:45',
      arrival_time: '01:00',
      duration: '6h 15m',
      stops: 0,
      stops_text_ar: 'مباشر · بوينغ 777 الفاخرة',
      stops_text_fr: 'Direct · Boeing 777 grand confort',
      stops_text_en: 'Direct · Premium Boeing 777',
      price_dzd: 128000,
      cabin_class: cabinClass,
    },
  ];

  return (
    <section id="flights" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Plane className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'ar' ? 'حجز تذاكر الطيران المعتمد' : 'Billetterie Aérienne IATA'}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {t.flight_search_title}
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {t.flight_search_subtitle}
          </p>
        </div>

        {/* Flight Search Control Box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-md mb-8">
          {/* Trip Type & Cabin Class Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-4 text-xs font-bold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'round'}
                  onChange={() => setTripType('round')}
                  className="accent-emerald-600 w-4 h-4"
                />
                <span className={tripType === 'round' ? 'text-emerald-700 font-extrabold' : 'text-slate-600'}>
                  {t.round_trip}
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === 'oneWay'}
                  onChange={() => setTripType('oneWay')}
                  className="accent-emerald-600 w-4 h-4"
                />
                <span className={tripType === 'oneWay' ? 'text-emerald-700 font-extrabold' : 'text-slate-600'}>
                  {t.one_way}
                </span>
              </label>
            </div>

            {/* Cabin Class Picker */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500">{t.select_cabin}:</span>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="bg-slate-100 font-bold text-slate-800 rounded-lg px-2.5 py-1 border border-slate-200 outline-hidden cursor-pointer"
              >
                <option value="Economy">{t.economy_class}</option>
                <option value="Premium Economy">{t.premium_economy}</option>
                <option value="Business">{t.business_class}</option>
              </select>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Origin Airport */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                {t.departure_city_label}
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm outline-hidden cursor-pointer"
              >
                {originLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {language === 'ar' ? loc.name_ar : loc.name_fr} ({loc.airport})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Airport */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                {t.destination_label}
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm outline-hidden cursor-pointer"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === 'ar' ? d.name_ar : d.name_fr} ({d.airport})
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                {language === 'ar' ? 'تاريخ الذهاب' : 'Date aller'}
              </label>
              <input
                type="date"
                value={depDate}
                onChange={(e) => setDepDate(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm outline-hidden cursor-pointer"
              />
            </div>

            {/* Return Date (if round trip) */}
            <div className={`p-3 rounded-2xl bg-slate-50 border border-slate-200 ${tripType === 'oneWay' ? 'opacity-40 pointer-events-none' : ''}`}>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                {language === 'ar' ? 'تاريخ الإياب' : 'Date retour'}
              </label>
              <input
                type="date"
                value={retDate}
                onChange={(e) => setRetDate(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm outline-hidden cursor-pointer"
              />
            </div>

            {/* Passengers & Search Action */}
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex-1">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  {t.travelers_label}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-transparent font-bold text-slate-900 text-sm outline-hidden cursor-pointer"
                >
                  <option value={1}>1 {language === 'ar' ? 'مسافر' : 'voyageur'}</option>
                  <option value={2}>2 {language === 'ar' ? 'مسافرين' : 'voyageurs'}</option>
                  <option value={3}>3 {language === 'ar' ? 'مسافرين' : 'voyageurs'}</option>
                  <option value={4}>4 {language === 'ar' ? 'مسافرين' : 'voyageurs'}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Search Results Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
            <span>
              {language === 'ar'
                ? `الرحلات المتاحة المباشرة بالدينار الجزائري (${flightsDatabase.length} خيارات)`
                : `Vols réguliers disponibles en Dinar Algérien (${flightsDatabase.length} options)`}
            </span>
            <span className="text-emerald-700">✓ أسعار رسمية مؤكدة شاملة الضرائب</span>
          </div>

          {flightsDatabase.map((flight) => (
            <div
              key={flight.id}
              className="flex flex-col lg:flex-row items-center justify-between p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500/50 shadow-xs hover:shadow-md transition gap-4"
            >
              {/* Airline Badge & Info */}
              <div className="flex items-center gap-4 w-full lg:w-1/4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0">
                  {flight.airline_logo_text}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {flight.airline}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {flight.flight_number}
                    </span>
                    <span>·</span>
                    <span className="font-medium text-emerald-700">{flight.cabin_class}</span>
                  </div>
                </div>
              </div>

              {/* Schedule and Flight Route Graphic */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 w-full lg:w-2/4 text-center">
                <div className="text-center">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 block" dir="ltr">
                    {flight.departure_time}
                  </span>
                  <span className="text-xs font-bold text-slate-500 block">
                    {flight.origin_airport}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {flight.origin_city}
                  </span>
                </div>

                <div className="flex flex-col items-center flex-1 max-w-[160px]">
                  <span className="text-[11px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span dir="ltr">{flight.duration}</span>
                  </span>
                  <div className="w-full relative flex items-center justify-center">
                    <div className="h-[2px] w-full bg-slate-200"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 mt-1">
                    {language === 'ar' ? flight.stops_text_ar : flight.stops_text_fr}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 block" dir="ltr">
                    {flight.arrival_time}
                  </span>
                  <span className="text-xs font-bold text-slate-500 block">
                    {flight.destination_airport}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {flight.destination_city}
                  </span>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full lg:w-1/4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-start lg:text-end">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {t.per_person}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700">
                    {formatCurrency(flight.price_dzd, language, currency)}
                  </span>
                </div>

                <button
                  onClick={() => onBookFlight(flight)}
                  id={`btn-select-flight-${flight.id}`}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition active:scale-98 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{t.select_flight}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
