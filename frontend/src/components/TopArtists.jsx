'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDisc, FiArrowUpRight } from 'react-icons/fi';
import { useTopArtists } from '../hooks/useTopArtists';

const PERIOD_OPTIONS = [
  { key: '7day', label: '7D' },
  { key: '1month', label: '1M' },
  { key: '6month', label: '6M' },
  { key: 'overall', label: 'ALL' },
];

/**
 * Top 5 Artists component displaying artists in horizontal cover photo cards
 * with time-range toggle (7D, 1M, 6M, ALL) and high-res cover artwork.
 */
const TopArtists = () => {
  const { period, setPeriod, artists, isLoading, isConfigured } = useTopArtists('7day');
  const [imgErrors, setImgErrors] = useState({});

  if (!isConfigured) {
    return null;
  }

  const handleImgError = (artistName) => {
    setImgErrors((prev) => ({ ...prev, [artistName]: true }));
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      {/* Header row: Label + Period selector */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="section-label">ROTATION // TOP ARTISTS</span>
        </div>

        {/* 7D | 1M | 6M | ALL Filter Pills */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Top artists time range">
          {PERIOD_OPTIONS.map(({ key, label }) => {
            const isActive = period === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPeriod(key)}
                className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 transition-all duration-200 border select-none ${
                  isActive
                    ? 'bg-lilac text-ink border-lilac font-bold shadow-[0_0_12px_rgba(139,124,248,0.35)]'
                    : 'bg-white/[0.02] text-mist border-line hover:border-line-strong hover:text-snow hover:bg-white/[0.04]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Artists Grid / Strip */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            /* Skeleton Loading State (5 horizontal cards) */
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-3 pb-1 scrollbar-none"
              aria-hidden="true"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="panel p-2 flex flex-col gap-2 min-w-[130px] sm:min-w-0 flex-1 animate-pulse"
                >
                  <div className="aspect-square w-full bg-white/[0.04] border border-line-strong" />
                  <div className="w-20 max-w-[80%] h-3 bg-white/[0.05] mt-1" />
                  <div className="w-14 max-w-[60%] h-2 bg-white/[0.03]" />
                </div>
              ))}
            </motion.div>
          ) : artists.length === 0 ? (
            <div className="panel p-6 text-center text-dim font-mono text-xs">
              NO SCROBBLE DATA AVAILABLE FOR THIS PERIOD
            </div>
          ) : (
            /* 5 Horizontal Artist Cover Photo Cards */
            <motion.div
              key={period}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-3 pb-1 scrollbar-none"
            >
              {artists.map((artist, index) => {
                const rankNumber = String(artist.rank || index + 1).padStart(2, '0');
                const hasImage = artist.image && !imgErrors[artist.name];

                return (
                  <a
                    key={artist.name}
                    href={artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group panel p-2 flex flex-col min-w-[130px] sm:min-w-0 flex-1 hover:border-lilac/40 hover:bg-white/[0.025] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lilac"
                    aria-label={`Rank ${rankNumber}: ${artist.name}, ${artist.playcount} scrobbles on Last.fm`}
                  >
                    {/* Cover Photo with Rank Badge Overlay */}
                    <div className="relative aspect-square w-full overflow-hidden bg-white/[0.02] border border-line-strong">
                      {hasImage ? (
                        <img
                          src={artist.image}
                          alt={`${artist.name} cover artwork`}
                          className="w-full h-full object-cover object-center grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                          loading="lazy"
                          onError={() => handleImgError(artist.name)}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-dim bg-white/[0.01]"
                          aria-label="No artwork available"
                        >
                          <FiDisc size={28} className="text-mist/40" />
                        </div>
                      )}

                      {/* Rank Number Badge */}
                      <span className="absolute top-1.5 left-1.5 font-mono text-[9px] font-bold px-1.5 py-0.5 bg-black/80 text-lilac border border-white/10 backdrop-blur-sm shadow-sm select-none">
                        #{rankNumber}
                      </span>

                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />
                    </div>

                    {/* Artist Details */}
                    <div className="flex flex-col mt-2 min-w-0">
                      <span className="font-display font-bold text-xs sm:text-sm text-snow truncate group-hover:text-lilac transition-colors duration-200">
                        {artist.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-mist mt-0.5 flex items-center justify-between">
                        <span>{artist.playcount} SCROBBLES</span>
                        <FiArrowUpRight
                          size={10}
                          className="text-mist/60 group-hover:text-snow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                        />
                      </span>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopArtists;
