import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 12,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return articles;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
}

const categoryLabels: Record<string, string> = {
  DIPLOMATIE: 'Diplomatie',
  COMMUNAUTE: 'Communauté',
  CULTURE: 'Culture',
  EVENEMENTS: 'Événements',
  ANNONCES_OFFICIELLES: 'Annonces Officielles',
};

const categoryColors: Record<string, string> = {
  DIPLOMATIE: 'bg-blue-100 text-blue-800',
  COMMUNAUTE: 'bg-green-100 text-green-800',
  CULTURE: 'bg-purple-100 text-purple-800',
  EVENEMENTS: 'bg-orange-100 text-orange-800',
  ANNONCES_OFFICIELLES: 'bg-red-100 text-red-800',
};

export default async function ActualitesPage() {
  const articles = await getArticles();

  return (
    <div className="py-20">
      <div className="container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Actualités
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Restez informés des dernières nouvelles du Consulat et de la communauté congolaise en Tunisie.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button className="px-4 py-2 bg-congo-500 text-white rounded-lg font-medium">
            Toutes
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Liste des articles */}
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Aucune actualité pour le moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="card group">
                {article.imageUrl && (
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`badge ${categoryColors[article.category]}`}>
                      {categoryLabels[article.category]}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {article.publishedAt
                        ? format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: fr })
                        : 'Non publié'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-congo-600 transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="inline-flex items-center gap-2 text-congo-600 font-medium hover:gap-3 transition-all"
                  >
                    Lire la suite
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


