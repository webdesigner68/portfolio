"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Définir nos animations de texte caractère par caractère
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const characterAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Container animation pour un effet plus élégant
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3
    }
  }
};

// Animation du titre principal
const titleAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Ajout d'une animation pour le curseur clignotant
const cursorVariants = {
  blink: {
    opacity: [0, 0.8, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "linear"
    }
  }
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      
      timeline.to(".hero-parallax", {
        y: 100,
        opacity: 0.8,
        ease: "none",
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1c3a] via-[#162855] to-[#1e3575] pt-20"
    >
      {/* Background elements with enhanced blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#0c1631]/50 rounded-full blur-3xl hero-parallax"></div>
        {/* Ajout de quelques particules supplémentaires pour l'ambiance */}
        <div className="absolute top-1/3 left-2/3 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl hero-parallax"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-400/5 rounded-full blur-2xl hero-parallax"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left lg:col-span-7 relative"
          >
            <div className="text-5xl md:text-6xl xl:text-7xl mb-6 font-bold text-white leading-tight tracking-tight relative">
              {/* Titre sur une seule ligne avec animation plus sophistiquée */}
              <motion.div 
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="relative inline-flex flex-wrap items-baseline"
              >
                <div className="flex flex-wrap items-baseline">
                  <motion.span className="inline-block mr-3 bg-blue-600 py-3 px-6 rounded-lg">
                    Hello,
                  </motion.span>
                
                  <motion.span
                    className="inline-flex items-baseline relative"
                  >
                    <motion.div
                      variants={containerAnimation}
                      initial="hidden" 
                      animate="visible"
                    >
                      {Array.from("Je suis").map((char, index) => (
                        <motion.span
                          key={index}
                          variants={characterAnimation}
                          className="inline-block origin-bottom"
                          style={{ 
                            display: char === " " ? "inline" : "inline-block",
                            marginRight: char === " " ? "0.2em" : "-0.01em"
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.span>
                </div>
              </motion.div>
              
              <div className="mt-4 md:mt-6 relative">
                {/* "WebDesigner68" avec animation améliorée */}
                <motion.div
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                  transition={{ 
                    delay: 1.4, 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block relative"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text inline-block">
                    WebDesigner68
                  </span>
                  
                  {/* Effet de brillance qui se déplace sur le texte */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text pointer-events-none"
                    animate={{ 
                      x: ["120%", "-20%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  >
                    <span className="opacity-0">WebDesigner68</span>
                  </motion.span>
                </motion.div>
              </div>
            </div>
            
            {/* "Designer & Développeur Web" avec animation améliorée */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 2.2, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mb-6 text-3xl font-medium text-white relative"
            >
              <span>Designer & Développeur Web</span>
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400/40"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
              />
            </motion.h2>
            
            {/* Description avec une meilleure animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.7, ease: "easeOut" }}
              className="text-lg md:text-xl mb-8 text-gray-300 max-w-lg mx-auto lg:mx-0"
            >
              Je conçois et développe des sites web modernes et interactifs qui captivent votre audience.
            </motion.p>
            
            {/* Boutons d'action avec animation améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.7, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Link href="#portfolio" className="btn bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-1">
                VOIR MES PROJETS
              </Link>
              <Link href="#contact" className="btn border border-white/30 hover:bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                ME CONTACTER
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Lottie Animation avec apparence améliorée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative block lg:col-span-5 order-first lg:order-last"
          >
            <div className="relative mx-auto lg:ml-auto">
              <div className="w-full aspect-[1/1] max-w-md mx-auto lg:mx-0 px-4 md:px-0 relative">
                {/* Glow effects améliorés */}
                <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '10s' }}></div>
                
                {/* Animation container avec effets décoratifs améliorés */}
                <div className="relative z-10 w-full h-full">
                  <div className="absolute top-0 left-1/4 w-8 h-8 bg-blue-400/20 rounded-full blur-sm animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-indigo-400/30 rounded-full blur-sm animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/3 right-10 w-4 h-4 bg-purple-400/20 rounded-full blur-sm animate-pulse" style={{ animationDuration: '3s' }}></div>
                  
                  <div className="w-full h-full bg-gradient-to-br from-[#1e3575]/50 to-[#0f1c3a]/50 backdrop-blur-sm rounded-2xl overflow-hidden p-3 border border-white/5 shadow-[0_0_15px_rgba(30,53,117,0.5)] relative">
                    {/* Ajout d'un effet de brillance qui circule autour du cadre */}
                    <motion.div 
                      className="absolute inset-0 -m-1 rounded-2xl pointer-events-none"
                      style={{ 
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        backgroundSize: "200% 100%" 
                      }}
                      animate={{ 
                        backgroundPosition: ["200% 0", "0% 0", "-200% 0"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                        repeatDelay: 1
                      }}
                    />
                    
                    <DotLottieReact
                      src="https://lottie.host/d722af51-5649-4691-ae29-10e2e95b7481/l9xm0LHZNV.lottie"
                      loop
                      autoplay
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator avec animation améliorée */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <motion.span 
              className="text-sm mb-2"
              animate={{ y: [0, -3, 0] }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse"
              }}
            >
              Découvrir
            </motion.span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1 hover:border-white transition-colors duration-300">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              ></motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 