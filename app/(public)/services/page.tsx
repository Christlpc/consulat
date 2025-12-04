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
    <div className="py-24 md:py-32">
      <div className="container max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-20 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Nos Services Consulaires
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Initiez vos demandes de documents consulaires en ligne. Trouvez la procédure dont vous avez besoin et suivez les étapes pour compléter votre démarche.
          </p>
        </div>

        {/* Liste des services - 3 en haut, 2 en bas */}
        <div className="space-y-6 mb-16">
          {/* Première ligne : 3 cartes */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          {/* Deuxième ligne : 2 cartes centrées */}
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
              {services.slice(3, 5).map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </div>

        {/* Section informations complémentaires */}
        <div className="bg-white rounded-2xl p-10 md:p-12 border border-gray-200 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8 leading-tight">
            Informations Importantes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <span className="flex-shrink-0 w-8 h-8 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="text-gray-700 leading-relaxed">Tous les documents doivent être en format PDF, JPG ou PNG (max 5Mo par fichier)</p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <span className="flex-shrink-0 w-8 h-8 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="text-gray-700 leading-relaxed">Vous recevrez un numéro de référence pour suivre votre demande</p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <span className="flex-shrink-0 w-8 h-8 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="text-gray-700 leading-relaxed">Les délais de traitement varient selon le type de demande (généralement 5 à 15 jours ouvrables)</p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <span className="flex-shrink-0 w-8 h-8 bg-congo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <p className="text-gray-700 leading-relaxed">Un email de confirmation vous sera envoyé à chaque étape du traitement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


