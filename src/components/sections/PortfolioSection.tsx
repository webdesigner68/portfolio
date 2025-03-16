"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation, AnimatePresence, PanInfo, useDragControls, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

// Type pour les projets avec la propriété duplicateId optionnelle
type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
  duplicateId?: string;
};

// Données de projets fictives - à remplacer par vos propres projets
const projects: Project[] = [
  {
    id: 1,
    title: "Application Web Snack",
    category: "Application Web",
    description: "Développement d'une application web de commande en ligne pour un snack avec un système de paiement intégré et un tableau de bord administrateur.",
    image: "/portfolio/snack.PNG",
    tags: ["React", "NextJS", "Stripe", "Responsive"],
    url: "#"
  },
  {
    id: 2,
    title: "Plateforme Nutritionniste",
    category: "Application Web",
    description: "Création d'une application complète pour une diététicienne avec gestion des rendez-vous, messagerie intégrée et suivi nutritionnel personnalisé pour les clients.",
    image: "/portfolio/nutritioniste.png",
    tags: ["React", "Node.js", "MongoDB", "Authentification"],
    url: "#"
  },
  {
    id: 3,
    title: "Site Vitrine Coiffeuse",
    category: "Site Vitrine",
    description: "Conception d'un site vitrine élégant pour une coiffeuse indépendante avec galerie de photos, système de réservation et témoignages clients.",
    image: "/portfolio/coiffeuse.PNG",
    tags: ["WordPress", "Responsive", "SEO"],
    url: "#"
  },
  {
    id: 4,
    title: "Site Vitrine Boulangerie",
    category: "Site Vitrine",
    description: "Création d'un site moderne pour une boulangerie artisanale présentant leurs produits, horaires et actualités avec une esthétique gourmande et chaleureuse.",
    image: "/portfolio/coiffeuse.PNG",
    tags: ["Gatsby", "Tailwind CSS", "Netlify CMS"],
    url: "#"
  },
  {
    id: 5,
    title: "Salle de Sport",
    category: "Application Web",
    description: "Développement d'un site web pour une salle de sport incluant présentation des cours, des coachs, abonnements et espace membre avec suivi des performances.",
    image: "/portfolio/musculation.png",
    tags: ["Vue.js", "Firebase", "UI Design", "Animations"],
    url: "#"
  }
];

// Catégories pour le filtrage
const categories = ["Tous", "Application Web", "Site Vitrine"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressControls = useAnimation();
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "300px", amount: 0.2 });

  // Fonction pour empêcher le scroll horizontal sur la page
  useEffect(() => {
    // Variables pour suivre les positions de toucher
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Fonction pour enregistrer le début du toucher
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    // Fonction pour empêcher le scroll horizontal sur tout le document sauf dans le carousel
    const preventHorizontalScroll = (e: TouchEvent) => {
      // Si l'utilisateur touche le carrousel, on ne bloque rien
      if (e.target && carouselRef.current?.contains(e.target as Node)) {
        return;
      }
      
      // Calculer la différence entre la position actuelle et initiale
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      
      // Si le mouvement est plus horizontal que vertical, et on n'est pas dans le carousel
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    };
    
    // Ajouter les event listeners pour capturer les gestes tactiles
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', preventHorizontalScroll, { passive: false });
    
    return () => {
      // Retirer les event listeners lors du démontage du composant
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', preventHorizontalScroll);
    };
  }, []);

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter(project => project.category.includes(activeCategory));

  // Nombre de projets visibles à la fois (adapté aux écrans)
  const getVisibleProjects = () => {
    if (typeof window === 'undefined') return 3;
    
    // Adapter le nombre de projets visibles selon la taille d'écran
    if (window.innerWidth < 640) return 1; // Mobile : 1 projet à la fois
    if (window.innerWidth < 1024) return 2; // Tablette : 2 projets à la fois
    return 3; // Desktop : 3 projets à la fois
  };
  
  const [visibleProjects, setVisibleProjects] = useState(3);
  
  // Calculer la largeur d'une carte de projet
  const [cardWidth, setCardWidth] = useState(0);
  
  // Recalcule la largeur des cartes lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setVisibleProjects(getVisibleProjects());
      
      if (carouselRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newCardWidth = containerWidth / visibleProjects;
        setCardWidth(newCardWidth);
      }
    };
    
    // Initialiser
    handleResize();
    
    // Mettre à jour lors du redimensionnement
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Réajuster quand visibleProjects change
  useEffect(() => {
    if (carouselRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newCardWidth = containerWidth / visibleProjects;
      setCardWidth(newCardWidth);
    }
  }, [visibleProjects]);
  
  // Créer un tableau étendu pour le carrousel infini
  const createExtendedProjects = () => {
    if (filteredProjects.length === 0) return [];
    
    // Si nous avons assez de projets pour remplir la vue, nous n'avons besoin que d'une seule copie à chaque extrémité
    if (filteredProjects.length >= visibleProjects * 2) {
      // Dupliquer uniquement le nombre nécessaire de projets à la fin
      const endDuplicates = filteredProjects.slice(0, visibleProjects).map((project, index) => ({
        ...project,
        duplicateId: `end-${index}`
      }));
      
      // Dupliquer uniquement le nombre nécessaire de projets au début
      const startDuplicates = filteredProjects.slice(-visibleProjects).map((project, index) => ({
        ...project,
        duplicateId: `start-${index}`
      }));
      
      // Combiner pour créer un tableau étendu: [...fin, ...originaux, ...début]
      return [...startDuplicates, ...filteredProjects, ...endDuplicates];
    } 
    // Si nous n'avons pas assez de projets, créons une seule copie complète
    else {
      return [
        ...filteredProjects.map((project, index) => ({
          ...project,
          duplicateId: `start-${index}`
        })),
        ...filteredProjects,
        ...filteredProjects.map((project, index) => ({
          ...project,
          duplicateId: `end-${index}`
        }))
      ];
    }
  };
  
  const extendedProjects = createExtendedProjects();
  const offset = visibleProjects; // Décalage pour accéder aux projets originaux
  
  const calculateProgress = () => {
    return currentIndex / Math.max(1, filteredProjects.length - visibleProjects);
  };

  // Position x optimisée avec spring pour des animations fluides
  const springX = useSpring(-(offset * cardWidth), { 
    damping: 18,
    stiffness: 200,
    mass: 0.3,
    restDelta: 0.0005
  });
  
  useEffect(() => {
    if (filteredProjects.length > 0) {
      progressControls.start({
        scaleX: calculateProgress(),
        transition: { duration: 0.3, ease: "easeOut" }
      });
    }
  }, [currentIndex, filteredProjects, visibleProjects]);

  useEffect(() => {
    // Réinitialiser l'index lors du changement de catégorie
    setCurrentIndex(0);
    springX.set(-(offset * cardWidth));
    progressControls.start({
      scaleX: 0,
      transition: { duration: 0.3 }
    });
  }, [activeCategory, offset, cardWidth]);

  // Surveillance de position améliorée avec une détection plus réactive
  useEffect(() => {
    if (cardWidth === 0 || isWrapping) return;
    
    const unsubscribe = springX.onChange((currentX) => {
      if (isWrapping) return;
      
      // Si on glisse trop à droite (avant le premier projet original)
      if (currentX > -((offset - 0.3) * cardWidth)) {
        // Sauter à la fin des projets originaux
        setIsWrapping(true);
        const jumpToEnd = -(offset + filteredProjects.length - 1) * cardWidth;
        
        // Accélérer la transition
        setTimeout(() => {
          springX.set(jumpToEnd);
          setTimeout(() => setIsWrapping(false), 20);
        }, 5);
      }
      
      // Si on glisse trop à gauche (après le dernier projet original)
      if (currentX < -((offset + filteredProjects.length - 0.3) * cardWidth)) {
        // Sauter au début des projets originaux
        setIsWrapping(true);
        const jumpToStart = -(offset) * cardWidth;
        
        // Accélérer la transition
        setTimeout(() => {
          springX.set(jumpToStart);
          setTimeout(() => setIsWrapping(false), 20);
        }, 5);
      }
    });
    
    return () => unsubscribe();
  }, [cardWidth, springX, offset, filteredProjects.length, isWrapping]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex >= filteredProjects.length - visibleProjects) {
      // Revenir au début avec une animation fluide
      const newPosition = -((offset + 0) * cardWidth);
      springX.set(newPosition);
      setCurrentIndex(0);
    } else {
      // Navigation normale
      setCurrentIndex(prev => prev + 1);
      const newPosition = -((offset + currentIndex + 1) * cardWidth);
      springX.set(newPosition);
    }
    
    setTimeout(() => setIsAnimating(false), 250);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (currentIndex <= 0) {
      // Aller à la fin avec une animation fluide
      const newPosition = -((offset + filteredProjects.length - visibleProjects) * cardWidth);
      springX.set(newPosition);
      setCurrentIndex(filteredProjects.length - visibleProjects);
    } else {
      // Navigation normale
      setCurrentIndex(prev => prev - 1);
      const newPosition = -((offset + currentIndex - 1) * cardWidth);
      springX.set(newPosition);
    }
    
    setTimeout(() => setIsAnimating(false), 250);
  };

  const handleDragStart = () => {
    setIsAnimating(true);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = cardWidth * 0.10;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    // Utiliser à la fois la vitesse et la distance pour déterminer l'action
    if ((offset < -threshold) || (velocity < -250)) {
      handleNext();
    } else if ((offset > threshold) || (velocity > 250)) {
      handlePrev();
    } else {
      // Revenir à la position actuelle si le swipe n'est pas assez prononcé
      const newPosition = -((offset + currentIndex) * cardWidth);
      springX.set(newPosition);
      setIsAnimating(false);
    }
  };

  // Calculer les limites de glissement basées sur le tableau étendu
  const dragLimits = {
    left: -(offset + filteredProjects.length + visibleProjects - 1) * cardWidth,
    right: 0
  };

  // Gestionnaire d'événements pour éviter la propagation
  const handleDragCarousel = (e: React.MouseEvent | React.TouchEvent) => {
    // Empêcher la propagation des événements tactiles
    e.stopPropagation();
  };
  
  // Optimisations pour le défilement mobile
  useEffect(() => {
    // Fonction pour permettre le mouvement circulaire dans le carousel
    const handleCarouselTouch = () => {
      if (!carouselRef.current) return;
      
      // S'assurer que le carousel est toujours activé pour le défilement
      carouselRef.current.style.touchAction = "pan-y";
      carouselRef.current.style.userSelect = "none";
    };
    
    handleCarouselTouch();
    
    // Utiliser ResizeObserver pour recalculer les tailles si nécessaire
    const resizeObserver = new ResizeObserver(() => {
      if (carouselRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newCardWidth = containerWidth / visibleProjects;
        setCardWidth(newCardWidth);
      }
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [visibleProjects]);

  // Auto-scroll avec navigation circulaire - désactivé sur mobile pour une meilleure expérience
  useEffect(() => {
    // Désactiver l'auto-scroll sur les appareils mobiles
    if (typeof window !== 'undefined' && window.innerWidth < 640) return;
    
    const interval = setInterval(() => {
      if (!isAnimating && !isWrapping) {
        handleNext();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, isWrapping]);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-[#0f1c3a] overflow-hidden">
      {/* Séparateur décoratif entre À propos et Portfolio */}
      <div className="relative w-full overflow-hidden -mt-16 md:-mt-24">
        {/* Vague décorative supérieure */}
        <svg className="w-full text-[#0f1c3a] fill-current transform rotate-180" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0l60 10C120 20 240 40 360 40s240-20 360-20 240 20 360 30 240 5 360 0 240-15 360-20 240-5 360 0 240 15 360 20v70H0V0z"></path>
        </svg>
        
        {/* Ligne décorative avec points */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-full flex justify-center items-center">
          <div className="h-0.5 w-16 sm:w-24 bg-gradient-to-r from-transparent to-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400 mx-3"></div>
          <div className="w-6 h-6 rounded-full border-2 border-blue-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          </div>
          <div className="w-3 h-3 rounded-full bg-blue-400 mx-3"></div>
          <div className="h-0.5 w-16 sm:w-24 bg-gradient-to-l from-transparent to-blue-400"></div>
        </div>
      </div>

      {/* Section de statistiques */}
      <div className="container-section mt-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Projets terminés */}
          <div className="bg-[#162855] p-6 rounded-xl shadow-xl border border-blue-500/10 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">42</span>
              <h3 className="mt-2 text-white text-lg md:text-xl font-medium">Projets terminés</h3>
              <p className="text-gray-400 text-sm mt-2">Applications web et sites vitrines livrés à temps</p>
            </div>
          </div>

          {/* Satisfaction client */}
          <div className="bg-[#162855] p-6 rounded-xl shadow-xl border border-blue-500/10 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">100%</span>
              <h3 className="mt-2 text-white text-lg md:text-xl font-medium">Satisfaction client</h3>
              <p className="text-gray-400 text-sm mt-2">Tous mes clients sont satisfaits de leur projet</p>
            </div>
          </div>

          {/* Avis clients */}
          <div className="bg-[#162855] p-6 rounded-xl shadow-xl border border-blue-500/10 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">5.0</span>
              <h3 className="mt-2 text-white text-lg md:text-xl font-medium">Note moyenne</h3>
              <p className="text-gray-400 text-sm mt-2">Sur la base de 18 avis vérifiés</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-section mb-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title text-white leading-tight text-3xl md:text-4xl font-extrabold mb-4"
          >
            Mon <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            Découvrez mes réalisations récentes pour différents secteurs d'activité, des applications web complètes aux sites vitrines élégants.
          </motion.p>
        </div>

        {/* Filtres de catégories */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex bg-[#162855] rounded-full p-1.5">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentIndex(0);
                  
                  // Réinitialiser la position du carousel
                  if (springX && cardWidth) {
                    springX.set(-(offset) * cardWidth);
                  }
                  
                  // Réinitialiser la barre de progression
                  progressControls.start({
                    scaleX: 0,
                    transition: { duration: 0.3 }
                  });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                    : "bg-[#1e3575] text-gray-200 hover:bg-[#2d4893]"
                }`}
              >
                {category}
              </button>
            )}
          </div>
        </div>

        {/* Message explicatif pour le carrousel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-4 mb-6 text-gray-400 text-sm"
        >
          <span className="inline-block">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} unique{filteredProjects.length > 1 ? 's' : ''} — Faites défiler pour les découvrir
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.div>
      </div>

      {/* Carrousel de projets pleine largeur */}
      <div ref={ref} className="w-full relative">
        <div ref={containerRef} className="relative overflow-hidden will-change-transform overscroll-x-none touch-none">
          <motion.div
            ref={carouselRef}
            className="w-full flex will-change-transform"
            style={{ x: springX }}
            drag="x"
            dragControls={dragControls}
            dragElastic={0.1}
            dragTransition={{ 
              power: 0.2,
              timeConstant: 100,
              modifyTarget: (target) => Math.round(target / cardWidth) * cardWidth,
              restDelta: 0.0005
            }}
            dragConstraints={dragLimits}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            onTouchStart={handleDragCarousel}
            onTouchMove={handleDragCarousel}
            onMouseDown={handleDragCarousel}
          >
            {extendedProjects.map((project, index) => (
              <motion.div
                key={project.duplicateId || `${project.id}-${index}`}
                className="min-w-[100%] sm:min-w-[80%] md:min-w-[50%] lg:min-w-[33.333%] px-3 sm:px-4 will-change-transform touch-manipulation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 25,
                    delay: Math.min(index * 0.06, 0.3)
                  }
                } : {}}
                whileHover={{ 
                  y: typeof window !== 'undefined' && window.innerWidth > 640 ? -5 : 0,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                whileTap={{ scale: 0.99 }}
                viewport={{ once: true, margin: "100px" }}
              >
                <div className="bg-[#162855] rounded-xl overflow-hidden shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full transform">
                  {/* Image du projet avec effet parallaxe */}
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden group">
                    {/* En production, remplacer par de vraies images */}
                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                      {/* Remplacer le placeholder par l'image réelle */}
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Overlay au survol pour l'effet de visualisation - avec opacité réduite */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">{project.category}</span>
                      <span className="text-sm text-gray-400">Projet #{project.id}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium bg-[#0f1c3a] text-gray-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedProject(project);
                        setShowModal(true);
                      }}
                      className="w-full sm:w-auto mt-3 px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 hover:text-blue-300 font-semibold text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-all duration-300 active:scale-95 touch-manipulation"
                    >
                      <span>Voir détails</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Contrôles du carrousel avec texte directionnel pour indiquer la circularité */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between items-center px-2 sm:px-4 z-20 pointer-events-none">
            <motion.button 
              onClick={handlePrev}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#162855]/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm pointer-events-auto hover:bg-blue-500 hover:scale-110 transition-all duration-300 relative group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-[#162855]/80 px-2 py-1 rounded-md">
                {currentIndex === 0 ? "Aller à la fin" : `${currentIndex}/${filteredProjects.length}`}
              </span>
            </motion.button>
            
            <motion.button 
              onClick={handleNext}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#162855]/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm pointer-events-auto hover:bg-blue-500 hover:scale-110 transition-all duration-300 relative group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-[#162855]/80 px-2 py-1 rounded-md">
                {currentIndex >= filteredProjects.length - visibleProjects ? "Revenir au début" : `${currentIndex + 2}/${filteredProjects.length}`}
              </span>
            </motion.button>
          </div>
          
          {/* Instructions de navigation améliorées - plus visibles sur mobile */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden text-white/80 text-sm font-medium flex items-center gap-1 bg-blue-500/40 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Glissez pour voir tous les projets
          </motion.div>
        </div>
        
        {/* Barre de progression du carrousel avec animation améliorée - plus visible sur mobile */}
        <div className="container-section mt-6 sm:mt-8">
          <div className="w-full bg-[#162855] h-1.5 sm:h-1 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 origin-left"
              initial={{ scaleX: 0 }}
              animate={progressControls}
              transition={{ ease: "circOut" }}
            />
            
            {/* Marqueurs de projets */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {filteredProjects.map((_, idx) => (
                <div 
                  key={`marker-${idx}`} 
                  className={`w-1 h-1 rounded-full ${
                    idx <= currentIndex ? 'bg-white' : 'bg-[#2d4893]'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <span className="hidden sm:inline">Projets uniques</span>
              <span className="sm:hidden">Projets</span>
            </span>
            <span className="font-medium">{currentIndex + 1} / {filteredProjects.length}</span>
          </div>
        </div>
        
        {/* Indicateurs de page (dots) avec animations améliorées - Ajusté pour mobile */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2 flex-wrap">
          {filteredProjects.map((project, index) => (
            <motion.button
              key={`dot-${project.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setCurrentIndex(index);
                
                // Animer la position avec spring
                const newX = -(offset + index) * cardWidth;
                springX.set(newX);
                
                progressControls.start({
                  scaleX: index / Math.max(1, filteredProjects.length - visibleProjects),
                  transition: { duration: 0.4 }
                });
                
                setTimeout(() => setIsAnimating(false), 300);
              }}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-blue-500 w-6' : 'bg-[#162855] hover:bg-[#2d4893]'
              }`}
              aria-label={`Aller au projet ${index + 1}`}
            >
              {currentIndex === index && (
                <motion.span 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full opacity-0 pointer-events-none" 
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index + 1}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="#contact"
              className="btn bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-5 px-10 rounded-xl text-lg font-semibold shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:translate-y-[-3px] inline-flex items-center gap-3"
            >
              <span>Discuter de votre projet</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-gray-400 mt-4 text-sm"
          >
            Réponse sous 24h - Devis gratuit et sans engagement
          </motion.p>
        </div>
      </div>

      {/* Modal de détails de projet */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#162855] rounded-t-2xl sm:rounded-2xl overflow-hidden w-full sm:max-w-4xl sm:mx-auto shadow-2xl border border-blue-500/20 my-auto mt-20 sm:mt-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#162855]/80"></div>
                
                {/* Bouton de fermeture plus visible et accessible sur mobile */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-[#0f1c3a]/90 hover:bg-red-500/30 text-white transition-colors z-10 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Titre du projet affiché sur l'image pour gagner de l'espace sur mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <span className="inline-block px-4 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-medium mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-shadow-sm drop-shadow-lg">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-5 sm:p-6 md:p-8">
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {selectedProject.description}
                  </p>
                </div>
                
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Technologies utilisées :</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-[#0f1c3a] text-gray-300 rounded-lg text-xs sm:text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-4">
                  <h4 className="text-white font-semibold text-sm sm:text-base">Fonctionnalités clés :</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                    {selectedProject.id === 1 && (
                      <>
                        <li>Système de commande en ligne avec panier</li>
                        <li>Paiement sécurisé avec Stripe</li>
                        <li>Interface administrateur pour la gestion des commandes</li>
                        <li>Design responsive pour mobile et bureau</li>
                      </>
                    )}
                    {selectedProject.id === 2 && (
                      <>
                        <li>Système de gestion des rendez-vous</li>
                        <li>Messagerie entre praticiens et patients</li>
                        <li>Suivi nutritionnel personnalisé</li>
                        <li>Authentification sécurisée des utilisateurs</li>
                      </>
                    )}
                    {selectedProject.id === 3 && (
                      <>
                        <li>Galerie de photos des réalisations</li>
                        <li>Système de prise de rendez-vous en ligne</li>
                        <li>Témoignages clients</li>
                        <li>Optimisation SEO pour le référencement local</li>
                      </>
                    )}
                    {selectedProject.id === 4 && (
                      <>
                        <li>Catalogue des produits de boulangerie</li>
                        <li>Horaires et informations de contact</li>
                        <li>Blog avec recettes et actualités</li>
                        <li>Interface de gestion de contenu simple</li>
                      </>
                    )}
                    {selectedProject.id === 5 && (
                      <>
                        <li>Présentation des cours collectifs et planning</li>
                        <li>Profils des coachs sportifs</li>
                        <li>Système d'abonnement en ligne</li>
                        <li>Espace membre avec suivi des performances</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <Link
                    href="#contact"
                    onClick={() => setShowModal(false)}
                    className="w-full sm:w-auto btn bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg text-base font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform hover:translate-y-[-2px] transition-all duration-300 active:scale-95 touch-manipulation"
                  >
                    <span>Demander un projet similaire</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
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