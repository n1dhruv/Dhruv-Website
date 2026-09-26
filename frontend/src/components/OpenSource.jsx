'use client'

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiGitPullRequest, FiGitMerge } from 'react-icons/fi';
import { openSourceContributions } from '../data/openSource';

const OpenSource = () => {
  return (
    <section id="open-source" className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mobile-gutter flex items-center gap-3 mb-5"
      >
        <span className="section-label">06 /</span>
        <h2 className="section-title">Open Source</h2>
      </motion.div>

      {/* 2 PRs per horizontal line */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {openSourceContributions.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="project-card flex flex-col justify-between h-full group"
          >
            <div className="p-5 flex flex-col gap-2.5 flex-1">
              {/* Repo header & status */}
              <div className="flex items-center justify-between gap-2">
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-mist hover:text-lilac transition-colors inline-flex items-center gap-1.5 truncate"
                  aria-label={item.project}
                >
                  <FiGithub size={13} className="shrink-0" />
                  <span className="truncate">{item.project}</span>
                </a>

                {item.status && (
                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-wider uppercase px-2 py-0.5 border ${
                      item.status.toLowerCase() === 'merged'
                        ? 'border-lilac/30 bg-lilac/10 text-lilac'
                        : 'border-white/10 bg-white/5 text-mist'
                    }`}
                  >
                    {item.status.toLowerCase() === 'merged' ? (
                      <FiGitMerge size={10} />
                    ) : (
                      <FiGitPullRequest size={10} />
                    )}
                    {item.status}
                  </span>
                )}
              </div>

              {/* Title & minimal description */}
              <div className="mt-1">
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title block"
                >
                  <h3 className="font-display font-bold text-snow text-sm sm:text-base leading-snug tracking-tight group-hover/title:text-lilac transition-colors">
                    {item.prNumber && (
                      <span className="text-lilac font-mono text-xs mr-2 font-normal">
                        {item.prNumber}
                      </span>
                    )}
                    {item.title}
                  </h3>
                </a>
                <p className="text-mist text-xs leading-relaxed mt-1.5 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Minimal tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill text-[0.62rem] py-0.5 px-2">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer link */}
            <div
              className="flex items-center justify-between px-5 py-3 mt-auto"
              style={{ borderTop: '1px solid var(--line)' }}
            >
              <span className="font-mono text-[0.6rem] tracking-widest text-dim uppercase">
                {item.date}
              </span>
              <a
                href={item.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-mist hover:text-snow transition-colors"
              >
                <span>View PR</span>
                <FiExternalLink size={12} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default OpenSource;
