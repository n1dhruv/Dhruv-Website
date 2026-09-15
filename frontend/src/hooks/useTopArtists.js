'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchTopArtists } from '../utils/lastfm';

/**
 * Custom hook to fetch user's top 5 artists across selectable time periods:
 * - '7day' (7D)
 * - '1month' (1M)
 * - '6month' (6M)
 * - 'overall' (ALL)
 *
 * Implements client-side in-memory caching to ensure instant switching between periods.
 */
export function useTopArtists(initialPeriod = '7day') {
  const [period, setPeriod] = useState(initialPeriod);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME;
  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

  const cacheRef = useRef({});
  const abortControllerRef = useRef(null);

  const loadArtists = useCallback(
    async (targetPeriod) => {
      if (!username || !apiKey) {
        setIsLoading(false);
        setError('unconfigured');
        return;
      }

      // Return instantly from cache if previously loaded
      if (cacheRef.current[targetPeriod]) {
        setArtists(cacheRef.current[targetPeriod]);
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
        const results = await fetchTopArtists(
          username,
          apiKey,
          targetPeriod,
          abortControllerRef.current.signal
        );

        cacheRef.current[targetPeriod] = results;
        setArtists(results);
        setIsLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to fetch top artists');
        setIsLoading(false);
      }
    },
    [username, apiKey]
  );

  useEffect(() => {
    loadArtists(period);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadArtists, period]);

  return {
    period,
    setPeriod,
    artists,
    isLoading,
    error,
    isConfigured: Boolean(username && apiKey),
  };
}
