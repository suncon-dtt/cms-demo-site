const accentColor = '#4945ff'

async function getStrapiContent() {
  const url = process.env.STRAPI_URL || 'http://localhost:1337'
  const token = process.env.STRAPI_TOKEN
  const endpoints = ['articles', 'posts', 'blogs', 'pages']

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${url}/api/${endpoint}?populate=*`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 60 },
      })
      if (res.ok) {
        const data = await res.json()
        if (data.data?.length > 0) return { endpoint, items: data.data as any[] }
      }
    } catch {}
  }
  return { endpoint: null, items: [] as any[] }
}

function extractRichText(value: any): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .flatMap((block: any) => {
        if (block.children) return block.children
        return []
      })
      .filter((n: any) => n.type === 'text' && n.text)
      .map((n: any) => n.text)
      .join('')
      || null
  }
  return null
}

export default async function StrapiPage() {
  let result: { endpoint: string | null; items: any[] } = { endpoint: null, items: [] }
  let error: string | null = null

  try {
    result = await getStrapiContent()
  } catch (e: any) {
    error = e.message
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: accentColor, letterSpacing: '-0.02em' }}>Strapi</h1>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: accentColor,
            background: `${accentColor}18`,
            borderRadius: 4,
            padding: '3px 8px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            Open Source — Self-Hosted
          </span>
        </div>
        <p style={{ margin: '0 0 0.75rem', color: '#555', fontSize: '0.9rem', maxWidth: 560 }}>
          Content is fetched live from your local Strapi instance running on{' '}
          <code style={{ fontSize: '0.85em', background: '#f0f0f0', padding: '1px 5px', borderRadius: 3 }}>localhost:1337</code>.
          Edits in the Strapi admin panel appear here within 60 seconds.
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>
          To edit: open{' '}
          <a href="http://localhost:1337/admin" target="_blank" rel="noreferrer" style={{ color: accentColor }}>
            localhost:1337/admin
          </a>{' '}
          → Content Manager → edit your entry → Save & Publish.
        </p>
      </div>

      {error && (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#b91c1c', fontSize: '0.9rem' }}>Could not connect to Strapi</p>
          <p style={{ margin: '0 0 0.5rem', color: '#7f1d1d', fontSize: '0.85rem', fontFamily: 'monospace' }}>{error}</p>
          <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
            Make sure Strapi is running:{' '}
            <code style={{ background: '#f5f5f5', padding: '1px 5px', borderRadius: 3 }}>npm run develop</code> in your Strapi project folder.
          </p>
        </div>
      )}

      {!error && result.items.length === 0 && (
        <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.75rem', fontWeight: 600, fontSize: '0.9rem', color: '#555' }}>No content found. To get started:</p>
          <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#666', fontSize: '0.875rem' }}>
            <li style={{ marginBottom: '0.3rem' }}>Start Strapi: <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: 3 }}>npm run develop</code></li>
            <li style={{ marginBottom: '0.3rem' }}>Go to Content-Type Builder and create a collection (e.g. "Article")</li>
            <li style={{ marginBottom: '0.3rem' }}>Add entries in Content Manager and click Publish</li>
            <li style={{ marginBottom: '0.3rem' }}>In Settings → Roles → Public, enable "find" on your collection</li>
          </ol>
          <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#aaa' }}>
            Supported collection names: articles, posts, blogs, pages
          </p>
        </div>
      )}

      {result.endpoint && (
        <p style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '1rem' }}>
          Fetched from: <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: 3 }}>/api/{result.endpoint}</code>
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#e8e8e8', borderRadius: 10, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
        {result.items.map((item) => {
          const attrs = item.attributes || item
          const title = attrs.title || attrs.name || attrs.heading || `Entry #${item.id}`
          const rawBody = attrs.body || attrs.content || attrs.description || attrs.excerpt || null
          const body = extractRichText(rawBody)

          return (
            <div key={item.id} style={{
              background: '#fff',
              padding: '1.5rem',
              borderLeft: `3px solid ${accentColor}`,
            }}>
              <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 600 }}>{title}</h2>
              <span style={{ fontSize: '0.78rem', color: '#999', display: 'block', marginBottom: body ? '0.75rem' : 0 }}>
                <span style={{ fontWeight: 600, color: '#bbb' }}>ID: </span>{item.id}
              </span>
              {body && (
                <p style={{ margin: '0 0 0.75rem', color: '#333', fontSize: '0.925rem', lineHeight: 1.65 }}>{body}</p>
              )}
              <details>
                <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#aaa', userSelect: 'none' }}>View raw API response</summary>
                <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.72rem', overflow: 'auto', marginTop: '0.5rem', color: '#444' }}>
                  {JSON.stringify(attrs, null, 2)}
                </pre>
              </details>
            </div>
          )
        })}
      </div>
    </main>
  )
}
