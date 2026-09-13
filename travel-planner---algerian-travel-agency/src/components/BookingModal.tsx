import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Phone,
  MessageCircle,
  Mail,
  Users,
  CheckCircle,
  AlertCircle,
  PlaneTakeoff,
  MapPin,
  Sparkles,
  Send
} from 'lucide-react';
import { Language, Currency, BookingRequest, Destination, TravelPackage, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';
import { validateAlgerianPhone, formatAlgerianPhone, createWhatsAppUrl, formatCurrency } from '../utils/formatters';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  agencyInfo: AgencyInformation;
  destinations: Destination[];
  prefill?: {
    destination?: string;
    packageName?: string;
    estimatedPrice?: number;
  };
  onSubmitBooking: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  agencyInfo,
  destinations,
  prefill,
  onSubmitBooking,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departureCity, setDepartureCity] = useState('Oran (ORN)');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('2026-10-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp' | 'email'>('whatsapp');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (prefill?.destination) {
      setDestination(prefill.destination);
    } else if (!destination && destinations.length > 0) {
      setDestination(destinations[0].name_en);
    }
  }, [prefill, destinations]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = t.val_required_name;
    }

    if (!phone.trim() || !validateAlgerianPhone(phone)) {
      newErrors.phone = t.val_valid_phone;
    }

    if (email.trim() && !email.includes('@')) {
      newErrors.email = t.val_valid_email;
    }

    if (!destination) {
      newErrors.destination = t.val_required_destination;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const refNumber = `DZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: BookingRequest = {
      id: `book-${Date.now()}`,
      reference_number: refNumber,
      full_name: fullName,
      phone_algeria: phone,
      email: email || undefined,
      departure_city: departureCity,
      destination,
      package_name: prefill?.packageName,
      dates,
      travelers_adults: adults,
      travelers_children: children,
      contact_method: contactMethod,
      special_requests: specialRequests || undefined,
      estimated_price_dzd: prefill?.estimatedPrice,
      created_at: new Date().toISOString(),
      status: 'pending',
    };

    onSubmitBooking(newBooking);
    setBookingRef(refNumber);
    setIsSuccess(true);
  };

  const handleWhatsAppInstant = () => {
    const url = createWhatsAppUrl({
      phone: agencyInfo.whatsapp,
      language,
      destination,
      packageName: prefill?.packageName,
      travelers: adults + children,
      dates,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-slate-900"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{agencyInfo.name} · {agencyInfo.city}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.booking_modal_title}
            </h3>
            {prefill?.packageName && (
              <span className="text-xs font-bold text-emerald-700 mt-1 block">
                {language === 'ar' ? 'الباقة المحددة:' : 'Forfait :'} {prefill.packageName}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            /* Success confirmation screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                {t.booking_success_title}
              </h4>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto">
                <span className="text-xs text-emerald-800 font-bold block mb-1">
                  {t.booking_success_desc}
                </span>
                <span className="text-xl font-mono font-black text-emerald-900">
                  {bookingRef}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.booking_success_note}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppInstant}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.instant_whatsapp_book}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            /* Form inputs */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">
                {t.booking_modal_subtitle}
              </p>

              {/* Full Name & Algerian Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.full_name_label} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.full_name_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-600 font-bold mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.phone_label_form} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phone_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                    dir="ltr"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{t.phone_hint}</span>
                  {errors.phone && (
                    <span className="text-[11px] text-rose-600 font-bold mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Email & Departure City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.email_label} ({language === 'ar' ? 'اختياري' : 'optionnel'})
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.email_placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.departure_city_form}
                  </label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer"
                  >
                    <option value="Oran (ORN)">{language === 'ar' ? 'وهران - مطار أحمد بن بلة (ORN)' : 'Oran - Ahmed Ben Bella (ORN)'}</option>
                    <option value="Algiers (ALG)">{language === 'ar' ? 'الجزائر العاصمة - مطار هواري بومدين (ALG)' : 'Alger - Houari Boumédiène (ALG)'}</option>
                    <option value="Constantine (CZL)">{language === 'ar' ? 'قسنطينة - مطار محمد بوضياف (CZL)' : 'Constantine - Mohamed Boudiaf (CZL)'}</option>
                    <option value="Annaba (AAE)">{language === 'ar' ? 'عنابة - مطار رابح بيطاط (AAE)' : 'Annaba - Rabah Bitat (AAE)'}</option>
                    <option value="Tlemcen (TLM)">{language === 'ar' ? 'تلمسان - مطار مصالي الحاج (TLM)' : 'Tlemcen - Messali Hadj (TLM)'}</option>
                  </select>
                </div>
              </div>

              {/* Destination & Travel Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.destination_form} *
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.dates_form}
                  </label>
                  <input
                    type="date"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Travelers (Adults + Children) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.adults} (&gt; 12)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white outline-hidden cursor-pointer"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5+</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.children} (&lt; 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white outline-hidden cursor-pointer"
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3+</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  {t.contact_pref_label}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`py-2 px-3 rounded-xl font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.pref_whatsapp}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('phone')}
                    className={`py-2 px-3 rounded-xl font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      contactMethod === 'phone'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.pref_phone}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`py-2 px-3 rounded-xl font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      contactMethod === 'email'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.pref_email}</span>
                  </button>
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.special_requests_label}
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={t.special_requests_placeholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  id="submit-booking-form-btn"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.submit_booking}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInstant}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.instant_whatsapp_book}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
