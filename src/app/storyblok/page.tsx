import { apiPlugin, storyblokInit } from '@storyblok/js'
import ExportButton from './ExportButton'

export const revalidate = 0

const accentColor = '#00b3b0'

async function getStoryblokStories() {
  const { storyblokApi } = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
    use: [apiPlugin],
  })
  if (!storyblokApi) throw new Error('Storyblok API not initialised')
  const { data } = await storyblokApi.get('cdn/stories', {
    version: 'draft',
  })
  return data.stories as any[]
}

function extractText(value: any): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value.type === 'doc' && Array.isArray(value.content)) {
    return value.content
      .flatMap((block: any) => block.content ?? [])
      .filter((n: any) => n.type === 'text')
      .map((n: any) => n.text)
      .join('')
  }
  return ''
}

export default async function StoryblokPage() {
  let stories: any[] = []
  let error: string | null = null

  try {
    stories = await getStoryblokStories()
  } catch (e: any) {
    error = e.message
  }

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Italian Cookbook</h1>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: accentColor, background: `${accentColor}18`, borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Storyblok
            </span>
          </div>
          <ExportButton />
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: '0.925rem' }}>
          Recipes edited live via the Storyblok visual editor.
        </p>
      </div>

      {error && (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem', color: '#b91c1c', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {!error && stories.length === 0 && (
        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '2rem', textAlign: 'center', color: '#888' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>No recipes yet.</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Add stories in your Storyblok space with title, intro, body, image, and author fields.</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {stories.map((story) => {
          const c = story.content ?? {}
          const title = c.title || story.name || 'Untitled'
          const intro = extractText(c.intro) || extractText(c.body)?.slice(0, 120)
          const author = c.author || null
          const imageUrl = c.image?.filename || null

          return (
            <a key={story.id} href={`/storyblok/${story.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #e8e8e0',
                transition: 'box-shadow 0.15s',
                height: '100%',
              }}>
                <div style={{ height: 200, background: '#f0ede8', overflow: 'hidden' }}>
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
