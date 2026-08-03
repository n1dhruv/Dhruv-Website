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
    id: 2,
    role: 'Flutter Mobile App Developer Intern',
    company: 'Dynamicore Strategies, JAIPUR',
    type: 'internship',
    duration: 'May 2025 – August 2025',
    description: 'Built a Flutter Based Fintech App with portfolio tracking and dynamic responsive layouts. Developed portfolio tracking, mutual fund analysis, investment dashboard, AI portfolio analyzer, and real-time financial data visualization with custom responsive widget library.',
    tech: ['Flutter', 'Dart', 'MediaQuery', 'Figma'],
  },
  {
    id: 3,
    role: 'Software Developer Intern',
    company: 'Aunwesha Knowledge Technologies, KOLKATA',
    type: 'internship',
    duration: 'May 2024 – June 2024',
    description: 'Built an intelligent document search system for AutoCAD and PDF files using OCR and Apache Lucene indexing. Developed a Java-based application with a chatbot interface that enables conversational search across CAD drawings, along with file preview and Excel export for efficient analysis.',
    tech: ['Java', 'Java Swing', 'Apache Lucene', 'Apache POI', 'OCR Tools', 'GroupDocs.Viewer'],
  },
];

const TreeTimeline = () => {
  return (
    <section id="experience" className="py-12 md:py-20 transition-colors duration-500">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading uppercase text-retro-text section-title">Experience</h2>
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
              className={`p-6 md:p-8 flex flex-col md:flex-row gap-6 ${index !== experiences.length - 1 ? 'border-b border-retro-border/50' : ''}`}
            >
              <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4">
                <div className="inline-block px-3 py-1 border border-retro-text/30 font-mono text-xs font-bold text-retro-text uppercase bg-[#111]">
                  {exp.duration}
                </div>
                {exp.type && (
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-retro-border font-mono text-retro-bg ${
                      exp.type.toLowerCase() === 'work'
                        ? 'bg-retro-accent'
                        : exp.type.toLowerCase() === 'internship'
                        ? 'bg-purple-500'
                        : 'bg-green-600'
                    }`}
                  >
                    {exp.type}
                  </span>
                )}
              </div>
              <div className="md:w-3/4 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold font-heading uppercase text-retro-text mb-1">
                  {exp.role}
                </h3>
                <div className="text-sm font-mono text-retro-text-secondary mb-4 uppercase tracking-wider">
                  <span className="text-retro-accent">{exp.company}</span>
                </div>
                <p className="text-sm md:text-base font-sans text-retro-text-secondary leading-relaxed mb-6">
                  {exp.description}
                </p>

                {exp.tech && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] md:text-xs font-bold uppercase text-retro-bg bg-retro-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TreeTimeline;
