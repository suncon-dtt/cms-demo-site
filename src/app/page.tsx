export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: '3rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>CMS Comparison: Storyblok vs Strapi</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>
        Same content, two different CMS backends. Click each to see live data.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <a href="/storyblok" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'white', borderRadius: 12, padding: '2rem',
            border: '2px solid #00b3b0', cursor: 'pointer'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌀</div>
            <h2 style={{ color: '#00b3b0', margin: '0 0 0.5rem' }}>Storyblok</h2>
            <p style={{ color: '#555', margin: 0 }}>SaaS headless CMS with a visual editor. No server to manage.</p>
            <ul style={{ color: '#333', marginTop: '1rem', paddingLeft: '1.2rem' }}>
              <li>✅ 5 min setup</li>
              <li>✅ Visual live preview editor</li>
              <li>✅ Hosted — no infra</li>
              <li>⚠️ Pricing scales with usage</li>
            </ul>
          </div>
        </a>

        <a href="/strapi" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'white', borderRadius: 12, padding: '2rem',
            border: '2px solid #4945ff', cursor: 'pointer'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔷</div>
            <h2 style={{ color: '#4945ff', margin: '0 0 0.5rem' }}>Strapi</h2>
            <p style={{ color: '#555', margin: 0 }}>Open-source self-hosted CMS. Full control, REST + GraphQL out of the box.</p>
            <ul style={{ color: '#333', marginTop: '1rem', paddingLeft: '1.2rem' }}>
              <li>✅ Free & open source</li>
              <li>✅ Full data ownership</li>
              <li>✅ Highly customisable</li>
              <li>⚠️ Needs a server to run</li>
            </ul>
          </div>
        </a>
      </div>

      <a href="/compare" style={{
        display: 'block', marginTop: '1.5rem', textAlign: 'center',
        background: '#1a1a2e', color: 'white', padding: '1rem', borderRadius: 8,
        textDecoration: 'none', fontWeight: 600
      }}>
        See side-by-side comparison →
      </a>
    </main>
  )
}
