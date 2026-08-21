'use client'

import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github-activity', label: 'Activity' },
  { id: 'skills', label: 'Skills' },
];

const TableOfContents = () => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // We find the entry that is intersecting. If multiple, we take the first one.
        // Expanding the rootMargin gives a much larger "active zone" in the middle of the screen
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveId(id); // Instantly highlight when clicked
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={`group flex items-center justify-end gap-3 text-[10px] uppercase tracking-widest font-mono transition-all duration-300 ${
            activeId === id ? 'text-lilac' : 'text-mist/40 hover:text-mist'
          }`}
        >
          <span className={`transition-opacity duration-300 ${activeId === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {label}
          </span>
          <div 
            className={`h-[2px] rounded-full transition-all duration-300 ${
              activeId === id ? 'w-8 bg-lilac' : 'w-4 bg-mist/40 group-hover:bg-mist group-hover:w-6'
            }`} 
          />
        </a>
      ))}
    </div>
  );
};

export default TableOfContents;
