import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-congo-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          <Home className="h-5 w-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}


