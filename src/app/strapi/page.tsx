const accentColor = '#4945ff'

async function getStrapiContent() {
  const url = process.env.STRAPI_URL || 'http://localhost:1337'
  const token = process.env.STRAPI_TOKEN
  const endpoints = ['articles', 'posts', 'blogs', 'pages']

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${url}/api/${endpoint}?populate=*`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        next: { revalidate: 0 },
      })
      if (res.ok) {
        const data = await res.json()
        if (data.data?.length > 0) return { url, endpoint, items: data.data as any[] }
      }
    } catch {}
  }
  return { url, endpoint: null, items: [] as any[] }
}

function extractText(value: any): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .flatMap((block: any) => block.children ?? [])
      .filter((n: any) => n.type === 'text' && n.text)
      .map((n: any) => n.text)
      .join(' ')
  }
  return ''
}

export default async function StrapiPage() {
  let result: { url: string; endpoint: string | null; items: any[] } = { url: '', endpoint: null, items: [] }
  let error: string | null = null

  try {
    result = await getStrapiContent()
  } catch (e: any) {
    error = e.message
  }

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Japanese Cookbook</h1>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: accentColor, background: `${accentColor}18`, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Strapi
          </span>
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: '0.925rem' }}>
          Recipes managed via the Strapi admin panel.
        </p>
      </div>

      {error && (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#b91c1c', fontSize: '0.9rem' }}>Could not connect to Strapi</p>
          <p style={{ margin: '0 0 0.5rem', color: '#7f1d1d', fontSize: '0.85rem', fontFamily: 'monospace' }}>{error}</p>
        </div>
      )}

      {!error && result.items.length === 0 && (
        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '2rem', textAlign: 'center', color: '#888' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>No recipes yet.</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Add articles in your Strapi admin with title, intro, body, cover image, and author fields.</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {result.items.map((item) => {
          const attrs = item.attributes || item
          const title = attrs.title || attrs.name || attrs.heading || `Recipe #${item.id}`
          const intro = extractText(attrs.intro) || extractText(attrs.body)?.slice(0, 120) || extractText(attrs.description)?.slice(0, 120)
          const author = attrs.author ?? null

          const coverData = attrs.cover?.data?.attributes ?? attrs.image?.data?.attributes ?? null
          const rawUrl = coverData?.url ?? null
          const imageUrl = rawUrl
            ? rawUrl.startsWith('http') ? rawUrl : `${result.url}${rawUrl}`
            : null

          return (
            <a key={item.id} href={`/strapi/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #e8e8e0',
                height: '100%',
              }}>
                <div style={{ height: 200, background: '#ece8f0', overflow: 'hidden' }}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '0.8rem' }}>
                      No image
                    </div>
                  )}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.3 }}>{title}</h2>
                  {intro && <p style={{ margin: '0 0 0.75rem', color: '#666', fontSize: '0.875rem', lineHeight: 1.5 }}>{intro.length > 100 ? intro.slice(0, 100) + '…' : intro}</p>}
                  {author && (
                    <span style={{ fontSize: '0.75rem', color: accentColor, fontWeight: 600 }}>{author}</span>
                  )}
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </main>
  )
}
