'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';
import { projects } from '../data/projects';

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const tagCounts = {};
  projects.forEach(p => {
    p.tags.forEach(t => {
      const tag = t.trim().toUpperCase();
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
    
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);
  const hiddenTagsCount = allTags.length > 5 ? allTags.length - 5 : 0;

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || p.tags.some(t => t.trim().toUpperCase() === selectedTag);
    return matchesSearch && matchesTag;
  });

  const toggleProject = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="pt-6 md:pt-8 pb-6 md:pb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading uppercase text-retro-text section-title">Projects ({projects.length})</h2>

      {/* Search & Filter Row */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <label htmlFor="project-search" className="sr-only">Search projects</label>
          <FiSearch aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-text-secondary" />
          <input
            id="project-search"
            type="text"
            placeholder="SEARCH THE ARCHIVE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-retro-surface border border-retro-border text-retro-text placeholder-retro-text-secondary font-sans text-sm py-2 pl-10 pr-4 focus:border-retro-accent outline-none"
          />
        </div>
        
        {/* Tech Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('ALL')}
            aria-pressed={selectedTag === 'ALL'}
            className={`px-3 py-1 text-xs font-bold uppercase font-sans transition-colors border ${selectedTag === 'ALL' ? 'bg-retro-accent text-retro-bg border-retro-accent' : 'bg-retro-surface text-retro-text-secondary border-retro-border hover:border-retro-accent'}`}
          >
            ALL
          </button>
          {visibleTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              aria-pressed={selectedTag === tag}
              className={`px-3 py-1 text-xs font-bold uppercase font-sans transition-colors border ${selectedTag === tag ? 'bg-retro-accent text-retro-bg border-retro-accent' : 'bg-retro-surface text-retro-text-secondary border-retro-border hover:border-retro-accent'}`}
            >
              {tag}
            </button>
          ))}
          {!showAllTags && hiddenTagsCount > 0 && (
            <button
              onClick={() => setShowAllTags(true)}
              className="px-3 py-1 text-xs font-bold uppercase font-sans border border-retro-text-secondary text-retro-text-secondary hover:text-retro-accent hover:border-retro-accent transition-colors"
            >
              +{hiddenTagsCount}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">   
        {filteredProjects.map((project, index) => {
          const isOpen = expandedId === project.id;
          const num = (index).toString().padStart(2, '0');
          const detailsId = `project-${project.id}-details`;

          return (
            <motion.article
              layout={false} // Disable layout bounce as per previous request
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`${index >= 4 && !showAllProjects ? 'hidden' : ''} mb-4 relative rounded-none border-2 transition-colors duration-300 ${isOpen ? 'border-retro-accent bg-[#0d0d0d]' : 'border-retro-border bg-retro-surface'}`}
            >
              {/* ALWAYS VISIBLE HEADER */}
              <div className="w-full flex flex-col md:flex-row items-start gap-4 md:gap-8 p-6 hover:bg-white/5 transition-colors group relative z-10">
                <button
                  type="button"
                  onClick={() => toggleProject(project.id)}
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  className="flex flex-1 w-full items-start gap-4 md:gap-8 text-left"
                >
                  <div className="flex-1 mt-1">
                    <h3 className={`text-base md:text-lg font-heading font-bold uppercase mb-1 transition-colors leading-tight ${isOpen ? 'text-retro-text' : 'text-retro-text group-hover:text-retro-accent'}`}>
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className={`px-2 py-1 text-[10px] md:text-xs font-bold uppercase ${isOpen ? 'bg-retro-accent text-retro-bg' : 'bg-white text-black font-sans'}`}>
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className={`px-2 py-1 text-[10px] md:text-xs font-bold border uppercase ${isOpen ? 'text-retro-accent border-retro-accent' : 'text-retro-text-secondary border-retro-text-secondary'}`}>
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-4 self-end md:self-auto md:ml-auto md:pt-2">
                  <div className="flex items-center gap-3 mr-2 md:mr-4 border-r border-retro-border pr-2 md:pr-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-retro-text-secondary hover:text-retro-accent transition-colors"
                      aria-label={`${project.title} source code`}
                    >
                      <FiGithub size={20} />
                    </a>
                    {(project.demo && project.demo !== '#' && project.demo !== '') && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-retro-text-secondary hover:text-retro-accent transition-colors"
                        aria-label={`${project.title} live demo`}
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleProject(project.id)}
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    className="flex items-center gap-2 text-retro-accent"
                  >
                    <span className="text-xs font-sans block md:hidden">{isOpen ? 'CLOSE' : 'VIEW'}</span>
                    <span className="hidden md:block text-xs font-sans text-retro-accent uppercase tracking-wider">{isOpen ? 'COLLAPSE' : 'DETAILS'}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-retro-accent"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </motion.div>
                  </button>
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
                <div className="border-t-2 border-retro-accent/50 mx-2 mb-2 bg-[#111] shadow-inner relative flex flex-col">

                  {/* Image Section with Overlay UI */}
                  <div className="w-full h-48 md:h-60 relative group shrink-0 border-b-2 border-retro-text/20">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 1160px"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

                    {/* Image Overlay Data */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm border border-retro-text/30 px-2 py-1 z-20">
                      <p className="font-sans text-[10px] text-retro-text">IMG_SRC: {project.title.substring(0, 8).toUpperCase()}_V1.0</p>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="flex flex-col md:flex-row">

                    {/* Left Sidebar: Tech & Meta */}
                    <div className="md:w-1/3 border-r-0 md:border-r border-retro-text/20 bg-[#0a0a0a] p-6 flex flex-col gap-6">

                      {/* Year / ID */}
                      <div className="flex items-center justify-between border-b border-retro-text/20 pb-2">
                        <span className="font-sans text-xs text-retro-text-secondary">ID: {num}</span>
                        <span className="font-sans text-xs text-retro-text font-bold">{project.year || '2024'}</span>
                      </div>

                      {/* Stack Trace */}
                      <div className="flex-1">
                        <h4 className="font-sans text-xs text-retro-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-retro-accent rounded-sm animate-pulse"></span>
                          Stack_Trace
                        </h4>
                        <div className="flex flex-wrap md:flex-col gap-2">
                          {project.tags.map((tag) => (
                            <div key={tag} className="font-sans text-xs text-retro-text/80 hover:text-retro-accent transition-colors cursor-default border-l border-retro-text/20 pl-2 hover:border-retro-accent hover:pl-3 duration-200">
                              {`> ${tag}`}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Main: Description & Actions */}
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col bg-[#111]">
                      {/* Description Box */}
                      <div className="flex-1 mb-8 font-sans text-base leading-relaxed text-white font-medium">
                        <h4 className="font-sans text-xs text-retro-text-secondary mb-3 uppercase tracking-wider">Description:</h4>
                        <p>
                          {project.description}
                          {project.achievement && <> <strong>{project.achievement}</strong></>}
                        </p>
                      </div>

                      {project.features && (
                        <div className="mb-8">
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

                      {/* Action Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-6 border-t border-dashed border-retro-text/30">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-retro-text text-retro-text text-xs font-sans uppercase hover:bg-retro-text hover:text-retro-bg transition-all"
                        >
                          <FiGithub className="group-hover:rotate-12 transition-transform" />
                          <span>SOURCE CODE</span>
                        </a>

                        {(project.demo && project.demo !== '#' && project.demo !== '') && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 px-4 py-3 bg-retro-accent/10 border border-retro-accent text-retro-accent text-xs font-sans uppercase hover:bg-retro-accent hover:text-retro-bg transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
                          >
                            <FiExternalLink className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            <span>[ RUN_DEMO ]</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>

      {filteredProjects.length > 4 && (
        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className="w-full py-4 mt-6 border border-retro-border bg-retro-surface hover:border-retro-accent hover:text-retro-accent text-retro-text-secondary transition-colors font-sans font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
        >
          {showAllProjects ? "SHOW LESS" : `SHOW MORE (${filteredProjects.length - 4})`}
          <motion.div
            animate={{ rotate: showAllProjects ? 180 : 0 }}
          >
            ▼
          </motion.div>
        </button>
      )}
    </section>
  );
};

export default Projects;
