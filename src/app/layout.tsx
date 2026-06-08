import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMS Comparison Demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f5f5f5' }}>
        <nav style={{
          background: '#1a1a2e', color: 'white', padding: '1rem 2rem',
          display: 'flex', gap: '2rem', alignItems: 'center'
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>CMS Demo</span>
          <a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a>
          <a href="/storyblok" style={{ color: '#ccc', textDecoration: 'none' }}>Storyblok</a>
          <a href="/strapi" style={{ color: '#ccc', textDecoration: 'none' }}>Strapi</a>
          <a href="/compare" style={{ color: '#ccc', textDecoration: 'none' }}>Compare</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
