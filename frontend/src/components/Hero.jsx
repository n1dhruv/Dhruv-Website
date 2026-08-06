'use client'

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';

const Hero = () => {
  return (
    <section id="hero" className="w-full pb-6 md:pb-8 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full border-2 border-retro-border bg-retro-surface/50 p-6 md:p-8 flex flex-col gap-6 shadow-retro"
      >
        {/* Name & Title Area */}
        <header className="flex flex-col gap-3">
          <span className="text-xs md:text-sm uppercase tracking-wider text-retro-accent font-sans font-bold">
            Hello Everyone, I am
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold uppercase leading-tight text-retro-text tracking-tighter">
            DHRUV <span className="text-retro-accent">SHARMA</span>
          </h1>
        </header>

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
              className="flex items-center gap-2 bg-retro-accent text-retro-bg px-5 py-2.5 font-bold hover:bg-white transition-colors uppercase font-sans tracking-wider text-sm"
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

        {/* Social Links (Connect) at the bottom */}
        <nav aria-label="Social profiles" className="w-full pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'GitHub', icon: FiGithub, url: 'https://github.com/n1dhruv', desc: 'Code' },
              { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/dhruvsharmaa14/', desc: 'Network' },
              { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/nocapdhruv', desc: 'Thoughts' },
              { name: 'Peerlist', icon: SiPeerlist, url: 'https://peerlist.io/dhruvsharma', desc: 'Profile' }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 p-3 bg-retro-bg border border-retro-border hover:border-retro-accent transition-colors rounded-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transform translate-x-1 -translate-y-1 transition-all">
                  <link.icon className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <link.icon className="w-4 h-4 text-retro-accent" />
                  <span className="font-bold text-sm text-retro-text font-sans uppercase tracking-wide">{link.name}</span>
                </div>
                <span className="text-[10px] text-retro-text-secondary relative z-10 font-sans">{link.desc}</span>
              </a>
            ))}
          </div>
        </nav>
      </motion.div>
    </section>
  );
};

export default Hero;
