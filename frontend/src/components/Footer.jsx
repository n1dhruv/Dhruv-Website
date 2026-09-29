import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import PixelCrew from './PixelCrew';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-12 sm:mt-16 md:mt-20">
      {/* Grounded Pixel Anime Sprites standing on the footer divider line */}
      <PixelCrew />

      {/* Footer bottom bar */}
      <div className="w-full py-8 bg-black">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 font-mono text-xs text-mist">
            <span>&copy; {year} <strong className="text-snow font-medium">Dhruv Sharma</strong></span>
            <span className="hidden md:inline text-dim">|</span>
            <span className="text-dim">All rights reserved</span>
          </div>

          <div className="flex items-center gap-5 text-mist">
            <a
              href="https://github.com/n1dhruv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-lilac transition-colors"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruvsharmaa14/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-lilac transition-colors"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="https://x.com/nocapdhruv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-lilac transition-colors"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="mailto:dhruv.sharma122004@gmail.com"
              aria-label="Email"
              className="hover:text-lilac transition-colors"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
