'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTopArtists, fetchTopTracks } from '../utils/lastfm';

/**
 * Custom hook to fetch user's top 5 artists and top 5 tracks across selectable time periods:
 * - '7day' (7D)
 * - '1month' (1M)
 * - '6month' (6M)
 * - 'overall' (ALL)
 *
 * Implements client-side in-memory caching to ensure instant switching between periods.
 */
export function useTopStats(initialPeriod = '7day') {
  const [period, setPeriod] = useState(initialPeriod);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME;
  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

  const cacheRef = useRef({});
  const abortControllerRef = useRef(null);

  const loadStats = useCallback(
    async (targetPeriod) => {
      if (!username || !apiKey) {
        setIsLoading(false);
        setError('unconfigured');
        return;
      }

      // Return instantly from cache if previously loaded
      if (cacheRef.current[targetPeriod]) {
        setArtists(cacheRef.current[targetPeriod].artists);
        setTracks(cacheRef.current[targetPeriod].tracks);
        setIsLoading(false);
        return;
      }

      // Abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        const [resolvedArtists, resolvedTracks] = await Promise.all([
          fetchTopArtists(
            username,
            apiKey,
            targetPeriod,
            abortControllerRef.current.signal
          ),
          fetchTopTracks(
            username,
            apiKey,
            targetPeriod,
            abortControllerRef.current.signal
          ),
        ]);

        cacheRef.current[targetPeriod] = {
          artists: resolvedArtists,
          tracks: resolvedTracks,
        };

        setArtists(resolvedArtists);
        setTracks(resolvedTracks);
        setIsLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to fetch top music stats');
        setIsLoading(false);
      }
    },
    [username, apiKey]
  );

  useEffect(() => {
    loadStats(period);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadStats, period]);

  return {
    period,
    setPeriod,
    artists,
    tracks,
    isLoading,
    error,
    isConfigured: Boolean(username && apiKey),
  };
}
