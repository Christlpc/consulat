import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import {
  Plane,
  CreditCard,
  FileText,
  Award,
  ShieldCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    title: 'Demande de Visa',
    description: 'Pour tourisme, affaires, études ou travail. Processus simplifié et suivi en ligne.',
    icon: Plane,
    href: '/services/visa',
  },
  {
    title: 'Carte Consulaire',
    description: 'Inscription au registre consulaire pour les ressortissants congolais en Tunisie.',
    icon: CreditCard,
    href: '/services/carte-consulaire',
  },
  {
    title: 'Laissez-Passer',
    description: 'Document de voyage temporaire en cas de perte ou vol de passeport.',
    icon: ShieldCheck,
    href: '/services/laissez-passer',
  },
  {
    title: 'Actes d\'État Civil',
    description: 'Acte de naissance, mariage, décès et certificats divers.',
    icon: FileText,
    href: '/services/etat-civil',
  },
  {
    title: 'Actes Consulaires',
    description: 'Légalisation, attestations, procurations et autres actes officiels.',
    icon: Award,
    href: '/services/actes-consulaires',
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Image de fond pour toute la page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bzv.jpg"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-congo-600 via-congo-500 to-congo-700 text-white overflow-hidden">
        {/* Image de fond pour la section Hero */}
        <div className="absolute inset-0">
          <Image
            src="/bzv.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-congo-600/75 via-congo-500/75 to-congo-700/75"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="container py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Services Consulaires en Ligne</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Consulat Général de la République du Congo en Tunisie
              </h1>
              <p className="text-xl text-congo-50 max-w-xl">
                Au service de la communauté congolaise en Tunisie et des ressortissants étrangers. Services consulaires modernes et efficaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" className="btn btn-lg bg-white text-congo-600 hover:bg-gray-100">
                  <Calendar className="h-5 w-5 mr-2" />
                  Prendre Rendez-vous
                </Link>
                <Link href="/contact" className="btn btn-lg bg-congo-700 hover:bg-congo-800 text-white">
                  Nous Contacter
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
            <div className="relative animate-fadeInUp animation-delay-200">
              <div className="relative bg-white/10 rounded-2xl p-8 border border-white/20">
                <Image
                  src="/armoirie-Congo.png"
                  alt="Armoiries de la République du Congo"
                  width={400}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gold-500 text-congo-900 px-6 py-3 rounded-lg shadow-xl font-bold">
                  Unité • Travail • Progrès
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Services Consulaires
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accédez à tous les services consulaires en ligne. Simple, rapide et sécurisé.
            </p>
          </div>

          <div className="space-y-6">
            {/* Première ligne : 3 cartes */}
            <div className="grid md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service, index) => (
                <div
                  key={service.title}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
            {/* Deuxième ligne : 2 cartes centrées */}
            <div className="flex justify-center">
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
                {services.slice(3, 5).map((service, index) => (
                  <div
                    key={service.title}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-congo-50 to-white rounded-xl border border-congo-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-congo-500 text-white rounded-full mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Horaires d'ouverture
              </h3>
              <p className="text-gray-600">
                Lundi - Vendredi<br />
                9h - 13h
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-gold-50 to-white rounded-xl border border-gold-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 text-congo-900 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Service Sécurisé
              </h3>
              <p className="text-gray-600">
                Vos données personnelles sont protégées et confidentielles
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-congo-50 to-white rounded-xl border border-congo-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-congo-500 text-white rounded-full mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Suivi en Ligne
              </h3>
              <p className="text-gray-600">
                Suivez l'état de votre demande en temps réel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-congo text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Besoin d'assistance ?
            </h2>
            <p className="text-xl text-congo-50 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos démarches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-lg bg-white text-congo-600 hover:bg-gray-100"
              >
                Contactez-nous
              </Link>
              <Link
                href="/faq"
                className="btn btn-lg bg-congo-700 hover:bg-congo-800 text-white border-2 border-white/20"
              >
                Consulter la FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


