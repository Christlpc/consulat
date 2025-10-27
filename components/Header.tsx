'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/a-propos' },
  {
    name: 'Services Consulaires',
    href: '/services',
    submenu: [
      { name: 'Demande de Visa', href: '/services/visa' },
      { name: 'Carte Consulaire', href: '/services/carte-consulaire' },
      { name: 'Laissez-Passer', href: '/services/laissez-passer' },
      { name: 'Actes d\'État Civil', href: '/services/etat-civil' },
      { name: 'Actes Consulaires', href: '/services/actes-consulaires' },
    ],
  },
  { name: 'Actualités', href: '/actualites' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/armoirie-Congo.png"
                alt="Armoiries de la République du Congo"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-congo-600">
                  République du Congo
                </div>
                <div className="text-xs text-gray-600">
                  Consulat Général en Tunisie
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-congo-600 transition-colors">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-congo-50 hover:text-congo-600 transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-congo-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/services" className="btn btn-primary btn-md">
              Prendre Rendez-vous
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeSubmenu === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/services"
                className="btn btn-primary btn-md w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prendre Rendez-vous
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

