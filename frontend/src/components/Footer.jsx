import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-20 py-8 border-t border-retro-border bg-[#0a0a0a]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 font-sans text-sm text-retro-text-secondary">
          <span>&copy; {year} <strong className="text-retro-text font-medium">Dhruv Sharma</strong></span>
          <span className="hidden md:inline text-retro-border">|</span>
        </div>
        
        <div className="flex items-center gap-5 text-retro-text-secondary">
          <a href="https://github.com/dhruv14122004" target="_blank" rel="noopener noreferrer" className="hover:text-retro-accent transition-colors">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/dhruvsharmaa14/" target="_blank" rel="noopener noreferrer" className="hover:text-retro-accent transition-colors">
            <FiLinkedin size={18} />
          </a>
          <a href="https://x.com/dhruvshxrmaa" target="_blank" rel="noopener noreferrer" className="hover:text-retro-accent transition-colors">
            <FaXTwitter size={18} />
          </a>
          <a href="mailto:dhruv.sharma122004@gmail.com" className="hover:text-retro-accent transition-colors">
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
