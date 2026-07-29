import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Backend Developer',
    company: 'Aerilon Tech',
    type: 'Internship',
    duration: 'Jan 2026 – Present',
    description:
      'Building scalable and production-ready backend systems for multiple client projects using Node.js and Express. Developing secure REST APIs, implementing authentication and authorization, optimizing performance, and deploying containerized services on AWS using Docker while following Git-based collaboration workflows.',

    tech: ['JavaScript', 'Node.js', 'Express.js', 'AWS', 'Docker', 'Git'],
  },

  {
    id: 2,
    role: 'Flutter Mobile App Developer Intern',
    company: 'Dynamicore Strategies',
    type: 'internship',
    duration: 'May 2025 – August 2025',
    description: 'Built a Flutter Based Fintech App with portfolio tracking and dynamic responsive layouts. Developed portfolio tracking, mutual fund analysis, investment dashboard, AI portfolio analyzer, and real-time financial data visualization with custom responsive widget library.',
    tech: ['Flutter', 'Dart', 'MediaQuery', 'Figma'],
  },
  {
    id: 3,
    role: 'Software Developer Intern',
    company: 'Aunwesha Knowledge Technologies',
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading uppercase text-retro-text section-title">Experience</h2>
        </motion.div>

        {/* Consolidated Panel */}
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
              {/* Left Column: Duration & Type Badge */}
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

              {/* Right Column: Details */}
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

                {/* Tech Tags */}
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
