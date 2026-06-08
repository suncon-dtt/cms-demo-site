async function getStrapiContent() {
  const url = process.env.STRAPI_URL || 'http://localhost:1337'
  const token = process.env.STRAPI_TOKEN
  const endpoints = ['articles', 'posts', 'blogs', 'pages']

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${url}/api/${endpoint}?populate=*`, {
        headers: { Authorization: `Bearer ${token}` },
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

export default async function StrapiPage() {
  let result: { endpoint: string | null; items: any[] } = { endpoint: null, items: [] }
  let error: string | null = null

  try {
    result = await getStrapiContent()
  } catch (e: any) {
    error = e.message
  }

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem' }}>🔷</span>
        <div>
          <h1 style={{ margin: 0, color: '#4945ff' }}>Strapi Content</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Fetched live from your local Strapi instance (localhost:1337)</p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #f00', borderRadius: 8, padding: '1rem', marginBottom: '1rem', color: '#c00' }}>
          <strong>Connection error:</strong> {error}
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>Make sure Strapi is running: <code>npm run develop</code> in your Strapi folder</p>
        </div>
      )}

      {!error && result.items.length === 0 && (
        <div style={{ background: '#fffbe6', border: '1px solid #ffc', borderRadius: 8, padding: '1rem', color: '#666' }}>
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>Strapi not running — run <code>npm run develop</code> in your Strapi folder</li>
            <li>No content types/entries created yet in Strapi admin</li>
            <li>Collection name differs from articles/posts/blogs/pages</li>
          </ol>
        </div>
      )}

      {result.endpoint && (
        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '1rem' }}>Found at: <code>/api/{result.endpoint}</code></p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {result.items.map((item) => {
          const attrs = item.attributes || item
          const title = attrs.title || attrs.name || attrs.heading || `Item #${item.id}`
          const body = attrs.body || attrs.content || attrs.description || attrs.excerpt || ''
          return (
            <div key={item.id} style={{ background: 'white', borderRadius: 10, padding: '1.5rem', border: '1px solid #e0e0e0', borderLeft: '4px solid #4945ff' }}>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{title}</h2>
              <p style={{ margin: '0 0 0.5rem', color: '#888', fontSize: '0.8rem' }}>ID: {item.id}</p>
              {body && (
                <p style={{ margin: 0, color: '#444' }}>
                  {typeof body === 'string' ? body : JSON.stringify(body)}
                </p>
              )}
              <details style={{ marginTop: '0.75rem' }}>
                <summary style={{ cursor: 'pointer', color: '#888', fontSize: '0.8rem' }}>Raw attributes</summary>
                <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.75rem', overflow: 'auto', marginTop: '0.5rem' }}>
                  {JSON.stringify(attrs, null, 2)}
                </pre>
              </details>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '2rem', background: '#eeeeff', border: '1px solid #4945ff', borderRadius: 8, padding: '1rem', fontSize: '0.85rem', color: '#222' }}>
        <strong>How to edit:</strong> Open <a href="http://localhost:1337/admin" target="_blank">localhost:1337/admin</a> → Content Manager.
      </div>
    </main>
  )
}
