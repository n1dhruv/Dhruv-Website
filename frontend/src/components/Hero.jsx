'use client'

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';

import Image from 'next/image';
import portfolioImage from '../assets/portfolio image.jpeg';

const Hero = () => {
  return (
    <section id="hero" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full border-2 border-retro-border bg-retro-surface p-6 md:p-8 flex flex-col gap-6 shadow-retro relative"
      >
        {/* Name, Title & Image Area */}
        <div className="flex justify-between items-start md:items-center gap-4 mt-2">
          <header className="flex flex-col gap-3">
            <span className="text-xs md:text-sm uppercase tracking-wider text-retro-accent font-sans font-bold">
              Hello Everyone, I am
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold leading-tight text-retro-text tracking-tighter">
              Dhruv <span className="text-retro-accent">Sharma</span>
            </h1>
          </header>
          
          <div className="relative w-24 h-24 md:w-24 md:h-24 shrink-0 border-2 border-retro-accent rounded overflow-hidden shadow-[2px_2px_0px_rgba(255,51,102,0.5)]">
            <Image 
              src={portfolioImage} 
              alt="Dhruv Sharma" 
              fill 
              sizes="(max-width: 768px) 80px, 96px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-4 font-sans text-gray-300 leading-relaxed"> 
          <p className="text-lg md:text-base font-sans text-white font-medium leading-relaxed">
            I am a Backend, AI and Open source developer.
          </p>
          <p className="text-lg md:text-base font-sans text-white font-medium leading-relaxed">
            Love learning new things and building projects that solve real world problems.
            Always looking for an opportunity to contribute as a developer.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dhruv.sharma122004@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-retro-surface border border-retro-border text-retro-text px-5 py-2.5 font-bold hover:border-retro-accent transition-colors uppercase font-sans tracking-wider text-sm"
            >
              <FiMail /> LET'S TALK
            </a>
            <a 
              href="https://drive.google.com/file/d/1SdLAOyati9rMjoxcMe5JeqyKrDvkju7q/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-retro-surface border border-retro-border text-retro-text px-5 py-2.5 font-bold hover:border-retro-accent transition-colors uppercase font-sans tracking-wider text-sm"
            >
              VIEW RESUME
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
