import PixelCrew from './PixelCrew';

const Footer = () => {
  return (
    <footer className="w-full mt-6 sm:mt-10">
      {/* Grounded Pixel Anime Sprites standing on top of the footer line */}
      <PixelCrew />

      {/* Low-height footer bar */}
      <div
        className="w-full py-3.5 bg-black border-t"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="site-container flex flex-col items-center justify-center gap-3">
          <p className="font-mono text-xs text-mist/80 tracking-wide text-center select-none">
            made by <span className="text-snow font-medium">dhruv</span> and{' '}
            <span className="text-lilac font-medium">antigravity</span>
          </p>
          {/* SpriteFusion "destroy this website" badge */}
          <a
            href="https://destroy.spritefusion.com/?from=badge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Destroy this website (opens SpriteFusion)"
          >
            <img
              src="https://destroy.spritefusion.com/badge.svg"
              alt="Destroy this website"
              width="180"
              height="40"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
