import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Eye, Edit, Trash } from 'lucide-react';

async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
}

const categoryLabels: Record<string, string> = {
  DIPLOMATIE: 'Diplomatie',
  COMMUNAUTE: 'Communauté',
  CULTURE: 'Culture',
  EVENEMENTS: 'Événements',
  ANNONCES_OFFICIELLES: 'Annonces Officielles',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Brouillon',
  PUBLISHED: 'Publié',
  ARCHIVED: 'Archivé',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Actualités</h1>
          <p className="text-gray-600 mt-2">
            Gérer les articles et actualités du consulat
          </p>
        </div>
        <Link href="/admin/actualites/nouveau" className="btn btn-primary btn-md">
          <Plus className="h-5 w-5 mr-2" />
          Nouvel article
        </Link>
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
            <option>Toutes les catégories</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Rechercher..."
            className="input flex-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="table-admin">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Auteur</th>
              <th>Date de création</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="font-medium max-w-md truncate">
                  {article.title}
                </td>
                <td>
                  <span className="badge badge-info">
                    {categoryLabels[article.category]}
                  </span>
                </td>
                <td className="text-sm text-gray-600">
                  {article.author.name}
                </td>
                <td className="text-sm">
                  {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td>
                  <span
                    className={`badge ${
                      article.status === 'PUBLISHED'
                        ? 'badge-success'
                        : article.status === 'DRAFT'
                        ? 'badge-warning'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {statusLabels[article.status]}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="text-congo-600 hover:text-congo-700"
                      target="_blank"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/actualites/${article.id}/modifier`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


