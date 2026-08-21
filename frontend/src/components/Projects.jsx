'use client'

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
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
  const [expandedId, setOpen] = useState(null);

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

  const toggle = (id) => setOpen((prev) => (prev === id ? null : id));

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
            const isOpen = expandedId === project.id;
            const hasDemo = project.demo && project.demo !== '#' && project.demo !== '';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="project-card flex flex-col"
              >
                {/* Card header — clickable */}
                <div
                  className="flex flex-col gap-2.5 p-5 cursor-pointer"
                  onClick={() => toggle(project.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={`proj-${project.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(project.id);
                    }
                  }}
                >
                  {/* Year + expand icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.58rem] tracking-widest text-dim uppercase">
                      {project.year}
                    </span>
                    {isOpen ? (
                      <FiChevronUp size={14} className="text-mist" />
                    ) : (
                      <FiChevronDown size={14} className="text-mist" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-snow text-base leading-snug tracking-tight group-hover:text-lilac transition-colors">
                    {project.title}
                  </h3>

                  {/* Short description (collapsed) */}
                  {!isOpen && (
                    <p className="text-mist text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {project.tags.slice(0, 4).map((t) => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tag-pill text-dim">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Expanded detail panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`proj-${project.id}`}
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                      <div
                        className="px-5 pb-5 pt-3 flex flex-col gap-3"
                        style={{ borderTop: '1px solid var(--line)' }}
                      >
                        <p className="text-snow/80 text-sm leading-relaxed">
                          {project.description}
                          {project.achievement && (
                            <> <strong className="text-lilac">{project.achievement}</strong></>
                          )}
                        </p>

                        {project.features && (
                          <ul className="space-y-1.5">
                            {project.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-xs text-mist">
                                <span className="mt-[3px] text-lilac shrink-0">✓</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
    </section>
  );
};

export default Projects;
