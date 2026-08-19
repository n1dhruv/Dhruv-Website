'use client'

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';

const SocialLinks = () => {
  return (
    <section id="connect" className="w-full flex justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-retro-surface border-2 border-retro-border px-4 py-2 flex items-center justify-center gap-4 shadow-retro"
      >
        {[
          { name: 'GitHub', icon: FiGithub, url: 'https://github.com/n1dhruv' },
          { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/dhruvsharmaa14/' },
          { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/nocapdhruv' },
          { name: 'Peerlist', icon: SiPeerlist, url: 'https://peerlist.io/dhruvsharma' }
        ].map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 border border-transparent hover:border-retro-accent text-retro-text hover:text-retro-accent transition-colors bg-retro-bg"
            title={link.name}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default SocialLinks;
