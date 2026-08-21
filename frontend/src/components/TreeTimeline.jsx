'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const experiences = [
  {
    id: 1,
    role: 'Software Developer Intern',
    company: 'Aerilon Tech',
    location: 'Jaipur',
    type: 'Internship',
    duration: 'Jan 2026 – Jul 2026',
    description: [
      'Built an Agentic RAG system for e-com support, resolving order, cancellation, inventory, and policy queries across 12K+ daily requests, reducing resolution latency from 8 min to 2.5 min ( 68%) & human escalations by 35%.',
      'Implemented HyDE-based query transformation with semantic retrieval, reranking, and context filtering, improving match accuracy by 22% and relevance by 18%, while reducing failed retrievals by 30% for vague or incomplete queries.', 
      'Established RESTful APIs backed by a 14-table PostgreSQL schema, with structured logging across all service layers for request tracing and error monitoring.',
      'Deployed the platform across AWS services (EC2, RDS, S3, SES, Secrets Manager), containerized with Docker.',
      'Developed a comprehensive CI/CD pipeline in GitHub Actions that automated build and deployment processes.'
    ],
    tech: ['Python', 'FastApi', 'Pydantic', 'PostgreSQL', 'AWS', 'Docker', 'Razorpay', 'LangChain', 'HyDE', 'LLMs', 'PGvector'],
  },
  {
    id: 2,
    role: 'AI / Backend Developer Intern',
    company: 'Dynamicore Strategies',
    location: 'Jaipur',
    type: 'Internship',
    duration: 'May 2025 – Aug 2025',
    description: [
      'Delivered an Agentic RAG-powered fintech analysis system, integrating portfolio data, financial documents, market APIs, and news to generate context-aware portfolio insights, risk analysis, and investment intelligence.'
    ],
    tech: ['Python', 'LangGraph', 'RAG', 'LLMs', 'Pinecone', 'PostgreSQL'],
  },
];

const TreeTimeline = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="w-full">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="section-label">02 /</span>
        <h2 className="section-title">Experience</h2>
      </motion.div>

      {/* Consolidated panel */}
      <div className="panel flex flex-col">
        {experiences.map((exp, index) => {
          const isOpen = expandedId === exp.id;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="panel-row flex gap-4"
            >
              {/* Left accent bar */}
              <div className="exp-bar mt-1 self-stretch" aria-hidden="true" />

              {/* Content */}
              <div className="flex flex-col flex-1 min-w-0">
                {/* Header (Clickable) */}
                <div 
                  className="cursor-pointer group flex flex-col gap-3 py-1"
                  onClick={() => toggle(exp.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(exp.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className="font-mono text-[0.6rem] tracking-widest uppercase self-start px-2 py-0.5"
                      style={{ background: 'var(--navy)', color: '#fff', border: '1px solid var(--navy-mid)' }}
                    >
                      {exp.duration}
                    </span>
                    <div className="p-1 rounded-full bg-[#111111] border border-retro-border text-mist group-hover:text-snow transition-colors">
                      {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-snow text-base sm:text-lg leading-snug tracking-tight group-hover:text-lilac transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-mist text-xs font-mono mt-0.5 uppercase tracking-wide">
                      {exp.company} &mdash; {exp.location}
                    </p>
                  </div>

                  {/* Summary Tech Tags (Hidden when open) */}
                  {!isOpen && exp.tech && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {exp.tech.slice(0, 4).map((t) => (
                        <span key={t} className="tag-pill text-[0.65rem] py-0.5 px-2">{t}</span>
                      ))}
                      {exp.tech.length > 4 && (
                        <span className="tag-pill text-[0.65rem] py-0.5 px-2 text-dim">+{exp.tech.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2">
                        {/* Description List */}
                        <ul className="text-snow/80 text-sm leading-relaxed space-y-2 pr-2">
                          {Array.isArray(exp.description) ? (
                            exp.description.map((point, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-[7px] w-1 h-1 rounded-full bg-lilac shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))
                          ) : (
                            <p>{exp.description}</p>
                          )}
                        </ul>

                        {/* All Tech Tags */}
                        {exp.tech && (
                          <div className="flex flex-wrap gap-1.5 mt-5">
                            {exp.tech.map((t) => (
                              <span key={t} className="tag-pill text-[0.65rem] py-0.5 px-2">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TreeTimeline;
