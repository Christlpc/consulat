'use client';

import { useState } from 'react';
import FormField from '@/components/FormField';
import FileUpload from '@/components/FileUpload';
import { Send } from 'lucide-react';

export default function ConsularCardPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: 'Congo',
    passportNumber: '',
    addressInTunisia: '',
    profession: '',
    photo: null as File | null,
    passportCopy: null as File | null,
    proofOfResidence: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (value !== null) {
          data.append(key, value.toString());
        }
      });

      const response = await fetch('/api/applications/consular-card', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20">
        <div className="container max-w-2xl">
          <div className="text-center bg-green-50 border-2 border-green-500 rounded-xl p-12">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande envoyée avec succès !
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Votre demande de carte consulaire a été enregistrée.
            </p>
            <a href="/" className="btn btn-primary btn-lg inline-flex">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
              Demande de Carte Consulaire
            </h1>
            <p className="text-gray-600">
              Inscription au registre consulaire pour les ressortissants congolais résidant en Tunisie.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Adresse email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Téléphone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Date de naissance"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Lieu de naissance"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <FormField
              label="Numéro de passeport"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              required
            />

            <FormField
              label="Adresse en Tunisie"
              name="addressInTunisia"
              value={formData.addressInTunisia}
              onChange={handleInputChange}
              required
            />

            <FormField
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
            />

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents requis</h3>
              <div className="space-y-6">
                <FileUpload
                  label="Photo d'identité"
                  accept=".jpg,.jpeg,.png"
                  required
                  onChange={(file) => handleFileChange('photo', file)}
                />
                <FileUpload
                  label="Copie du passeport"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  onChange={(file) => handleFileChange('passportCopy', file)}
                />
                <FileUpload
                  label="Justificatif de domicile"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  helperText="Facture d'électricité, contrat de location, etc."
                  onChange={(file) => handleFileChange('proofOfResidence', file)}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
              >
                {loading ? (
                  <>
                    <span className="spinner mr-2" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Soumettre la demande
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


