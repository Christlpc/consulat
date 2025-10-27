'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plane,
  CreditCard,
  Shield,
  Award,
} from 'lucide-react';

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Demandes',
    icon: FileText,
    children: [
      { name: 'Visas', href: '/admin/demandes/visas', icon: Plane },
      { name: 'Cartes consulaires', href: '/admin/demandes/cartes-consulaires', icon: CreditCard },
      { name: 'Laissez-passer', href: '/admin/demandes/laissez-passer', icon: Shield },
      { name: 'État civil', href: '/admin/demandes/etat-civil', icon: FileText },
      { name: 'Actes consulaires', href: '/admin/demandes/actes-consulaires', icon: Award },
    ],
  },
  { name: 'Actualités', href: '/admin/actualites', icon: Newspaper },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: Users },
  { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image
            src="/armoirie-Congo.png"
            alt="Armoiries"
            width={40}
            height={40}
          />
          <div>
            <div className="font-bold text-white text-sm">
              République du Congo
            </div>
            <div className="text-xs text-gray-400">Backoffice</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="mb-2">
                <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.name}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`sidebar-link ${
                      pathname === child.href ? 'active' : ''
                    }`}
                  >
                    <child.icon className="h-5 w-5" />
                    <span>{child.name}</span>
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${
                pathname === item.href ? 'active' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="border-t border-gray-800 p-6">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="sidebar-link w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}


