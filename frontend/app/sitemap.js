import { SITE_URL } from '../src/data/site'

export const dynamic = 'force-static'

export default function sitemap() {
  return [{
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }]
}
