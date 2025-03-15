"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "UX/UI Design", level: 92 },
  { name: "Tailwind CSS", level: 98 },
  { name: "Responsive Design", level: 95 },
  { name: "WordPress", level: 85 },
  { name: "Node.js & MongoDB", level: 82 },
  { name: "Framer Motion", level: 90 },
  { name: "Stripe & Firebase", level: 80 },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "300px", amount: 0 });
  
  return (
    <section id="about" ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-[#162855] to-[#0f1c3a]">
      <div className="container-section relative">
        {/* Éléments décoratifs en arrière-plan */}
        <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
      
        <div className="xl:w-1/2 lg:mt-0 mt-10 relative">
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-title"
            >
              À propos de <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">moi</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              Passionné par le développement web depuis 3 ans, je conçois des solutions digitales sur mesure qui allient esthétique et fonctionnalité. Mon approche est centrée sur l'utilisateur et la création d'expériences web intuitives.
            </motion.p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lottie Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Effet de lueur */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full transform scale-90"></div>
              
              {/* Lottie animation */}
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#1e3575] to-[#132347] overflow-hidden relative border border-blue-500/20 shadow-[0_0_25px_rgba(37,99,235,0.2)]">
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/20 rounded-full"></div>
                
                {/* Élements décoratifs */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.15),transparent_70%)]"></div>
                <div className="absolute w-20 h-20 bg-blue-400/10 rounded-full top-10 right-10 animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-16 h-16 bg-indigo-400/10 rounded-full bottom-10 left-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
                
                <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
                  <DotLottieReact
                    src="https://lottie.host/1f9284de-aa68-4d59-90dc-bb79c1003be6/dcgpnGLEPv.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-lg transform rotate-3 border-4 border-[#0f1c3a]">
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-4xl font-bold"
                >
                  3
                </motion.span>
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="text-sm font-medium mt-1"
                >
                  ans d'expérience
                </motion.span>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight"
            >
              Webdesigner passionné <span className="text-blue-400">&</span> développeur front-end
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative p-6 bg-[#132347]/70 rounded-xl border border-blue-500/10 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl"></div>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg relative z-10">
                Depuis <span className="font-medium text-blue-300">3 ans</span>, je crée des expériences web qui allient esthétique et performance. Ma passion est de transformer des idées en interfaces interactives et intuitives qui captent l'attention et engagent les utilisateurs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative p-6 bg-[#132347]/70 rounded-xl border border-blue-500/10 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-xl"></div>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg relative z-10">
                Mon approche combine 
                <span className="relative inline-block mx-1 group">
                  <span className="absolute -inset-1 bg-blue-400/20 blur-sm rounded-lg group-hover:bg-blue-400/30 transition-all duration-300"></span>
                  <span className="relative text-blue-200 font-medium">créativité</span>
                </span>,
                <span className="relative inline-block mx-1 group">
                  <span className="absolute -inset-1 bg-blue-400/20 blur-sm rounded-lg group-hover:bg-blue-400/30 transition-all duration-300"></span>
                  <span className="relative text-blue-200 font-medium">rigueur technique</span>
                </span> et 
                <span className="relative inline-block mx-1 group">
                  <span className="absolute -inset-1 bg-blue-400/20 blur-sm rounded-lg group-hover:bg-blue-400/30 transition-all duration-300"></span>
                  <span className="relative text-blue-200 font-medium">compréhension des besoins utilisateurs</span>
                </span>. 
                Chaque projet est pour moi l'occasion de créer une expérience digitale unique qui répond précisément aux objectifs de mes clients.
              </p>
            </motion.div>
            
            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-6"
            >
              <div className="flex items-center mb-8">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <h4 className="text-xl md:text-2xl font-bold mx-4 text-white">
                  Compétences <span className="text-blue-400">techniques</span>
                </h4>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + (index % 4) * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-[#132347] border border-blue-500/10 rounded-xl p-4 relative overflow-hidden group hover:border-blue-400/30 transition-all duration-300 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50"></div>
                      {/* Overlay de progression */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 z-0 rounded-l-xl" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                      
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex flex-col">
                          <span className="font-bold text-white tracking-wide text-lg mb-1">{skill.name}</span>
                          <div className="w-full h-2 bg-[#0f1c3a] rounded-full overflow-hidden shadow-inner mt-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1.2, delay: 1 + index * 0.15, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full transform scale-125"></div>
                          <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-xl">
                            {skill.level}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 