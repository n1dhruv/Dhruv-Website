'use client'

import { motion } from 'framer-motion';
import { FiCpu, FiTerminal, FiCode, FiSliders } from 'react-icons/fi';
import { setupData } from '../data/setup';

const iconMap = {
  FiCpu,
  FiTerminal,
  FiCode,
  FiSliders,
};

const Setup = () => {
  return (
    <section id="setup" className="w-full">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mobile-gutter flex items-center gap-3 mb-5"
      >
        <span className="section-label">07 /</span>
        <h2 className="section-title">Setup</h2>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {setupData.map((group, index) => {
          const IconComponent = iconMap[group.icon] || FiCpu;

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="panel p-5 md:p-6 flex flex-col justify-between group transition-colors duration-300 hover:border-line-strong"
            >
              <div>
                {/* Header */}
                <div
                  className="flex items-center justify-between pb-3.5 mb-4"
                  style={{ borderBottom: '1px solid var(--line)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent className="text-lilac" size={15} />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-snow font-bold">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.58rem] text-dim tracking-widest uppercase">
                    {group.tag}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3.5">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[0.66rem] text-mist tracking-wide uppercase shrink-0">
                          {item.label}
                        </span>
                        <span className="font-display font-medium text-snow text-xs sm:text-sm text-right truncate">
                          {item.value}
                        </span>
                      </div>
                      {item.detail && (
                        <p className="text-[0.72rem] text-dim font-sans leading-tight">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Setup;
