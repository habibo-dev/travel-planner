import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ExternalLink,
  Plane,
  Building,
  CheckCircle,
  Copy,
  Check,
  Globe2,
  Sparkles
} from 'lucide-react';
import { Language, Currency, AgencyInformation, Destination } from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface AgencyMapSectionProps {
  language: Language;
  currency: Currency;
  agencyInfo: AgencyInformation;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
}

export const AgencyMapSection: React.FC<AgencyMapSectionProps> = ({
  language,
  currency,
  agencyInfo,
  destinations,
  onSelectDestination,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';
  const [mapMode, setMapMode] = useState<'agency' | 'destinations'>('agency');
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [selectedDestMap, setSelectedDestMap] = useState<Destination>(destinations[0]);

  const copyPlusCode = () => {
    navigator.clipboard.writeText(agencyInfo.plus_code);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <section id="map" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'ar' ? 'موقع الوكالة الرسمي' : 'Localisation de l\'agence'}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {t.map_section_title}
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {t.map_section_subtitle}
            </p>
          </div>

          {/* Map view switcher tabs: Agency Office / World Destinations */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setMapMode('agency')}
              id="tab-map-agency"
              className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                mapMode === 'agency'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'ar' ? 'مقر وهران (إقامة حسناوي)' : 'Siège Oran (Hasnaoui)'}</span>
            </button>
            <button
              onClick={() => setMapMode('destinations')}
              id="tab-map-destinations"
              className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                mapMode === 'destinations'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'ar' ? 'خريطة الوجهات العالمية' : 'Carte des Destinations'}</span>
            </button>
          </div>
        </div>

        {/* Map Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Agency Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                    TP
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{agencyInfo.name}</h3>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      {language === 'ar' ? agencyInfo.status_badge_ar : agencyInfo.status_badge_fr}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Details List */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Official Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                      {t.address_label}
                    </span>
                    <p className="font-bold text-white leading-relaxed">
                      {language === 'ar' ? agencyInfo.address_ar : agencyInfo.official_address}
                    </p>
                    <span className="text-xs text-slate-400">
                      {agencyInfo.city}, {agencyInfo.country} ({agencyInfo.wilaya})
                    </span>
                  </div>
                </div>

                {/* Phone & Contact */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                      {t.phone_label}
                    </span>
                    <a
                      href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
                      className="text-base font-extrabold text-emerald-400 hover:text-emerald-300 block"
                      dir="ltr"
                    >
                      {agencyInfo.phone}
                    </a>
                    <span className="text-xs text-slate-400">
                      {language === 'ar' ? 'متاح طيلة أوقات العمل الرسمية' : 'Disponible aux heures d\'ouverture'}
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                      {t.opening_hours_label}
                    </span>
                    <p className="font-semibold text-slate-200">
                      {language === 'ar' ? agencyInfo.opening_hours_ar : agencyInfo.opening_hours_fr}
                    </p>
                  </div>
                </div>

                {/* Plus Code & Airport Distance */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">Google Plus Code:</span>
                    <button
                      onClick={copyPlusCode}
                      className="font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1 hover:text-white transition cursor-pointer"
                    >
                      <span>{agencyInfo.plus_code}</span>
                      {copiedPlusCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">
                      {language === 'ar' ? 'المطار الأقرب:' : 'Aéroport proche:'}
                    </span>
                    <span className="font-bold text-white flex items-center gap-1 mt-1">
                      <Plane className="w-3.5 h-3.5 text-amber-400" />
                      ORN (15 min)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={agencyInfo.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-get-directions"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.get_directions} (Google Maps)</span>
                <ExternalLink className="w-4 h-4 ms-1" />
              </a>

              <span className="text-[11px] text-slate-400 text-center">
                {language === 'ar'
                  ? 'رخصة وزارة السياحة رقم 31/AV/2023 · إقامة حسناوي وهران'
                  : 'Licence ministère N° 31/AV/2023 · Résidence Hasnaoui Oran'}
              </span>
            </div>
          </div>

          {/* Interactive Visual Map Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm relative min-h-[440px]">
            {mapMode === 'agency' ? (
              /* Agency Location Map Canvas & Embed */
              <div className="relative w-full h-full min-h-[460px] flex flex-col">
                {/* Real Google Maps embed for Oran Résidence Hasnaoui */}
                <iframe
                  title="Travel Planner Agency Location Oran"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.245892543329!2d-0.6406886236968875!3d35.6882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e89e0066d9333%3A0x6b777a834e022f46!2sR%C3%A9sidence%20Hasnaoui%2C%20Oran!5e0!3m2!1sfr!2sdz!4v1700000000000!5m2!1sfr!2sdz"
                  className="w-full h-full min-h-[460px] border-0 rounded-3xl"
                  loading="lazy"
                  allowFullScreen
                ></iframe>

                {/* Overlay Glass Card for Agency Quick Access */}
                <div className="absolute top-4 start-4 max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-900 pointer-events-auto">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <h4 className="font-extrabold text-sm">{agencyInfo.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                    {language === 'ar' ? agencyInfo.address_ar : agencyInfo.official_address}
                  </p>
                  <a
                    href={agencyInfo.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>{t.get_directions}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              /* Interactive Destination Explorer Map */
              <div className="p-6 flex-1 flex flex-col justify-between bg-slate-900 text-white relative">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-black text-base text-white">
                      {language === 'ar' ? 'الوجهات المرتبطة برحلات من الجزائر' : 'Réseau de vols réguliers'}
                    </h4>
                    <span className="text-xs text-emerald-400 font-bold">
                      {destinations.length} {language === 'ar' ? 'وجهات مباشرة' : 'Destinations'}
                    </span>
                  </div>

                  {/* Destination Pins list */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                    {destinations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDestMap(d)}
                        className={`p-2.5 rounded-xl text-start text-xs font-bold transition cursor-pointer ${
                          selectedDestMap.id === d.id
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="truncate">{language === 'ar' ? d.name_ar : d.name_fr}</div>
                        <div className="text-[10px] font-mono opacity-80">{d.airport}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Destination Card Preview */}
                <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedDestMap.image}
                      alt={selectedDestMap.name_en}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h5 className="font-extrabold text-white text-base">
                        {language === 'ar' ? selectedDestMap.name_ar : selectedDestMap.name_fr}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {language === 'ar' ? 'رحلات مباشرة من وهران والجزائر' : 'Vols directs depuis Oran et Alger'}
                      </p>
                      <span className="text-xs font-bold text-emerald-400 mt-1 block">
                        {t.starts_from} {formatCurrency(selectedDestMap.starting_price_dzd, language, currency)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDestination(selectedDestMap)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer whitespace-nowrap"
                  >
                    {t.view_details}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
