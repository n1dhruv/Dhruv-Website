import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const [html, robots, sitemap] = await Promise.all([
  readFile('out/index.html', 'utf8'),
  readFile('out/robots.txt', 'utf8'),
  readFile('out/sitemap.xml', 'utf8'),
])

assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1)
assert.equal((html.match(/<article[ >]/g) ?? []).length, 8)
assert.equal((html.match(/loading="lazy"/g) ?? []).length, 8)
assert.match(html, /rel="canonical" href="https:\/\/imdhruv\.tech"/)
assert.match(html, /"@type":"Person"/)
assert.match(html, /"@type":"SoftwareSourceCode"/)
assert.match(robots, /Sitemap: https:\/\/imdhruv\.tech\/sitemap\.xml/)
assert.match(sitemap, /<loc>https:\/\/imdhruv\.tech<\/loc>/)

console.log('Static SEO checks passed.')
