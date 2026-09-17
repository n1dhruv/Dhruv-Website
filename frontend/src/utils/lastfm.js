/**
 * Normalizes raw Last.fm user.getRecentTracks response into a clean, safe track object.
 *
 * Handles inconsistent Last.fm formats:
 * - track as array vs single object
 * - artist as string, { name }, or { '#text' }
 * - album as string, { name }, or { '#text' }
 * - missing or placeholder artwork
 * - missing fields, malformed responses, and API error envelopes
 *
 * @param {any} data Raw JSON response from Last.fm API
 * @returns {{
 *   isPlaying: boolean,
 *   name: string,
 *   artist: string,
 *   album: string,
 *   image: string | null,
 *   url: string,
 *   playedAt: Date | null
 * } | null}
 */
export function normalizeLastFmTrack(data) {
  if (!data || typeof data !== 'object') {
    return null;
  }

  // Handle Last.fm API error envelopes: { error: 6, message: '...' }
  if (data.error) {
    return null;
  }

  const recenttracks = data.recenttracks;
  if (!recenttracks || typeof recenttracks !== 'object') {
    return null;
  }

  const rawTracks = recenttracks.track;
  let rawTrack = null;

  if (Array.isArray(rawTracks)) {
    if (rawTracks.length === 0) {
      return null;
    }
    rawTrack = rawTracks[0];
  } else if (rawTracks && typeof rawTracks === 'object') {
    rawTrack = rawTracks;
  }

  if (!rawTrack || typeof rawTrack !== 'object') {
    return null;
  }

  // Determine current playback status strictly via Last.fm @attr.nowplaying
  const isPlaying = rawTrack['@attr']?.nowplaying === 'true';

  // Normalize track name
  const name = typeof rawTrack.name === 'string' ? rawTrack.name.trim() : '';

  // Normalize artist name
  let artist = '';
  if (typeof rawTrack.artist === 'string') {
    artist = rawTrack.artist.trim();
  } else if (rawTrack.artist && typeof rawTrack.artist === 'object') {
    artist = (rawTrack.artist.name || rawTrack.artist['#text'] || '').trim();
  }

  // Normalize album name
  let album = '';
  if (typeof rawTrack.album === 'string') {
    album = rawTrack.album.trim();
  } else if (rawTrack.album && typeof rawTrack.album === 'object') {
    album = (rawTrack.album['#text'] || rawTrack.album.name || '').trim();
  }

  // Normalize artwork: select largest useful image entry, filtering empty or placeholder images
  let image = null;
  if (Array.isArray(rawTrack.image) && rawTrack.image.length > 0) {
    const validImages = rawTrack.image
      .map((img) => (img && typeof img['#text'] === 'string' ? img['#text'].trim() : ''))
      .filter((url) => {
        if (!url) return false;
        // Last.fm placeholder star image check
        if (url.includes('2a96cbd8b46e442fc41c2b86b821562f')) return false;
        return true;
      });

    if (validImages.length > 0) {
      image = validImages[validImages.length - 1];
    }
  } else if (typeof rawTrack.image === 'string' && rawTrack.image.trim() !== '') {
    const trimmed = rawTrack.image.trim();
    if (!trimmed.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
      image = trimmed;
    }
  }

  // Normalize track URL
  const user = recenttracks['@attr']?.user || '';
  const fallbackUrl = user ? `https://www.last.fm/user/${encodeURIComponent(user)}` : 'https://www.last.fm';
  const url = typeof rawTrack.url === 'string' && rawTrack.url.trim() !== ''
    ? rawTrack.url.trim()
    : fallbackUrl;

  // Normalize timestamp for tracks that are not currently playing
  let playedAt = null;
  if (!isPlaying && rawTrack.date && rawTrack.date.uts) {
    const timestamp = Number(rawTrack.date.uts);
    if (!isNaN(timestamp) && timestamp > 0) {
      playedAt = new Date(timestamp * 1000);
    }
  }

  // Must have at least a track title or artist name
  if (!name && !artist) {
    return null;
  }

  return {
    isPlaying,
    name,
    artist,
    album,
    image,
    url,
    playedAt,
  };
}

/**
 * Formats a Date object into relative time string.
 * Examples: '2 min ago', '17 min ago', '3 hr ago', 'Yesterday'
 *
 * @param {Date | number | string | null} date
 * @returns {string | null}
 */
export function formatRelativeTime(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return null;

  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - d.getTime()) / 1000));

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);
  if (days === 1) {
    return 'Yesterday';
  }
  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

/**
 * Enriches a normalized track with high-res album artwork and album title
 * if missing from the initial Last.fm scrobble (common with scrobblers like LiMusic).
 *
 * Tries:
 * 1. Last.fm track.getInfo (primary)
 * 2. iTunes Search API (instant public client fallback for artwork)
 *
 * @param {object} track Normalized track
 * @param {string} apiKey Last.fm API key
 * @param {AbortSignal} [signal] Optional abort signal
 * @returns {Promise<object>} Enriched track
 */
export async function enrichTrackMetadata(track, apiKey, signal) {
  if (!track || (track.image && track.album)) {
    return track;
  }

  const enriched = { ...track };

  // 1. Try Last.fm track.getInfo
  if ((!enriched.image || !enriched.album) && apiKey) {
    try {
      const params = new URLSearchParams({
        method: 'track.getInfo',
        artist: enriched.artist,
        track: enriched.name,
        api_key: apiKey.trim(),
        format: 'json',
      });
      const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`, {
        signal,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const album = data?.track?.album;
        if (album) {
          if (!enriched.album && album.title) {
            enriched.album = album.title.trim();
          }
          if (!enriched.image && Array.isArray(album.image)) {
            const validImages = album.image
              .map((img) => (img && typeof img['#text'] === 'string' ? img['#text'].trim() : ''))
              .filter((url) => url.length > 0 && !url.includes('2a96cbd8b46e442fc41c2b86b821562f'));
            if (validImages.length > 0) {
              enriched.image = validImages[validImages.length - 1];
            }
          }
        }
      }
    } catch {
      // Gracefully continue to secondary fallback
    }
  }

  // 2. Try iTunes Search API as fallback for artwork and album title
  if (!enriched.image || !enriched.album) {
    try {
      const query = `${enriched.artist} ${enriched.name}`
        .replace(/[^\w\s]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
      const itunesRes = await fetch(itunesUrl, { signal });
      if (itunesRes.ok) {
        const itunesData = await itunesRes.json();
        if (itunesData.resultCount > 0 && itunesData.results?.[0]) {
          const item = itunesData.results[0];
          if (!enriched.image && item.artworkUrl100) {
            enriched.image = item.artworkUrl100.replace('100x100bb', '300x300bb');
          }
          if (!enriched.album && item.collectionName) {
            enriched.album = item.collectionName.trim();
          }
        }
      }
    } catch {
      // Ignore fallback errors
    }
  }

  return enriched;
}

/**
 * Resolves the actual artist portrait/cover photo (not album artwork).
 *
 * Tries:
 * 1. Deezer Artist Search (JSONP in browser, fetch in Node) -> returns verified 500x500/1000x1000 artist portrait.
 * 2. Wikipedia Summary API (musician / artist portrait).
 * 3. Fallback to Last.fm top release if portrait is unavailable.
 *
 * @param {string} artistName
 * @param {string} [apiKey]
 * @param {AbortSignal} [signal]
 * @returns {Promise<string | null>}
 */
export async function resolveArtistArtwork(artistName, apiKey, signal) {
  if (!artistName) return null;

  const primary = artistName.split(/[,&]/)[0].replace(/[^\w\s]/gi, ' ').trim();
  if (!primary) return null;

  // 1. In browser environment: Deezer JSONP to get official artist photo without CORS
  if (typeof window !== 'undefined') {
    try {
      const jsonpPhoto = await new Promise((resolve) => {
        const cbName = `dz_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
        const script = document.createElement('script');
        let done = false;

        const cleanup = () => {
          if (done) return;
          done = true;
          try {
            delete window[cbName];
          } catch {
            window[cbName] = undefined;
          }
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };

        const timer = setTimeout(() => {
          cleanup();
          resolve(null);
        }, 4000);

        window[cbName] = (data) => {
          clearTimeout(timer);
          cleanup();
          const artist = data?.data?.[0];
          if (artist?.picture_xl || artist?.picture_big || artist?.picture_medium) {
            resolve(artist.picture_xl || artist.picture_big || artist.picture_medium);
          } else {
            resolve(null);
          }
        };

        script.onerror = () => {
          clearTimeout(timer);
          cleanup();
          resolve(null);
        };

        script.src = `https://api.deezer.com/search/artist?q=${encodeURIComponent(primary)}&output=jsonp&callback=${cbName}`;
        document.body.appendChild(script);
      });

      if (jsonpPhoto) {
        return jsonpPhoto;
      }
    } catch {
      // Fall through
    }
  } else {
    // In Node.js / test environment: direct fetch from Deezer API
    try {
      const res = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(primary)}`, { signal });
      if (res.ok) {
        const data = await res.json();
        const artist = data?.data?.[0];
        if (artist?.picture_xl || artist?.picture_big || artist?.picture_medium) {
          return artist.picture_xl || artist.picture_big || artist.picture_medium;
        }
      }
    } catch {
      // Fall through
    }
  }

  // 2. Wikipedia Artist Summary photo fallback
  try {
    const wikiName = primary.replace(/\s+/g, '_');
    const wikiUrls = [
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}`,
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}_(musician)`,
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}_(singer)`,
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}_(rapper)`,
    ];

    for (const url of wikiUrls) {
      const res = await fetch(url, { signal });
      if (res.ok) {
        const data = await res.json();
        const img = data?.thumbnail?.source;
        if (img && !img.endsWith('.svg') && !img.includes('disambig')) {
          return img;
        }
      }
    }
  } catch {
    // Fall through
  }

  // 3. Fallback: Last.fm artist.getTopAlbums if portrait could not be located
  if (apiKey) {
    try {
      const params = new URLSearchParams({
        method: 'artist.getTopAlbums',
        artist: primary,
        api_key: apiKey.trim(),
        format: 'json',
        limit: '1',
      });
      const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`, {
        signal,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        const firstAlbum = data?.topalbums?.album?.[0];
        if (firstAlbum && Array.isArray(firstAlbum.image)) {
          const valid = firstAlbum.image
            .map((img) => (img && typeof img['#text'] === 'string' ? img['#text'].trim() : ''))
            .filter((url) => url.length > 0 && !url.includes('2a96cbd8b46e442fc41c2b86b821562f'));
          if (valid.length > 0) {
            return valid[valid.length - 1];
          }
        }
      }
    } catch {
      // Fall through
    }
  }

  return null;
}

/**
 * Fetches user's top 5 artists from Last.fm for a specified time period.
 *
 * @param {string} username
 * @param {string} apiKey
 * @param {'7day' | '1month' | '6month' | 'overall'} period
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array<{ name: string, playcount: string, rank: number, url: string }>>}
 */
export async function fetchTopArtists(username, apiKey, period = '7day', signal) {
  if (!username || !apiKey) return [];

  try {
    const params = new URLSearchParams({
      method: 'user.getTopArtists',
      user: username.trim(),
      api_key: apiKey.trim(),
      format: 'json',
      limit: '5',
      period,
    });

    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`, {
      signal,
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const rawList = data?.topartists?.artist;
    if (!rawList) return [];

    const list = Array.isArray(rawList) ? rawList.slice(0, 5) : [rawList];

    return list.map((item, idx) => {
      const name = typeof item.name === 'string' ? item.name.trim() : '';
      const playcount = String(item.playcount || '0');
      const rank = Number(item['@attr']?.rank || idx + 1);
      const url = typeof item.url === 'string' && item.url.trim() !== ''
        ? item.url.trim()
        : `https://www.last.fm/music/${encodeURIComponent(name)}`;

      return {
        name,
        playcount,
        rank,
        url,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Fetches user's top 5 tracks from Last.fm for a specified time period.
 *
 * @param {string} username
 * @param {string} apiKey
 * @param {'7day' | '1month' | '6month' | 'overall'} period
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array<{ name: string, artist: string, playcount: string, rank: number, url: string }>>}
 */
export async function fetchTopTracks(username, apiKey, period = '7day', signal) {
  if (!username || !apiKey) return [];

  try {
    const params = new URLSearchParams({
      method: 'user.getTopTracks',
      user: username.trim(),
      api_key: apiKey.trim(),
      format: 'json',
      limit: '5',
      period,
    });

    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params.toString()}`, {
      signal,
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const rawList = data?.toptracks?.track;
    if (!rawList) return [];

    const list = Array.isArray(rawList) ? rawList.slice(0, 5) : [rawList];

    return list.map((item, idx) => {
      const name = typeof item.name === 'string' ? item.name.trim() : '';
      const artist = typeof item.artist === 'string'
        ? item.artist.trim()
        : (item.artist?.name || item.artist?.['#text'] || '').trim();
      const playcount = String(item.playcount || '0');
      const rank = Number(item['@attr']?.rank || idx + 1);
      const url = typeof item.url === 'string' && item.url.trim() !== ''
        ? item.url.trim()
        : `https://www.last.fm/music/${encodeURIComponent(artist)}/_/${encodeURIComponent(name)}`;

      return {
        name,
        artist,
        playcount,
        rank,
        url,
      };
    });
  } catch {
    return [];
  }
}
