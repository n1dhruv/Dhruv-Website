import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';

const Hero = ({ onOpenResume }) => {
  return (
    <section id="hero" className="w-full pb-12 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full border-2 border-retro-border bg-[#0a0a0a] flex flex-col shadow-retro"
      >
        {/* Header Block */}
        <div className="p-6 md:p-8 border-b-2 border-retro-border flex flex-col md:flex-row md:items-end justify-between gap-4 bg-retro-surface">
          <div>
            <p className="text-xs font-mono uppercase text-retro-accent mb-2 tracking-widest flex items-center gap-2">
              HI THERE 👋, I'M
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold uppercase leading-none text-retro-text">
              DHRUV SHARMA
            </h1>
          </div>
          <div className="inline-flex px-3 py-1 bg-retro-text text-retro-bg font-mono text-xs font-bold uppercase tracking-wider shrink-0 w-max">
            ENGINEER • BUILDER • BACKEND
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Column: Description */}
          <div className="lg:w-2/3 p-6 md:p-8 lg:border-r-2 border-retro-border bg-retro-bg">
            <p className="font-mono text-sm md:text-base text-retro-text-secondary leading-relaxed mb-6">
              I'm a <strong className="text-retro-text">Backend Developer and System Designer</strong>, open-source contributor, and independent thinker who builds practical products.
            </p>
            <div className="pl-4 border-l-2 border-retro-accent mb-6">
              <p className="font-mono text-sm md:text-base text-retro-text-secondary leading-relaxed">
                I've worked with various technologies, freelanced, and shipped projects around problems I find meaningful. My work spans backend optimization, database design, API integrations, and cloud deployments.
              </p>
            </div>
            <p className="font-mono text-sm md:text-base text-retro-text-secondary leading-relaxed mb-8">
              I enjoy making systems faster, simpler, and more useful. I contribute actively to open source, communicate openly, and share honest opinions. I learn quickly, think independently, and care most about solving real problems with people who value good engineering.
            </p>
          </div>

          {/* Right Column: Find Me Online */}
          <div className="lg:w-1/3 p-6 md:p-8 border-t-2 lg:border-t-0 border-retro-border bg-[#111]">
            <h3 className="text-xs font-mono text-retro-text-secondary uppercase mb-4 tracking-widest">
              FIND ME ONLINE
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Resume', icon: null, url: '#', desc: 'Experience, skills, and selected work', isResume: true },
                { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/dhruvsharmaa14/', desc: 'Professional experience and updates' },
                { name: 'GitHub', icon: FiGithub, url: 'https://github.com/dhruv14122004', desc: 'Code, open source, and experiments' },
                { name: 'X', icon: FaXTwitter, url: 'https://x.com/dhruvshxrmaa', desc: 'Thoughts on engineering and current...' },
                { name: 'Peerlist', icon: SiPeerlist, url: 'https://peerlist.io/dhruvsharma', desc: 'Developer profile and featured projects' }
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.isResume ? '#' : link.url}
                  onClick={link.isResume ? (e) => { e.preventDefault(); onOpenResume(); } : undefined}
                  target={link.isResume ? undefined : "_blank"}
                  rel={link.isResume ? undefined : "noopener noreferrer"}
                  className="group flex items-center justify-between p-3 md:p-4 border border-retro-border bg-retro-surface hover:border-retro-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {link.icon ? (
                      <link.icon className="w-5 h-5 text-retro-text group-hover:text-retro-accent transition-colors shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border border-retro-text group-hover:border-retro-accent group-hover:text-retro-accent text-retro-text flex items-center justify-center font-mono text-[10px] font-bold transition-colors shrink-0">
                        📄
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold text-retro-text group-hover:text-retro-accent transition-colors uppercase">
                        {link.name}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs text-retro-text-secondary line-clamp-1">
                        {link.desc}
                      </span>
                    </div>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-retro-text-secondary group-hover:text-retro-accent group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
          
        </div>

        {/* Available For Projects Strip */}
        <div className="p-6 md:p-8 border-t-2 border-retro-border bg-retro-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="md:w-2/3">
            <h3 className="text-xs font-mono text-retro-text-secondary uppercase mb-2 tracking-widest">
              AVAILABLE FOR PROJECTS
            </h3>
            <p className="font-mono text-sm text-retro-text">
              Building something? I help turn ideas into full systems with backend optimization, APIs, and cloud deployments. If you need a partner who ships end to end, let's talk.
            </p>
          </div>
          <a 
            href="mailto:dhruv.sharma122004@gmail.com" 
            className="inline-flex items-center gap-3 px-6 py-4 bg-retro-bg border-2 border-retro-border hover:border-retro-accent group transition-colors self-start md:self-auto shrink-0"
          >
            <span className="font-mono text-xs font-bold text-retro-text group-hover:text-retro-accent uppercase tracking-wider">
              dhruv.sharma122004@gmail.com
            </span>
            <FiArrowRight className="w-4 h-4 text-retro-text group-hover:text-retro-accent group-hover:-rotate-45 transition-all" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
