import Link from 'next/link';
import Image from 'next/image';
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
    <div className="py-20 md:py-24">
      <div className="container max-w-7xl">
        {/* En-tête avec soulignement jaune */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-3">
            Actualités
          </h1>
          <div className="w-24 h-1 bg-yellow-400"></div>
          <p className="text-lg text-gray-600 max-w-2xl mt-6">
            Restez informés des dernières nouvelles du Consulat et de la communauté congolaise en Tunisie.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 justify-start mb-12">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <Link href={`/actualites/${article.slug}`} className="block h-full flex flex-col">
                  {/* Titre */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-congo-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-4">
                    {article.publishedAt
                      ? format(new Date(article.publishedAt), 'EEEE d MMMM yyyy', { locale: fr })
                      : 'Non publié'}
                  </p>
                  
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-4">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-congo-500 to-congo-600 flex items-center justify-center">
                        <Image
                          src="/armoirie-Congo.png"
                          alt="Armoirie du Congo"
                          width={120}
                          height={120}
                          className="opacity-30"
                        />
                      </div>
                    )}
                  </div>

                  {/* Badge catégorie et extrait */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`badge ${categoryColors[article.category]}`}>
                      {categoryLabels[article.category]}
                    </span>
                  </div>
                  
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="inline-flex items-center gap-2 text-congo-600 font-medium hover:gap-3 transition-all mt-auto">
                    Lire la suite
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


