import React, { useState } from 'react';
import {
  X,
  Database,
  Building,
  MapPin,
  Calendar,
  Landmark,
  Save,
  RotateCcw,
  CheckCircle,
  Inbox,
  Download,
  DollarSign
} from 'lucide-react';
import {
  Language,
  Currency,
  AgencyInformation,
  Destination,
  TravelPackage,
  UmrahPackage,
  BookingRequest
} from '../types';
import { getTranslation } from '../i18n/translations';
import { formatCurrency } from '../utils/formatters';

interface CmsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  agencyInfo: AgencyInformation;
  onUpdateAgencyInfo: (info: AgencyInformation) => void;
  destinations: Destination[];
  onUpdateDestinations: (d: Destination[]) => void;
  umrahPackages: UmrahPackage[];
  onUpdateUmrahPackages: (u: UmrahPackage[]) => void;
  bookingRequests: BookingRequest[];
  onUpdateBookingStatus: (bookingId: string, status: BookingRequest['status']) => void;
  onResetDefaults: () => void;
}

export const CmsManagerModal: React.FC<CmsManagerModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  agencyInfo,
  onUpdateAgencyInfo,
  destinations,
  onUpdateDestinations,
  umrahPackages,
  onUpdateUmrahPackages,
  bookingRequests,
  onUpdateBookingStatus,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);
  const isRtl = language === 'ar';
  const [activeTab, setActiveTab] = useState<'agency' | 'destinations' | 'umrah' | 'bookings'>('agency');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Editable local copies
  const [editableAgency, setEditableAgency] = useState<AgencyInformation>({ ...agencyInfo });
  const [editableDests, setEditableDests] = useState<Destination[]>([...destinations]);
  const [editableUmrah, setEditableUmrah] = useState<UmrahPackage[]>([...umrahPackages]);

  const handleSaveAgency = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAgencyInfo(editableAgency);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveDestPrice = (id: string, newPrice: number) => {
    const updated = editableDests.map((d) => (d.id === id ? { ...d, starting_price_dzd: newPrice } : d));
    setEditableDests(updated);
    onUpdateDestinations(updated);
  };

  const handleSaveUmrahPrice = (id: string, newPrice: number) => {
    const updated = editableUmrah.map((u) => (u.id === id ? { ...u, price_dzd: newPrice } : u));
    setEditableUmrah(updated);
    onUpdateUmrahPackages(updated);
  };

  const exportCmsJson = () => {
    const cmsExport = {
      agency: editableAgency,
      destinations: editableDests,
      umrah: editableUmrah,
      bookings: bookingRequests,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cmsExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `travel_planner_cms_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col text-slate-900"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">Travel Planner CMS & Data Control</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'ar'
                  ? 'لوحة تحكم وإدارة بيانات الوكالة، الأسعار بالدينار الجزائري، برامج العمرة والحجوزات'
                  : 'Console de gestion de l\'agence algérienne, tarifs en DA, forfaits Omra et réservations'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CMS Tabs */}
        <div className="flex items-center gap-2 p-3 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('agency')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'agency' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'ar' ? 'معلومات الوكالة والرخصة' : 'Agence & Coordonnées'}</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'destinations' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'ar' ? 'أسعار الوجهات (DZD)' : 'Tarifs Destinations (DA)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('umrah')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'umrah' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'ar' ? 'باقات العمرة والحرمين' : 'Forfaits Omra'}</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'bookings' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {language === 'ar' ? 'طلبات الحجز الواردة' : 'Réservations reçues'} ({bookingRequests.length})
            </span>
          </button>

          <div className="ms-auto flex items-center gap-2">
            <button
              onClick={exportCmsJson}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              title="Export CMS JSON"
            >
              <Download className="w-3 h-3 text-emerald-600" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onResetDefaults}
              className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
              title="Reset to default initial data"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {savedSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>{language === 'ar' ? 'تم حفظ التعديلات وتحديث الموقع فورياً بنجاح!' : 'Modifications enregistrées et publiées instantanément !'}</span>
            </div>
          )}

          {/* TAB 1: AGENCY & CONTACTS */}
          {activeTab === 'agency' && (
            <form onSubmit={handleSaveAgency} className="space-y-4">
              <h4 className="text-base font-black text-slate-900 mb-2">
                {language === 'ar' ? 'بيانات الوكالة الرسمية في الجزائر' : 'Coordonnées officielles de l\'agence'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'العنوان الرسمي (بالفرنسية)' : 'Adresse officielle'}
                  </label>
                  <input
                    type="text"
                    value={editableAgency.official_address}
                    onChange={(e) => setEditableAgency({ ...editableAgency, official_address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'العنوان بالعربية' : 'Adresse en Arabe'}
                  </label>
                  <input
                    type="text"
                    value={editableAgency.address_ar}
                    onChange={(e) => setEditableAgency({ ...editableAgency, address_ar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'الهاتف المباشر' : 'Téléphone direct'}
                  </label>
                  <input
                    type="text"
                    value={editableAgency.phone}
                    onChange={(e) => setEditableAgency({ ...editableAgency, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'رقم الواتساب (WhatsApp)' : 'Numéro WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={editableAgency.whatsapp}
                    onChange={(e) => setEditableAgency({ ...editableAgency, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'رقم رخصة السياحة' : 'N° Licence Tourisme'}
                  </label>
                  <input
                    type="text"
                    value={editableAgency.license_number}
                    onChange={(e) => setEditableAgency({ ...editableAgency, license_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Google Plus Code
                  </label>
                  <input
                    type="text"
                    value={editableAgency.plus_code}
                    onChange={(e) => setEditableAgency({ ...editableAgency, plus_code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={editableAgency.google_maps_url}
                    onChange={(e) => setEditableAgency({ ...editableAgency, google_maps_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold font-mono"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حفظ ونشر التعديلات' : 'Enregistrer et publier'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: DESTINATIONS PRICES */}
          {activeTab === 'destinations' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-slate-900 mb-2">
                {language === 'ar' ? 'تعديل الأسعار الابتدائية للوجهات بالدينار الجزائري (DZD)' : 'Gestion des tarifs de base (Dinar Algérien)'}
              </h4>

              <div className="space-y-3">
                {editableDests.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={dest.image} alt={dest.name_en} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">
                          {language === 'ar' ? dest.name_ar : dest.name_fr} ({dest.airport})
                        </h5>
                        <span className="text-slate-500">{dest.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500">{t.starts_from}:</span>
                      <input
                        type="number"
                        step="1000"
                        value={dest.starting_price_dzd}
                        onChange={(e) => handleSaveDestPrice(dest.id, Number(e.target.value))}
                        className="w-32 px-2.5 py-1.5 rounded-lg border border-slate-300 font-black text-emerald-700 text-sm font-mono text-end"
                      />
                      <span className="font-bold text-slate-700">DZD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UMRAH PACKAGES */}
          {activeTab === 'umrah' && (
            <div className="space-y-4">
              <h4 className="text-base font-black text-slate-900 mb-2">
                {language === 'ar' ? 'إدارة باقات العمرة والفنادق' : 'Gestion des programmes Omra'}
              </h4>

              <div className="space-y-4">
                {editableUmrah.map((u) => (
                  <div key={u.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <h5 className="font-black text-slate-900 text-sm">
                        {language === 'ar' ? u.title_ar : u.title_fr}
                      </h5>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-500">سعر الباقة:</span>
                        <input
                          type="number"
                          step="5000"
                          value={u.price_dzd}
                          onChange={(e) => handleSaveUmrahPrice(u.id, Number(e.target.value))}
                          className="w-32 px-2.5 py-1.5 rounded-lg border border-slate-300 font-black text-amber-700 text-sm font-mono text-end"
                        />
                        <span className="font-bold">DZD</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      <div>
                        <span className="font-bold block text-slate-800">فندق مكة:</span>
                        <span>{u.makkah_hotel} ({u.makkah_distance_to_haram})</span>
                      </div>
                      <div>
                        <span className="font-bold block text-slate-800">فندق المدينة:</span>
                        <span>{u.madinah_hotel} ({u.madinah_distance_to_masjid_an_nabawi})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BOOKING REQUESTS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'طلبات الحجز المستلمة من الزوار' : 'Demandes de réservation clients'}
                </h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  {bookingRequests.length} {language === 'ar' ? 'طلبات' : 'demandes'}
                </span>
              </div>

              {bookingRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p>{language === 'ar' ? 'لا توجد طلبات حجز بعد. جرب إرسال حجز تجريبي عبر الموقع!' : 'Aucune demande pour le moment.'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookingRequests.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                            {b.reference_number}
                          </span>
                          <span className="font-black text-sm text-slate-900">{b.full_name}</span>
                        </div>

                        <select
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                          className="font-bold rounded-lg px-2 py-1 border border-slate-300 text-xs cursor-pointer"
                        >
                          <option value="pending">قيد المتابعة (Pending)</option>
                          <option value="contacted">تم التواصل (Contacted)</option>
                          <option value="confirmed">مؤكد (Confirmed)</option>
                          <option value="cancelled">ملغى (Cancelled)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 pt-1">
                        <div>
                          <span className="font-bold block text-slate-800">الهاتف:</span>
                          <span dir="ltr" className="font-mono font-semibold text-emerald-700">{b.phone_algeria}</span>
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">الوجهة:</span>
                          <span>{b.destination}</span>
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">المسافرون:</span>
                          <span>{b.travelers_adults} كبار / {b.travelers_children} أطفال</span>
                        </div>
                        <div>
                          <span className="font-bold block text-slate-800">طريقة التواصل:</span>
                          <span className="capitalize font-semibold">{b.contact_method}</span>
                        </div>
                      </div>

                      {b.special_requests && (
                        <p className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200">
                          <strong>ملاحظات:</strong> {b.special_requests}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Travel Planner Algeria · CMS Storage Layer Ready
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
