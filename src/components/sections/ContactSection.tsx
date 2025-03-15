"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "300px", amount: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    // Simuler un envoi de formulaire
    try {
      // Remplacer par votre logique d'envoi de formulaire réelle
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 bg-[#162855]">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Contactez-<span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">moi</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Une idée de projet ? Besoin d'un devis ? N'hésitez pas à me contacter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Informations de contact simplifiées */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-tight">
                Parlons de votre <span className="text-blue-400">projet</span>
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Que vous ayez besoin d'un nouveau site web, d'une refonte complète ou d'améliorations spécifiques, je suis là pour vous aider à concrétiser votre vision.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <EnvelopeIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:contact.webdesigner68@gmail.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    contact.webdesigner68@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Délais rapides */}
            <div className="bg-[#0f1c3a] p-6 rounded-xl border border-[#304b8a]/30 mt-8">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Délais rapides garantis</span>
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Maquettes en 24-48h</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Sites web en moins de 2 semaines</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Applications en moins d'un mois</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#0f1c3a] rounded-2xl p-8 shadow-xl border border-[#304b8a]/30">
              <h3 className="text-xl font-bold mb-6 text-white leading-tight">
                Envoyez-moi un <span className="text-blue-400">message</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1e3575] border border-[#304b8a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1e3575] border border-[#304b8a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Sujet <span className="text-blue-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1e3575] border border-[#304b8a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  >
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="Nouveau projet">Nouveau projet</option>
                    <option value="Demande de devis">Demande de devis</option>
                    <option value="Site One Page">Site One Page</option>
                    <option value="Site Multipage">Site Multipage</option>
                    <option value="Application Web">Application Web</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1e3575] border border-[#304b8a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : "Envoyer le message"}
                </button>

                {submitSuccess && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg mt-4">
                    <p className="text-green-400 text-sm font-medium text-center">
                      Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg mt-4">
                    <p className="text-red-400 text-sm font-medium text-center">
                      Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ou me contacter directement par email.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 