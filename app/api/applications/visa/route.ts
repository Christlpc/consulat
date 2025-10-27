import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateReferenceNumber() {
  const prefix = 'VISA';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extraire les données
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      nationality: formData.get('nationality') as string,
      passportNumber: formData.get('passportNumber') as string,
      dateOfBirth: new Date(formData.get('dateOfBirth') as string),
      placeOfBirth: formData.get('placeOfBirth') as string,
      visaType: formData.get('visaType') as any,
      purposeOfTravel: formData.get('purposeOfTravel') as string,
      arrivalDate: new Date(formData.get('arrivalDate') as string),
      departureDate: new Date(formData.get('departureDate') as string),
      addressInTunisia: formData.get('addressInTunisia') as string || null,
      photoUrl: '/uploads/temp-photo.jpg', // À remplacer par l'upload réel
      passportCopyUrl: '/uploads/temp-passport.pdf', // À remplacer par l'upload réel
      additionalDocs: [],
      referenceNumber: generateReferenceNumber(),
    };

    // Créer la demande
    const application = await prisma.visaApplication.create({
      data,
    });

    return NextResponse.json(
      {
        message: 'Demande créée avec succès',
        referenceNumber: application.referenceNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}


