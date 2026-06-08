import { apiPlugin, storyblokInit } from '@storyblok/js'

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

function renderStoryblokField(value: any): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value.type === 'doc' && Array.isArray(value.content)) {
    return value.content
      .flatMap((block: any) => block.content ?? [])
      .filter((n: any) => n.type === 'text')
      .map((n: any) => n.text)
      .join('')
  }
  return null
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
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <PageHeader
        name="Storyblok"
        accentColor={accentColor}
        tagline="SaaS — Hosted CMS"
        description="Content is fetched live from the Storyblok CDN API using your space token. Edits made in the Storyblok editor appear here within 60 seconds."
        docsHint={
          <>
            To edit: log into{' '}
            <a href="https://app.storyblok.com" target="_blank" rel="noreferrer" style={{ color: accentColor }}>
              app.storyblok.com
            </a>{' '}
            → your space → Content → publish your changes.
          </>
        }
      />

      {error && <ErrorBanner message={error} hint="Check that your NEXT_PUBLIC_STORYBLOK_TOKEN is set correctly in .env.local." />}

      {!error && stories.length === 0 && (
        <EmptyState steps={[
          'Log into app.storyblok.com and open your space',
          'Go to Content and create a story',
          'Add a body or intro field and publish it',
        ]} />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#e8e8e8', borderRadius: 10, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
        {stories.map((story) => {
          const body = renderStoryblokField(story.content?.body) || renderStoryblokField(story.content?.intro)
          const date = story.published_at || story.created_at
          return (
            <a key={story.id} href={`/storyblok/${story.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <ArticleCard
                title={story.name}
                body={body}
                meta={[
                  { label: 'Slug', value: story.slug },
                  date ? { label: 'Published', value: new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) } : null,
                ].filter(Boolean) as { label: string; value: string }[]}
                rawContent={story.content}
                accentColor={accentColor}
              />
            </a>
          )
        })}
      </div>
    </main>
  )
}

function PageHeader({ name, accentColor, tagline, description, docsHint }: {
  name: string
  accentColor: string
  tagline: string
  description: string
  docsHint: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: accentColor, letterSpacing: '-0.02em' }}>{name}</h1>
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
          {tagline}
        </span>
      </div>
      <p style={{ margin: '0 0 0.75rem', color: '#555', fontSize: '0.9rem', maxWidth: 560 }}>{description}</p>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>{docsHint}</p>
    </div>
  )
}

function ArticleCard({ title, body, meta, rawContent, accentColor }: {
  title: string
  body: string | null
  meta: { label: string; value: string }[]
  rawContent: any
  accentColor: string
}) {
  return (
    <div style={{
      background: '#fff',
      padding: '1.5rem',
      borderLeft: `3px solid ${accentColor}`,
    }}>
      <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 600 }}>{title}</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: body ? '0.75rem' : 0 }}>
        {meta.map(m => (
          <span key={m.label} style={{ fontSize: '0.78rem', color: '#999' }}>
            <span style={{ fontWeight: 600, color: '#bbb' }}>{m.label}: </span>
            {m.value}
          </span>
        ))}
      </div>
      {body && <p style={{ margin: '0 0 0.75rem', color: '#333', fontSize: '0.925rem', lineHeight: 1.65 }}>{body}</p>}
      <details>
        <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#aaa', userSelect: 'none' }}>View raw API response</summary>
        <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.72rem', overflow: 'auto', marginTop: '0.5rem', color: '#444' }}>
          {JSON.stringify(rawContent, null, 2)}
        </pre>
      </details>
    </div>
  )
}

function ErrorBanner({ message, hint }: { message: string; hint: string }) {
  return (
    <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
      <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#b91c1c', fontSize: '0.9rem' }}>Connection error</p>
      <p style={{ margin: '0 0 0.5rem', color: '#7f1d1d', fontSize: '0.85rem', fontFamily: 'monospace' }}>{message}</p>
      <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>{hint}</p>
    </div>
  )
}

function EmptyState({ steps }: { steps: string[] }) {
  return (
    <div style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
      <p style={{ margin: '0 0 0.75rem', fontWeight: 600, fontSize: '0.9rem', color: '#555' }}>No content found. To get started:</p>
      <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#666', fontSize: '0.875rem' }}>
        {steps.map(s => <li key={s} style={{ marginBottom: '0.3rem' }}>{s}</li>)}
      </ol>
    </div>
  )
}
