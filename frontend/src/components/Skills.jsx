'use client'

import { motion } from 'framer-motion';
import {
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiDocker,
  SiLinux,
  SiGithub,
  SiGithubactions,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiAmazonwebservices,
  SiAmazons3,
  SiHuggingface,
  SiPydantic,
  SiPytest,
  SiHtml5,
  SiLangchain,
  SiOllama,
} from 'react-icons/si';

import {
  TbSql,
  TbDatabaseSearch,
  TbVector,
  TbBrain,
  TbBinaryTree,
  TbBooks,
  TbApi,
  TbNetwork,
  TbServerCog,
  TbClockCog,
  TbTestPipe,
  TbChecks,
  TbBrowserCheck,
  TbVectorTriangle,
  TbGitBranch,
  TbCode,
} from 'react-icons/tb';

const skillIcons = {
  'Python': SiPython,
  'TypeScript': SiTypescript,
  'C++': SiCplusplus,
  'SQL': TbSql,
  'HTML/CSS': SiHtml5,
  'RAG': TbDatabaseSearch,
  'Hybrid Search': TbVector,
  'Prompt Engineering': TbBrain,
  'Langchain': SiLangchain,
  'Langgraph': TbBinaryTree,
  'LlamaIndex': SiOllama || TbBooks,
  'Hugging Face': SiHuggingface,
  'FastAPI': SiFastapi,
  'Nodejs': SiNodedotjs,
  'Express.js': SiExpress,
  'RESTful APIs': TbApi,
  'Distributed Systems': TbNetwork,
  'Microservices': TbServerCog,
  'Background Jobs': TbClockCog,
  'Pydantic': SiPydantic,
  'Pytest': SiPytest,
  'Unit Testing': TbTestPipe,
  'Integration Testing': TbChecks,
  'E2E Testing': TbBrowserCheck,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Pinecone': TbVectorTriangle,
  'Redis': SiRedis,
  'Supabase': SiSupabase,
  'AWS S3 (Simple Storage Service)': SiAmazons3,
  'CI/CD': TbGitBranch,
  'Docker': SiDocker,
  'Linux': SiLinux,
  'Git & Github': SiGithub,
  'Github Actions': SiGithubactions,
  'Amazon Web Services(AWS)': SiAmazonwebservices,
};

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
        <span className="section-label">06 /</span>
        <h2 className="section-title">Skills</h2>
      </motion.div>

      {/* Skills Cloud */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="panel p-5 sm:p-6 md:p-8 flex flex-wrap gap-2.5"
      >
        {allSkills.map((skill) => {
          const Icon = skillIcons[skill] || TbCode;

          return (
            <span
              key={skill}
              className="tag-pill text-[0.72rem] sm:text-[0.75rem] pl-1.5 pr-3 py-1.5 inline-flex items-center gap-2 group/skill hover:border-lilac transition-all duration-200 cursor-default"
            >
              {/* Square Logo Box */}
              <span className="w-5 h-5 rounded-[3px] bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-mist group-hover/skill:text-lilac group-hover/skill:border-lilac/40 group-hover/skill:bg-lilac/[0.08] transition-all duration-200">
                <Icon size={12} />
              </span>
              <span className="tracking-wide text-snow/90 group-hover/skill:text-snow transition-colors">
                {skill}
              </span>
            </span>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
