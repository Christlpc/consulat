'use client';

import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Consulat Général de la République du Congo en Tunisie',
    contactEmail: 'contact@consulatcongo.tn',
    contactPhone: '+216 71 860 123',
    address: 'Rue du Lac Léman, Immeuble Lac 2000, Les Berges du Lac 1053, Tunis, Tunisie',
    openingHours: 'Lundi - Vendredi: 9h00 - 16h00',
    appointmentEmail: 'rdv@consulatcongo.tn',
    emergencyPhone: '+216 71 860 124',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          const settingsObj: any = {};
          data.settings.forEach((setting: any) => {
            if (setting.key === 'site_name') settingsObj.siteName = setting.value;
            if (setting.key === 'contact_email') settingsObj.contactEmail = setting.value;
            if (setting.key === 'contact_phone') settingsObj.contactPhone = setting.value;
            if (setting.key === 'address') settingsObj.address = setting.value;
            if (setting.key === 'opening_hours') settingsObj.openingHours = setting.value;
            if (setting.key === 'appointment_email') settingsObj.appointmentEmail = setting.value;
            if (setting.key === 'emergency_phone') settingsObj.emergencyPhone = setting.value;
          });
          setSettings((prev) => ({ ...prev, ...settingsObj }));
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_name: settings.siteName,
          contact_email: settings.contactEmail,
          contact_phone: settings.contactPhone,
          address: settings.address,
          opening_hours: settings.openingHours,
          appointment_email: settings.appointmentEmail,
          emergency_phone: settings.emergencyPhone,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres du Site</h1>
        <p className="text-gray-600 mt-1">
          Configurer les informations générales du consulat
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="text-green-500">✓</span>
          Paramètres enregistrés avec succès
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
            Informations Générales
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du site
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de contact
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <textarea
              rows={3}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Horaires et services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
            Horaires et Services
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horaires d'ouverture
            </label>
            <input
              type="text"
              value={settings.openingHours}
              onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email pour rendez-vous
              </label>
              <input
                type="email"
                value={settings.appointmentEmail}
                onChange={(e) => setSettings({ ...settings, appointmentEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone d'urgence
              </label>
              <input
                type="tel"
                value={settings.emergencyPhone}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-congo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Réinitialiser
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Enregistrer les paramètres
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

