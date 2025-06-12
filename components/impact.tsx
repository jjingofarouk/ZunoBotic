// components/impact.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Users, Code, School, Globe } from 'lucide-react';

export default function Impact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const impactMetrics = [
    {
      icon: <Users size={24} />,
      count: '150+',
      label: 'Students Supported',
      description: 'Across multiple universities in Uganda',
      direction: 'left'
    },
    {
      icon: <Code size={24} />,
      count: '42',
      label: 'Open-Source Projects',
      description: 'Solving real community challenges',
      direction: 'right'
    },
    {
      icon: <School size={24} />,
      count: '5',
      label: 'University Partners',
      description: 'Growing network of academic institutions',
      direction: 'left'
    },
    {
      icon: <Globe size={24} />,
      count: '12',
      label: 'Communities Impacted',
      description: 'Direct benefits to local populations',
      direction: 'right'
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

  return (
    <section ref={sectionRef} className="bg-background py-16 overflow-hidden">
      <div className="container">
        <h2 className={`text-3xl font-bold text-center mb-12 text-foreground transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Our Impact <span className="text-primary">So Far</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-1000 transform ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${metric.direction === 'left' ? '-translate-x-12' : 'translate-x-12'}`
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="bg-muted p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
                {metric.icon}
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">{metric.count}</h3>
              <h4 className="text-xl font-semibold text-foreground mb-2">{metric.label}</h4>
              <p className="text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}