import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Créer un utilisateur administrateur
    const hashedPassword = await hash('CongoAdmin2024!', 12);
    
    await prisma.user.upsert({
      where: { email: 'admin@consulatcongo.tn' },
      update: {},
      create: {
        email: 'admin@consulatcongo.tn',
        name: 'Administrateur',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json(
      { message: 'Base de données initialisée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors du seed:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation' },
      { status: 500 }
    );
  }
}


