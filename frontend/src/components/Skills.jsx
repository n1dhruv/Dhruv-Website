'use client'

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'TypeScript', 'C++', 'SQL', 'HTML/CSS']
  },
  {
    title: 'AI and LLM',
    skills: ['RAG', 'Hybrid Search', 'Prompt Engineering', 'Langchain', 'Langgraph', 'LlamaIndex', 'Hugging Face']
  },
  {
    title: 'Backend',
    skills: ['FastAPI', 'Nodejs', 'Express.js', 'RESTful APIs', 'Distributed Systems', 'Microservices', 'Background Jobs', 'Pydantic', 'Pytest', 'Unit Testing', 'Integration Testing', 'E2E Testing']
  },
  {
    title: 'Databases & Cloud',
    skills: ['MongoDB', 'PostgreSQL', 'Pinecone', 'Redis', 'Supabase', 'AWS S3 (Simple Storage Service)']
  },
  {
    title: 'Cloud and Devops',
    skills: ['CI/CD', 'Docker', 'Linux', 'Git & Github', 'Github Actions', 'Amazon Web Services(AWS)']
  }
];

const allSkills = Array.from(new Set(skillCategories.flatMap(c => c.skills)));

const Skills = () => {
  return (
    <section id="skills" className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="section-label">05 /</span>
        <h2 className="section-title">Skills</h2>
      </motion.div>

      {/* Skills Cloud */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="panel p-6 md:p-8 flex flex-wrap gap-2.5"
      >
        {allSkills.map((skill) => (
          <span key={skill} className="tag-pill text-[0.75rem] px-3 py-1.5">
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
