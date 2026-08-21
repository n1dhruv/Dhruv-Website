'use client'

import { motion } from 'framer-motion';

const Quote = () => {
  return (
    <section id="quote" className="w-full flex items-center justify-center min-h-[40vh] md:min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl px-6 text-center flex flex-col items-center justify-center gap-6"
      >
        <p className="font-display text-snow/90 text-xl lg:text-xl leading-tight lg:leading-snug tracking-tight italic">
          "Be loyal to what matters."
        </p>
        <span className="font-mono text-xs lg:text-sm text-lilac uppercase tracking-widest">
          — Arthur Morgan
        </span>
      </motion.div>
    </section>
  );
};

export default Quote;
