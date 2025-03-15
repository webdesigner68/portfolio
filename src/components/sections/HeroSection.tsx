"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl hero-parallax"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#0c1631]/50 rounded-full blur-3xl hero-parallax"></div>
      </div>
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left lg:col-span-7"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-6xl xl:text-7xl mb-4 font-bold text-white leading-tight"
            >
              Hello, Je suis <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">WebDesigner68</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-6 text-3xl font-medium text-white"
            >
              Designer & Développeur Web
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl mb-8 text-gray-300 max-w-lg mx-auto lg:mx-0"
            >
              Je conçois et développe des sites web modernes et interactifs qui captivent votre audience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Link href="#portfolio" className="btn bg-blue-500 hover:bg-blue-600 text-white">
                VOIR MES PROJETS
              </Link>
              <Link href="#contact" className="btn border border-white/30 hover:bg-white/10 text-white">
                ME CONTACTER
              </Link>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="sr-only">Behance</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.443 5.35c.639 0 1.23.05 1.77.198.513.148.981.373 1.33.742.35.37.639.857.786 1.443.148.586.247 1.28.247 2.093 0 .89-.197 1.628-.541 2.266-.345.637-.937 1.148-1.672 1.541.988.297 1.722.857 2.167 1.64.443.784.689 1.735.689 2.809 0 .89-.148 1.679-.444 2.368-.295.687-.739 1.225-1.231 1.688-.493.463-1.08.833-1.724 1.05-.665.247-1.33.345-2.018.345H1V5.35h6.443zm-.394 5.906c.517 0 .937-.148 1.28-.395.344-.247.492-.689.492-1.327 0-.345-.05-.641-.197-.885-.098-.247-.246-.444-.395-.59-.197-.149-.394-.247-.64-.297-.25-.05-.541-.05-.837-.05H4.273v3.544h2.776zm.147 6.201c.344 0 .639-.05.886-.149.246-.99.443-.248.639-.445.147-.197.295-.444.394-.739.098-.295.147-.59.147-.935 0-.739-.197-1.28-.59-1.63-.394-.347-.937-.494-1.623-.494H4.273v4.392h2.923zM15.959 16.158c.443.443.984.64 1.675.64.541 0 .984-.148 1.378-.442.394-.296.64-.594.738-.984h2.432c-.394 1.181-1.024 2.067-1.821 2.61-.788.543-1.771.837-2.9.837-.788 0-1.479-.097-2.118-.345-.64-.246-1.182-.59-1.624-1.083-.445-.493-.788-1.082-1.034-1.771-.248-.689-.346-1.429-.346-2.215 0-.787.098-1.527.346-2.167.246-.639.591-1.23 1.034-1.724.444-.493.984-.886 1.624-1.131.64-.247 1.38-.346 2.118-.346.886 0 1.624.197 2.312.59.69.394 1.23.886 1.673 1.575.443.64.739 1.378.937 2.166.148.787.148 1.575.098 2.412h-7.307c.1.787.345 1.378.787 1.771zm3.002-4.981c-.345-.394-.886-.64-1.527-.64-.444 0-.788.099-1.083.247-.297.147-.492.345-.689.542-.147.198-.247.395-.297.592-.05.198-.099.346-.099.493h4.342c-.146-.591-.345-1.034-.69-1.428l.043.042v.052zM14.935 7.32h5.405v1.378h-5.405z" />
                </svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <span className="sr-only">Dribbble</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative block lg:col-span-5 order-first lg:order-last"
          >
            <div className="relative mx-auto lg:ml-auto">
              <div className="w-full aspect-[1/1] max-w-md mx-auto lg:mx-0 px-4 md:px-0 relative">
                {/* Glow effects */}
                <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl"></div>
                
                {/* Animation container with decorative elements */}
                <div className="relative z-10 w-full h-full">
                  <div className="absolute top-0 left-1/4 w-8 h-8 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-indigo-400/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="w-full h-full bg-gradient-to-br from-[#1e3575]/50 to-[#0f1c3a]/50 backdrop-blur-sm rounded-2xl overflow-hidden p-3 border border-white/5 shadow-[0_0_15px_rgba(30,53,117,0.5)]">
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
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm mb-2">Découvrir</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
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