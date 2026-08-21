'use client'

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch, FiX } from 'react-icons/fi';
import { projects } from '../data/projects';

// Collect unique tags across all projects
const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags.map((t) => t.toLowerCase()))))
  .filter((t) => ['python', 'node.js', 'nodejs', 'ml', 'rag', 'fastapi', 'react', 'typescript', 'docker', 'aws'].includes(t))
  .slice(0, 8)
  .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
];

const Projects = () => {
  const [query, setQuery]     = useState('');
  const [activeTag, setTag]   = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchTag =
        activeTag === 'All' ||
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      const matchQ =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchTag && matchQ;
    });
  }, [query, activeTag]);

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
  [selectedProjectId]);

  const closeModal = () => setSelectedProjectId(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProjectId]);

  return (
    <section id="projects" className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="section-label">03 /</span>
        <h2 className="section-title">Projects</h2>
      </motion.div>

      {/* Search + filter bar */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="// search projects..."
            aria-label="Search projects"
            className="search-input pl-9"
          />
        </div>

        {/* Tag filter pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTag(tag)}
              className={`tag-pill ${activeTag === tag ? 'tag-pill-active' : ''}`}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-mist font-mono text-sm text-center py-12"
            >
              // no results for &ldquo;{query}&rdquo;
            </motion.p>
          )}

          {filtered.map((project, index) => {
            const hasDemo = project.demo && project.demo !== '#' && project.demo !== '';
            
            // If total filtered projects is odd, make the last one span both columns
            const isLastOdd = (filtered.length % 2 !== 0) && (index === filtered.length - 1);

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`project-card flex flex-col h-full ${isLastOdd ? 'sm:col-span-2' : ''}`}
              >
                {/* Card header — clickable */}
                <div
                  className="flex flex-col gap-2.5 p-5 cursor-pointer flex-1"
                  onClick={() => setSelectedProjectId(project.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={selectedProjectId === project.id}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProjectId(project.id);
                    }
                  }}
                >
                  {/* Year */}
                  <span className="font-mono text-[0.58rem] tracking-widest text-dim uppercase">
                    {project.year}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-bold text-snow text-base leading-snug tracking-tight group-hover:text-lilac transition-colors">
                    {project.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-mist text-xs leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                    {project.tags.slice(0, 4).map((t) => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tag-pill text-dim">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Card footer — links */}
                <div
                  className="flex items-center gap-4 px-5 py-3 mt-auto"
                  style={{ borderTop: '1px solid var(--line)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-mist hover:text-snow transition-colors"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <FiGithub size={12} /> GitHub
                  </a>
                  {hasDemo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-mist hover:text-snow transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <FiExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="panel relative w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-mist hover:text-snow bg-black/40 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <FiX size={16} />
              </button>

              {/* Scrollable content area with hidden scrollbar */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-5 md:p-6 flex flex-col gap-5">
                <div>
                  <span className="font-mono text-[0.6rem] tracking-widest text-dim uppercase mb-1.5 block">
                    {selectedProject.year}
                  </span>
                  <h3 className="font-display font-bold text-snow text-xl md:text-2xl leading-snug tracking-tight pr-8">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="tag-pill text-[0.65rem] py-0.5 px-2">{t}</span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-1">
                  <p className="text-snow/90 text-xs md:text-sm leading-relaxed">
                    {selectedProject.description}
                    {selectedProject.achievement && (
                      <> <strong className="text-lilac">{selectedProject.achievement}</strong></>
                    )}
                  </p>

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="mt-1">
                      <h4 className="text-mist text-[0.65rem] font-mono uppercase tracking-wider mb-2">Key Features</h4>
                      <ul className="space-y-1.5">
                        {selectedProject.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-snow/80 leading-relaxed">
                            <span className="mt-[3px] text-lilac shrink-0 text-[10px]">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal footer — links (Fixed at bottom) */}
              <div
                className="flex flex-wrap items-center gap-3 px-5 md:px-6 py-4 bg-[#050505] shrink-0"
                style={{ borderTop: '1px solid var(--line)' }}
              >
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-[0.7rem] py-1.5 px-3"
                >
                  <FiGithub size={12} /> View Source
                </a>
                {selectedProject.demo && selectedProject.demo !== '#' && selectedProject.demo !== '' && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-[0.7rem] py-1.5 px-3"
                  >
                    <FiExternalLink size={12} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
