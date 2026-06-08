const storyblokColor = '#00b3b0'
const strapiColor = '#4945ff'

const rows = [
  { feature: 'Hosting', storyblok: 'Fully hosted SaaS — Storyblok manages the servers', strapi: 'Self-hosted — you run it on your own infrastructure' },
  { feature: 'Setup time', storyblok: 'Under 5 minutes', strapi: '15–30 minutes' },
  { feature: 'Cost', storyblok: 'Free tier, then per-seat / usage pricing', strapi: 'Free & open source; you pay for hosting' },
  { feature: 'Editor experience', storyblok: 'Visual drag-and-drop editor with live preview', strapi: 'Form-based admin panel' },
  { feature: 'Content modelling', storyblok: 'Components and blocks — flexible, composable', strapi: 'Collection types and single types' },
  { feature: 'API', storyblok: 'REST and GraphQL, CDN-cached globally', strapi: 'REST and GraphQL, served from your own server' },
  { feature: 'Media management', storyblok: 'Built-in DAM (Digital Asset Manager)', strapi: 'Built-in media library' },
  { feature: 'Localisation', storyblok: 'Built-in on all plans', strapi: 'Plugin-based (Enterprise plan for full support)' },
  { feature: 'User roles', storyblok: 'Built-in role management', strapi: 'Built-in; custom roles on paid plans' },
  { feature: 'Data ownership', storyblok: 'Data lives on Storyblok servers', strapi: 'Data lives on your servers' },
  { feature: 'Customisability', storyblok: 'Moderate — plugin and field extensions', strapi: 'Very high — full source code access' },
  { feature: 'Best for', storyblok: 'Marketing teams, editors who need visual preview', strapi: 'Dev teams who want full control and data ownership' },
]

export default function ComparePage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Side-by-side Comparison
        </h1>
        <p style={{ color: '#555', fontSize: '0.9rem', margin: 0, maxWidth: 560 }}>
          Both CMSes can power the same frontend. The difference is in where your content lives,
          how editors interact with it, and how much control you want over the stack.
        </p>
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: '2rem',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#111', color: '#fff' }}>
              <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontWeight: 600, width: '25%', color: '#aaa', fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Feature</th>
              <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontWeight: 600, width: '37.5%', color: storyblokColor }}>Storyblok</th>
              <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontWeight: 600, width: '37.5%', color: strapiColor }}>Strapi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.875rem 1.25rem', fontWeight: 600, color: '#444', fontSize: '0.8rem', verticalAlign: 'top' }}>{row.feature}</td>
                <td style={{ padding: '0.875rem 1.25rem', color: '#333', verticalAlign: 'top', borderLeft: `2px solid ${storyblokColor}20` }}>{row.storyblok}</td>
                <td style={{ padding: '0.875rem 1.25rem', color: '#333', verticalAlign: 'top', borderLeft: `2px solid ${strapiColor}20` }}>{row.strapi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <RecommendationCard
          color={storyblokColor}
          title="Choose Storyblok if..."
          points={[
            'Non-technical editors need to manage content day-to-day',
            'A visual live preview is important to your workflow',
            'You want to move fast without managing infrastructure',
            'You are building a marketing or content site',
          ]}
        />
        <RecommendationCard
          color={strapiColor}
          title="Choose Strapi if..."
          points={[
            'You need full ownership of your data',
            'Your team wants to customise the CMS itself',
            'You are on a tight budget and can manage a server',
            'You need deep API or plugin customisation',
          ]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <a href="/storyblok" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: storyblokColor, color: '#fff',
          padding: '1rem 1.25rem', borderRadius: 8,
          textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}>
          <span>Browse Storyblok content</span>
          <span style={{ opacity: 0.75 }}>→</span>
        </a>
        <a href="/strapi" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: strapiColor, color: '#fff',
          padding: '1rem 1.25rem', borderRadius: 8,
          textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}>
          <span>Browse Strapi content</span>
          <span style={{ opacity: 0.75 }}>→</span>
        </a>
      </div>
    </main>
  )
}

function RecommendationCard({ color, title, points }: { color: string; title: string; points: string[] }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderTop: `3px solid ${color}`,
      borderRadius: 10,
      padding: '1.25rem 1.5rem',
    }}>
      <h3 style={{ margin: '0 0 0.875rem', color, fontSize: '0.95rem', fontWeight: 700 }}>{title}</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {points.map(p => (
          <li key={p} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#444', marginBottom: '0.45rem', lineHeight: 1.5 }}>
            <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>+</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
