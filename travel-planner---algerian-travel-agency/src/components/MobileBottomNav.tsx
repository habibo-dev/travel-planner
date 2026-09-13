import React from 'react';
import {
  Phone,
  MessageCircle,
  Navigation,
  Calendar,
  Compass
} from 'lucide-react';
import { Language, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';

interface MobileBottomNavProps {
  language: Language;
  agencyInfo: AgencyInformation;
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  agencyInfo,
  onOpenBooking,
  onNavigate,
}) => {
  const t = getTranslation(language);

  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl px-3 py-2"
    >
      <div className="grid grid-cols-4 gap-2">
        {/* Direct Call Button (min 44px touch target) */}
        <a
          href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
          className="flex flex-col items-center justify-center h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition active:scale-95"
          id="mobile-bottom-call"
          title={t.call_us}
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">{t.call_us}</span>
        </a>

        {/* WhatsApp Direct Button */}
        <a
          href={`https://wa.me/${agencyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-12 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition active:scale-95"
          id="mobile-bottom-whatsapp"
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>

        {/* Google Maps Directions Button */}
        <a
          href={agencyInfo.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition active:scale-95"
          id="mobile-bottom-directions"
          title={t.get_directions}
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">{t.get_directions}</span>
        </a>

        {/* Book Now Button */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition active:scale-95 cursor-pointer shadow-md shadow-emerald-700/20"
          id="mobile-bottom-book"
          title={t.nav_book_now}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] font-black mt-0.5">{t.nav_book_now}</span>
        </button>
      </div>
    </aside>
  );
};
