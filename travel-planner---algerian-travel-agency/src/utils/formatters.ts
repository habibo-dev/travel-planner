import { Language, Currency } from '../types';

export function formatCurrency(
  amountDzd: number,
  language: Language,
  displayCurrency: Currency = 'DZD'
): string {
  if (displayCurrency === 'EUR') {
    const eur = Math.round(amountDzd / 240);
    const dzdPart = formatCurrency(amountDzd, language, 'DZD');
    return `${eur.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')} € (${dzdPart})`;
  }

  if (displayCurrency === 'USD') {
    const usd = Math.round(amountDzd / 220);
    const dzdPart = formatCurrency(amountDzd, language, 'DZD');
    return `$${usd.toLocaleString('en-US')} (${dzdPart})`;
  }

  // Primary DZD formatting based on language
  if (language === 'ar') {
    const formatted = amountDzd.toLocaleString('ar-DZ');
    return `${formatted} دج`;
  }

  if (language === 'fr') {
    // Space separator for French in Algeria: e.g. 12 500 DA
    const formatted = amountDzd.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
    return `${formatted} DA`;
  }

  // English
  const formatted = amountDzd.toLocaleString('en-US');
  return `${formatted} DZD`;
}

export function validateAlgerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  // Matches 05XXXXXXXX, 06XXXXXXXX, 07XXXXXXXX, or +2135..., +2136..., +2137...
  const localRegex = /^0(5|6|7)\d{8}$/;
  const intlRegex = /^\+?213(5|6|7)\d{8}$/;
  return localRegex.test(cleaned) || intlRegex.test(cleaned);
}

export function formatAlgerianPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-().]/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
  }
  return phone;
}

export function createWhatsAppUrl(params: {
  phone: string;
  language: Language;
  destination?: string;
  packageName?: string;
  travelers?: number;
  dates?: string;
}): string {
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  let message = '';

  if (params.language === 'ar') {
    message = `السلام عليكم ورحمة الله، أتواصل معكم عبر موقع وكالة Travel Planner بخصوص `;
    if (params.packageName) {
      message += `باقة: "${params.packageName}" `;
    } else if (params.destination) {
      message += `رحلة إلى: "${params.destination}" `;
    } else {
      message += `استفسار عام عن رحلات السفر والعمرة `;
    }
    if (params.travelers) {
      message += `لعدد ${params.travelers} مسافرين. `;
    }
    if (params.dates) {
      message += `التواريخ المقترحة: ${params.dates}. `;
    }
    message += `يرجى تزويدي بالتفاصيل والأسعار والتأكيد. شكراً لكم.`;
  } else if (params.language === 'fr') {
    message = `Bonjour Travel Planner, je vous contacte depuis votre site web concernant `;
    if (params.packageName) {
      message += `le forfait : "${params.packageName}" `;
    } else if (params.destination) {
      message += `un voyage à destination de : "${params.destination}" `;
    } else {
      message += `une demande d'information pour un voyage / Omra `;
    }
    if (params.travelers) {
      message += `pour ${params.travelers} voyageur(s). `;
    }
    if (params.dates) {
      message += `Dates envisagées : ${params.dates}. `;
    }
    message += `Merci de bien vouloir m'indiquer la disponibilité et les tarifs en DA.`;
  } else {
    message = `Hello Travel Planner, I am reaching out from your website regarding `;
    if (params.packageName) {
      message += `the package: "${params.packageName}" `;
    } else if (params.destination) {
      message += `travel to: "${params.destination}" `;
    } else {
      message += `an inquiry about travel and Umrah bookings `;
    }
    if (params.travelers) {
      message += `for ${params.travelers} traveler(s). `;
    }
    message += `Please provide further details and confirmation. Thank you!`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
