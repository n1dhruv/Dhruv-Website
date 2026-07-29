import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiSupabase, SiPython, SiMongodb, SiGit, SiFlutter, SiFirebase, SiUnrealengine, SiFigma, SiC, SiCplusplus, SiJavascript, SiNodedotjs, SiDocker, SiExpress, SiLinux, SiReact, SiBlender, SiSpotify, SiPeerlist } from 'react-icons/si';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import heroImage from '../assets/me.jpeg';

const Hero = ({ onOpenResume }) => {
  const [showSpotify, setShowSpotify] = useState(false);

  const skills = [
    { name: 'JAVASCRIPT', icon: SiJavascript, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'NODE.JS', icon: SiNodedotjs, url: 'https://nodejs.org' },
    { name: 'EXPRESS', icon: SiExpress, url: 'https://expressjs.com' },
    { name: 'MONGODB', icon: SiMongodb, url: 'https://www.mongodb.com' },
    { name: 'GIT', icon: SiGit, url: 'https://git-scm.com' },
    { name: 'LINUX', icon: SiLinux, url: 'https://www.linux.org' },
    { name: 'FLUTTER', icon: SiFlutter, url: 'https://flutter.dev' },
    { name: 'DOCKER', icon: SiDocker, url: 'https://www.docker.com' },
    { name: 'SUPABASE', icon: SiSupabase, url: 'https://supabase.com' },
    { name: 'C++', icon: SiCplusplus, url: 'https://isocpp.org' },
    { name: 'UNREAL', icon: SiUnrealengine, url: 'https://www.unrealengine.com' },
    { name: 'BLENDER', icon: SiBlender, url: 'https://www.blender.org' },
    { name: 'FIGMA', icon: SiFigma, url: 'https://www.figma.com' },
    { name: 'PYTHON', icon: SiPython, url: 'https://www.python.org' },
  ];

  return (
    <section id="hero" className="hero relative items-center">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p style={{ color: "var(--accent-retro)", marginBottom: "10px" }} className="font-mono">
          {"{ HOT RELOADING... }"}
        </p>
        <h1 className="leading-tight">
          BACKEND <br />
          <span className="text-retro-accent">DEVELOPER</span>
          & SYSTEM <br />
          <span className="text-retro-accent">DESIGNER</span>
        </h1>
        <p className="font-mono text-sm md:text-base max-w-lg mt-6 text-retro-text-secondary">
          Creating solutions for real-time problems.
        </p>

        <div className="flex flex-wrap gap-3 my-8 max-w-lg">
          {skills.map((skill, index) => (
            <a key={index} href={skill.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold font-mono text-retro-text hover:text-retro-accent uppercase bg-retro-surface px-2 py-1 border border-retro-border hover:-translate-y-1 transition-transform">
              <skill.icon className="w-3 h-3 text-retro-accent" />
              {skill.name}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <a href="#projects" className="btn-retro uppercase text-sm tracking-wider">
            EXPLORE PROJECTS
          </a>
          <button
            onClick={onOpenResume}
            className="btn-retro uppercase text-sm tracking-wider"
          >
            RESUME
          </button>
        </div>

        {/* FIND ME ONLINE */}
        <div className="mb-8 w-full max-w-lg">
          <h3 className="text-xs font-mono text-retro-text-secondary uppercase mb-3 tracking-widest">
            {">"} FIND ME ONLINE
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { name: 'GitHub', icon: FiGithub, url: 'https://github.com/dhruv14122004', desc: 'Code & Contributions' },
              { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/dhruvsharmaa14/', desc: 'Professional Network' },
              { name: 'X', icon: FaXTwitter, url: 'https://x.com/dhruvshxrmaa', desc: 'Thoughts & Updates' },
              { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/dhruv14122004', desc: 'Visual Logs' },
              { name: 'Peerlist', icon: SiPeerlist, url: 'https://peerlist.io/dhruvsharma', desc: 'Proof of Work' }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 border border-retro-border bg-retro-surface hover:border-retro-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <link.icon className="w-4 h-4 text-retro-text group-hover:text-retro-accent transition-colors" />
                  <div className="flex flex-col">
                    <span className="font-mono text-sm font-bold text-retro-text group-hover:text-retro-accent transition-colors uppercase">
                      {link.name}
                    </span>
                    <span className="font-mono text-[10px] text-retro-text-secondary">
                      {link.desc}
                    </span>
                  </div>
                </div>
                <FiArrowRight className="w-4 h-4 text-retro-text-secondary group-hover:text-retro-accent group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>

        {/* AVAILABLE FOR PROJECTS */}
        <div className="w-full max-w-lg mb-12 md:mb-0">
          <div className="p-4 border border-retro-border bg-retro-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-mono text-xs font-bold text-retro-text uppercase">Available for Projects</span>
              </div>
              <p className="font-mono text-[10px] text-retro-text-secondary">Looking for backend & system design roles.</p>
            </div>
            <a href="mailto:dhruv.sharma122004@gmail.com" className="btn-retro uppercase text-xs tracking-wider whitespace-nowrap text-center py-2 px-4 shadow-[2px_2px_0px_var(--text-primary)] hover:shadow-[1px_1px_0px_var(--text-primary)]">
              HIRE ME
            </a>
          </div>
        </div>

        {/* Integrated Spotify Player Card - Sleek Version */}
      </motion.div>

      <motion.div
        className="window-frame relative hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="window-header">
          <span>PORTRAIT_01.JPG</span>
          <div className="window-controls">
            <button className="window-btn" aria-label="Minimize">
              <span className="minimize-icon"></span>
            </button>
            <button className="window-btn" aria-label="Maximize">
              <span className="maximize-icon"></span>
            </button>
            <button className="window-btn window-close" aria-label="Close">
              <span className="close-icon"></span>
            </button>
          </div>
        </div>
        <img
          src={heroImage}
          alt="Dhruv Sharma"
          className="hero-image"
          style={{ height: '400px', objectFit: 'cover' }}
        />
      </motion.div>

      <motion.div
        className="col-span-1 md:col-span-2 w-full flex justify-center mt-8 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="w-full max-w-[760px] flex flex-col items-center">
          <button
            onClick={() => setShowSpotify(!showSpotify)}
            className="flex items-center gap-2 mb-4 px-6 py-2 bg-retro-surface border border-retro-border hover:border-retro-accent text-retro-text hover:text-retro-accent transition-all uppercase font-bold text-sm tracking-wider"
          >
            <SiSpotify size={18} />
            {showSpotify ? 'Close Playlist' : 'Open Spotify Playlist'}
            <span className={`transform transition-transform ${showSpotify ? 'rotate-180' : ''}`}>▼</span>
          </button>

          <AnimatePresence>
            {showSpotify && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden"
              >
                <div className="bg-[#18181b] border border-[#333] rounded-xl p-0 overflow-hidden shadow-lg">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/7GdFzNqgXgD9YfE8c1waUJ?utm_source=generator&theme=0"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px' }}
                  ></iframe>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
