"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Données de témoignages fictives - à remplacer par vos propres témoignages
const testimonials = [
  {
    id: 1,
    name: "D",
    role: "Fondatrice de studio créatif",
    content:
      "J'étais complètement larguée avec mon ancien site... il reflétait pas du tout ce qu'on fait! Le développeur a vraiment pris le temps de comprendre notre univers, ce qu'on voulait transmettre. Quand j'ai vu le résultat, j'y croyais pas! En plus des compliments qu'on reçoit, nos demandes de devis ont grimpé de 40% en deux mois. Une collab au top du début à la fin.",
    rating: 5,
    project: "Site vitrine créatif",
    date: "2023",
    image: "/avatars/avatar1.jpg", 
  },
  {
    id: 2,
    name: "D",
    role: "Directeur Marketing",
    content:
      "Franchement, on avait déjà essayé avec deux autres avant, c'était la cata. Pour une startup comme nous, avoir une image professionnelle, c'est vital. Ce qu'on a apprécié? La réactivité quand on a eu besoin de changements urgents. Le temps passé sur notre site a augmenté de presque 20%, et on reçoit plein de retours positifs. Enfin quelqu'un qui comprend ce qu'on veut!",
    rating: 5,
    project: "Refonte UI/UX",
    date: "2022",
    image: "/avatars/avatar2.jpg",
  },
  {
    id: 3,
    name: "A",
    role: "Artisane",
    content:
      "L'informatique et moi, ça fait deux! J'avais peur de pas être comprise, mais le designer a été hyper patient avec moi. Ma boutique en ligne est juste parfaite, même mieux que ce que j'espérais. Au début y'a eu deux-trois bugs, mais tout a été réglé super vite. Le meilleur dans tout ça? Mes clients trouvent que le site est aussi beau que mes créations, et je peux même le mettre à jour toute seule!",
    rating: 5,
    project: "E-commerce artisanal",
    date: "2023",
    image: "/avatars/avatar3.jpg",
  },
  {
    id: 4,
    name: "F",
    role: "Fondateur d'agence digitale",
    content:
      "Je l'admets, on n'est pas les clients les plus faciles. Notre équipe est super exigeante sur tout ce qui touche au dev. Ce qui nous a bluffés? Les solutions proposées pour optimiser les perfs qu'on n'avait même pas envisagées. Notre plateforme charge maintenant en moins de 2 secondes et le backend est enfin utilisable sans nous donner envie de balancer nos PC par la fenêtre!",
    rating: 5,
    project: "Plateforme technique",
    date: "2023",
    image: "/avatars/avatar4.jpg",
  },
  {
    id: 5,
    name: "P",
    role: "Photographe",
    content:
      "Mon ancien portfolio ne mettait vraiment pas en valeur mon travail, mais je voulais pas investir pour rien. Je suis tellement contente d'avoir sauté le pas! Le site met parfaitement en avant mes photos, même mes clients les moins techno s'y retrouvent facilement. Gros plus: la formation pour que je puisse faire les mises à jour moi-même. Ça paraît rien, mais ça change tout!",
    rating: 5,
    project: "Portfolio visuel",
    date: "2023",
    image: "/avatars/avatar5.jpg",
  },
  {
    id: 6,
    name: "D",
    role: "Fondatrice de studio créatif",
    content:
      "J'étais complètement larguée avec mon ancien site... il reflétait pas du tout ce qu'on fait! Le développeur a vraiment pris le temps de comprendre notre univers, ce qu'on voulait transmettre. Quand j'ai vu le résultat, j'y croyais pas! En plus des compliments qu'on reçoit, nos demandes de devis ont grimpé de 40% en deux mois. Une collab au top du début à la fin.",
    rating: 5,
    project: "Site vitrine créatif",
    date: "2023",
    image: "/avatars/avatar1.jpg", 
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "500px", amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, margin: "500px", amount: 0.1 });
  const maxIndex = testimonials.length - 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-16 md:py-24 bg-[#0f1c3a] overflow-hidden"
    >
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="section-title"
          >
            Ce que disent mes <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">clients</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4 max-w-2xl mx-auto"
          >
            Des témoignages de clients satisfaits qui ont fait confiance à mon expertise.
          </motion.p>
        </div>

        <div className="relative">
          {/* Contrôles du carrousel */}
          <div className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-[#162855] shadow-lg flex items-center justify-center text-gray-300 hover:bg-[#1e3575] transition-colors hover:text-blue-400"
              aria-label="Témoignage précédent"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#162855] shadow-lg flex items-center justify-center text-gray-300 hover:bg-[#1e3575] transition-colors hover:text-blue-400"
              aria-label="Témoignage suivant"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Carrousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#162855] rounded-2xl p-8 shadow-xl border border-[#304b8a]/20 hover:border-blue-400/20 transition-colors">
                    <div className="flex items-start mb-6">
                      {/* Avatar - simple icône représentant la profession */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/30 flex items-center justify-center text-blue-300 mr-4 relative overflow-hidden">
                        {testimonial.name}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white">
                          {testimonial.role}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <span className="inline-block mr-2">{testimonial.project}</span>
                          <span>·</span>
                          <span className="inline-block ml-2">{testimonial.date}</span>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-gray-300 text-base italic mb-6 leading-relaxed relative pl-6">
                      <span className="absolute top-0 left-0 text-blue-400 text-4xl opacity-30 font-serif">"</span>
                      <span className="relative">{testimonial.content}</span>
                      <span className="absolute bottom-0 right-1 text-blue-400 text-4xl opacity-30 font-serif transform rotate-180">"</span>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-blue-500" : "bg-[#162855]"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div ref={statsRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { value: "42", label: "Projets terminés", subtext: "Applications web et sites vitrines livrés à temps", icon: "📊" },
            { value: "100%", label: "Satisfaction client", subtext: "Tous mes clients sont satisfaits de leur projet", icon: "🙂" },
            { value: "5.0", label: "Note moyenne", subtext: "Sur la base des retours clients", icon: "⭐" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 + index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="bg-[#1e3575] rounded-xl p-6 text-center shadow-lg border border-[#304b8a]/30 hover:border-blue-400/30 transition-colors group"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">{stat.value}</div>
              <div className="text-white text-lg tracking-wide mb-2">{stat.label}</div>
              <div className="text-gray-300 text-sm">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 