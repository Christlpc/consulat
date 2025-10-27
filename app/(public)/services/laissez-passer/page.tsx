'use client';

import { useState } from 'react';
import FormField from '@/components/FormField';
import TextAreaField from '@/components/TextAreaField';
import FileUpload from '@/components/FileUpload';
import { Send } from 'lucide-react';

export default function TravelDocumentPage() {
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
    reason: '',
    destination: '',
    travelDate: '',
    photo: null as File | null,
    identityProof: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      const response = await fetch('/api/applications/travel-document', {
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
              Votre demande de laissez-passer a été enregistrée.
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
              Demande de Laissez-Passer
            </h1>
            <p className="text-gray-600">
              Document de voyage temporaire en cas de perte ou vol de passeport.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2">Conditions d'obtention</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Perte, vol ou destruction de votre passeport</li>
              <li>• Expiration du passeport avec voyage urgent</li>
              <li>• Déclaration de perte auprès des autorités locales requise</li>
            </ul>
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

            <TextAreaField
              label="Motif de la demande"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Expliquez pourquoi vous avez besoin d'un laissez-passer..."
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Pays de destination"
                required
              />
              <FormField
                label="Date de voyage prévue"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents requis</h3>
              <div className="space-y-6">
                <FileUpload
                  label="Photo d'identité récente"
                  accept=".jpg,.jpeg,.png"
                  required
                  onChange={(file) => handleFileChange('photo', file)}
                />
                <FileUpload
                  label="Preuve d'identité"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  helperText="Déclaration de perte, copie de l'ancien passeport, ou autre document d'identité"
                  onChange={(file) => handleFileChange('identityProof', file)}
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


