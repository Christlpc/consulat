import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer un utilisateur administrateur
  const hashedPassword = await hash('CongoAdmin2024!', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@consulatcongo.tn' },
    update: {},
    create: {
      email: 'admin@consulatcongo.tn',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Utilisateur administrateur créé:', admin.email);

  // Créer un agent
  const agentPassword = await hash('Agent2024!', 12);
  
  const agent = await prisma.user.upsert({
    where: { email: 'agent@consulatcongo.tn' },
    update: {},
    create: {
      email: 'agent@consulatcongo.tn',
      name: 'Agent Consulaire',
      password: agentPassword,
      role: 'AGENT',
    },
  });

  console.log('✅ Utilisateur agent créé:', agent.email);

  // Créer quelques articles d'exemple
  const articles = [
    {
      title: 'Bienvenue sur le nouveau site du Consulat',
      slug: 'bienvenue-nouveau-site',
      content: 'Nous sommes heureux de vous présenter notre nouveau site web. Vous pouvez désormais effectuer vos démarches consulaires en ligne...',
      excerpt: 'Découvrez notre nouveau site web et ses fonctionnalités',
      category: 'ANNONCES_OFFICIELLES',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id,
    },
    {
      title: 'Célébration de la Fête Nationale',
      slug: 'fete-nationale-2024',
      content: 'Le Consulat célèbre la Fête Nationale de la République du Congo le 15 août...',
      excerpt: 'Rejoignez-nous pour célébrer notre fête nationale',
      category: 'EVENEMENTS',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id,
    },
    {
      title: 'Nouvelles procédures de visa',
      slug: 'nouvelles-procedures-visa',
      content: 'De nouvelles procédures simplifiées pour les demandes de visa sont maintenant disponibles...',
      excerpt: 'Simplification des démarches pour les visas',
      category: 'DIPLOMATIE',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article as any,
    });
  }

  console.log(`✅ ${articles.length} articles créés`);

  // Créer quelques paramètres du site
  const settings = [
    {
      key: 'site_name',
      value: 'Consulat Général de la République du Congo en Tunisie',
      description: 'Nom du site',
    },
    {
      key: 'contact_email',
      value: 'contact@consulatcongo.tn',
      description: 'Email de contact',
    },
    {
      key: 'contact_phone',
      value: '+216 71 860 123',
      description: 'Téléphone de contact',
    },
    {
      key: 'address',
      value: 'Rue du Lac Léman, Immeuble Lac 2000, Les Berges du Lac 1053, Tunis, Tunisie',
      description: 'Adresse du consulat',
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log(`✅ ${settings.length} paramètres créés`);

  console.log('\n🎉 Seeding terminé avec succès!\n');
  console.log('📧 Identifiants administrateur:');
  console.log('   Email: admin@consulatcongo.tn');
  console.log('   Mot de passe: CongoAdmin2024!\n');
  console.log('📧 Identifiants agent:');
  console.log('   Email: agent@consulatcongo.tn');
  console.log('   Mot de passe: Agent2024!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


