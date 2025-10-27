import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateReferenceNumber() {
  const prefix = 'LP';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      dateOfBirth: new Date(formData.get('dateOfBirth') as string),
      placeOfBirth: formData.get('placeOfBirth') as string,
      nationality: formData.get('nationality') as string,
      reason: formData.get('reason') as string,
      destination: formData.get('destination') as string,
      travelDate: new Date(formData.get('travelDate') as string),
      photoUrl: '/uploads/temp-photo.jpg',
      identityProof: '/uploads/temp-proof.pdf',
      additionalDocs: [],
      referenceNumber: generateReferenceNumber(),
    };

    const application = await prisma.travelDocumentApplication.create({
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
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}


