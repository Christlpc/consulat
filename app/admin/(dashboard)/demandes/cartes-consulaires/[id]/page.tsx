import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Mail, User, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusBadge from '@/components/StatusBadge';
import ApplicationActions from '@/components/admin/ApplicationActions';

export const dynamic = 'force-dynamic';

export default async function ConsularCardDetailPage({ params }: { params: { id: string } }) {
  const application = await prisma.consularCardApplication.findUnique({
    where: { id: params.id },
  });

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/admin/demandes/cartes-consulaires" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demande de Carte Consulaire</h1>
            <p className="text-gray-600 mt-1">
              Référence: <span className="font-mono font-semibold">{application.referenceNumber}</span>
            </p>
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="print:hidden">
        <ApplicationActions
          applicationId={application.id}
          applicationType="consular-card"
          currentStatus={application.status}
        />
      </div>

      <div className="print:p-8">
        <div className="hidden print:block mb-8 text-center">
          <div className="text-2xl font-bold mb-2">RÉPUBLIQUE DU CONGO</div>
          <div className="text-xl font-semibold mb-4">CONSULAT GÉNÉRAL EN TUNISIE</div>
          <div className="text-lg font-bold mt-6 mb-4 underline">DEMANDE DE CARTE CONSULAIRE</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-congo-600" />
              Informations Personnelles
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">
                  {application.firstName} {application.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {format(new Date(application.dateOfBirth), 'dd MMMM yyyy', { locale: fr })}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Lieu de naissance</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.placeOfBirth}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Nationalité</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.nationality}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Numéro de passeport</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{application.passportNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Profession</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.profession}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-congo-600" />
              Coordonnées
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Adresse en Tunisie</dt>
                <dd className="mt-1 text-sm text-gray-900">{application.addressInTunisia}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-congo-600" />
              Informations Administratives
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Date de soumission</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {format(new Date(application.submittedAt), 'dd MMMM yyyy', { locale: fr })}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Statut actuel</dt>
                <dd className="mt-1">
                  <StatusBadge status={application.status} />
                </dd>
              </div>
              {application.statusNote && (
                <div className="md:col-span-3">
                  <dt className="text-sm font-medium text-gray-500">Note</dt>
                  <dd className="mt-1 text-sm text-gray-900 bg-yellow-50 p-3 rounded-lg">
                    {application.statusNote}
                  </dd>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Documents Joints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Photo d'identité</p>
              <a href={application.photoUrl} target="_blank" rel="noopener noreferrer" 
                 className="text-congo-600 hover:text-congo-800 text-sm flex items-center gap-2 print:hidden">
                <FileText className="h-4 w-4" />
                Voir le fichier
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Copie du passeport</p>
              <a href={application.passportCopyUrl} target="_blank" rel="noopener noreferrer"
                 className="text-congo-600 hover:text-congo-800 text-sm flex items-center gap-2 print:hidden">
                <FileText className="h-4 w-4" />
                Voir le fichier
              </a>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Justificatif de résidence</p>
              <a href={application.proofOfResidence} target="_blank" rel="noopener noreferrer"
                 className="text-congo-600 hover:text-congo-800 text-sm flex items-center gap-2 print:hidden">
                <FileText className="h-4 w-4" />
                Voir le fichier
              </a>
            </div>
          </div>
        </div>

        {(application.status === 'APPROVED' || application.status === 'READY') && (
          <div className="hidden print:block mt-16 pt-8 border-t border-gray-300">
            <div className="flex justify-between">
              <div className="text-center">
                <p className="mb-16">Signature du Consul Général</p>
                <div className="border-t border-black w-48 mx-auto"></div>
              </div>
              <div className="text-center">
                <p className="mb-16">Cachet du Consulat</p>
                <div className="w-32 h-32 border-2 border-black rounded-full mx-auto"></div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Document généré le {format(new Date(), 'dd MMMM yyyy', { locale: fr })}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

