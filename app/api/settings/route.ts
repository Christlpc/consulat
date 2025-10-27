import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const data = await request.json();

    // Mise à jour des paramètres
    const settingsToUpdate = [
      { key: 'site_name', value: data.siteName },
      { key: 'contact_email', value: data.contactEmail },
      { key: 'contact_phone', value: data.contactPhone },
      { key: 'address', value: data.address },
      { key: 'opening_hours', value: data.openingHours },
      { key: 'appointment_email', value: data.appointmentEmail },
      { key: 'emergency_phone', value: data.emergencyPhone },
    ];

    for (const setting of settingsToUpdate) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          key: setting.key,
          value: setting.value,
          description: setting.key.replace('_', ' '),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des paramètres' },
      { status: 500 }
    );
  }
}

