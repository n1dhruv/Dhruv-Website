'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { useTopStats } from '../hooks/useTopStats';

const PERIOD_OPTIONS = [
  { key: '7day', label: '7D' },
  { key: '1month', label: '1M' },
  { key: '6month', label: '6M' },
  { key: 'overall', label: 'ALL' },
];

/**
 * TopStats component:
 * - Left column: Top 5 Artists (numbered, clean text-first with playcount, no image)
 * - Right column: Top 5 Songs (numbered, title + artist + playcount)
 * - Unified 7D / 1M / 6M / ALL period switcher updating both columns synchronously
 */
const TopStats = () => {
  const { period, setPeriod, artists, tracks, isLoading, isConfigured } = useTopStats('7day');

  if (!isConfigured) {
    return null;
  }

  return (
    <div className="panel p-4 sm:p-5 flex flex-col gap-4">
      {/* Header row: Label + Period toggle pills */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="section-label">ROTATION // TOP STATS</span>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Music stats time range">
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

      {/* Two-Column Grid: Artists (Left) and Songs (Right) */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Skeleton Loading State */
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 select-none"
            aria-hidden="true"
          >
            {/* Left Skeleton: Top Artists */}
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 bg-white/[0.05] mb-2 animate-pulse" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-line/40">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-white/[0.05] animate-pulse" />
                    <div className="w-32 h-3.5 bg-white/[0.04] animate-pulse" />
                  </div>
                  <div className="w-12 h-3 bg-white/[0.03] animate-pulse" />
                </div>
              ))}
            </div>

            {/* Right Skeleton: Top Tracks */}
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 bg-white/[0.05] mb-2 animate-pulse" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-line/40">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-white/[0.05] animate-pulse" />
                    <div className="w-36 h-3.5 bg-white/[0.04] animate-pulse" />
                  </div>
                  <div className="w-20 h-3 bg-white/[0.03] animate-pulse" />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Actual Loaded Data */
          <motion.div
            key={period}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* ── LEFT COLUMN: TOP 5 ARTISTS (Numbered, No Image) ── */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-line mb-1 px-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist font-bold">
                  TOP ARTISTS
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-dim text-right">
                  SCROBBLES
                </span>
              </div>

              {artists.length === 0 ? (
                <div className="py-6 text-center text-dim font-mono text-xs">
                  NO ARTIST DATA FOR THIS PERIOD
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-line/40">
                  {artists.map((artist, idx) => {
                    const rankNumber = String(artist.rank || idx + 1).padStart(2, '0');
                    return (
                      <a
                        key={artist.name}
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-2.5 px-1.5 -mx-1.5 hover:bg-white/[0.02] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lilac"
                        aria-label={`Rank ${rankNumber}: ${artist.name}, ${artist.playcount} scrobbles`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3 flex-1">
                          <span className="font-mono text-xs font-bold text-lilac shrink-0 w-5">
                            {rankNumber}
                          </span>
                          <span className="font-display font-bold text-sm text-snow group-hover:text-lilac transition-colors truncate">
                            {artist.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-1 shrink-0 font-mono text-[10px] text-dim group-hover:text-mist tracking-wider uppercase text-right">
                          <span>{artist.playcount} plays</span>
                          <FiArrowUpRight
                            size={11}
                            className="opacity-0 group-hover:opacity-100 text-lilac transition-opacity shrink-0 -mr-1"
                          />
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: TOP 5 SONGS (Numbered, Title + Artist on Right) ── */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-line mb-1 px-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist font-bold">
                  TOP SONGS
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-dim text-right">
                  ARTIST
                </span>
              </div>

              {tracks.length === 0 ? (
                <div className="py-6 text-center text-dim font-mono text-xs">
                  NO TRACK DATA FOR THIS PERIOD
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-line/40">
                  {tracks.map((track, idx) => {
                    const rankNumber = String(track.rank || idx + 1).padStart(2, '0');
                    return (
                      <a
                        key={`${track.name}-${track.artist}`}
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-2.5 px-1.5 -mx-1.5 hover:bg-white/[0.02] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lilac gap-3"
                        aria-label={`Rank ${rankNumber}: ${track.name} by ${track.artist}`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="font-mono text-xs font-bold text-lilac shrink-0 w-5">
                            {rankNumber}
                          </span>
                          <span className="font-display font-bold text-sm text-snow group-hover:text-lilac transition-colors truncate">
                            {track.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-1 shrink-0 max-w-[45%] text-right">
                          <span className="font-sans text-xs text-mist group-hover:text-snow transition-colors truncate">
                            {track.artist}
                          </span>
                          <FiArrowUpRight
                            size={11}
                            className="opacity-0 group-hover:opacity-100 text-lilac transition-opacity shrink-0 -mr-1"
                          />
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopStats;
