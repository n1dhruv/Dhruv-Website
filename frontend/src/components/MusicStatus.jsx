'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiDisc, FiArrowUpRight } from 'react-icons/fi';
import { useLastFmTrack } from '../hooks/useLastFmTrack';
import { formatRelativeTime } from '../utils/lastfm';
import TopArtists from './TopArtists';

/**
 * CSS-only waveform animation for active playback.
 * Automatically halts when not playing and respects prefers-reduced-motion.
 */
const Waveform = ({ isPlaying }) => {
  return (
    <span
      className="inline-flex items-end gap-[2.5px] h-3 px-0.5"
      aria-hidden="true"
    >
      <span
        className={`w-[2px] bg-lilac rounded-full transition-all duration-200 ${
          isPlaying ? 'animate-wave-1' : 'h-1'
        }`}
      />
      <span
        className={`w-[2px] bg-lilac rounded-full transition-all duration-200 ${
          isPlaying ? 'animate-wave-2' : 'h-2'
        }`}
      />
      <span
        className={`w-[2px] bg-lilac rounded-full transition-all duration-200 ${
          isPlaying ? 'animate-wave-3' : 'h-1.5'
        }`}
      />
      <span
        className={`w-[2px] bg-lilac rounded-full transition-all duration-200 ${
          isPlaying ? 'animate-wave-4' : 'h-2.5'
        }`}
      />
    </span>
  );
};

/**
 * Compact, layout-stable skeleton placeholder while fetching initial Last.fm status.
 */
const MusicSkeleton = () => {
  return (
    <div className="w-full select-none" aria-hidden="true">
      <div className="panel p-4 sm:p-5 w-full flex flex-col gap-3">
        {/* Top row skeleton */}
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="w-28 h-2.5 bg-white/[0.05] animate-pulse" />
          <div className="w-12 h-2.5 bg-white/[0.05] animate-pulse" />
        </div>

        {/* Middle row skeleton */}
        <div className="flex items-center gap-4 py-1">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.04] border border-line-strong shrink-0 animate-pulse" />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="w-48 max-w-[70%] h-4 bg-white/[0.05] animate-pulse" />
            <div className="w-32 max-w-[50%] h-3 bg-white/[0.03] animate-pulse" />
          </div>
        </div>

        {/* Bottom row skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-line">
          <div className="w-24 h-2.5 bg-white/[0.04] animate-pulse" />
          <div className="w-16 h-2.5 bg-white/[0.04] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

/**
 * Frontend-only Last.fm Music Status Component.
 *
 * Displays currently playing or last played track directly from Last.fm API.
 * Adheres strictly to the portfolio's minimalist editorial / dark technical design.
 */
const MusicStatus = () => {
  const { track, isLoading, isConfigured } = useLastFmTrack();
  const [imgError, setImgError] = useState(false);
  const [relativeTime, setRelativeTime] = useState(null);

  // Keep relative time refreshed for last played track
  useEffect(() => {
    if (!track) {
      setRelativeTime(null);
      return;
    }

    if (track.isPlaying) {
      setRelativeTime(null);
      return;
    }

    setRelativeTime(formatRelativeTime(track.playedAt));

    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(track.playedAt));
    }, 30000);

    return () => clearInterval(interval);
  }, [track]);

  // Reset image error state if track changes
  useEffect(() => {
    setImgError(false);
  }, [track?.image, track?.name]);

  // If unconfigured or failed and not loading, gracefully hide
  if (!isConfigured && !isLoading) {
    return null;
  }

  const isPlaying = track?.isPlaying;
  const statusLabel = isPlaying
    ? 'NOW PLAYING'
    : `LAST PLAYED${relativeTime ? ` · ${relativeTime.toUpperCase()}` : ''}`;

  return (
    <section id="audio-status" className="w-full flex flex-col gap-6">
      {/* Live / Recent Track Status Card */}
      {isLoading ? (
        <MusicSkeleton />
      ) : track ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel p-4 sm:p-5 group block w-full hover:border-lilac/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lilac"
            aria-label={`${isPlaying ? 'Now playing' : 'Last played'}: ${track.name} by ${track.artist} on Last.fm`}
          >
            {/* Top bar: Section tag + Live status */}
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-mist">
                <FiMusic className="text-lilac shrink-0" size={12} />
                <span>AUDIO // LAST.FM</span>
              </div>

              {isPlaying ? (
                <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-lilac font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac animate-pulse shrink-0" />
                  <span>LIVE</span>
                  <Waveform isPlaying={true} />
                </div>
              ) : (
                <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-dim">
                  <span>RECENT</span>
                </div>
              )}
            </div>

            {/* Middle track information: Artwork + Track details */}
            <div className="flex items-center gap-4 py-3">
              {/* Album artwork container */}
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-line-strong bg-white/[0.02]">
                {track.image && !imgError ? (
                  <img
                    src={track.image}
                    alt={track.album ? `${track.album} album artwork` : `${track.name} artwork`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-center"
                    onError={() => setImgError(true)}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-dim bg-white/[0.01]"
                    aria-label="No album artwork available"
                  >
                    <FiDisc size={26} className="text-mist/40" />
                  </div>
                )}
              </div>

              {/* Track Name + Artist + Album */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <p className="font-display font-bold text-base sm:text-lg text-snow truncate group-hover:text-lilac transition-colors duration-200">
                  {track.name}
                </p>
                <p className="font-sans text-xs sm:text-sm text-mist truncate mt-0.5 flex items-baseline gap-1.5">
                  <span className="truncate">{track.artist}</span>
                  {track.album && (
                    <>
                      <span className="text-dim text-[10px] font-mono shrink-0">·</span>
                      <span className="text-dim truncate">{track.album}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Bottom bar: Status label + Last.fm link */}
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <span
                className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-medium flex items-center gap-1.5 ${
                  isPlaying ? 'text-lilac' : 'text-dim'
                }`}
              >
                {statusLabel}
              </span>

              <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-mist/70 group-hover:text-snow flex items-center gap-1 transition-colors duration-200">
                <span>LAST.FM</span>
                <FiArrowUpRight
                  size={12}
                  className="text-mist/70 group-hover:text-snow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </a>
        </motion.div>
      ) : null}

      {/* Top 5 Artists with 7D / 1M / 6M / ALL Filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <TopArtists />
      </motion.div>
    </section>
  );
};

export default MusicStatus;
