import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const footerNavigation = {
  services: [
    { name: 'Demande de Visa', href: '/services/visa' },
    { name: 'Carte Consulaire', href: '/services/carte-consulaire' },
    { name: 'Laissez-Passer', href: '/services/laissez-passer' },
    { name: 'Actes d\'État Civil', href: '/services/etat-civil' },
  ],
  informations: [
    { name: 'Accueil', href: '/' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Conditions d\'utilisation', href: '/conditions' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informations Consulat */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/armoirie-Congo.png"
                alt="Armoiries"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div>
                <div className="text-white font-bold text-lg">
                  Consulat du Congo
                </div>
                <div className="text-xs">en Tunisie</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Au service de la communauté congolaise et des ressortissants désirant se rendre en République du Congo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-congo-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-congo-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-congo-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-congo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Informations
            </h3>
            <ul className="space-y-2">
              {footerNavigation.informations.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-congo-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-congo-400 flex-shrink-0 mt-0.5" />
                <span>Rue du Lac Léman, Immeuble Lac 2000, Les Berges du Lac 1053, Tunis, Tunisie</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-congo-400 flex-shrink-0" />
                <span>+216 71 860 123</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-congo-400 flex-shrink-0" />
                <span>contact@consulatcongo.tn</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-congo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Lundi - Vendredi : 09:00 - 16:00</div>
                  <div>Samedi - Dimanche : Fermé</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Consulat Général de la République du Congo en Tunisie. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-congo-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

