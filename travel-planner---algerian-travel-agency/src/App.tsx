import React, { useState, useEffect } from 'react';
import {
  Language,
  Currency,
  AgencyInformation,
  Destination,
  TravelPackage,
  UmrahPackage,
  BookingRequest
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
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('DZD');

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

  // Production-safe default: no fabricated customer records.
  // New requests are still stored locally until a real backend/database is connected.
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('tp_algeria_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    destination?: string;
    packageName?: string;
    estimatedPrice?: number;
  }>({});
  const [selectedDestinationModal, setSelectedDestinationModal] = useState<Destination | null>(null);
  const [cmsModalOpen, setCmsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    const titles: Record<Language, string> = {
      ar: 'Travel Planner | وكالة أسفار وسياحة - وهران، الجزائر',
      fr: 'Travel Planner | Agence de Voyages - Oran, Algérie',
      en: 'Travel Planner | Algerian Travel Agency - Oran, Algeria',
    };
    document.title = titles[language];
  }, [language]);

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
    setBookingRequests([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
    if (params.tab === 'flights') handleNavigate('flights');
    else if (params.tab === 'umrah') handleNavigate('umrah');
    else handleNavigate('destinations');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
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
        <Hero
          language={language}
          originLocations={algerianOrigins}
          destinations={destinations}
          onSearch={handleHeroSearch}
          onExploreDestinations={() => handleNavigate('destinations')}
          onViewDeals={() => handleNavigate('packages')}
        />

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

        <DestinationsSection
          language={language}
          currency={currency}
          destinations={destinations}
          onSelectDestination={(dest) => setSelectedDestinationModal(dest)}
          onBookDestination={(dest) => {
            const destName = language === 'ar' ? dest.name_ar : dest.name_en;
            handleOpenBooking({ destination: destName, estimatedPrice: dest.starting_price_dzd });
          }}
        />

        <DealsSection
          language={language}
          currency={currency}
          onBookDeal={({ title, destination, price }) => {
            handleOpenBooking({ packageName: title, destination, estimatedPrice: price });
          }}
        />

        <PackagesSection
          language={language}
          currency={currency}
          packages={packages}
          onBookPackage={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({ packageName: pkgTitle, destination: pkg.departure_city, estimatedPrice: pkg.price_dzd });
          }}
          onSelectPackage={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({ packageName: pkgTitle, destination: pkg.departure_city, estimatedPrice: pkg.price_dzd });
          }}
        />

        <UmrahSection
          language={language}
          currency={currency}
          umrahPackages={umrahPackages}
          agencyInfo={agencyInfo}
          onBookUmrah={(pkg) => {
            const pkgTitle = language === 'ar' ? pkg.title_ar : pkg.title_en;
            handleOpenBooking({ packageName: pkgTitle, destination: 'Makkah & Madinah', estimatedPrice: pkg.price_dzd });
          }}
        />

        <BenefitsSection language={language} />
        <TestimonialsSection language={language} />

        <StoriesSection
          language={language}
          onReadStory={() => handleNavigate('contact')}
        />

        <FlightSearchSection
          language={language}
          currency={currency}
          originLocations={algerianOrigins}
          destinations={destinations}
          onRequestFlight={(request) => {
            const destinationName = language === 'ar' ? request.destination.name_ar : request.destination.name_en;
            const originName = language === 'ar' ? request.origin.name_ar : request.origin.name_en;
            const dates = request.returnDate
              ? `${request.departureDate} → ${request.returnDate}`
              : request.departureDate;
            handleOpenBooking({
              destination: destinationName,
              packageName: `Demande de vol: ${originName} (${request.origin.airport}) → ${destinationName} (${request.destination.airport}) · ${dates} · ${request.passengers} pax · ${request.cabinClass}`,
            });
          }}
        />

        <LocalTrustSection language={language} agencyInfo={agencyInfo} />

        <AgencyMapSection
          language={language}
          currency={currency}
          agencyInfo={agencyInfo}
          destinations={destinations}
          onSelectDestination={(dest) => setSelectedDestinationModal(dest)}
        />
      </main>

      <Footer
        language={language}
        currency={currency}
        agencyInfo={agencyInfo}
        destinations={destinations}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      <MobileBottomNav
        language={language}
        agencyInfo={agencyInfo}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

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

      <DestinationModal
        destination={selectedDestinationModal}
        isOpen={!!selectedDestinationModal}
        onClose={() => setSelectedDestinationModal(null)}
        language={language}
        currency={currency}
        onBook={(dest) => {
          const destName = language === 'ar' ? dest.name_ar : dest.name_en;
          handleOpenBooking({ destination: destName, estimatedPrice: dest.starting_price_dzd });
        }}
      />

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
