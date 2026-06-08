const storyblokColor = '#00b3b0'
const strapiColor = '#4945ff'

export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
          Storyblok vs Strapi
        </h1>
        <p style={{ color: '#555', fontSize: '1.05rem', margin: 0, maxWidth: 560 }}>
          Two headless CMSes, one frontend. Explore how each one works by browsing live content
          pulled directly from their APIs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <CmsCard
          href="/storyblok"
          accentColor={storyblokColor}
          name="Storyblok"
          tagline="SaaS — no server required"
          description="A hosted headless CMS with a visual drag-and-drop editor. Content is managed in the cloud and served via a CDN-backed API."
          pros={['Visual live preview editor', '5-minute setup', 'No infrastructure to manage']}
          con="Pricing scales with usage and seats"
        />
        <CmsCard
          href="/strapi"
          accentColor={strapiColor}
          name="Strapi"
          tagline="Open source — self-hosted"
          description="An open-source headless CMS you run on your own server. Full control over your data, schema, and API — REST and GraphQL out of the box."
          pros={['Free & open source', 'Full data ownership', 'Highly customisable']}
          con="You manage the server and infrastructure"
        />
      </div>

      <a href="/compare" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#111',
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: 10,
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
      }}>
        <span>See full side-by-side comparison</span>
        <span style={{ opacity: 0.6 }}>→</span>
      </a>
    </main>
  )
}

function CmsCard({
  href, accentColor, name, tagline, description, pros, con,
}: {
  href: string
  accentColor: string
  name: string
  tagline: string
  description: string
  pros: string[]
  con: string
}) {
  return (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '1.75rem',
        border: '1px solid #e8e8e8',
        height: '100%',
        transition: 'box-shadow 0.15s',
        cursor: 'pointer',
        borderTop: `3px solid ${accentColor}`,
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ margin: '0 0 0.2rem', color: accentColor, fontSize: '1.25rem', fontWeight: 700 }}>{name}</h2>
          <span style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: accentColor,
            background: `${accentColor}18`,
            borderRadius: 4,
            padding: '2px 8px',
            letterSpacing: '0.03em',
          }}>
            {tagline}
          </span>
        </div>

        <p style={{ color: '#444', fontSize: '0.9rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>{description}</p>

        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {pros.map(p => (
            <li key={p} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#333', marginBottom: '0.4rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>+</span>
              {p}
            </li>
          ))}
          <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#888', marginTop: '0.6rem' }}>
            <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>–</span>
            {con}
          </li>
        </ul>

        <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', fontWeight: 600, color: accentColor }}>
          Browse content →
        </div>
      </div>
    </a>
  )
}
