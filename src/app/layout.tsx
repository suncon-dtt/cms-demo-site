import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMS Comparison Demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; }
          html { font-size: 16px; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f8f8;
            color: #1a1a1a;
            line-height: 1.6;
          }
          a { color: inherit; }
          nav a:hover { color: #fff !important; }
          .nav-link-active { color: #fff !important; border-bottom: 2px solid #fff; }
        `}} />
      </head>
      <body>
        <nav style={{
          background: '#111',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          height: 56,
          borderBottom: '1px solid #222',
        }}>
          <a href="/" style={{
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            marginRight: '2rem',
          }}>
            CMS Demo
          </a>
          {[
            { href: '/', label: 'Home' },
            { href: '/storyblok', label: 'Storyblok' },
            { href: '/strapi', label: 'Strapi' },
            { href: '/compare', label: 'Compare' },
          ].map(({ href, label }) => (
            <a key={href} href={href} style={{
              color: '#999',
              textDecoration: 'none',
              fontSize: '0.9rem',
              padding: '0 1rem',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}>
              {label}
            </a>
          ))}
        </nav>
        {children}
      </body>
    </html>
  )
}
