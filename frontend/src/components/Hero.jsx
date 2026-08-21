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
      <div className="flex items-start justify-between gap-4">
        <motion.div
          className="flex flex-col gap-1"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <h2 className="display-name">Dhruv Sharma</h2>
        </motion.div>

        {/* Avatar */}
        <motion.div
          className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden"
          style={{ border: '1px solid rgba(139,124,248,0.25)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <Image
            src={portfolioImage}
            alt="Dhruv Sharma"
            fill
            sizes="80px"
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
          Backend, AI &amp; Open Source developer. I build scalable platforms, intelligent systems,
          and reliable APIs — always looking for problems worth solving.
        </p>
        <ul className="mt-1 space-y-1 text-mist">
          {[
            'Currently building at Aerilon Tech & exploring LLM systems.',
            'Love contributing to open source and learning in public.',
            'Ranked 7th in Capsule Vision 2024 ML Challenge.',
          ].map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span className="mt-[5px] w-1 h-1 rounded-full bg-lilac shrink-0" />
              {line}
            </li>
          ))}
        </ul>
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
          href="https://drive.google.com/file/d/17rXtDEImYRUqTi6KeXgeS_icrorNOwVv/view?usp=sharing"
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
