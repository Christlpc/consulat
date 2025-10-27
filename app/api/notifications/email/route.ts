import { NextResponse } from 'next/server';

const statusLabels: Record<string, string> = {
  APPROVED: 'Approuvée',
  REJECTED: 'Rejetée',
  READY: 'Prête pour retrait',
  IN_REVIEW: 'En cours d\'examen',
  PENDING: 'En attente',
};

const typeLabels: Record<string, string> = {
  visa: 'Demande de Visa',
  'consular-card': 'Demande de Carte Consulaire',
  'travel-document': 'Demande de Laissez-Passer',
  'civil-status': 'Demande d\'Acte d\'État Civil',
  'consular-document': 'Demande d\'Acte Consulaire',
};

export async function POST(request: Request) {
  try {
    const { to, type, applicationData } = await request.json();

    // Pour le moment, on log simplement l'email
    // Dans un environnement de production, vous utiliseriez un service comme SendGrid, Mailgun, etc.
    console.log('📧 Email à envoyer:');
    console.log('To:', to);
    console.log('Subject:', `Mise à jour de votre ${typeLabels[applicationData.type]}`);
    console.log('---');
    console.log(`Bonjour ${applicationData.firstName} ${applicationData.lastName},`);
    console.log('');
    console.log(`Votre ${typeLabels[applicationData.type]} (Référence: ${applicationData.referenceNumber}) a été ${statusLabels[applicationData.status]}.`);
    
    if (applicationData.statusNote) {
      console.log('');
      console.log('Note:', applicationData.statusNote);
    }

    if (applicationData.status === 'READY') {
      console.log('');
      console.log('Vous pouvez venir retirer votre document au consulat aux heures d\'ouverture.');
      console.log('');
      console.log('Horaires: Lundi - Vendredi, 9h00 - 16h00');
      console.log('Adresse: Rue du Lac Léman, Immeuble Lac 2000, Les Berges du Lac 1053, Tunis');
    }

    if (applicationData.status === 'REJECTED') {
      console.log('');
      console.log('Pour plus d\'informations, veuillez nous contacter.');
    }

    console.log('');
    console.log('Cordialement,');
    console.log('Le Consulat Général de la République du Congo en Tunisie');
    console.log('---');

    // TODO: Implémenter l'envoi réel d'email avec un service SMTP
    // Exemple avec Nodemailer:
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({...});

    return NextResponse.json({ success: true, message: 'Email envoyé (simulé)' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}

