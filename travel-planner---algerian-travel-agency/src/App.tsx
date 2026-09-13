import React, { useState, useEffect } from 'react';
import {
  Language,
  Currency,
  AgencyInformation,
  Destination,
  TravelPackage,
  UmrahPackage,
  BookingRequest,
  FlightSearchResult
} from './types';
import {
  initialAgencyInfo,
  initialDestinations,
  initialServices,
  initialPackages,
  initialUmrahPackages,
  algerianOrigins
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesRow } from './components/ServicesRow';
import { DestinationsSection } from './components/DestinationsSection';
import { DealsSection } from './components/DealsSection';
import { PackagesSection } from './components/PackagesSection';
import { UmrahSection } from './components/UmrahSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StoriesSection } from './components/StoriesSection';
import { FlightSearchSection } from './components/FlightSearchSection';
import { LocalTrustSection } from './components/LocalTrustSection';
import { AgencyMapSection } from './components/AgencyMapSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { BookingModal } from './components/BookingModal';
import { DestinationModal } from './components/DestinationModal';
import { CmsManagerModal } from './components/CmsManagerModal';

export default function App() {
  // Localization State - Arabic default as requested
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('DZD');

  // Agency & Domain Data State (CMS Ready)
  const [agencyInfo, setAgencyInfo] = useState<AgencyInformation>(() => {
    const saved = localStorage.getItem('tp_algeria_agency_info');
    return saved ? JSON.parse(saved) : initialAgencyInfo;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('tp_algeria_destinations');
    return saved ? JSON.parse(saved) : initialDestinations;
  });

  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    const saved = localStorage.getItem('tp_algeria_packages');
    return saved ? JSON.parse(saved) : initialPackages;
  });

  const [umrahPackages, setUmrahPackages] = useState<UmrahPackage[]>(() => {
    const saved = localStorage.getItem('tp_algeria_umrah');
    return saved ? JSON.parse(saved) : initialUmrahPackages;
  });

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('tp_algeria_bookings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'book-sample-1',
        reference_number: 'DZ-829104',
        full_name: 'Karim Bouzid',
        phone_algeria: '0550 12 34 56',
        email: 'karim.bouzid@email.dz',
        departure_city: 'Oran (ORN)',
        destination: 'Istanbul',
        package_name: 'إسطنبول الساحرة 8 أيام - فندق 4 نجوم وتقسيم',
        dates: '2026-10-15',
        travelers_adults: 2,
        travelers_children: 1,
        contact_method: 'whatsapp',
        special_requests: 'نطلب غرفتين متصلتين وإطلالة على البوسفور إن أمكن',
        estimated_price_dzd: 139000,
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'pending',
      },
      {
        id: 'book-sample-2',
        reference_number: 'DZ-741920',
        full_name: 'Farida Meziane',
        phone_algeria: '0661 98 76 54',
        departure_city: 'Oran (ORN)',
        destination: 'Makkah & Madinah',
        package_name: 'عمرة الراحة والنور 15 يوماً - فنادق ساحة الحرم',
        dates: '2026-11-05',
        travelers_adults: 2,
        travelers_children: 0,
        contact_method: 'phone',
        special_requests: 'حجز مقاعد طائرة متجاورة ومساعدة في الحقائب',
        estimated_price_dzd: 285000,
        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
        status: 'contacted',
      },
    ];
  });

  // UI Navigation & Modals State
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    destination?: string;
    packageName?: string;
    estimatedPrice?: number;
  }>({});
  const [selectedDestinationModal, setSelectedDestinationModal] = useState<Destination | null>(null);
  const [cmsModalOpen, setCmsModalOpen] = useState<boolean>(false);

  // Sync HTML lang and dir attributes whenever language switches
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    const titles: Record<Language, string> = {
      ar: 'Travel Planner | وكالة أسفار وسياحة معتمدة - وهران، الجزائر',
      fr: 'Travel Planner | Agence de Voyages Agréée - Oran, Algérie',
      en: 'Travel Planner | Licensed Algerian Travel Agency - Oran, Algeria',
    };
    document.title = titles[language];
  }, [language]);

  // Persist CMS updates
  const handleUpdateAgencyInfo = (info: AgencyInformation) => {
    setAgencyInfo(info);
    localStorage.setItem('tp_algeria_agency_info', JSON.stringify(info));
  };

  const handleUpdateDestinations = (dests: Destination[]) => {
    setDestinations(dests);
    localStorage.setItem('tp_algeria_destinations', JSON.stringify(dests));
  };

  const handleUpdateUmrahPackages = (umrahs: UmrahPackage[]) => {
    setUmrahPackages(umrahs);
    localStorage.setItem('tp_algeria_umrah', JSON.stringify(umrahs));
  };

  const handleCreateBooking = (newBooking: BookingRequest) => {
    const updated = [newBooking, ...bookingRequests];
    setBookingRequests(updated);
    localStorage.setItem('tp_algeria_bookings', JSON.stringify(updated));
  };

  const handleUpdateBookingStatus = (bookingId: string, status: BookingRequest['status']) => {
    const updated = bookingRequests.map((b) => (b.id === bookingId ? { ...b, status } : b));
    setBookingRequests(updated);
    localStorage.setItem('tp_algeria_bookings', JSON.stringify(updated));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('tp_algeria_agency_info');
    localStorage.removeItem('tp_algeria_destinations');
    localStorage.removeItem('tp_algeria_packages');
    localStorage.removeItem('tp_algeria_umrah');
    localStorage.removeItem('tp_algeria_bookings');

    setAgencyInfo(initialAgencyInfo);
    setDestinations(initialDestinations);
    setPackages(initialPackages);
    setUmrahPackages(initialUmrahPackages);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (prefill?: { destination?: string; packageName?: string; estimatedPrice?: number }) => {
    setBookingPrefill(prefill || {});
    setBookingModalOpen(true);
  };

  const handleHeroSearch = (params: {
    departure: string;
    destination: string;
    dates: string;
    travelers: number;
    tab: 'packages' | 'flights' | 'umrah';
  }) => {
    if (params.tab === 'flights') {
      handleNavigate('flights');
    } else if (params.tab === 'umrah') {
      handleNavigate('umrah');
    } else {
      handleNavigate('destinations');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header with trilingual language selector, currency switcher & quick calls */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        currency={currency}
        onCurrencyChange={setCurrency}
        agencyInfo={agencyInfo}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCms={() => setCmsModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Algerian departure search */}
        <Hero
          language={language}
          originLocations={algerianOrigins}
          destinations={destinations}
          onSearch={handleHeroSearch}
          onExploreDestinations={() => handleNavigate('destinations')}
          onViewDeals={() => handleNavigate('packages')}
        />

        {/* 7 Services Row */}
        <ServicesRow
          language={language}
          services={initialServices}
          onSelectService={(serviceId) => {
            if (serviceId === 'flights') handleNavigate('flights');
            else if (serviceId === 'umrah') handleNavigate('umrah');
            else if (serviceId === 'packages') handleNavigate('packages');
            else handleOpenBooking({ packageName: serviceId });
          }}
        />

        {/* Destinations with Algerian flight duration & departures */}
        <DestinationsSection
          language={language}
          currency={currency}
          destinations={destinations}
          onSelectDestination={(dest) => setSelectedDestinationModal(dest)}
          onBookDestination={(dest) => {
            const destName = language === 'ar' ? dest.name_ar : dest.name_en;
            handleOpenBooking({
              destination: destName,
              estimatedPrice: dest.starting_price_dzd,
            });
          }}
        />

        {/* SECTION 03: Hot Deals */}
        <DealsSection
          language={language}
          currency={currency}
          onBookDeal={({ title, destination, price }) => {
            handleOpenBooking({
              packageName: title,
              destination,
              estimatedPrice: price,
            });
          }}
        />

        {/* SECTION 04: Featured Packages Section */}
        <PackagesSection
          language={language}
          currency={currency}
          packages={packages}
          onBookPackage={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({
              packageName: pkgTitle,
              destination: pkg.departure_city,
              estimatedPrice: pkg.price_dzd,
            });
          }}
          onSelectPackage={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({
              packageName: pkgTitle,
              destination: pkg.departure_city,
              estimatedPrice: pkg.price_dzd,
            });
          }}
        />

        {/* SECTION 05: Dedicated Umrah & Spiritual Journey Section */}
        <UmrahSection
          language={language}
          currency={currency}
          umrahPackages={umrahPackages}
          agencyInfo={agencyInfo}
          onBookUmrah={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({
              packageName: pkgTitle,
              destination: 'Makkah & Madinah',
              estimatedPrice: pkg.price_dzd,
            });
          }}
        />

        {/* SECTION 06: Benefits / Why Choose Us */}
        <BenefitsSection language={language} />

        {/* SECTION 07: Testimonials / Traveler Reviews */}
        <TestimonialsSection language={language} />

        {/* SECTION 08: Travel Stories & Practical Guides */}
        <StoriesSection
          language={language}
          onReadStory={(storyId) => {
            handleNavigate('contact');
          }}
        />

        {/* Algerian Flight Search & Real Flight Comparison */}
        <FlightSearchSection
          language={language}
          currency={currency}
          originLocations={algerianOrigins}
          destinations={destinations}
          onBookFlight={(flight) => {
            handleOpenBooking({
              packageName: `${flight.airline} (${flight.flight_number}): ${flight.origin_city} → ${flight.destination_city}`,
              destination: flight.destination_city,
              estimatedPrice: flight.price_dzd,
            });
          }}
        />

        {/* Local Trust Pillars & Algerian Ministry Licensing */}
        <LocalTrustSection
          language={language}
          agencyInfo={agencyInfo}
        />

        {/* Interactive Agency Map (Oran Headquarters) & World Destinations */}
        <AgencyMapSection
          language={language}
          currency={currency}
          agencyInfo={agencyInfo}
          destinations={destinations}
          onSelectDestination={(dest) => setSelectedDestinationModal(dest)}
        />
      </main>

      {/* Comprehensive Algerian Travel Agency Footer */}
      <Footer
        language={language}
        currency={currency}
        agencyInfo={agencyInfo}
        destinations={destinations}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Mobile Bottom Sticky Bar (Call, WhatsApp, Directions, Book) */}
      <MobileBottomNav
        language={language}
        agencyInfo={agencyInfo}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

      {/* Booking Form Modal with Algerian phone validation */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        language={language}
        currency={currency}
        agencyInfo={agencyInfo}
        destinations={destinations}
        prefill={bookingPrefill}
        onSubmitBooking={handleCreateBooking}
      />

      {/* Destination Details Modal with visa advice for Algerians */}
      <DestinationModal
        destination={selectedDestinationModal}
        isOpen={!!selectedDestinationModal}
        onClose={() => setSelectedDestinationModal(null)}
        language={language}
        currency={currency}
        onBook={(dest) => {
          const destName = language === 'ar' ? dest.name_ar : dest.name_en;
          handleOpenBooking({
            destination: destName,
            estimatedPrice: dest.starting_price_dzd,
          });
        }}
      />

      {/* CMS Data Management Console */}
      <CmsManagerModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
        language={language}
        currency={currency}
        agencyInfo={agencyInfo}
        onUpdateAgencyInfo={handleUpdateAgencyInfo}
        destinations={destinations}
        onUpdateDestinations={handleUpdateDestinations}
        umrahPackages={umrahPackages}
        onUpdateUmrahPackages={handleUpdateUmrahPackages}
        bookingRequests={bookingRequests}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
