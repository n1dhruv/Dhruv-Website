'use client'

import { useEffect, useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';
import { getTheme, getBootedThemeId } from '../data/themes';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getContributionText = (count, dateString) => {
  const formattedDate = formatDate(dateString);
  if (count === 0) {
    return `No contributions on ${formattedDate}`;
  }
  if (count === 1) {
    return `1 contribution on ${formattedDate}`;
  }
  return `${count} contributions on ${formattedDate}`;
};

const GithubActivity = () => {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
    x: 0,
    y: 0,
  });

  // Heatmap ramp follows the active banner theme. SSR + hydration use the
  // default ramp (byte-identical, no mismatch); the effect swaps in the
  // booted theme's ramp right after mount, and the 'themechange' listener
  // keeps it in sync when the user switches banners manually.
  const [calColors, setCalColors] = useState(() => getTheme(null).cal);

  useEffect(() => {
    const sync = () => {
      let id = getBootedThemeId();
      if (!id) {
        try {
          id = window.sessionStorage.getItem('dhruv-portfolio-theme');
        } catch {
          id = null;
        }
      }
      setCalColors(getTheme(id).cal);
    };
    sync();
    window.addEventListener('themechange', sync);
    return () => window.removeEventListener('themechange', sync);
  }, []);

  const handleHover = (e, activity) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const text = getContributionText(activity.count, activity.date);
    setTooltip({
      show: true,
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 6,
    });
  };

  return (
    <section id="github-activity" className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="section-label">05 /</span>
        <h2 className="section-title">GitHub Activity</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="panel p-6 flex flex-col items-center justify-center w-full relative"
      >
        <div className="w-full flex justify-center [&_article]:w-full [&_article]:!max-w-full [&_svg]:w-full [&_svg]:h-auto">
          <GitHubCalendar
            username="n1dhruv"
            colorScheme="dark"
            theme={{
              dark: calColors
            }}
            blockSize={10}
            blockMargin={3}
            fontSize={12}
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                onMouseEnter: (e) => handleHover(e, activity),
                onMouseMove: (e) => handleHover(e, activity),
                onMouseLeave: () => {
                  setTooltip((prev) => ({ ...prev, show: false }));
                },
                className: 'transition-all duration-150 hover:stroke-white hover:stroke-[1.5px] cursor-pointer',
              })
            }
          />
        </div>
      </motion.div>

      {/* Floating Contribution Tooltip - Positioned completely above the hovered square */}
      <AnimatePresence>
        {tooltip.show && (
          <div
            key="github-tooltip"
            style={{
              position: 'fixed',
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <div className="px-3 py-1.5 text-xs font-medium text-slate-100 bg-[#161226]/95 border border-[#7859d9]/60 rounded-md shadow-lg shadow-black/80 backdrop-blur-md whitespace-nowrap">
                {tooltip.text}
              </div>
              {/* Caret arrow pointing directly down to the hovered date square */}
              <div className="w-2.5 h-2.5 bg-[#161226]/95 border-r border-b border-[#7859d9]/60 rotate-45 -mt-1.5 z-10" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GithubActivity;
