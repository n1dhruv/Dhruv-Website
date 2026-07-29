import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowRight, FiMail } from 'react-icons/fi';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';

const Hero = ({ onOpenResume }) => {
  return (
    <section id="hero" className="w-full pb-16 md:pb-24 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col gap-10"
      >
        {/* Name & Title Area */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-surface border border-retro-border w-max rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider text-retro-text-secondary font-mono">Available for new opportunities</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold uppercase leading-tight text-retro-text tracking-tighter">
            DHRUV <br className="md:hidden" />
            <span className="text-retro-accent">SHARMA</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-retro-text-secondary font-medium tracking-wide">
            Backend Developer & System Designer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Description */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-gray-300 leading-relaxed font-sans">
            <p>
              I build practical, high-performance products focusing on scalable backend systems and seamless integrations. My work spans backend optimization, database design, and cloud deployments.
            </p>
            <p>
              Currently, I'm working with various technologies to ship projects around problems I find meaningful. I enjoy making systems faster, simpler, and more useful.
            </p>
            <p>
              I contribute actively to open source, communicate openly, and learn quickly. I care most about solving real problems with people who value good engineering.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <a 
                href="mailto:dhruv.sharma122004@gmail.com" 
                className="flex items-center gap-2 bg-retro-accent text-retro-bg px-6 py-3 font-bold hover:bg-white transition-colors uppercase font-mono tracking-wider"
              >
                <FiMail /> LET'S TALK
              </a>
              <button 
                onClick={onOpenResume}
                className="flex items-center gap-2 bg-retro-surface border border-retro-border text-retro-text px-6 py-3 font-bold hover:border-retro-accent transition-colors uppercase font-mono tracking-wider"
              >
                VIEW RESUME
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-widest text-retro-text-secondary mb-2 font-mono">
              Connect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'GitHub', icon: FiGithub, url: 'https://github.com/dhruv14122004', desc: 'Code' },
                { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/dhruvsharmaa14/', desc: 'Network' },
                { name: 'X (Twitter)', icon: FaXTwitter, url: 'https://x.com/dhruvshxrmaa', desc: 'Thoughts' },
                { name: 'Peerlist', icon: SiPeerlist, url: 'https://peerlist.io/dhruvsharma', desc: 'Profile' }
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-4 bg-retro-surface border border-retro-border hover:border-retro-accent transition-colors rounded-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transform translate-x-2 -translate-y-2 transition-all">
                    <link.icon className="w-12 h-12" />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <link.icon className="w-5 h-5 text-retro-accent" />
                    <span className="font-bold text-retro-text font-mono uppercase tracking-wide">{link.name}</span>
                  </div>
                  <span className="text-xs text-retro-text-secondary relative z-10 font-sans">{link.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

