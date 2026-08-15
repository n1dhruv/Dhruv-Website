import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import medianexus from '../src/assets/medianexus.webp'
import favicon from '../src/assets/favicon.webp'
import JsonLd from '../src/components/JsonLd'
import { projects } from '../src/data/projects'
import { person, SITE_URL } from '../src/data/site'
import '../src/index.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
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
    images: [{
      url: medianexus.src,
      width: 1901,
      height: 939,
      alt: 'MediaNexus healthcare platform featured in Dhruv Sharma’s portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@nocapdhruv',
    images: [medianexus.src],
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
      image: new URL(project.image.src, SITE_URL).toString(),
      author: { '@id': `${SITE_URL}/#person` },
      mainEntityOfPage: `${SITE_URL}/#projects`,
    })),
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* JSON-LD names the person and projects as entities, not extra pages. */}
        <JsonLd data={structuredData} />
      </head>
      <body>{children}</body>
    </html>
  )
}
