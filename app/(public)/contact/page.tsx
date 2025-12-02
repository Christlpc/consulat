'use client';

import { useState } from 'react';
import { Building2, PhoneCall, MessageCircle, CalendarClock, Users } from 'lucide-react';
import FormField from '@/components/FormField';
import TextAreaField from '@/components/TextAreaField';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Contact et Accès
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Retrouvez toutes les informations nécessaires pour nous joindre ou nous rendre visite.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-congo-50 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-congo-500 to-congo-600 rounded-full flex items-center justify-center shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Adresse</h3>
                <p className="text-gray-600">
                5 Rue Baalabek 2037<br />
                El Menzah 5<br />
                  Tunis, Tunisie
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-congo-50 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-congo-500 to-congo-600 rounded-full flex items-center justify-center shadow-lg">
                <PhoneCall className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Téléphone</h3>
                <p className="text-gray-600">+216 71 860 123</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-congo-50 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-congo-500 to-congo-600 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contact@consulatcongo.tn</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-congo-50 transition-colors">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-congo-500 to-congo-600 rounded-full flex items-center justify-center shadow-lg">
                <CalendarClock className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Horaires d'ouverture</h3>
                <div className="text-gray-600 space-y-1">
                  <p>Lundi - Vendredi : 09:00 - 12:00</p>
                  <p>Samedi - Dimanche : Fermé</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Fermé les jours fériés tunisiens et congolais.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-congo-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=5+Rue+Baalabek+2037+El+Menzah+5+Tunis+Tunisie&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Localisation du Consulat Général de la République du Congo en Tunisie"
              ></iframe>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Formulaire de Contact
            </h2>
            <p className="text-gray-600 mb-6">
              Pour toute demande, veuillez remplir le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.
            </p>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                Votre message a été envoyé avec succès !
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Nom complet"
                name="name"
                type="text"
                required
                placeholder="Votre nom complet"
              />

              <FormField
                label="Adresse email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />

              <FormField
                label="Sujet"
                name="subject"
                type="text"
                required
                placeholder="Objet de votre message"
              />

              <TextAreaField
                label="Votre message"
                name="message"
                required
                placeholder="Écrivez votre message ici..."
                rows={6}
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading ? (
                  <>
                    <span className="spinner mr-2" />
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


