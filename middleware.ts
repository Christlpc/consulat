import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Le middleware n'a plus besoin de vérifier l'authentification
  // car le layout (dashboard) s'en charge pour les routes protégées
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/(dashboard)/:path*'],
};


