import Image from 'next/image';
import { Target, Users, Globe, Heart, Shield, Briefcase } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-20">
      {/* Image de fond pour toute la page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bzv.jpg"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative gradient-congo text-white py-20 mb-20 overflow-hidden">
        {/* Image de fond pour la section Hero */}
        <div className="absolute inset-0">
          <Image
            src="/bzv.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-congo-600/75 via-congo-500/75 to-congo-700/75"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="/armoirie-Congo.png"
              alt="Armoiries de la République du Congo"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Consulat Général de la République du Congo en Tunisie
            </h1>
            <p className="text-xl text-congo-50">
              Au service de la communauté congolaise et des relations bilatérales entre le Congo et la Tunisie
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl relative z-10">
        {/* Notre Mission */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Le Consulat Général de la République du Congo en Tunisie a pour mission principale de 
                  <strong className="text-congo-600"> représenter les intérêts de la République du Congo</strong> et 
                  de servir la communauté congolaise résidant en Tunisie.
                </p>
                <p>
                  Nous œuvrons quotidiennement pour <strong className="text-congo-600">renforcer les liens</strong> entre 
                  nos deux pays et faciliter les échanges culturels, économiques et diplomatiques.
                </p>
                <p>
                  Notre consulat s'engage à fournir des <strong className="text-congo-600">services consulaires de qualité</strong>, 
                  rapides et efficaces, tout en préservant la dignité et les droits de chaque citoyen congolais.
                </p>
              </div>
            </div>
            <div className="bg-congo-50 rounded-xl p-8 border-2 border-congo-200">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-congo-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nos Valeurs</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-congo-500 rounded-full"></div>
                    <span><strong>Unité</strong> - Rassembler la communauté congolaise</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-congo-500 rounded-full"></div>
                    <span><strong>Travail</strong> - Excellence dans nos services</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-congo-500 rounded-full"></div>
                    <span><strong>Progrès</strong> - Innovation et modernisation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Objectifs */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12 text-center">
            Nos Objectifs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <div className="inline-flex p-4 bg-congo-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-congo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Servir la Communauté
              </h3>
              <p className="text-gray-600">
                Assister et protéger les ressortissants congolais en Tunisie dans leurs démarches administratives et juridiques.
              </p>
            </div>

            <div className="card text-center p-8">
              <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Relations Bilatérales
              </h3>
              <p className="text-gray-600">
                Promouvoir et développer les relations d'amitié et de coopération entre le Congo et la Tunisie.
              </p>
            </div>

            <div className="card text-center p-8">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Faciliter les Échanges
              </h3>
              <p className="text-gray-600">
                Encourager les échanges économiques, culturels et touristiques entre nos deux nations.
              </p>
            </div>
          </div>
        </section>

        {/* Nos Services */}
        <section className="mb-20 relative rounded-xl p-8 md:p-12">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              Nos Services Principaux
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-congo-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Services Consulaires</h3>
                <p className="text-gray-600 text-sm">
                  Délivrance de visas, cartes consulaires, laissez-passer et documents de voyage.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-congo-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">État Civil</h3>
                <p className="text-gray-600 text-sm">
                  Délivrance d'actes de naissance, mariage, décès et certificats divers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-congo-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Légalisation</h3>
                <p className="text-gray-600 text-sm">
                  Légalisation de documents officiels, attestations et procurations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-congo-500 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Assistance Sociale</h3>
                <p className="text-gray-600 text-sm">
                  Accompagnement et soutien aux ressortissants congolais en difficulté.
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Histoire et Relations */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Relations Congo-Tunisie
              </h3>
              <p className="text-gray-700 mb-4">
                Les relations diplomatiques entre la République du Congo et la Tunisie sont marquées par 
                une longue histoire de coopération et d'amitié.
              </p>
              <p className="text-gray-700 mb-4">
                Nos deux pays partagent des valeurs communes et entretiennent des liens étroits dans 
                divers domaines : éducation, culture, commerce et développement.
              </p>
              <p className="text-gray-700">
                Le Consulat Général œuvre à renforcer ces liens en facilitant les échanges entre 
                les peuples congolais et tunisien.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Communauté Congolaise en Tunisie
              </h3>
              <p className="text-gray-700 mb-4">
                La communauté congolaise en Tunisie est dynamique et diversifiée, composée d'étudiants, 
                de professionnels, d'entrepreneurs et de familles.
              </p>
              <p className="text-gray-700 mb-4">
                Le Consulat s'efforce de maintenir un lien fort avec cette communauté en organisant 
                des événements culturels et en facilitant l'intégration sociale.
              </p>
              <p className="text-gray-700">
                Nous encourageons tous les ressortissants congolais à s'inscrire au registre consulaire 
                pour bénéficier de nos services et rester informés.
              </p>
            </div>
          </div>
        </section>

        {/* Rencontrer l'Équipe */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 text-center">
            Rencontrer l'Équipe
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Notre équipe dévouée est à votre service pour vous accompagner dans toutes vos démarches consulaires.
          </p>
          
          {/* Niveau 1 : Consul Général - Seul en haut */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 border-2 border-gold-400">
              <div className="aspect-square bg-gradient-to-br from-congo-500 to-congo-700 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-gold-500 text-congo-900 px-3 py-1 rounded-full text-xs font-bold">
                  Direction
                </div>
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-congo-600 text-5xl font-bold shadow-xl">
                  CG
                </div>
              </div>
              <div className="p-6 text-center bg-gradient-to-b from-white to-congo-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Excellence M./Mme [Nom]
                </h3>
                <p className="text-congo-600 font-bold text-lg mb-3">Consul Général</p>
                <p className="text-gray-700 text-sm mb-4">
                  Représentant officiel de la République du Congo en Tunisie, responsable de la direction générale et de la coordination de toutes les activités consulaires.
                </p>
                <div className="border-t border-congo-200 pt-4">
                  <p className="text-sm text-gray-600 font-medium">
                    📧 consul.general@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Niveau 2 : Les deux Consuls */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Vice-Consul Général */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  VCG
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  M./Mme [Nom]
                </h3>
                <p className="text-blue-600 font-semibold mb-3">Vice-Consul Général</p>
                <p className="text-gray-600 text-sm mb-4">
                  Seconde le Consul Général et assure l'intérim en son absence. Supervise les opérations quotidiennes du consulat.
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    📧 vice.consul@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>

            {/* Consul */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  C
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  M./Mme [Nom]
                </h3>
                <p className="text-purple-600 font-semibold mb-3">Consul</p>
                <p className="text-gray-600 text-sm mb-4">
                  Responsable du traitement des demandes consulaires, visas et documents officiels. Gère les dossiers complexes.
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    📧 consul@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Niveau 3 : Les 3 autres membres de l'équipe */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Attaché Consulaire */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  AC
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  M./Mme [Nom]
                </h3>
                <p className="text-green-600 font-semibold mb-3">Attaché Consulaire</p>
                <p className="text-gray-600 text-sm mb-4">
                  Traite les demandes de cartes consulaires, actes d'état civil et assure le suivi des dossiers administratifs.
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    📧 attache.consulaire@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>

            {/* Attachée Administrative */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  AA
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Mme [Nom]
                </h3>
                <p className="text-pink-600 font-semibold mb-3">Attachée Administrative</p>
                <p className="text-gray-600 text-sm mb-4">
                  Gère les aspects administratifs et financiers du consulat. Coordonne les ressources humaines et la logistique.
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    📧 administration@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>

            {/* Huissier du Consulat */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  H
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  M. [Nom]
                </h3>
                <p className="text-orange-600 font-semibold mb-3">Huissier du Consulat</p>
                <p className="text-gray-600 text-sm mb-4">
                  Accueille les visiteurs, gère le protocole et assure le bon déroulement des cérémonies et événements officiels.
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    📧 accueil@consulatcongo.tn
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service - Secrétariat */}
          <div className="bg-gradient-to-br from-gray-50 to-congo-50 rounded-xl p-8 border border-congo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Service du Consulat
            </h3>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-congo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-12 w-12 text-congo-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Secrétariat</h4>
                <p className="text-gray-600 mb-4">
                  Le secrétariat assure la gestion quotidienne des communications, la prise de rendez-vous, 
                  l'accueil téléphonique et le traitement du courrier.
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-600 font-medium">
                    📧 secretariat@consulatcongo.tn<br />
                    📞 +216 71 860 123
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border border-congo-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">
                <strong className="text-congo-600">Une équipe professionnelle et dévouée</strong> au service de la communauté congolaise en Tunisie et des relations bilatérales Congo-Tunisie.
              </p>
            </div>
          </div>
        </section>

        {/* Heures d'ouverture */}
        <section className="bg-congo-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Nous sommes à votre service
          </h2>
          <p className="text-xl text-congo-50 mb-6">
            N'hésitez pas à nous contacter pour toute question ou demande d'assistance
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold mb-2">Horaires</h3>
              <p className="text-congo-100">
                Lundi - Vendredi<br />
                09:00 - 16:00
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Téléphone</h3>
              <p className="text-congo-100">
                +216 71 860 123
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-congo-100">
                contact@consulatcongo.tn
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a href="/contact" className="btn bg-white text-congo-600 hover:bg-gray-100 btn-lg">
              Contactez-nous
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

