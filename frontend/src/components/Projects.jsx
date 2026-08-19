'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projects';

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleProject = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold font-heading uppercase text-retro-text section-title mb-8">Projects</h2>

      <div className="border-2 border-retro-border bg-retro-surface shadow-retro flex flex-col">   
        {projects.map((project, index) => {
          const isOpen = expandedId === project.id;
          const detailsId = `project-${project.id}-details`;
          
          const isLastVisible = index === projects.length - 1;

          return (
            <motion.article
              layout={false}
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative transition-colors duration-300 ${isOpen ? 'bg-transparent' : 'bg-transparent'} ${!isLastVisible ? 'border-b border-retro-border/50' : ''}`}
            >
              {/* ALWAYS VISIBLE HEADER */}
              <div 
                className="w-full flex flex-col p-6 hover:bg-white/5 transition-colors group relative z-10 cursor-pointer"
                onClick={() => toggleProject(project.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProject(project.id); } }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={detailsId}
              >
                {/* Title & Tags */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8">
                  <h3 className={`text-base md:text-lg font-heading font-bold uppercase transition-colors leading-tight shrink-0 ${isOpen ? 'text-retro-text' : 'text-retro-text group-hover:text-retro-accent'}`}>
                    {project.title}
                  </h3>
                  <div className="text-[11px] md:text-xs font-sans text-retro-accent/80 tracking-wide md:text-right leading-relaxed lowercase">
                    {project.tags.join(', ')}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap gap-6 mt-3" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retro-accent hover:text-white text-[11px] md:text-xs font-sans transition-colors font-bold uppercase tracking-widest"
                  >
                    GITHUB
                  </a>

                  {(project.demo && project.demo !== '#' && project.demo !== '') && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-retro-accent hover:text-white text-[11px] md:text-xs font-sans transition-colors font-bold uppercase tracking-widest"
                    >
                      LIVE
                    </a>
                  )}
                </div>

                {/* Project Description Preview */}
                <div className={`font-sans text-sm text-retro-text-secondary text-left transition-all duration-300 overflow-hidden w-full ${isOpen ? 'max-h-0 opacity-0 mt-0' : 'max-h-40 opacity-100 mt-4'}`}>
                  <p className="line-clamp-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* EXPANDABLE SYSTEM TERMINAL CONTENT */}
              <motion.div
                id={detailsId}
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
                aria-hidden={!isOpen}
                inert={!isOpen}
              >
                {/* System Terminal Design - Adapted for Accordion Body */}
                <div className="border-t-2 border-retro-accent/50 mx-2 mb-2 bg-transparent relative flex flex-col">
                  <div className="w-full">
                    <div className="w-full p-6 md:p-8 flex flex-col bg-transparent">
                      
                      {/* Description Box */}
                      <div className="flex-1 mb-8 font-sans text-base leading-relaxed text-white font-medium">
                        <h4 className="font-sans text-xs text-retro-text-secondary mb-3 uppercase tracking-wider">Description:</h4>
                        <p>
                          {project.description}
                          {project.achievement && <> <strong>{project.achievement}</strong></>}
                        </p>
                      </div>

                      {project.features && (
                        <div className="mb-0">
                          <h4 className="font-sans text-xs text-retro-text-secondary mb-3 uppercase tracking-wider">KEY_FEATURES:</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-white font-medium">
                                <span className="text-retro-accent mt-1">✓</span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
