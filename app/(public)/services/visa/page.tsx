'use client';

import { useState } from 'react';
import FormStepper from '@/components/FormStepper';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import TextAreaField from '@/components/TextAreaField';
import FileUpload from '@/components/FileUpload';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const steps = [
  { id: 1, name: 'Informations personnelles' },
  { id: 2, name: 'Détails du voyage' },
  { id: 3, name: 'Documents' },
  { id: 4, name: 'Récapitulatif' },
];

const visaTypes = [
  { value: 'TOURISME', label: 'Tourisme' },
  { value: 'AFFAIRES', label: 'Affaires' },
  { value: 'ETUDES', label: 'Études' },
  { value: 'TRAVAIL', label: 'Travail' },
  { value: 'TRANSIT', label: 'Transit' },
];

export default function VisaApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Étape 1
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    placeOfBirth: '',
    // Étape 2
    visaType: '',
    purposeOfTravel: '',
    arrivalDate: '',
    departureDate: '',
    addressInTunisia: '',
    // Étape 3
    photo: null as File | null,
    passportCopy: null as File | null,
    additionalDocs: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Créer FormData pour l'upload de fichiers
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (value !== null) {
          data.append(key, value.toString());
        }
      });

      const response = await fetch('/api/applications/visa', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setCurrentStep(steps.length + 1);
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
              Votre demande de visa a été enregistrée. Vous recevrez un email de confirmation avec votre numéro de référence.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Délai de traitement estimé : 7 à 15 jours ouvrables
              </p>
              <a href="/" className="btn btn-primary btn-lg inline-flex">
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
              Demande de Visa
            </h1>
            <p className="text-gray-600">
              Remplissez le formulaire ci-dessous pour votre demande de visa pour le Congo.
            </p>
          </div>

          {/* Stepper */}
          <FormStepper steps={steps} currentStep={currentStep} />

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-12">
            {/* Étape 1 : Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations personnelles
                </h2>
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
                    label="Nationalité"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Numéro de passeport"
                    name="passportNumber"
                    value={formData.passportNumber}
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
              </div>
            )}

            {/* Étape 2 : Détails du voyage */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Détails du voyage
                </h2>
                <SelectField
                  label="Type de visa"
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  options={visaTypes}
                  required
                />
                <TextAreaField
                  label="Objet du voyage"
                  name="purposeOfTravel"
                  value={formData.purposeOfTravel}
                  onChange={handleInputChange}
                  placeholder="Décrivez le motif de votre voyage..."
                  required
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Date d'arrivée prévue"
                    name="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Date de départ prévue"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <FormField
                  label="Adresse en Tunisie (optionnel)"
                  name="addressInTunisia"
                  value={formData.addressInTunisia}
                  onChange={handleInputChange}
                  placeholder="Hôtel, adresse de résidence, etc."
                />
              </div>
            )}

            {/* Étape 3 : Documents */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Documents requis
                </h2>
                <FileUpload
                  label="Photo d'identité"
                  accept=".jpg,.jpeg,.png"
                  maxSize={5}
                  required
                  helperText="Photo récente sur fond blanc"
                  onChange={(file) => handleFileChange('photo', file)}
                />
                <FileUpload
                  label="Copie du passeport"
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  required
                  helperText="Pages contenant votre photo et informations personnelles"
                  onChange={(file) => handleFileChange('passportCopy', file)}
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Documents supplémentaires selon le type de visa</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Tourisme :</strong> Réservation d'hôtel, billet d'avion retour</li>
                    <li>• <strong>Affaires :</strong> Lettre d'invitation de l'entreprise congolaise</li>
                    <li>• <strong>Études :</strong> Lettre d'admission de l'établissement</li>
                    <li>• <strong>Travail :</strong> Contrat de travail, autorisation de travail</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Étape 4 : Récapitulatif */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Récapitulatif de votre demande
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informations personnelles</h3>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.email} • {formData.phone}<br />
                      Passeport : {formData.passportNumber}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Détails du voyage</h3>
                    <p className="text-gray-600">
                      Type : {visaTypes.find(t => t.value === formData.visaType)?.label}<br />
                      Du {formData.arrivalDate} au {formData.departureDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Documents</h3>
                    <p className="text-gray-600">
                      ✓ Photo d'identité<br />
                      ✓ Copie du passeport
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important :</strong> Veuillez vérifier que toutes les informations sont correctes avant de soumettre votre demande.
                  </p>
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary btn-md"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Précédent
                </button>
              )}
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary btn-md ml-auto"
                >
                  Suivant
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-md ml-auto"
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
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


