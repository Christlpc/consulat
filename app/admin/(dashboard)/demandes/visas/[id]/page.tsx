import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import ApplicationActions from '@/components/admin/ApplicationActions';
import StatusBadge from '@/components/StatusBadge';
import Image from 'next/image';

async function getApplication(id: string) {
  const application = await prisma.visaApplication.findUnique({
    where: { id },
  });

  if (!application) {
    notFound();
  }

  return application;
}

export default async function VisaDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id);

  const visaTypeLabels: Record<string, string> = {
    TOURIST: 'Touristique',
    BUSINESS: 'Affaires',
    FAMILY_VISIT: 'Visite familiale',
    TRANSIT: 'Transit',
    STUDENT: 'Étudiant',
    WORK: 'Travail',
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/demandes/visas"
            className="btn bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demande de Visa</h1>
            <p className="text-gray-600 mt-1">
              Référence: <span className="font-mono font-semibold">{application.referenceNumber}</span>
            </p>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <ApplicationActions
          applicationId={application.id}
          applicationType="visa"
          currentStatus={application.status}
        />
      </div>

      {/* Informations personnelles */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-3">
          Informations personnelles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Nom complet</p>
              <p className="font-medium text-gray-900">
                {application.firstName} {application.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">
                <a href={`mailto:${application.email}`} className="text-congo-600 hover:underline">
                  {application.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium text-gray-900">{application.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Nationalité</p>
              <p className="font-medium text-gray-900">{application.nationality}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Date de naissance</p>
              <p className="font-medium text-gray-900">
                {format(new Date(application.dateOfBirth), 'dd MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Lieu de naissance</p>
              <p className="font-medium text-gray-900">{application.placeOfBirth}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Numéro de passeport</p>
              <p className="font-medium text-gray-900">{application.passportNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Détails de la demande */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-3">
          Détails de la demande
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Type de visa</p>
            <p className="font-medium text-gray-900">
              {visaTypeLabels[application.visaType] || application.visaType}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date de soumission</p>
            <p className="font-medium text-gray-900">
              {format(new Date(application.submittedAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date d'arrivée</p>
            <p className="font-medium text-gray-900">
              {format(new Date(application.arrivalDate), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date de départ</p>
            <p className="font-medium text-gray-900">
              {format(new Date(application.departureDate), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-2">Adresse en Tunisie</p>
            <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded">
              {application.addressInTunisia}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-2">Motif du voyage</p>
            <p className="font-medium text-gray-900 bg-gray-50 p-3 rounded whitespace-pre-wrap">
              {application.purposeOfTravel}
            </p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-3">
          Documents
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {application.photoUrl && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Photo d'identité</p>
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={application.photoUrl}
                  alt="Photo"
                  fill
                  className="object-cover"
                />
              </div>
              <a
                href={application.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-congo-600 hover:underline text-sm mt-2 inline-block"
              >
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          )}

          {application.passportCopyUrl && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Copie du passeport</p>
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={application.passportCopyUrl}
                  alt="Passeport"
                  fill
                  className="object-cover"
                />
              </div>
              <a
                href={application.passportCopyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-congo-600 hover:underline text-sm mt-2 inline-block"
              >
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          )}

          {application.additionalDocs && application.additionalDocs.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-2">Documents supplémentaires</p>
              <div className="space-y-2">
                {application.additionalDocs.map((doc, index) => (
                  <a
                    key={index}
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-congo-600 hover:underline">Document {index + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Note de statut */}
      {application.statusNote && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Note</h3>
          <p className="text-yellow-800 whitespace-pre-wrap">{application.statusNote}</p>
        </div>
      )}
    </div>
  );
}
