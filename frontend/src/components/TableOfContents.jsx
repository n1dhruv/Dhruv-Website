'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', number: '01', label: 'Me', code: 'ME' },
  { id: 'experience', number: '02', label: 'Experience', code: 'EXP' },
  { id: 'projects', number: '03', label: 'Projects', code: 'PRJ' },
  { id: 'open-source', number: '04', label: 'Open Source', code: 'OSS' },
  { id: 'github-activity', number: '05', label: 'Activity', code: 'ACT' },
  { id: 'skills', number: '06', label: 'Skills', code: 'SKL' },
  { id: 'setup', number: '07', label: 'Setup', code: 'SET' },
  { id: 'music', number: '08', label: 'Music', code: 'MSC' },
];

const TableOfContents = () => {
  const [activeId, setActiveId] = useState('hero');
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page: always highlight the last section
      if (windowHeight + scrollY >= docHeight - 60) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      // Top of page: always highlight the first section
      if (scrollY < 100) {
        setActiveId(sections[0].id);
        return;
      }

      // Focal reading line at 32% down the viewport
      const focusLine = windowHeight * 0.32;

      let currentSectionId = null;
      let minDistance = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // If the section directly bounds the focal reading line
        if (rect.top <= focusLine && rect.bottom > focusLine) {
          currentSectionId = sections[i].id;
          break;
        }

        // Fallback: find the section closest to the focal line
        const distance = Math.abs(rect.top - focusLine);
        if (distance < minDistance) {
          minDistance = distance;
          currentSectionId = sections[i].id;
        }
      }

      if (currentSectionId) {
        setActiveId(currentSectionId);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    isManualScroll.current = true;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -50;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }

    // Hold lock through smooth scroll duration to prevent intermediate triggers
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 850);
  };

  return (
    <nav
      aria-label="Camera dial page navigation"
      className="hidden xl:flex fixed right-6 xl:right-8 top-1/2 -translate-y-1/2 z-40 select-none"
    >
      {/* Camera Dial Container */}
      <div className="relative flex flex-col items-end py-6 px-2 bg-black/40 backdrop-blur-sm border-r border-white/[0.06]">
        {/* Camera Dial Top Instrument Label */}
        <div className="flex items-center gap-1.5 mb-3 font-mono text-[8px] text-dim tracking-widest uppercase pr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-lilac/80 animate-pulse" />
          <span>CAM // 35mm</span>
        </div>

        {/* Ruler Track */}
        <div className="relative flex flex-col">
          {sections.map(({ id, number, label, code }, index) => {
            const isActive = activeId === id;

            return (
              <div key={id} className="flex flex-col items-end">
                {/* Major Tick Row: Section Marker */}
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className="group relative flex items-center justify-end gap-3 py-1.5 transition-all outline-none"
                  aria-label={`Scroll to ${label}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* Camera Setting Pill / Label */}
                  <div className="flex items-center">
                    {isActive ? (
                      <motion.div
                        layoutId="camera-active-pill"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[rgb(var(--navy)/0.35)] border border-lilac text-snow shadow-[0_0_15px_rgb(var(--lilac)/0.35)]"
                      >
                        <span className="w-1.5 h-1.5 bg-lilac rotate-45 shrink-0" />
                        <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-snow">
                          {number} / {label}
                        </span>
                      </motion.div>
                    ) : (
                      <span className="font-mono text-[10px] tracking-widest uppercase text-mist/40 group-hover:text-snow transition-colors duration-200">
                        {number} · {code}
                      </span>
                    )}
                  </div>

                  {/* Ruler Tick Mark (Major) */}
                  <div className="relative flex items-center justify-end w-7">
                    {isActive ? (
                      <motion.div
                        layoutId="camera-active-needle"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="flex items-center justify-end w-full"
                      >
                        <div className="w-6 h-[2px] bg-lilac shadow-[0_0_8px_rgb(var(--lilac)/0.9)]" />
                        <div className="w-1.5 h-1.5 bg-snow rotate-45 -mr-1 shrink-0 shadow-[0_0_6px_#fff]" />
                      </motion.div>
                    ) : (
                      <div className="w-3.5 h-[1px] bg-white/20 group-hover:w-5 group-hover:bg-white/60 transition-all duration-200" />
                    )}
                  </div>
                </a>

                {/* Minor Tick Marks between sections */}
                {index < sections.length - 1 && (
                  <div className="flex flex-col items-end gap-1.5 my-1 pr-0 w-7">
                    <div className="w-1.5 h-[1px] bg-white/[0.08]" />
                    <div className="w-2.5 h-[1px] bg-white/[0.16]" />
                    <div className="w-1.5 h-[1px] bg-white/[0.08]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Camera Dial Bottom Instrument Label */}
        <div className="mt-3 font-mono text-[8px] text-dim tracking-widest uppercase pr-1">
          <span>f / 2.8 · ISO 100</span>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
