import { prisma } from '@/lib/prisma';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Newspaper,
} from 'lucide-react';

async function getStats() {
  const [
    totalVisas,
    pendingVisas,
    approvedVisas,
    totalConsularCards,
    totalMessages,
    totalArticles,
  ] = await Promise.all([
    prisma.visaApplication.count(),
    prisma.visaApplication.count({ where: { status: 'PENDING' } }),
    prisma.visaApplication.count({ where: { status: 'APPROVED' } }),
    prisma.consularCardApplication.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
  ]);

  return {
    totalVisas,
    pendingVisas,
    approvedVisas,
    totalConsularCards,
    totalMessages,
    totalArticles,
  };
}

async function getRecentApplications() {
  const visas = await prisma.visaApplication.findMany({
    take: 5,
    orderBy: { submittedAt: 'desc' },
  });

  return visas;
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentApplications = await getRecentApplications();

  const statCards = [
    {
      title: 'Demandes de visa',
      value: stats.totalVisas,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'En attente',
      value: stats.pendingVisas,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Approuvées',
      value: stats.approvedVisas,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Cartes consulaires',
      value: stats.totalConsularCards,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Messages non lus',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
    {
      title: 'Articles publiés',
      value: stats.totalArticles,
      icon: Newspaper,
      color: 'bg-congo-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble des activités du consulat
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Demandes récentes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-admin">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Nom complet</th>
                <th>Type</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td className="font-mono text-sm">{app.referenceNumber}</td>
                  <td>{`${app.firstName} ${app.lastName}`}</td>
                  <td>
                    <span className="badge badge-info">{app.visaType}</span>
                  </td>
                  <td>{new Date(app.submittedAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === 'PENDING'
                          ? 'badge-warning'
                          : app.status === 'APPROVED'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


