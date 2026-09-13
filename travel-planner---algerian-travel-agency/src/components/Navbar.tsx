import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu,
  X,
  Compass,
  Database,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Language, Currency, AgencyInformation } from '../types';
import { getTranslation } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  agencyInfo: AgencyInformation;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (prefill?: { destination?: string; packageName?: string; estimatedPrice?: number }) => void;
  onOpenCms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  agencyInfo,
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenCms,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const t = getTranslation(language);
  const isRtl = language === 'ar';

  const navItems = [
    { id: 'hero', label: t.nav_home },
    { id: 'destinations', label: t.nav_destinations },
    { id: 'packages', label: t.nav_packages },
    { id: 'umrah', label: t.nav_umrah },
    { id: 'flights', label: t.nav_flights },
    { id: 'trust', label: t.trust_title },
    { id: 'map', label: t.nav_agency_map },
    { id: 'contact', label: t.nav_contact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro bar for Algerian contacts and hours */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {language === 'ar'
                ? agencyInfo.status_badge_ar
                : language === 'fr'
                ? agencyInfo.status_badge_fr
                : agencyInfo.status_badge_en}
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'ar' ? agencyInfo.address_ar : agencyInfo.official_address}
            </span>
          </div>

          <div className="flex items-center gap-3 ms-auto">
            <a
              href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
              id="navbar-top-phone"
              className="inline-flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr">{agencyInfo.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`https://wa.me/${agencyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-top-whatsapp"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <button
              onClick={onOpenCms}
              id="navbar-top-cms"
              className="hidden sm:inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
              title="CMS & Data Management"
            >
              <Database className="w-3 h-3" />
              <span>{t.nav_admin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Monogram & Name */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="navbar-brand"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span>TP</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  {agencyInfo.name}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  DZ 🇩🇿
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[210px] sm:max-w-xs">
                {t.brand_tagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                  activeSection === item.id
                    ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                    : 'hover:text-emerald-600 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Glass Language Pill, Currency, CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Desktop Language Switcher: "glass pill" */}
            <div
              id="language-switcher-desktop"
              className="flex items-center p-1 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/90 shadow-xs"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                id="lang-btn-ar"
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'ar'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                id="lang-btn-fr"
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'fr'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Français
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                id="lang-btn-en"
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
            </div>

            {/* Currency Pill / Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="currency-toggle-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-200/80 text-xs font-bold text-slate-800 rounded-full border border-slate-200 transition cursor-pointer"
                title="Select Display Currency"
              >
                <span>{currency === 'DZD' ? (language === 'ar' ? 'دج' : 'DA') : currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs`}
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                    {t.currency_label}
                  </div>
                  <button
                    onClick={() => {
                      onCurrencyChange('DZD');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-start px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-700 font-semibold flex items-center justify-between ${
                      currency === 'DZD' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>DZD (الأساسي)</span>
                    <span className="text-[10px] text-emerald-600 font-bold">دج</span>
                  </button>
                  <button
                    onClick={() => {
                      onCurrencyChange('EUR');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-start px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-700 font-semibold flex items-center justify-between ${
                      currency === 'EUR' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>EUR (€)</span>
                  </button>
                  <button
                    onClick={() => {
                      onCurrencyChange('USD');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-start px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-700 font-semibold flex items-center justify-between ${
                      currency === 'USD' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>USD ($)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Booking CTA */}
            <button
              onClick={() => onOpenBooking()}
              id="navbar-cta-book"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 me-1.5" />
              <span>{t.nav_book_now}</span>
            </button>
          </div>

          {/* Mobile menu and language toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile language compact selector */}
            <select
              id="mobile-language-select"
              aria-label="Select Language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 py-1.5 px-2 focus:ring-2 focus:ring-emerald-500 outline-hidden"
            >
              <option value="ar">العربية (AR)</option>
              <option value="fr">Français (FR)</option>
              <option value="en">English (EN)</option>
            </select>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                onCurrencyChange(currency === 'DZD' ? 'EUR' : 'DZD');
              }}
              className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between"
            >
              <span>{t.currency_label}</span>
              <span className="font-bold text-emerald-700">{currency}</span>
            </button>

            <button
              onClick={() => {
                onOpenCms();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{t.nav_admin}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-start px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeSection === item.id
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav_book_now}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${agencyInfo.phone.replace(/\s/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span dir="ltr">{agencyInfo.phone}</span>
              </a>
              <a
                href={`https://wa.me/${agencyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
