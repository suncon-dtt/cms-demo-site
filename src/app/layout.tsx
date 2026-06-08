import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookbook Demo',
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
            background: #faf9f7;
            color: #1a1a1a;
            line-height: 1.6;
          }
          a { color: inherit; }
          nav a:hover { opacity: 1 !important; }
        `}} />
      </head>
      <body>
        <nav style={{
          background: '#111',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          height: 56,
          gap: '0',
        }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', letterSpacing: '0.02em', marginRight: '2rem' }}>
            Cookbook Demo
          </span>
          <a href="/storyblok" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem', padding: '0 1rem', height: '100%', display: 'flex', alignItems: 'center' }}>
            Italian Cookbook
          </a>
          <a href="/strapi" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem', padding: '0 1rem', height: '100%', display: 'flex', alignItems: 'center' }}>
            Japanese Cookbook
          </a>
        </nav>
        {children}
      </body>
    </html>
  )
}
