export default function ComparePage() {
  const rows = [
    { feature: 'Setup time', storyblok: '~5 minutes', strapi: '~20 minutes' },
    { feature: 'Hosting', storyblok: 'SaaS (they host it)', strapi: 'Self-hosted (you manage it)' },
    { feature: 'Cost', storyblok: 'Free tier, then paid per seat/usage', strapi: 'Free & open source, pay for hosting' },
    { feature: 'Editor experience', storyblok: 'Visual editor with live preview ⭐', strapi: 'Form-based admin panel' },
    { feature: 'API', storyblok: 'REST + GraphQL (CDN-cached)', strapi: 'REST + GraphQL (your server)' },
    { feature: 'Content modelling', storyblok: 'Components/Blocks (flexible)', strapi: 'Collection & Single Types' },
    { feature: 'Media management', storyblok: 'Built-in DAM', strapi: 'Built-in media library' },
    { feature: 'Localisation', storyblok: 'Built-in (all plans)', strapi: 'Plugin (Enterprise plan)' },
    { feature: 'User roles', storyblok: 'Built-in', strapi: 'Built-in (custom roles on paid)' },
    { feature: 'Data ownership', storyblok: 'Their servers', strapi: 'Your servers ⭐' },
    { feature: 'Customisability', storyblok: 'Moderate', strapi: 'Very high (open source)' },
    { feature: 'Best for', storyblok: 'Marketing sites, editors who want live preview', strapi: 'Dev teams who want full control' },
  ]

  return (
    <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>Side-by-side Comparison</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Both CMSes can power the same frontend — the difference is in workflow and control.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '1rem', textAlign: 'left', width: '30%' }}>Feature</th>
            <th style={{ padding: '1rem', textAlign: 'left', width: '35%' }}>🌀 Storyblok</th>
            <th style={{ padding: '1rem', textAlign: 'left', width: '35%' }}>🔷 Strapi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.feature} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#333', borderBottom: '1px solid #eee' }}>{row.feature}</td>
              <td style={{ padding: '0.85rem 1rem', color: '#444', borderBottom: '1px solid #eee' }}>{row.storyblok}</td>
              <td style={{ padding: '0.85rem 1rem', color: '#444', borderBottom: '1px solid #eee' }}>{row.strapi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: '#e8fffe', border: '1px solid #00b3b0', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#00b3b0' }}>Pick Storyblok if...</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#333' }}>
            <li>Non-technical editors need to manage content</li>
            <li>You want the live visual editor</li>
            <li>You don't want to manage infrastructure</li>
            <li>Speed of setup matters</li>
          </ul>
        </div>
        <div style={{ background: '#eeeeff', border: '1px solid #4945ff', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: '#4945ff' }}>Pick Strapi if...</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#333' }}>
            <li>You want full data ownership</li>
            <li>You need heavy customisation</li>
            <li>You're on a tight budget (open source)</li>
            <li>Your team can manage a server</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
