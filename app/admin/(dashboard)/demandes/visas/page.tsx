import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Eye } from 'lucide-react';

async function getVisaApplications() {
  return await prisma.visaApplication.findMany({
    orderBy: { submittedAt: 'desc' },
  });
}

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  IN_REVIEW: 'En examen',
  APPROVED: 'Approuvé',
  READY: 'Prêt',
  REJECTED: 'Rejeté',
  COMPLETED: 'Complété',
};

const visaTypeLabels: Record<string, string> = {
  TOURISME: 'Tourisme',
  AFFAIRES: 'Affaires',
  ETUDES: 'Études',
  TRAVAIL: 'Travail',
  TRANSIT: 'Transit',
};

export default async function VisaApplicationsPage() {
  const applications = await getVisaApplications();

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demandes de Visa</h1>
          <p className="text-gray-600 mt-2">
            Gérer toutes les demandes de visa
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-700">
          Total : {applications.length}
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex gap-4">
          <select className="input">
            <option>Tous les statuts</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select className="input">
            <option>Tous les types</option>
            {Object.entries(visaTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Rechercher par nom ou référence..."
            className="input flex-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="table-admin">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Type</th>
              <th>Date de soumission</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="font-mono text-sm">{app.referenceNumber}</td>
                <td className="font-medium">{`${app.firstName} ${app.lastName}`}</td>
                <td className="text-sm text-gray-600">{app.email}</td>
                <td>
                  <span className="badge badge-info">
                    {visaTypeLabels[app.visaType]}
                  </span>
                </td>
                <td className="text-sm">
                  {new Date(app.submittedAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.status === 'PENDING'
                        ? 'badge-warning'
                        : app.status === 'APPROVED'
                        ? 'badge-success'
                        : app.status === 'REJECTED'
                        ? 'badge-error'
                        : 'badge-info'
                    }`}
                  >
                    {statusLabels[app.status]}
                  </span>
                </td>
                <td>
                  <Link
                    href={`/admin/demandes/visas/${app.id}`}
                    className="inline-flex items-center gap-2 text-congo-600 hover:text-congo-700 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


