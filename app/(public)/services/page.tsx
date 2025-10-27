import ServiceCard from '@/components/ServiceCard';
import {
  Plane,
  CreditCard,
  FileText,
  Award,
  ShieldCheck,
} from 'lucide-react';

const services = [
  {
    title: 'Demande de Visa',
    description: 'Obtenez votre visa pour le Congo. Pour tourisme, affaires, études ou travail.',
    icon: Plane,
    href: '/services/visa',
  },
  {
    title: 'Carte Consulaire',
    description: 'Inscription au registre consulaire pour tous les ressortissants congolais résidant en Tunisie.',
    icon: CreditCard,
    href: '/services/carte-consulaire',
  },
  {
    title: 'Laissez-Passer',
    description: 'Document de voyage temporaire en cas de perte, vol ou expiration de votre passeport.',
    icon: ShieldCheck,
    href: '/services/laissez-passer',
  },
  {
    title: 'Actes d\'État Civil',
    description: 'Demandez vos actes de naissance, mariage, décès ou certificats de vie.',
    icon: FileText,
    href: '/services/etat-civil',
  },
  {
    title: 'Actes Consulaires',
    description: 'Légalisation de documents, attestations, procurations et autres actes officiels.',
    icon: Award,
    href: '/services/actes-consulaires',
  },
];

export default function ServicesPage() {
  return (
    <div className="py-20">
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Formulaires et Procédures Consulaires
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Initiez vos demandes de documents consulaires en ligne. Trouvez la procédure dont vous avez besoin et suivez les étapes pour compléter votre démarche.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une procédure (ex: passeport, visa...)"
              className="input pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Liste des services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Section informations complémentaires */}
        <div className="mt-16 bg-congo-50 rounded-xl p-8 border border-congo-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Informations Importantes
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Tous les documents doivent être en format PDF, JPG ou PNG (max 5Mo par fichier)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Vous recevrez un numéro de référence pour suivre votre demande</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Les délais de traitement varient selon le type de demande (généralement 5 à 15 jours ouvrables)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Un email de confirmation vous sera envoyé à chaque étape du traitement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


