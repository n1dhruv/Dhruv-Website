import favicon from '../src/assets/favicon.webp'
import JsonLd from '../src/components/JsonLd'
import { projects } from '../src/data/projects'
import { person, SITE_URL } from '../src/data/site'
import '../src/index.css'

const title = 'Dhruv Sharma — AI & Scalable Backend Developer Portfolio'
const description = 'Dhruv Sharma is an AI and backend developer building scalable web platforms, intelligent systems, and reliable APIs. Explore his projects and experience.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  alternates: { canonical: '/' },
  icons: { icon: favicon.src },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: `${person.name} Portfolio`,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@nocapdhruv',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: person.name,
      jobTitle: person.jobTitle,
      url: SITE_URL,
      email: person.email,
      sameAs: person.sameAs,
    },
    ...projects.map((project) => ({
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/#${project.id}`,
      name: project.title,
      description: [project.description, project.achievement].filter(Boolean).join(' '),
      dateCreated: project.year,
      programmingLanguage: project.tags,
      codeRepository: project.github,
      url: project.demo && project.demo !== '#' ? project.demo : project.github,
      author: { '@id': `${SITE_URL}/#person` },
      mainEntityOfPage: `${SITE_URL}/#projects`,
    })),
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD names the person and projects as entities, not extra pages. */}
        <JsonLd data={structuredData} />
      </head>
      <body>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] pointer-events-none"></div>
        {children}
      </body>
    </html>
  )
}
