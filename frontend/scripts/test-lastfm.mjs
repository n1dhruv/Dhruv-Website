import assert from 'node:assert/strict';
import {
  normalizeLastFmTrack,
  formatRelativeTime,
  enrichTrackMetadata,
  fetchTopArtists,
  fetchTopTracks,
} from '../src/utils/lastfm.js';

console.log('Testing Last.fm utilities...');

// 1. Null / undefined / invalid inputs
assert.equal(normalizeLastFmTrack(null), null, 'null should return null');
assert.equal(normalizeLastFmTrack(undefined), null, 'undefined should return null');
assert.equal(normalizeLastFmTrack('invalid'), null, 'string should return null');
assert.equal(normalizeLastFmTrack({}), null, 'empty object should return null');
assert.equal(normalizeLastFmTrack({ error: 6, message: 'User not found' }), null, 'Last.fm error response should return null');
assert.equal(normalizeLastFmTrack({ recenttracks: {} }), null, 'missing track should return null');
assert.equal(normalizeLastFmTrack({ recenttracks: { track: [] } }), null, 'empty track array should return null');

// 2. Currently playing track with array structure
const nowPlayingPayload = {
  recenttracks: {
    '@attr': { user: 'dhruv' },
    track: [
      {
        '@attr': { nowplaying: 'true' },
        name: 'Blinding Lights',
        artist: {
          '#text': 'The Weeknd',
          name: 'The Weeknd',
        },
        album: {
          '#text': 'After Hours',
        },
        url: 'https://www.last.fm/music/The+Weeknd/_/Blinding+Lights',
        image: [
          { size: 'small', '#text': 'https://example.com/small.jpg' },
          { size: 'large', '#text': 'https://example.com/large.jpg' },
          { size: 'extralarge', '#text': 'https://example.com/xlarge.jpg' },
        ],
      },
    ],
  },
};

const normalizedPlaying = normalizeLastFmTrack(nowPlayingPayload);
assert.equal(normalizedPlaying.isPlaying, true, 'isPlaying must be true');
assert.equal(normalizedPlaying.name, 'Blinding Lights');
assert.equal(normalizedPlaying.artist, 'The Weeknd');
assert.equal(normalizedPlaying.album, 'After Hours');
assert.equal(normalizedPlaying.image, 'https://example.com/xlarge.jpg', 'Must pick largest valid image');
assert.equal(normalizedPlaying.url, 'https://www.last.fm/music/The+Weeknd/_/Blinding+Lights');
assert.equal(normalizedPlaying.playedAt, null, 'Currently playing track must not have playedAt');

// 3. Last played track with single object (non-array) structure
const lastPlayedSingleObjectPayload = {
  recenttracks: {
    '@attr': { user: 'dhruv' },
    track: {
      name: 'Starboy',
      artist: 'The Weeknd',
      album: 'Starboy',
      url: 'https://www.last.fm/music/The+Weeknd/_/Starboy',
      image: 'https://example.com/starboy.jpg',
      date: {
        uts: '1710520000',
      },
    },
  },
};

const normalizedLastPlayed = normalizeLastFmTrack(lastPlayedSingleObjectPayload);
assert.equal(normalizedLastPlayed.isPlaying, false, 'isPlaying must be false');
assert.equal(normalizedLastPlayed.name, 'Starboy');
assert.equal(normalizedLastPlayed.artist, 'The Weeknd');
assert.equal(normalizedLastPlayed.album, 'Starboy');
assert.equal(normalizedLastPlayed.image, 'https://example.com/starboy.jpg');
assert.equal(normalizedLastPlayed.playedAt instanceof Date, true);
assert.equal(normalizedLastPlayed.playedAt.getTime(), 1710520000 * 1000);

// 4. Placeholder / empty images fallback
const placeholderImagePayload = {
  recenttracks: {
    '@attr': { user: 'dhruv' },
    track: [
      {
        name: 'Unknown Song',
        artist: { name: 'Unknown Artist' },
        album: { '#text': '' },
        url: '',
        image: [
          { size: 'small', '#text': '' },
          { size: 'large', '#text': 'https://lastfm-img.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png' },
        ],
        date: { uts: '1700000000' },
      },
    ],
  },
};

const normalizedPlaceholder = normalizeLastFmTrack(placeholderImagePayload);
assert.equal(normalizedPlaceholder.image, null, 'Must ignore 2a96cbd8b46e442fc41c2b86b821562f placeholder and empty strings');
assert.equal(normalizedPlaceholder.album, '', 'Empty album string');
assert.equal(normalizedPlaceholder.url, 'https://www.last.fm/user/dhruv', 'Fallback to user url if track url is empty');

// 5. Relative time formatting
const now = Date.now();
assert.equal(formatRelativeTime(new Date(now - 10 * 1000)), 'just now');
assert.equal(formatRelativeTime(new Date(now - 2 * 60 * 1000)), '2 min ago');
assert.equal(formatRelativeTime(new Date(now - 17 * 60 * 1000)), '17 min ago');
assert.equal(formatRelativeTime(new Date(now - 3 * 3600 * 1000)), '3 hr ago');
assert.equal(formatRelativeTime(new Date(now - 28 * 3600 * 1000)), 'Yesterday');
assert.equal(formatRelativeTime(new Date(now - 3 * 86400 * 1000)), '3d ago');
assert.equal(formatRelativeTime(null), null);

// 6. Metadata enrichment test (fallback artwork resolution)
const rawWithoutImage = {
  name: 'Moonlight',
  artist: 'XXXTENTACION',
  album: '',
  image: null,
  isPlaying: true,
  url: 'https://www.last.fm/music/XXXTENTACION/_/Moonlight',
  playedAt: null,
};

const enriched = await enrichTrackMetadata(rawWithoutImage, 'f1f56145603d3db830f4ef1695aa6358');
assert.ok(enriched.image, 'Enriched track must have an artwork image');
assert.ok(enriched.image.startsWith('http'), 'Artwork image must be a valid URL');
assert.ok(enriched.album, 'Enriched track must resolve album name');

// 7. Top artists resolution test (text only, numbered ranking)
const topArtistsList = await fetchTopArtists('imdhruv', 'f1f56145603d3db830f4ef1695aa6358', '7day');
assert.ok(Array.isArray(topArtistsList), 'Top artists must return an array');
assert.ok(topArtistsList.length > 0, 'Top artists array must not be empty');
assert.ok(topArtistsList[0].name, 'Top artist must have a name');
assert.ok(topArtistsList[0].rank, 'Top artist must have a rank');
assert.ok(topArtistsList[0].playcount !== undefined, 'Top artist must have playcount');

// 8. Top tracks resolution test
const topTracksList = await fetchTopTracks('imdhruv', 'f1f56145603d3db830f4ef1695aa6358', '7day');
assert.ok(Array.isArray(topTracksList), 'Top tracks must return an array');
assert.ok(topTracksList.length > 0, 'Top tracks array must not be empty');
assert.ok(topTracksList[0].name, 'Top track must have a name');
assert.ok(topTracksList[0].artist, 'Top track must have an artist');
assert.ok(topTracksList[0].rank, 'Top track must have a rank');
assert.ok(topTracksList[0].playcount !== undefined, 'Top track must have playcount');

console.log('✓ All Last.fm utility unit tests passed successfully!');
