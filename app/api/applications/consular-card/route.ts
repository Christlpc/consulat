import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateReferenceNumber() {
  const prefix = 'CC';
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
      passportNumber: formData.get('passportNumber') as string,
      addressInTunisia: formData.get('addressInTunisia') as string,
      profession: formData.get('profession') as string,
      photoUrl: '/uploads/temp-photo.jpg',
      passportCopyUrl: '/uploads/temp-passport.pdf',
      proofOfResidence: '/uploads/temp-proof.pdf',
      referenceNumber: generateReferenceNumber(),
    };

    const application = await prisma.consularCardApplication.create({
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


