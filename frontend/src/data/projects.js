import blogVerse from '../assets/blog-verse.webp'
import canary from '../assets/canary.webp'
import cvip from '../assets/cvip.webp'
import dihImage from '../assets/dih_tix.webp'
import medianexus from '../assets/medianexus.webp'
import repocraft from '../assets/repocraft.webp'
import stonks from '../assets/stonks.webp'
import makemyresume from '../assets/makemyresume.webp'

export const projects = [

  {
    id: 'makemyresume',
    title: 'Make My Resume',
    description: 'Built an AI-powered resume tailoring platform where users maintain a centralized "Skill Bank" of experiences, projects, and bullet points, then paste in any job description to generate a fully tailored, LaTeX-rendered resume — editable live in-browser.',
    achievement: 'Self-initiated full-stack platform, live at makemyresume.tech, built with a BYOK (bring-your-own-key) architecture so users control their own inference costs.',
    image: makemyresume,
    imageAlt: 'Make My Resume AI resume tailoring platform showing Skill Bank and JD-matched resume generation',
    tags: [
      'FastAPI',
      'Python 3.11+ ',
      'Async SQLAlchemy',
      'Redis & ARQ',
      'Pinecone (Dense + Sparse Vector Search)',
      'RAG & Reranking',
      'LiteLLM',
      'OpenRouter',
      'Pydantic Guardrails',
      'Multi-Tenant Architecture',
      'AES-GCM Encryption',
      'Tectonic LaTeX Engine',
      'PostgreSQL',
      'Supabase Auth & Storage'
    ],
    github: 'https://github.com/n1dhruv/MakeMyResume',
    year: '2026',
    demo: 'https://makemyresume-omega.vercel.app/',
    features: [
      'Architected a per-tenant, 2-stage hybrid search and reranking engine combining 2048-dimensional dense vectors (NVIDIA Nemotron 3 Embed via OpenRouter) and sparse lexical vectors (pinecone-sparse-english-v0) in Pinecone to optimize domain-specific term preservation and semantic recall.',
      'Engineered a deterministic multi-tier LLM fallback and guardrail system using LiteLLM and OpenRouter that routes generation requests through encrypted user-provided API keys (AES-GCM at rest) with automatic failover to server-managed Nemotron models, maintaining 99.9% generation uptime.',
      'Built a SequenceMatcher-based rewrite threshold engine to analyze lexical change ratios (TRIVIAL_REWRITE_MIN_CHANGE_RATIO = 0.35), automatically filtering out superficial LLM paraphrasing and guaranteeing high-value text transformations.',
      'JD parsing pipeline that extracts structured requirements (skills, tools, seniority signals) from a pasted or uploaded job description to drive the matching engine.',
      'Skill Bank system: a reusable, structured store of experiences/projects/skills so one canonical profile can generate many JD-specific resume variants.',
      'Full Supabase-based auth and Postgres schema with in-browser LaTeX resume rendering and live editing.',
    ],
  },
  {
    id: 'medianexus',
    title: 'MediaNexus',
    description: 'Built a multi-role healthcare platform connecting patients, doctors, and hospital admins on a unified system. The platform digitizes the entire hospital workflow — from hospital discovery and appointment booking to AI-assisted prescriptions and medical record sharing.',
    achievement: 'Achieved 1st Runner up place in HackJKLU v5.0 Hackathon for this project.',
    image: medianexus,
    imageAlt: 'MediaNexus healthcare platform interface for patients, doctors, and hospital administrators',
    tags: ['Express.js', 'Node.js', 'TypeScript', 'Supabase', 'RAG-Model', 'OpenRouter LLM (arcee-ai/trinity-large-preview)', 'Sarvam AI TTS (bulbul:v3)'],
    github: 'https://github.com/dhruv14122004/medinexus',
    year: '2026',
    demo: '#',
    features: [
      'Atomic slot booking with a 2-step lock-and-confirm flow preventing race conditions using conditional SQL UPDATEs; includes a FIFO waitlist queue with real-time SSE push notifications.',
      'Patient health chatbot with full anonymized medical history context, multi-report health trend analysis (improving/declining/stable), and a doctor Rx assistant that suggests co-prescriptions and flags drug-drug interactions.',
      'Converts uploaded PDF lab reports to spoken audio using LLM-based clinical analysis + Sarvam AI TTS, with multi-chunk WAV stitching for seamless playback in English and Hinglish.',
      'Patients grant document-level access to specific doctors for configurable durations; grants auto-propagate through the referral system.',
      'Medicine full-text search using a GIN tsvector index with ranked results via a custom SQL RPC',
      'Auto slot generation via cron jobs seeding appointment slots on a rolling 31-day window for all active doctors.',
    ],
  },
  {
    id: 'capsule-vision',
    title: 'Multi-Class Abnormality Classification',
    description: 'Developed Vision Transformer and ResNet based deep learning model for multi-class classification of endoscopy images, focusing on automated gastrointestinal abnormality detection.',
    achievement: 'Ranked 7th in Capsule Vision 2024 Challenge.',
    image: cvip,
    imageAlt: 'Endoscopy abnormality classification results from the Capsule Vision machine learning project',
    tags: ['PYTHON', 'ML', 'CNN', 'RESNET', 'VIT', 'MVIT', 'DaVIT', 'CUDA'],
    github: 'https://github.com/dhruv14122004/capsule-commandos',
    year: '2024',
    demo: 'https://arxiv.org/abs/2410.19973',
    features: [
      'Used Multiple Model like ResNet, ViT, MViT, DaViT for classification.',
      'Achieved 92.5% accuracy on the Capsule Vision 2024 dataset.',
      'Ranked 7th in Capsule Vision 2024 Challenge.',
    ],
  },
  {
    id: 'dtix',
    title: 'DTIX',
    description: 'Blockchain-based NFT ticketing platform preventing scalping and transparent auctions.',
    image: dihImage,
    imageAlt: 'DTIX blockchain ticket marketplace interface with event listings',
    year: '2025',
    tags: ['NODEJS', 'EXPRESS', 'MONGODB', 'STRIPE API', 'JWT', 'REACT', 'TAILWIND CSS'],
    github: 'https://github.com/dhruv14122004/Ticket_Booking_app',
    demo: 'https://ticket-booking-app-c64o.vercel.app/',
    features: [
      'Buy, sell, and resell tickets without intermediaries.',
      'Ticket transfer and resale with transparent pricing.',
      'Event Browsing and Searching',
    ],
  },
  {
    id: 'canary-deployment',
    title: 'Canary Deployment Without Using Service Mesh',
    description: 'Implemented a Canary Deployment strategy in Kubernetes without using a service mesh by running stable and canary application versions simultaneously. Traffic is distributed based on pod replica ratios using a single Kubernetes Service. Demonstrates practical understanding of Docker, Kubernetes deployments, and zero-downtime release strategies.',
    image: canary,
    imageAlt: 'Kubernetes canary deployment diagram showing stable and canary application versions',
    year: '2024',
    tags: ['NODEJS', 'EXPRESS', 'Docker', 'Kubernetes', 'MiniKube'],
    github: 'https://github.com/dhruv14122004/canary-deployment-without-using-service-mesh',
    demo: '#',
    features: [
      'Implements canary deployment using native Kubernetes on Minikube without any service mesh',
      'Runs two versions of an application simultaneously',
      'Distributes traffic based on pod replica ratios using a single Kubernetes Service',
      'Rollback to previous version',
      'Deploy the new version of the application',
    ],
  }
]
