import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Plane,
  Clock,
  CheckCircle,
  Building,
  ShieldAlert,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, Currency, Destination, Hotel } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onBook: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  language,
  currency,
  onBook,
}) => {
  if (!isOpen || !destination) return null;

  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const name = language === 'ar' ? destination.name_ar : language === 'fr' ? destination.name_fr : destination.name_en;
  const country = language === 'ar' ? destination.country_ar : language === 'fr' ? destination.country_fr : destination.country_en;
  const desc = language === 'ar' ? destination.description_ar : language === 'fr' ? destination.description_fr : destination.description_en;
  const bestTime = language === 'ar' ? destination.best_time_to_visit_ar : language === 'fr' ? destination.best_time_to_visit_fr : destination.best_time_to_visit_en;
  const visaInfo = language === 'ar' ? destination.visa_info_ar : language === 'fr' ? destination.visa_info_fr : destination.visa_info_en;
  const highlights = language === 'ar' ? destination.highlights_ar : language === 'fr' ? destination.highlights_fr : destination.highlights_en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col text-slate-900"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Cover Photo with overlay & close button */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={destination.image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 end-4 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Badge */}
          <div className="absolute bottom-4 start-6 end-6 text-white flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-mono font-bold text-xs">
                  {destination.airport}
                </span>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {country}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">{name}</h3>
            </div>

            <div className="text-end">
              <span className="text-[11px] font-semibold text-slate-300 block">{t.starts_from}</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {formatCurrency(destination.starting_price_dzd, language, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {desc}
          </p>

          {/* Key Facts Strip (Best time, Flight duration, Departures) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                {t.modal_best_time}
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{bestTime}</span>
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                {t.flight_duration}
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5" dir="ltr">
                <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{destination.flight_duration_from_alg}</span>
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                {t.available_departures}
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5" dir="ltr">
                <Plane className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{destination.available_departure_cities.slice(0, 3).join(', ')}</span>
              </span>
            </div>
          </div>

          {/* Visa Information for Algerians */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-1.5 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t.modal_visa_info}</span>
            </div>
            <p className="text-amber-800 leading-relaxed font-medium">
              {visaInfo}
            </p>
          </div>

          {/* Highlights & Top Activities */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.modal_things_to_do}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Hotels */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>{t.modal_hotels_in_dest}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.hotels.map((h) => (
                <div key={h.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
                  <img
                    src={h.image}
                    alt={h.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{h.name}</h5>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                      {'★'.repeat(h.stars)}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{h.proximity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
          >
            {t.close}
          </button>

          <button
            onClick={() => {
              onClose();
              onBook(destination);
            }}
            id={`btn-modal-book-now-${destination.id}`}
            className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.modal_book_this}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
