'use client'

import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';

const GithubActivity = () => {
  return (
    <section id="github-activity" className="w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="section-label">04 /</span>
        <h2 className="section-title">GitHub Activity</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="panel p-6 flex flex-col items-center justify-center w-full"
      >
        <div className="w-full flex justify-center [&_article]:w-full [&_article]:!max-w-full [&_svg]:w-full [&_svg]:h-auto">
          <GitHubCalendar
            username="n1dhruv"
            colorScheme="dark"
            theme={{
              dark: [
                'rgba(255, 255, 255, 0.04)', // Empty square (Level 0)
                '#39296e', // Level 1
                '#5841a1', // Level 2
                '#7859d9', // Level 3
                '#8b7cf8', // Level 4 (Highest)
              ]
            }}
            blockSize={10}
            blockMargin={3}
            fontSize={12}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default GithubActivity;
