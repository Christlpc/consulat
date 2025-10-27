import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consulat Général de la République du Congo en Tunisie',
  description: 'Site officiel du Consulat Général de la République du Congo en Tunisie. Services consulaires en ligne : visas, cartes consulaires, actes d\'état civil.',
  keywords: 'Consulat Congo Tunisie, visa Congo, carte consulaire, actes état civil, services consulaires',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}


