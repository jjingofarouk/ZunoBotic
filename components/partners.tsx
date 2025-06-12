// components/partners.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const partners = [
    {
      name: "Makerere University",
      logo: "/images/partners/makerere.jpeg",
      category: "Academic",
    },
    {
      name: "Kyambogo University",
      logo: "/images/partners/kyambogo.jpeg",
      category: "Academic",
    },
    {
      name: "Uganda Martyrs University",
      logo: "/images/partners/uganda-martyrs.jpeg",
      category: "Academic",
    },
    {
      name: "Mbarara University",
      logo: "/images/partners/mbarara.jpeg",
      category: "Academic",
    },
    {
      name: "TechBit",
      logo: "/images/partners/techbit.jpeg",
      category: "Industry",
    },
    {
      name: "Innovation Hub Uganda",
      logo: "/images/partners/innovation-hub.jpg",
      category: "Community",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible, partners.length]);

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Partners</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We collaborate with leading universities, tech companies, and communities to empower African innovation in robotics and automation.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full max-w-sm mx-auto"
                >
                  <div
                    className="flex-shrink-0 bg-card hover:bg-card/80 rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-4 bg-background rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img
                          src={partner.logo || "/images/partners/techbit.jpeg"}
                          alt={partner.name}
                          className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{partner.name}</h3>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {partner.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {partners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className={`mt-16 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Academic Partners</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Industry Partners</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Community Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}