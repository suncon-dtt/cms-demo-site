const accentColor = '#4945ff'

async function getStrapiArticle(id: string) {
  const url = process.env.STRAPI_URL || 'http://localhost:1337'
  const token = process.env.STRAPI_TOKEN
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const endpoints = ['articles', 'posts', 'blogs', 'pages']

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${url}/api/${endpoint}/${id}?populate=*`, {
        headers,
        next: { revalidate: 0 },
      })
      if (res.ok) {
        const data = await res.json()
        if (data.data) return { item: data.data, baseUrl: url }
      }
    } catch {}
  }
  throw new Error('Could not load recipe — check that findOne is enabled in Strapi public permissions')
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

export default async function StrapiArticlePage({ params }: { params: { id: string } }) {
  let item: any = null
  let baseUrl = ''
  let error: string | null = null

  try {
    const result = await getStrapiArticle(params.id)
    item = result.item
    baseUrl = result.baseUrl
  } catch (e: any) {
    error = e.message
  }

  const attrs = item?.attributes || item || {}
  const title = attrs.title || attrs.name || `Recipe #${params.id}`
  const intro = extractText(attrs.intro)
  const body = extractText(attrs.body || attrs.content || attrs.description)
  const author = attrs.author ?? null
  const publishedAt = attrs.publishedAt ?? attrs.createdAt ?? null

  const coverData = attrs.cover?.data?.attributes ?? attrs.image?.data?.attributes ?? null
  const rawUrl = coverData?.url ?? null
  const imageUrl = rawUrl
    ? rawUrl.startsWith('http') ? rawUrl : `${baseUrl}${rawUrl}`
    : null

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <a href="/strapi" style={{ fontSize: '0.825rem', color: '#aaa', textDecoration: 'none' }}>
          ← Japanese Cookbook
        </a>
      </div>

      {error ? (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', color: '#b91c1c', fontSize: '0.9rem' }}>
          {error}
        </div>
      ) : (
        <article>
          {imageUrl && (
            <div style={{ margin: '0 0 2.5rem', borderRadius: 12, overflow: 'hidden', maxHeight: 420 }}>
              <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              {title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              {author && (
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: accentColor }}>{author}</span>
              )}
              {publishedAt && (
                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                  {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              )}
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: accentColor, background: `${accentColor}18`, borderRadius: 4, padding: '2px 8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Strapi
              </span>
            </div>

            {intro && (
              <p style={{ fontSize: '1.1rem', color: '#555', fontStyle: 'italic', lineHeight: 1.65, margin: '0 0 1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid #eee' }}>
                {intro}
              </p>
            )}

            {body ? (
              <div style={{ color: '#333', fontSize: '1rem', lineHeight: 1.8 }}>
                {body.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i} style={{ margin: '0 0 1.25rem' }}>{para}</p>
                ))}
              </div>
            ) : (
              <p style={{ color: '#bbb', fontStyle: 'italic' }}>No content yet.</p>
            )}

            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
              <a
                href={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/admin`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.85rem', color: accentColor, textDecoration: 'none', fontWeight: 600 }}
              >
                Edit this recipe in Strapi admin →
              </a>
            </div>

            <details style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#ccc', userSelect: 'none' }}>Raw API response</summary>
              <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.72rem', overflow: 'auto', marginTop: '0.75rem', color: '#555' }}>
                {JSON.stringify(attrs, null, 2)}
              </pre>
            </details>
          </div>
        </article>
      )}
    </main>
  )
}
