'use client';

import { useState } from 'react';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import FileUpload from '@/components/FileUpload';
import { Send } from 'lucide-react';

const documentTypes = [
  { value: 'ACTE_NAISSANCE', label: 'Acte de naissance' },
  { value: 'ACTE_MARIAGE', label: 'Acte de mariage' },
  { value: 'ACTE_DECES', label: 'Acte de décès' },
  { value: 'CERTIFICAT_CELIBAT', label: 'Certificat de célibat' },
  { value: 'CERTIFICAT_VIE', label: 'Certificat de vie' },
];

export default function CivilStatusPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    documentType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    placeOfBirth: '',
    fatherName: '',
    motherName: '',
    purpose: '',
    numberOfCopies: '1',
    supportingDocs: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(file => data.append(key, file));
        } else if (value !== null) {
          data.append(key, value.toString());
        }
      });

      const response = await fetch('/api/applications/civil-status', {
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
              Votre demande d'acte d'état civil a été enregistrée.
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
              Demande d'Acte d'État Civil
            </h1>
            <p className="text-gray-600">
              Demandez vos actes de naissance, mariage, décès ou certificats divers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectField
              label="Type de document"
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
              options={documentTypes}
              required
            />

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

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="Nom du père"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
              <FormField
                label="Nom de la mère"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </div>

            <FormField
              label="Motif de la demande"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="Ex: Mariage, études, immigration..."
              required
            />

            <FormField
              label="Nombre de copies"
              name="numberOfCopies"
              type="number"
              min="1"
              max="5"
              value={formData.numberOfCopies}
              onChange={handleInputChange}
              required
            />

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


