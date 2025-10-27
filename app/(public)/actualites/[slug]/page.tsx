import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getArticle(slug: string) {
  return await prisma.article.findUnique({
    where: { slug },
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article || article.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="container max-w-4xl">
        {/* Bouton retour */}
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-congo-600 hover:text-congo-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux actualités
        </Link>

        {/* En-tête de l'article */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {article.imageUrl && (
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="badge bg-congo-100 text-congo-800">
                {categoryLabels[article.category]}
              </span>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {article.publishedAt
                    ? format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: fr })
                    : 'Non publié'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">{article.author.name}</span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Contenu */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}


