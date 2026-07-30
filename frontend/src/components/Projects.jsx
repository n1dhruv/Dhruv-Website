import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';
import accident from '../assets/accident.jpeg'
import dihImage from '../assets/dih_tix.png'
import cvip from '../assets/cvip.png'
import blogVerse from '../assets/blog-verse.png'
import stonks from '../assets/stonks.png'
import canary from '../assets/canary.png'
import medianexus from '../assets/medianexus.png'
import repocraft from '../assets/repocraft.png'
import { FaEthereum } from 'react-icons/fa';

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'MediaNexus',
      description: 'Built a multi-role healthcare platform connecting patients, doctors, and hospital admins on a unified system. The platform digitizes the entire hospital workflow — from hospital discovery and appointment booking to AI-assisted prescriptions and medical record sharing. <b>Achieved 1st Runner up place in HackJKLU v5.0 Hackathon for this project.</b>',
      image: medianexus,
      tags: ['Express.js', `Node.js`, `TypeScript`,`Supabase`, `RAG-Model`, `OpenRouter LLM (arcee-ai/trinity-large-preview)`, `Sarvam AI TTS (bulbul:v3)`],
      github: 'https://github.com/dhruv14122004/medinexus',
      year: "2026",
      demo: '#',
      features: [
        `Atomic slot booking with a 2-step lock-and-confirm flow preventing race conditions using conditional SQL UPDATEs; includes a FIFO waitlist queue with real-time SSE push notifications.`,
        `Patient health chatbot with full anonymized medical history context, multi-report health trend analysis (improving/declining/stable), and a doctor Rx assistant that suggests co-prescriptions and flags drug-drug interactions.`,
        `Converts uploaded PDF lab reports to spoken audio using LLM-based clinical analysis + Sarvam AI TTS, with multi-chunk WAV stitching for seamless playback in English and Hinglish.`,
        `Patients grant document-level access to specific doctors for configurable durations; grants auto-propagate through the referral system.`,
        `Medicine full-text search using a GIN tsvector index with ranked results via a custom SQL RPC`,
        `Auto slot generation via cron jobs seeding appointment slots on a rolling 31-day window for all active doctors.`
      ]
    },
    {
      id: 2,
      title: 'Multi-Class Abnormality Classification',
      description: 'Developed Vision Transformer and ResNet based deep learning model for multi-class classification of endoscopy images, focusing on automated gastrointestinal abnormality detection. <b>Ranked 7th in Capsule Vision 2024 Challenge.</b>',
      image: cvip,
      tags: ['PYTHON', 'ML', `CNN`, `RESNET`, `VIT`, `MVIT`, `DaVIT`, `CUDA`],
      github: 'https://github.com/dhruv14122004/capsule-commandos',
      year: "2024",
      demo: 'https://arxiv.org/abs/2410.19973',
      features: [
        `Used Multiple Model like ResNet, ViT, MViT, DaViT for classification.`,
        `Achieved 92.5% accuracy on the Capsule Vision 2024 dataset.`,
        `Ranked 7th in Capsule Vision 2024 Challenge.`,
      ]
    },
    {
      id: 3,
      title: 'DTIX',
      description: 'Blockchain-based NFT ticketing platform preventing scalping and transparent auctions.',
      image: dihImage,
      year: "2025",
      tags: [`NODEJS`, `EXPRESS`, `MONGODB`, `STRIPE API`, `JWT`, 'REACT', `TAILWIND CSS`],
      github: 'https://github.com/dhruv14122004/Ticket_Booking_app',
      demo: 'https://ticket-booking-app-c64o.vercel.app/',
      features : [
        `Buy, sell, and resell tickets without intermediaries.`,
        `Ticket transfer and resale with transparent pricing.`,
        `Event Browsing and Searching`
      ]
    },
    {
      id: 4,
      title: 'Blog-Verse',
      description: 'BlogVerse is a personal blogging platform for sharing ideas, experiences, and technical insights.It is built with a modern tech stack and optimized for speed and usability.The platform focuses on simplicity, performance, and good user experience.',
      year: "2026",
      image: blogVerse,
      tags: [`NODEJS`, `EXPRESS`, 'MONGODB', `JWT`, `Bcrypt`, `Mistral API`, 'Gemini-API', `IMAGEKIT`, 'REACT', 'TAILWIND CSS'],
      github: 'https://github.com/dhruv14122004/Blog-verse',
      demo: 'https://blog-verse-iota.vercel.app/',
      features: [
        'AI-powered content generation for helping user polish their blogs',
        'Upload Images and Videos using ImageKit',
        'JWT based authentication and authorization',
        'Lazy Loading of Images and Videos'
      ]
    },{
      id: 5,
      title: 'RepoCraft',
      description: 'Repocraft is a full-stack web application that lets developers analyze and visualize any GitHub repository\'s architecture. Users authenticate via GitHub OAuth, select a repository, and the app runs a static analysis pipeline — detecting the tech stack, mapping internal dependencies, identifying API routes and service boundaries — then presents the results as an interactive node-graph and a step-by-step narrative walkthrough of the codebase.',
      year: "2026",
      image: repocraft,
      tags: [` Next.js 19`, `TypeScript`, ' React Flow', 'Framer Motion', 'OpenRouter API', 'Zustand', ' Bun', 'Express', 'PostgreSQL', 'Zod'],
      github: 'https://github.com/dhruv14122004/repocraft',
      demo: 'https://repocraft.vercel.app/',
      features: [
        'Secure login with GitHub, cookie-based sessions persisted in PostgreSQL (7-day expiry)',
        'Browse all your GitHub repos with search/filter, plus a history of past analyses',
        'Detects language, framework, build system, entry points, API routes, service boundaries, and internal dependencies — no AI, fully deterministic',
        'Step-by-step guided tour of the codebase (Overview → Architecture → Entry Points → API Routes → Dependencies → Summary), synchronized with the graph',
        'Results cached for 24 hours per user/repo/branch; force-refresh option available',
        'Rate limiting, Helmet security headers, structured logging, graceful shutdown, and a health check endpoint with DB connectivity probe'
      ]
    },
    {
      id: 5,
      title: 'STONKS',
      description: 'The Virtual Stock Trading Flutter App is a simulation-based platform that allows users to practice stock trading using virtual money. Users can buy and sell stocks, track real-time price movements, and manage their portfolio. The goal is to help users learn trading concepts and strategies without any financial risk.',
      image: stonks,
      tags: [`Flutter`,`NODEJS`, `EXPRESS`, 'MONGODB', `JWT`, `Bcrypt`, `Mistral API`,`Supabase`, `OAuth`,`Freecrypto API`],
      github: 'https://github.com/dhruv14122004/virtual_trading_app',
      demo: '#',
      features: [
        `Real-time or near real-time stock price display`,
        `Virtual wallet with balance tracking`,
        `Buy and sell stocks with instant order execution`,
        `Contains bracket order, stop-loss order, and trailing stop-loss order`,
      ]
    },
    {
      id: 6,
      title: 'Canary Deployment Without Using Service Mesh',
      description: 'Implemented a Canary Deployment strategy in Kubernetes without using a service mesh by running stable and canary application versions simultaneously.Traffic is distributed based on pod replica ratios using a single Kubernetes Service.Demonstrates practical understanding of Docker, Kubernetes deployments, and zero-downtime release strategies.',
      image: canary,
      tags: [`NODEJS`, `EXPRESS`, `Docker`, `Kubernetes`, `MiniKube`],
      github: 'https://github.com/dhruv14122004/canary-deployment-without-using-service-mesh',
      demo: '#',
      features: [
        `Implements canary deployment using native Kubernetes on Minikube without any service mesh`,
        `Runs two versions of an application simultaneously`,
        `Distributes traffic based on pod replica ratios using a single Kubernetes Service`,
        `Rollback to previous version`,
        `Deploy the new version of the application`
      ]
    },
    {
      id: 7,
      title: 'ACCIDENT_DETECTION',
      description: 'Real-time YOLO detection system taking immediate action on accident identification.',
      image: accident,
      tags: ['IOT', 'PYTHON', 'YOLO'],
      github: 'https://github.com/dhruv14122004',
      demo: '#'
    },

  ];

  const tagCounts = {};
  projects.forEach(p => {
    p.tags.forEach(t => {
      const tag = t.trim().toUpperCase();
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  const allTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
    
  const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);
  const hiddenTagsCount = allTags.length > 5 ? allTags.length - 5 : 0;

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || p.tags.some(t => t.trim().toUpperCase() === selectedTag);
    return matchesSearch && matchesTag;
  });

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  const toggleProject = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="pt-20 pb-4">
      <h2 className="text-3xl md:text-5xl font-bold mb-10 font-heading uppercase text-retro-text section-title">Projects ({projects.length})</h2>

      {/* Search & Filter Row */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-retro-text-secondary" />
          <input
            type="text"
            placeholder="SEARCH THE ARCHIVE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-retro-surface border border-retro-border text-retro-text placeholder-retro-text-secondary font-mono text-sm py-2 pl-10 pr-4 focus:border-retro-accent outline-none"
          />
        </div>
        
        {/* Tech Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3 py-1 text-xs font-bold uppercase font-mono transition-colors border ${selectedTag === 'ALL' ? 'bg-retro-accent text-retro-bg border-retro-accent' : 'bg-retro-surface text-retro-text-secondary border-retro-border hover:border-retro-accent'}`}
          >
            ALL
          </button>
          {visibleTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-xs font-bold uppercase font-mono transition-colors border ${selectedTag === tag ? 'bg-retro-accent text-retro-bg border-retro-accent' : 'bg-retro-surface text-retro-text-secondary border-retro-border hover:border-retro-accent'}`}
            >
              {tag}
            </button>
          ))}
          {!showAllTags && hiddenTagsCount > 0 && (
            <button
              onClick={() => setShowAllTags(true)}
              className="px-3 py-1 text-xs font-bold uppercase font-mono border border-retro-text-secondary text-retro-text-secondary hover:text-retro-accent hover:border-retro-accent transition-colors"
            >
              +{hiddenTagsCount}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">   
        {displayedProjects.map((project, index) => {
          const isOpen = expandedId === project.id;
          const num = (index).toString().padStart(2, '0');

          return (
            <motion.div
              layout={false} // Disable layout bounce as per previous request
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`mb-4 relative rounded-none border-2 transition-colors duration-300 ${isOpen ? 'border-retro-accent bg-[#0d0d0d]' : 'border-retro-border bg-retro-surface'}`}
            >
              {/* ALWAYS VISIBLE HEADER */}
              <button
                onClick={() => toggleProject(project.id)}
                className="w-full flex flex-col md:flex-row items-start gap-4 md:gap-8 p-6 text-left hover:bg-white/5 transition-colors group relative z-10"
              >
                {/* Number aligned with title */}
                <span className={`text-4xl md:text-5xl font-heading font-extrabold leading-none transition-colors mt-1 w-24 md:w-32 shrink-0 text-right ${isOpen ? 'text-retro-accent' : 'text-retro-text/50 group-hover:text-retro-text'}`}>
                  {num}/
                </span>

                <div className="flex-1 mt-1">
                  <h3 className={`text-xl md:text-2xl font-heading font-bold uppercase mb-1 transition-colors leading-none ${isOpen ? 'text-retro-text' : 'text-retro-text group-hover:text-retro-accent'}`}>
                    {project.title}
                  </h3>

                  {/* Skills visible in outer card (Preview) */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className={`px-2 py-1 text-[10px] md:text-xs font-bold uppercase text-retro-bg ${isOpen ? 'bg-retro-accent' : 'bg-retro-text-secondary'}`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={`px-2 py-1 text-[10px] md:text-xs font-bold border uppercase ${isOpen ? 'text-retro-accent border-retro-accent' : 'text-retro-text-secondary border-retro-text-secondary'}`}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto md:ml-auto md:pt-2">
                  {/* Action Icons */}
                  <div className="flex items-center gap-3 mr-2 md:mr-4 border-r border-retro-border pr-2 md:pr-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-retro-text-secondary hover:text-retro-accent transition-colors"
                      title="Source Code"
                    >
                      <FiGithub size={20} />
                    </a>
                    {(project.demo && project.demo !== '#' && project.demo !== '') && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-retro-text-secondary hover:text-retro-accent transition-colors"
                        title="Live Demo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-retro-accent block md:hidden">{isOpen ? 'CLOSE' : 'VIEW'}</span>
                  <div className="flex items-center gap-2">
                    <span className="hidden md:block text-xs font-mono text-retro-accent uppercase tracking-wider">{isOpen ? 'COLLAPSE' : 'DETAILS'}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-retro-accent"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>

              {/* EXPANDABLE SYSTEM TERMINAL CONTENT */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {/* System Terminal Design - Adapted for Accordion Body */}
                <div className="border-t-2 border-retro-accent/50 mx-2 mb-2 bg-[#111] shadow-inner relative flex flex-col">

                  {/* Image Section with Overlay UI */}
                  <div className="w-full h-48 md:h-60 relative group shrink-0 border-b-2 border-retro-text/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

                    {/* Image Overlay Data */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm border border-retro-text/30 px-2 py-1 z-20">
                      <p className="font-mono text-[10px] text-retro-text">IMG_SRC: {project.title.substring(0, 8).toUpperCase()}_V1.0</p>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="flex flex-col md:flex-row">

                    {/* Left Sidebar: Tech & Meta */}
                    <div className="md:w-1/3 border-r-0 md:border-r border-retro-text/20 bg-[#0a0a0a] p-6 flex flex-col gap-6">

                      {/* Year / ID */}
                      <div className="flex items-center justify-between border-b border-retro-text/20 pb-2">
                        <span className="font-mono text-xs text-retro-text-secondary">ID: {num}</span>
                        <span className="font-mono text-xs text-retro-text font-bold">{project.year || '2024'}</span>
                      </div>

                      {/* Stack Trace */}
                      <div className="flex-1">
                        <h4 className="font-mono text-xs text-retro-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-retro-accent rounded-sm animate-pulse"></span>
                          Stack_Trace
                        </h4>
                        <div className="flex flex-wrap md:flex-col gap-2">
                          {project.tags.map((tag, i) => (
                            <div key={tag} className="font-mono text-xs text-retro-text/80 hover:text-retro-accent transition-colors cursor-default border-l border-retro-text/20 pl-2 hover:border-retro-accent hover:pl-3 duration-200">
                              {`> ${tag}`}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Main: Description & Actions */}
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col bg-[#111]">
                      {/* Description Box */}
                      <div className="flex-1 mb-8 font-sans text-base leading-relaxed text-gray-300">
                        <h4 className="font-mono text-xs text-retro-text-secondary mb-3 uppercase tracking-wider">Description:</h4>
                        <p dangerouslySetInnerHTML={{ __html: project.description }} />
                      </div>

                      {project.features && (
                        <div className="mb-8">
                          <h4 className="font-mono text-xs text-retro-text-secondary mb-3 uppercase tracking-wider">KEY_FEATURES:</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300">
                                <span className="text-retro-accent mt-1">✓</span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-6 border-t border-dashed border-retro-text/30">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-retro-text text-retro-text text-xs font-mono uppercase hover:bg-retro-text hover:text-retro-bg transition-all"
                        >
                          <FiGithub className="group-hover:rotate-12 transition-transform" />
                          <span>SOURCE CODE</span>
                        </a>

                        {(project.demo && project.demo !== '#' && project.demo !== '') && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-3 px-4 py-3 bg-retro-accent/10 border border-retro-accent text-retro-accent text-xs font-mono uppercase hover:bg-retro-accent hover:text-retro-bg transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
                          >
                            <FiExternalLink className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            <span>[ RUN_DEMO ]</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length > 4 && (
        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className="w-full py-4 mt-6 border border-retro-border bg-retro-surface hover:border-retro-accent hover:text-retro-accent text-retro-text-secondary transition-colors font-mono font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
        >
          {showAllProjects ? "SHOW LESS" : `SHOW MORE (${filteredProjects.length - 4})`}
          <motion.div
            animate={{ rotate: showAllProjects ? 180 : 0 }}
          >
            ▼
          </motion.div>
        </button>
      )}
    </section>
  );
};

export default Projects;
