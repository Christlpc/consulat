import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const settings = await prisma.siteSetting.findMany();

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const data = await request.json();

    // Mettre à jour chaque paramètre
    const updates = Object.entries(data).map(([key, value]) => {
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as string },
        create: {
          key,
          value: value as string,
          description: getDescriptionForKey(key),
        },
      });
    });

    await Promise.all(updates);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des paramètres' },
      { status: 500 }
    );
  }
}

function getDescriptionForKey(key: string): string {
  const descriptions: Record<string, string> = {
    site_name: 'Nom du site',
    contact_email: 'Email de contact',
    contact_phone: 'Téléphone de contact',
    address: 'Adresse du consulat',
    opening_hours: 'Horaires d\'ouverture',
    appointment_email: 'Email pour rendez-vous',
    emergency_phone: 'Téléphone d\'urgence',
  };
  return descriptions[key] || '';
}

