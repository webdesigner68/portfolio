"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PaintBrushIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    id: 1,
    title: "UX/UI Design",
    description:
      "Création d'interfaces utilisateur intuitives et esthétiques qui offrent une expérience utilisateur exceptionnelle.",
    icon: PaintBrushIcon,
  },
  {
    id: 2,
    title: "Développement Front-end",
    description:
      "Intégration pixel-perfect de vos maquettes avec des technologies modernes comme React, Vue.js ou Next.js.",
    icon: CodeBracketIcon,
  },
  {
    id: 3,
    title: "Design Responsive",
    description:
      "Conception de sites web qui s'adaptent parfaitement à tous les appareils, de l'ordinateur au smartphone.",
    icon: DevicePhoneMobileIcon,
  },
  {
    id: 4,
    title: "Optimisation SEO",
    description:
      "Amélioration du référencement naturel pour augmenter la visibilité de votre site sur les moteurs de recherche.",
    icon: MagnifyingGlassIcon,
  },
  {
    id: 5,
    title: "Refonte de site web",
    description:
      "Modernisation de votre site existant pour améliorer son design, ses performances et son expérience utilisateur.",
    icon: RocketLaunchIcon,
  },
  {
    id: 6,
    title: "Maintenance & Support",
    description:
      "Suivi régulier, mises à jour et assistance technique pour garantir le bon fonctionnement de votre site.",
    icon: WrenchScrewdriverIcon,
  },
];

// Nouveaux services spéciaux mis en avant avec détails complets
const specializedServices = [
  {
    id: 1,
    title: "Site Vitrine One Page",
    description: "Une page unique élégante et percutante qui présente votre entreprise et vos services avec impact. Idéal pour les startups et petites entreprises souhaitant une présence web efficace, économique et livrée rapidement.",
    icon: DocumentTextIcon,
    color: "from-blue-500 to-indigo-600",
    fullDetails: {
      features: [
        "Design moderne et personnalisé",
        "Navigation fluide par sections",
        "Formulaire de contact intégré",
        "Optimisation pour les moteurs de recherche",
        "Adaptation parfaite à tous les appareils",
        "Intégration de vos réseaux sociaux",
        "Hébergement et nom de domaine inclus",
        "Livraison express en moins de 2 semaines"
      ],
      timeline: "Maquette en 24-48h, site complet en moins de 2 semaines",
      process: "Après une consultation initiale, je crée rapidement une maquette pour validation (24-48h), puis développe votre site avec des révisions régulières pour garantir votre satisfaction et une livraison express.",
      maintenance: "Mises à jour de sécurité et support technique inclus pendant 6 mois après livraison."
    }
  },
  {
    id: 2,
    title: "Site Multipage Complet",
    description: "Un site web complet avec plusieurs pages pour détailler vos services, présenter votre équipe et partager votre expertise. Parfait pour les entreprises établies nécessitant une présence web plus développée avec un délai accéléré.",
    icon: DocumentDuplicateIcon,
    color: "from-indigo-500 to-purple-600",
    fullDetails: {
      features: [
        "Structure multi-pages organisée",
        "Blog intégré pour votre contenu",
        "Galerie de projets ou portfolio",
        "Page équipe avec profils détaillés",
        "Témoignages clients dynamiques",
        "Système de réservation ou devis",
        "Tableau de bord d'administration",
        "Formation à la gestion de contenu",
        "Délais de livraison express garantis"
      ],
      timeline: "Maquettes en 48h, site complet en 2-3 semaines",
      process: "Le projet débute par une analyse rapide de vos besoins (24h), suivie d'une architecture de l'information, maquettes (48h), développement accéléré et tests rigoureux avant mise en ligne.",
      maintenance: "Forfait de maintenance mensuel disponible incluant mises à jour, sauvegardes et modifications mineures."
    }
  },
  {
    id: 3,
    title: "Application Web Interactive",
    description: "Solution web dynamique et interactive avec fonctionnalités avancées et expérience utilisateur immersive. Idéal pour les projets nécessitant une plateforme personnalisée avec login, dashboards et interactions complexes, le tout développé en un temps record.",
    icon: ComputerDesktopIcon,
    color: "from-purple-500 to-blue-600",
    fullDetails: {
      features: [
        "Système d'authentification sécurisé",
        "Tableaux de bord personnalisés",
        "Gestion des utilisateurs et rôles",
        "Fonctionnalités de recherche avancées",
        "Notifications en temps réel",
        "Intégration d'API tierces",
        "Stockage et gestion de données",
        "Analyses et rapports statistiques",
        "Système de paiement (si nécessaire)",
        "Développement accéléré en moins d'un mois"
      ],
      timeline: "Maquettes et prototypes en 72h, application complète en moins d'un mois",
      process: "Développement itératif rapide avec méthodologie Agile, incluant des sprints de développement intensifs, des démonstrations régulières et des ajustements basés sur vos retours pour une livraison rapide.",
      maintenance: "Support technique prioritaire, mises à jour de sécurité et évolutions fonctionnelles disponibles via un contrat de maintenance dédié."
    }
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "500px", amount: 0.2 });
  const [selectedService, setSelectedService] = useState<typeof specializedServices[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openServiceDetails = (service: typeof specializedServices[0]) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <section id="services" ref={ref} className="py-16 md:py-24 bg-[#1e3575]">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="section-title"
          >
            Mes <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4 max-w-2xl mx-auto"
          >
            Des solutions sur mesure pour donner vie à vos projets web.
          </motion.p>

          {/* Bannière délais express - Nouvelle section très visible */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            } : {}}
            className="mt-8 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-2xl p-6 border-2 border-blue-500/30 shadow-lg shadow-blue-500/5 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-60"></div>
            
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Délais Ultra-Rapides Garantis
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
              <div className="bg-[#0f1c3a] rounded-xl p-4 border border-blue-500/20 flex flex-col items-center justify-center hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="text-4xl font-bold text-blue-400 mb-1">24-48h</div>
                <div className="text-white text-sm">Maquettes & Design</div>
                <div className="text-blue-300 text-xs mt-1 font-medium">Commencez immédiatement</div>
              </div>
              <div className="bg-[#0f1c3a] rounded-xl p-4 border border-blue-500/20 flex flex-col items-center justify-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-400 mb-1">&lt; 2 sem</div>
                <div className="text-white text-sm">Sites web complets</div>
              </div>
              <div className="bg-[#0f1c3a] rounded-xl p-4 border border-blue-500/20 flex flex-col items-center justify-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-400 mb-1">&lt; 1 mois</div>
                <div className="text-white text-sm">Applications interactives</div>
              </div>
            </div>
            
            <p className="text-gray-200 text-sm italic relative z-10">
              Livraison express sans compromis sur la qualité — Ne perdez plus de temps avec des prestataires trop lents
            </p>
          </motion.div>

          {/* Bouton CTA principal ajouté en haut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <Link 
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:translate-y-[-2px] group"
            >
              <span>Discuter de votre projet</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Services spécialisés mis en avant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-24"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-12">
            <span className="relative inline-block">
              Solutions spécialisées
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-50 blur-xl group-hover:opacity-70 transition-opacity rounded-2xl"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  ></div>
                <div className={`relative overflow-hidden rounded-2xl bg-[#0f1c3a] border border-[#304b8a]/30 group-hover:border-blue-400/30 transition-colors shadow-xl h-full p-8 z-10`}>
                  {/* Gradient background for top section */}
                  <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-br ${service.color} opacity-20`}></div>
                  
                  {/* Badge Livraison Express */}
                  <div className="absolute -right-12 top-7 bg-blue-500 text-white text-xs font-bold px-12 py-1 transform rotate-45 shadow-md">
                    RAPIDE
                  </div>
                  
                  {/* Badge Maquette 24-48h */}
                  <div className="absolute left-0 top-0 bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-br shadow-md">
                    ⚡ MAQUETTE EN 24-48H
                  </div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-colors">
                      <service.icon className="w-9 h-9 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Délai de livraison mis en évidence */}
                    <div className="mt-4 bg-[#162855] rounded-lg p-3 flex items-center gap-2 border border-blue-500/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-blue-300">
                        {service.id === 1 && "Maquettes en 24-48h, livraison en moins de 2 semaines"}
                        {service.id === 2 && "Maquettes en 24-48h, livraison en 2-3 semaines"}
                        {service.id === 3 && "Maquettes en 24-48h, livraison en moins d'un mois"}
                      </span>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button 
                        onClick={() => openServiceDetails(service)}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group"
                      >
                        <span>En savoir plus</span>
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services standards */}
        <h3 className="text-2xl font-bold text-center text-white mb-12">
          <span className="relative inline-block">
            Services complémentaires
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </span>
        </h3>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="bg-[#162855] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#304b8a]/30 group hover:border-blue-400/30"
            >
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <service.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section "Comment je travaille" */}
        <div className="mt-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="section-title"
            >
              Comment je <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">travaille</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mt-4 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Une approche structurée pour garantir des résultats exceptionnels.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Étapes de travail */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#0f1c3a] rounded-xl p-8 h-full border-l-4 border-blue-500 hover:border-blue-400 transition-colors group">
                <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
                <h3 className="text-xl font-bold mb-4 text-white pl-5 group-hover:text-blue-300 transition-colors">Découverte</h3>
                <p className="text-gray-300 pl-5 leading-relaxed">
                  Analyse de vos besoins, objectifs et public cible pour comprendre parfaitement votre projet.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="relative"
            >
              <div className="bg-[#0f1c3a] rounded-xl p-8 h-full border-l-4 border-blue-500 hover:border-blue-400 transition-colors group">
                <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
                <h3 className="text-xl font-bold mb-4 text-white pl-5 group-hover:text-blue-300 transition-colors">Conception</h3>
                <p className="text-gray-300 pl-5 leading-relaxed">
                  Création de wireframes et maquettes pour visualiser et valider l'interface avant développement.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-[#0f1c3a] rounded-xl p-8 h-full border-l-4 border-blue-500 hover:border-blue-400 transition-colors group">
                <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
                <h3 className="text-xl font-bold mb-4 text-white pl-5 group-hover:text-blue-300 transition-colors">Développement</h3>
                <p className="text-gray-300 pl-5 leading-relaxed">
                  Intégration et programmation avec des technologies modernes pour un site performant et évolutif.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="relative"
            >
              <div className="bg-[#0f1c3a] rounded-xl p-8 h-full border-l-4 border-blue-500 hover:border-blue-400 transition-colors group">
                <div className="absolute -left-4 top-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">4</div>
                <h3 className="text-xl font-bold mb-4 text-white pl-5 group-hover:text-blue-300 transition-colors">Lancement</h3>
                <p className="text-gray-300 pl-5 leading-relaxed">
                  Tests approfondis, optimisations finales et mise en ligne de votre projet avec suivi post-lancement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to action amélioré avec animation */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="#contact"
              className="relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full"></span>
              <span className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-indigo-600/80 to-purple-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
              <span className="relative block py-4 px-10 md:py-5 md:px-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg md:text-xl font-bold shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Discuter de votre projet
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
              <span className="absolute -bottom-10 left-0 right-0 h-40 bg-blue-500/20 blur-3xl rounded-full transform scale-x-150 scale-y-50 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Link>
            
            <p className="text-gray-400 mt-4 text-sm">Réponse sous 24h - Sans engagement</p>
          </motion.div>
        </div>
      </div>

      {/* Modal pour les détails des services */}
      <AnimatePresence>
        {showModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#162855] rounded-2xl overflow-hidden max-w-4xl w-full mx-auto shadow-2xl border border-blue-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative h-24 overflow-hidden bg-gradient-to-br ${selectedService.color}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0f1c3a]/50 hover:bg-red-500/20 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                    <selectedService.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedService.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed">{selectedService.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Caractéristiques principales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.fullDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Délai de réalisation
                    </h4>
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      <p className="text-blue-300 font-bold text-lg">{selectedService.fullDetails.timeline}</p>
                      <p className="text-gray-300 text-sm mt-1">
                        <span className="bg-blue-500/20 px-2 py-1 rounded text-blue-300 font-medium">Maquettes en 24-48h garanties</span>
                        {" "}• Délai express comparé à la moyenne du marché de 1 à 3 mois
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Maintenance</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedService.fullDetails.maintenance}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Processus de travail</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedService.fullDetails.process}</p>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Link
                    href="#contact"
                    onClick={() => setShowModal(false)}
                    className="relative overflow-hidden group py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-blue-500/30"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Demander un devis gratuit
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 