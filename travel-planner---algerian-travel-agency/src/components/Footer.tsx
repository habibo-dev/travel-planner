import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
  ArrowUp,
  Heart
} from 'lucide-react';
import { Language, Currency, AgencyInformation, Destination } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  language: Language;
  currency: Currency;
  agencyInfo: AgencyInformation;
  destinations: Destination[];
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  currency,
  agencyInfo,
  destinations,
  onNavigate,
  onOpenBooking,
}) => {
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-28 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Agency Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black text-base shadow-md">
                TP
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {agencyInfo.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>

            {/* Accreditation Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.footer_legal}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {t.footer_license_text}
              </p>
              <span className="text-[10px] font-mono text-slate-500 block">
                N° d'agrément: {agencyInfo.license_number}
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white tracking-wider uppercase">
              {t.footer_quick_links}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.nav_destinations}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.nav_packages}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('umrah')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.nav_umrah}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('flights')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.nav_flights}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trust')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.trust_title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  {t.nav_agency_map}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white tracking-wider uppercase">
              {t.footer_destinations}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              {destinations.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="hover:text-emerald-400 transition cursor-pointer flex items-center justify-between w-full"
                  >
                    <span>{language === 'ar' ? d.name_ar : d.name_fr}</span>
                    <span className="font-mono text-[10px] text-slate-500">{d.airport}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Oran Headquarters & Phone */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white tracking-wider uppercase">
              {t.office_location}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {language === 'ar' ? agencyInfo.address_ar : agencyInfo.official_address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
                  className="font-bold text-white hover:text-emerald-400"
                  dir="ltr"
                >
                  {agencyInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${agencyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:text-emerald-300"
                >
                  WhatsApp Direct
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{language === 'ar' ? agencyInfo.opening_hours_ar : agencyInfo.opening_hours_fr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.all_rights_reserved}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <span>{language === 'ar' ? 'العودة للأعلى' : 'Retour en haut'}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
