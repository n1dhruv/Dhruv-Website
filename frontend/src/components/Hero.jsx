'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPeerlist } from 'react-icons/si';
import portfolioBg from '../assets/portfolio background 2.gif';
import portfolioImage from '../assets/portfolio image.jpeg';

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

const Hero = () => (
  <section id="hero" className="w-full">
    {/* ── GIF Banner ─────────────────────────────────────────── */}
    <div className="banner-wrap rounded-none overflow-hidden">
      <Image
        src={portfolioBg}
        alt="Banner"
        fill={false}
        width={760}
        height={220}
        className="w-full h-full object-cover object-[center_30%]"
        priority
        unoptimized
      />
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
          <h1 className="display-name leading-none">i m Dhruv Sharma</h1>
        </motion.div>

        {/* Avatar — square matched to name cap-height, top & bottom aligned */}
        <motion.div
          className="relative shrink-0 overflow-hidden h-8 w-8 sm:h-[clamp(2.4rem,6vw,4rem)] sm:w-[clamp(2.4rem,6vw,4rem)]"
          style={{ border: '1px solid rgba(139,124,248,0.25)' }}
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

export default Hero;
