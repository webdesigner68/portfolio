"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

// Hook personnalisé pour détecter quand un élément est visible lors du défilement
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Mettre à jour l'état lorsque l'élément devient visible
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        // Réinitialiser l'état lorsque l'élément n'est plus visible
        // Cela permet de rejouer l'animation à chaque fois que l'élément entre dans la vue
        setIsVisible(false);
      }
    }, {
      // Options par défaut pour l'Intersection Observer
      threshold: 0.1, // Déclencher lorsque 10% de l'élément est visible
      rootMargin: '0px', // Pas de marge supplémentaire
      ...options // Permettre de personnaliser les options
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Nettoyer l'observer lorsque le composant est démonté
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return { elementRef, isVisible };
}

// Interface pour les props du composant AnimateOnScroll
interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-left" | "fade-in-right" | "zoom-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  [key: string]: any;
}

// Composant pour animer les éléments au défilement
export function AnimateOnScroll({ 
  children, 
  animation = "fade-in", 
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  ...props 
}: AnimateOnScrollProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold });

  // Définir les styles d'animation en fonction de l'animation choisie
  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: 0,
      transition: `all ${duration}s ease-out ${delay}s`,
    };

    const visibleStyles = {
      opacity: 1,
    };

    switch (animation) {
      case "fade-in":
        return {
          initial: { ...baseStyles, transform: 'translateY(20px)' },
          animate: { ...visibleStyles, transform: 'translateY(0)' },
        };
      case "fade-in-left":
        return {
          initial: { ...baseStyles, transform: 'translateX(-20px)' },
          animate: { ...visibleStyles, transform: 'translateX(0)' },
        };
      case "fade-in-right":
        return {
          initial: { ...baseStyles, transform: 'translateX(20px)' },
          animate: { ...visibleStyles, transform: 'translateX(0)' },
        };
      case "zoom-in":
        return {
          initial: { ...baseStyles, transform: 'scale(0.95)' },
          animate: { ...visibleStyles, transform: 'scale(1)' },
        };
      default:
        return {
          initial: baseStyles,
          animate: visibleStyles,
        };
    }
  };

  const { initial, animate } = getAnimationStyles();
  const styles = isVisible ? { ...initial, ...animate } : initial;

  return (
    <div
      ref={elementRef}
      className={className}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
} 