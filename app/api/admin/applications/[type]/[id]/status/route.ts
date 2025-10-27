import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Mapping des types vers les modèles Prisma
const modelMap: Record<string, any> = {
  visa: prisma.visaApplication,
  'consular-card': prisma.consularCardApplication,
  'travel-document': prisma.travelDocumentApplication,
  'civil-status': prisma.civilStatusDocument,
  'consular-document': prisma.consularDocument,
};

export async function PATCH(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { status, statusNote } = await request.json();
    const { type, id } = params;

    const model = modelMap[type];
    if (!model) {
      return NextResponse.json({ error: 'Type de demande invalide' }, { status: 400 });
    }

    // Mettre à jour le statut
    const updated = await model.update({
      where: { id },
      data: {
        status,
        statusNote: statusNote || null,
        updatedAt: new Date(),
      },
    });

    // Récupérer l'application complète pour l'email
    const application = await model.findUnique({
      where: { id },
    });

    // Envoyer une notification par email
    if (application && (status === 'APPROVED' || status === 'REJECTED' || status === 'READY')) {
      try {
        await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/notifications/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: application.email,
            type: 'status_update',
            applicationData: {
              type,
              referenceNumber: application.referenceNumber,
              status,
              statusNote,
              firstName: application.firstName,
              lastName: application.lastName,
            },
          }),
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // Continue même si l'email échoue
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du statut' },
      { status: 500 }
    );
  }
}

