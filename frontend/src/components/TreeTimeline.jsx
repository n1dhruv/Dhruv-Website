'use client'

import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Backend Developer',
    company: 'Aerilon Tech, JAIPUR',
    type: 'Internship',
    duration: 'Jan 2026 – July 2026',
    description:
      'Independently designed and built a production-grade e-commerce backend using Node.js, Express.js, TypeScript, and PostgreSQL, architecting 14 interconnected database tables with Sequelize ORM. I implemented JWT authentication with refresh-token rotation, bcrypt-hashed credentials, and role-based access control across three permission tiers with ownership-level checks. I also built a Razorpay payment integration with HMAC-SHA256 verification, automated GST invoicing, and a nine-state order lifecycle supporting refunds — then deployed it across five AWS services with Docker and a GitHub Actions CI/CD pipeline for dev/prod parity.',

    tech: ['JavaScript', 'Node.js', 'Express.js', 'AWS', 'Docker', 'Git'],
  },

  {
  "id": 2,
  "role": "AI/Backend Developer Intern",
  "company": "Dynamicore Strategies, JAIPUR",
  "type": "internship",
  "duration": "May 2025 – August 2025",
  "description": "Built an Agentic RAG-powered fintech analysis system using LangGraph, integrating portfolio data, financial documents, market APIs, and news to generate context-aware portfolio insights, risk analysis, and investment intelligence.",
  "tech": ["Python", "LangGraph", "RAG", "LLMs", "Pinecone", "PostgreSQL", "Financial APIs"]
}
];

const TreeTimeline = () => {
  return (
    <section id="experience" className="w-full transition-colors duration-500">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading uppercase text-retro-text section-title">Experience</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-2 border-retro-border bg-retro-surface shadow-retro flex flex-col"
        >
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`p-6 md:p-8 flex flex-col gap-4 ${index !== experiences.length - 1 ? 'border-b border-retro-border/50' : ''}`}
            >
              {/* Header: Role/Company on left, Duration on right */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold font-heading uppercase text-retro-text mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-sans text-retro-text-secondary uppercase tracking-wider">
                    <span className="text-retro-accent">{exp.company}</span>
                  </div>
                </div>
                
                <div className="inline-block px-3 py-1 border border-retro-text/30 font-sans text-xs font-bold text-retro-text uppercase bg-[#111] shrink-0 w-fit">
                  {exp.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base font-sans text-white font-medium leading-relaxed mt-2 mb-2">
                {exp.description}
              </p>

              {/* Tech Stack */}
              {exp.tech && (
                <div className="mt-2 text-[10px] md:text-xs font-sans font-bold uppercase text-retro-accent tracking-widest leading-loose">
                  {exp.tech.map((tech, i) => (
                    <span key={i}>
                      {tech}
                      {i !== exp.tech.length - 1 && <span className="mx-2 text-retro-accent/50">•</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TreeTimeline;
