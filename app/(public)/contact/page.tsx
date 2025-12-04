'use client';

import { useState } from 'react';
import { Phone, Mail, Clock, ArrowRight, MapPin } from 'lucide-react';
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
    <div className="py-24 md:py-32">
      <div className="container max-w-7xl">
        {/* En-tête */}
        <div className="mb-16 md:mb-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-3 leading-tight">
            Contact et Accès
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Retrouvez toutes les informations nécessaires pour nous joindre ou nous rendre visite.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Formulaire de contact - À gauche */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
              {success && (
                <div className="mb-8 p-5 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                  <p className="font-medium">Votre message a été envoyé avec succès !</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="NOM COMPLET"
                  name="name"
                  type="text"
                  required
                  placeholder="Votre nom complet"
                />

                <FormField
                  label="EMAIL"
                  name="email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                />

                <FormField
                  label="SUJET"
                  name="subject"
                  type="text"
                  required
                  placeholder="Objet de votre message"
                />

                <TextAreaField
                  label="MESSAGE"
                  name="message"
                  required
                  placeholder="Écrivez votre message ici..."
                  rows={5}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-congo-600 hover:bg-congo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="spinner mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Informations de contact et image - À droite */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Adresse */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Adresse</h3>
              </div>
              <p className="text-gray-600 text-xs ml-12">
                5 Rue Baalabek 2037<br />
                El Menzah 5<br />
                Tunis, Tunisie
              </p>
            </div>

            {/* Informations de contact en bas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Téléphone</h3>
                </div>
                <p className="text-gray-600 text-xs ml-12">+216 71 860 123</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Email</h3>
                </div>
                <p className="text-gray-600 text-xs ml-12">contact@consulatcongo.tn</p>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Horaires d'ouverture</h3>
              </div>
              <div className="text-gray-600 text-xs ml-12 space-y-1">
                <p>Lundi - Vendredi : 9h - 13h</p>
                <p>Samedi - Dimanche : Fermé</p>
                <p className="text-xs text-gray-500 mt-2">
                  Fermé les jours fériés tunisiens et congolais.
                </p>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-lg">
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
        </div>
      </div>
    </div>
  );
}


