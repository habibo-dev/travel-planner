export type Language = 'ar' | 'fr' | 'en';
export type Direction = 'rtl' | 'ltr';
export type Currency = 'DZD' | 'EUR' | 'USD';

export interface AgencyInformation {
  name: string;
  country: string;
  country_ar: string;
  country_fr: string;
  country_en: string;
  official_address: string;
  address_ar: string;
  city: string;
  city_ar: string;
  wilaya: string;
  wilaya_ar: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  plus_code: string;
  phone: string;
  phone_intl: string;
  whatsapp: string;
  email: string;
  opening_hours_ar: string;
  opening_hours_fr: string;
  opening_hours_en: string;
  status_badge_ar: string;
  status_badge_fr: string;
  status_badge_en: string;
  google_maps_url: string;
  license_information: string;
  license_information_ar: string;
  license_number: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface OriginLocation {
  id: string;
  name_ar: string;
  name_fr: string;
  name_en: string;
  airport: string;
  airport_full_name: string;
  wilaya_code: string;
  latitude: number;
  longitude: number;
}

export interface Destination {
  id: string;
  slug: string;
  category: 'international' | 'religious' | 'domestic';
  name_ar: string;
  name_fr: string;
  name_en: string;
  country_ar: string;
  country_fr: string;
  country_en: string;
  description_ar: string;
  description_fr: string;
  description_en: string;
  image: string;
  latitude: number;
  longitude: number;
  airport: string;
  starting_price_dzd: number;
  flight_duration_from_alg: string;
  available_departure_cities: string[];
  best_time_ar: string;
  best_time_fr: string;
  best_time_en: string;
  things_to_do_ar: string[];
  things_to_do_fr: string[];
  things_to_do_en: string[];
  visa_requirements_ar: string;
  visa_requirements_fr: string;
  visa_requirements_en: string;
  best_time_to_visit_ar?: string;
  best_time_to_visit_fr?: string;
  best_time_to_visit_en?: string;
  visa_info_ar?: string;
  visa_info_fr?: string;
  visa_info_en?: string;
  highlights_ar?: string[];
  highlights_fr?: string[];
  highlights_en?: string[];
  hotels?: {
    id: string;
    name: string;
    stars: number;
    proximity: string;
    image: string;
  }[];
  featured: boolean;
  active: boolean;
}

export interface TravelPackage {
  id: string;
  destination_id: string;
  title_ar: string;
  title_fr: string;
  title_en: string;
  description_ar: string;
  description_fr: string;
  description_en: string;
  departure_city: string;
  departure_city_ar: string;
  duration_days: number;
  duration_nights: number;
  hotel_name: string;
  hotel_stars: number;
  price_dzd: number;
  old_price_dzd?: number;
  discount_percentage?: number;
  included_ar: string[];
  included_fr: string[];
  included_en: string[];
  excluded_ar: string[];
  excluded_fr: string[];
  excluded_en: string[];
  itinerary: {
    day: number;
    title_ar: string;
    title_fr: string;
    title_en: string;
    desc_ar: string;
    desc_fr: string;
    desc_en: string;
  }[];
  image: string;
  featured: boolean;
  active: boolean;
}

export interface UmrahPackage {
  id: string;
  title_ar: string;
  title_fr: string;
  title_en: string;
  departure_city: string;
  departure_city_ar: string;
  flight_information_ar: string;
  flight_information_fr: string;
  flight_information_en: string;
  makkah_hotel: string;
  madinah_hotel: string;
  makkah_distance_to_haram: string;
  madinah_distance_to_masjid_an_nabawi: string;
  nights_makkah: number;
  nights_madinah: number;
  transfers_ar: string;
  transfers_fr: string;
  transfers_en: string;
  visa_assistance: boolean;
  price_dzd: number;
  old_price_dzd?: number;
  image: string;
  program_type_ar: string;
  program_type_fr: string;
  program_type_en: string;
  active: boolean;
  featured: boolean;
}

export interface Deal {
  id: string;
  destination_id: string;
  title_ar: string;
  title_fr: string;
  title_en: string;
  price_dzd: number;
  old_price_dzd: number;
  discount: number;
  valid_until: string;
  image: string;
  active: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  destination_id: string;
  description_ar: string;
  description_fr: string;
  description_en: string;
  rating: number;
  latitude: number;
  longitude: number;
  distance_to_landmark_ar: string;
  distance_to_landmark_fr: string;
  distance_to_landmark_en: string;
  price_dzd: number;
  images: string[];
  amenities: string[];
}

export interface ServiceCategory {
  id: string;
  ar: string;
  fr: string;
  en: string;
  desc_ar: string;
  desc_fr: string;
  desc_en: string;
  icon: string;
}

export interface CustomerBooking {
  id: string;
  reference: string;
  full_name: string;
  phone_number: string;
  email: string;
  departure_city: string;
  destination: string;
  package_name?: string;
  travel_dates: string;
  number_of_travelers: number;
  contact_preference: 'phone' | 'whatsapp' | 'email';
  special_requests?: string;
  estimated_price_dzd: number;
  created_at: string;
  status: 'pending' | 'confirmed' | 'contacted';
}

export interface BookingRequest {
  id: string;
  reference_number: string;
  full_name: string;
  phone_algeria: string;
  email?: string;
  departure_city: string;
  destination: string;
  package_name?: string;
  dates: string;
  travelers_adults: number;
  travelers_children: number;
  contact_method: 'phone' | 'whatsapp' | 'email';
  special_requests?: string;
  estimated_price_dzd?: number;
  created_at: string;
  status: 'pending' | 'confirmed' | 'contacted' | 'cancelled';
}

export interface FlightSearchResult {
  id: string;
  airline: string;
  airline_logo_text: string;
  flight_number: string;
  origin_city: string;
  origin_airport: string;
  destination_city: string;
  destination_airport: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  stops: number;
  stops_text_ar: string;
  stops_text_fr: string;
  stops_text_en: string;
  price_dzd: number;
  cabin_class: string;
}
