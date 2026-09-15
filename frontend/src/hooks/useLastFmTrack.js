'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { normalizeLastFmTrack, enrichTrackMetadata } from '../utils/lastfm';

const REFRESH_INTERVAL_MS = 45000; // 45 seconds

/**
 * Custom hook to fetch currently playing or last played track from Last.fm directly in the browser.
 *
 * Implements:
 * - Public API key & username from NEXT_PUBLIC_ environment variables
 * - ~45s polling interval
 * - Pauses polling when document.visibilityState === 'hidden'
 * - Refreshes immediately when tab returns to visible
 * - Cleanup on unmount with AbortController
 * - Comprehensive defensive error handling (never crashes)
 */
export function useLastFmTrack() {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME;
  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);

  const fetchTrack = useCallback(async () => {
    // Avoid fetching if page is hidden or unconfigured
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      return;
    }

    if (!username || !apiKey) {
      if (isMountedRef.current) {
        setIsLoading(false);
        setError('unconfigured');
      }
      return;
    }

    // Cancel prior in-flight request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const params = new URLSearchParams({
        method: 'user.getRecentTracks',
        user: username.trim(),
        api_key: apiKey.trim(),
        format: 'json',
        limit: '1',
        extended: '1',
      });

      const endpoint = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;
      const response = await fetch(endpoint, {
        signal: abortControllerRef.current.signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (!isMountedRef.current) return;

      if (data && data.error) {
        throw new Error(data.message || `Last.fm error ${data.error}`);
      }

      const normalized = normalizeLastFmTrack(data);

      if (!normalized) {
        if (isMountedRef.current) {
          setTrack(null);
          setError(null);
          setIsLoading(false);
        }
        return;
      }

      if (isMountedRef.current) {
        setTrack(normalized);
        setError(null);
        setIsLoading(false);
      }

      // If artwork or album is missing from scrobble, enrich via Last.fm track.getInfo / iTunes
      if (!normalized.image || !normalized.album) {
        const enriched = await enrichTrackMetadata(
          normalized,
          apiKey,
          abortControllerRef.current?.signal
        );
        if (
          isMountedRef.current &&
          enriched &&
          (enriched.image !== normalized.image || enriched.album !== normalized.album)
        ) {
          setTrack(enriched);
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
      if (isMountedRef.current) {
        setError(err.message || 'Failed to fetch Last.fm track');
        setIsLoading(false);
      }
    }
  }, [username, apiKey]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!username || !apiKey) {
      setIsLoading(false);
      return;
    }

    // Initial fetch on mount
    fetchTrack();

    // 45-second polling interval
    const intervalId = setInterval(() => {
      fetchTrack();
    }, REFRESH_INTERVAL_MS);

    // Refresh immediately when returning to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchTrack();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchTrack, username, apiKey]);

  return {
    track,
    isLoading: (!username || !apiKey) ? false : isLoading,
    error,
    isConfigured: Boolean(username && apiKey),
  };
}
