'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';
import portfolioImage from '../assets/portfolio image.jpeg';
import { THEMES, getTheme, getBootedThemeId, pickRandomTheme, applyThemeVars } from '../data/themes';

const socials = [
  { label: 'GitHub',    icon: FiGithub,   url: 'https://github.com/n1dhruv' },
  { label: 'LinkedIn',  icon: FiLinkedin,  url: 'https://www.linkedin.com/in/dhruvsharmaa14/' },
  { label: 'X',         icon: FaXTwitter,  url: 'https://x.com/nocapdhruv' },
  { label: 'Peerlist',  icon: SiPeerlist,  url: 'https://peerlist.io/dhruvsharma' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
};

// Slider: incoming banner slides in from the travel direction,
// outgoing one drifts out the other way.
const bannerVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? '-35%' : '35%', opacity: 0 }),
};

const SWIPE_THRESHOLD_PX = 50;

const arrowBtn =
  'absolute top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/45 text-mist backdrop-blur-sm transition-all duration-200 hover:border-lilac hover:text-snow focus-visible:opacity-100 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100';

const Hero = () => {
  // SSR renders NO banner image (and default theme) so hydration is
  // byte-identical. After mount we pick the booted/random theme and fade
  // the correct banner in. Rendering theme-dependent markup during SSR
  // causes a hydration mismatch React refuses to patch (banner stuck).
  const [index, setIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const i = THEMES.findIndex((t) => t.id === getBootedThemeId());
    return i >= 0 ? i : 0;
  });
  const [direction, setDirection] = useState(0);
  const [bannerReady, setBannerReady] = useState(false);
  const touchX = useRef(null);
  const theme = THEMES[index] ?? THEMES[0];

  const goTo = (i) => {
    const n = (i + THEMES.length) % THEMES.length;
    if (n === index) return;
    setDirection(n > index || (index === THEMES.length - 1 && n === 0) ? 1 : -1);
    setIndex(n);
    applyThemeVars(THEMES[n]);
  };

  const handleTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    goTo(index + (dx < 0 ? 1 : -1));
  };

  useEffect(() => {
    const bootedId = getBootedThemeId();
    const t = bootedId ? getTheme(bootedId) : pickRandomTheme();
    const i = THEMES.findIndex((x) => x.id === t.id);
    if (i >= 0 && i !== index) setIndex(i);
    applyThemeVars(t);
    const raf = requestAnimationFrame(() => setBannerReady(true));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <section id="hero" className="w-full">
    {/* ── GIF Banner slider (arrows / dots / swipe) ──────────── */}
    <div
      className="banner-wrap rounded-none overflow-hidden group [touch-action:pan-y] select-none"
      style={{ opacity: bannerReady ? 1 : 0, transition: 'opacity 700ms ease' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {bannerReady && (
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={theme.id}
            className="absolute inset-0"
            custom={direction}
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <Image
              src={theme.src}
              alt={`${theme.label} banner`}
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className="object-cover object-[center_30%]"
              priority
              unoptimized
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Arrows — always visible on touch, reveal on hover on desktop */}
      <button
        type="button"
        aria-label="Previous banner"
        onClick={() => goTo(index - 1)}
        className={`${arrowBtn} left-3`}
      >
        <FiChevronLeft size={16} />
      </button>
      <button
        type="button"
        aria-label="Next banner"
        onClick={() => goTo(index + 1)}
        className={`${arrowBtn} right-3`}
      >
        <FiChevronRight size={16} />
      </button>

      {/* Dots — active pill wears the current theme accent */}
      <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {THEMES.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show ${t.label} banner`}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300 focus-visible:outline-none ${
              bannerReady && i === index
                ? 'w-5 bg-lilac'
                : 'w-1 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>

    {/* ── Profile row ────────────────────────────────────────── */}
    <div className="panel mt-0 px-6 pt-5 pb-6 flex flex-col gap-5">
      {/* Name + avatar */}
      <div className="flex items-center justify-between gap-4">
        <motion.div
          className="flex flex-col justify-center gap-1"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h1 className="display-name leading-none">hi, i m Dhruv</h1>
        </motion.div>

        {/* Avatar — square matched to name cap-height, top & bottom aligned */}
        <motion.div
          className="relative shrink-0 overflow-hidden h-8 w-8 sm:h-[clamp(2.4rem,6vw,4rem)] sm:w-[clamp(2.4rem,6vw,4rem)]"
          style={{ border: '1px solid rgb(var(--lilac) / 0.25)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <Image
            src={portfolioImage}
            alt="Dhruv Sharma"
            fill
            sizes="(max-width: 640px) 48px, 80px"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Bio */}
      <motion.div
        className="flex flex-col gap-2 text-sm leading-relaxed"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
      >
        <p className="text-snow/90">
          I build backend and AI systems. I care about <span className="intro-hl">problems with real stakes</span>, the kind where a good decision saves someone time or trouble, and I spend most of my thinking time on <span className="intro-hl">architecture</span>: how pieces fit together, where they&apos;ll break.
        </p>
        <p className="text-snow/90">
          I <span className="intro-hl">run Linux</span> and have for years. I can&apos;t imagine giving it up.
        </p>
        <p className="text-snow/90">
          I rarely get an idea right on the first try. I&apos;d rather sit with a thought, rework it, and let it get better through a few rounds than ship the first version. I stay close to whoever&apos;s using what I build, and their <span className="intro-hl">feedback shapes the next iteration</span> more than my own assumptions do.
        </p>
        <p className="text-snow/90">
          I&apos;m also an <span className="intro-hl">open-source contributor</span>, currently working on <span className="intro-hl">AI governance tooling</span>, and I like putting time into making AI systems <span className="intro-hl">safer and easier to trust</span>.
        </p>

      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=dhruv.sharma122004@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <FiMail size={13} />
          Let&apos;s Talk
        </a>
        <a
          href="https://drive.google.com/file/d/1QyXY5S2z2nlEMdxQx3cfPyckYTr-ssmP/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <FiFileText size={13} />
          Resume
        </a>
      </motion.div>

      {/* Social chips row */}
      <motion.div
        className="flex flex-wrap gap-2 pt-1 border-t"
        style={{ borderColor: 'var(--line)' }}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={3}
      >
        <span className="section-label self-center mr-1">Find me</span>
        {socials.map(({ label, icon: Icon, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-chip"
            aria-label={label}
          >
            <Icon size={12} />
            {label}
          </a>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

export default Hero;
