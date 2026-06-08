import { apiPlugin, storyblokInit } from '@storyblok/js'


const { storyblokApi } = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
  use: [apiPlugin],
  region: 'eu',
})

async function getStoryblokStories() {
  const { data } = await storyblokApi.get('cdn/stories', {
    version: 'published',
  })
  return data.stories as any[]
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
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2rem' }}>🌀</span>
        <div>
          <h1 style={{ margin: 0, color: '#00b3b0' }}>Storyblok Content</h1>
          <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Fetched live from Storyblok CDN API</p>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #f00', borderRadius: 8, padding: '1rem', marginBottom: '1rem', color: '#c00' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!error && stories.length === 0 && (
        <div style={{ background: '#fffbe6', border: '1px solid #f0c', borderRadius: 8, padding: '1rem', color: '#666' }}>
          No published stories found. Hit Publish in Storyblok first.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stories.map((story) => (
          <div key={story.id} style={{ background: 'white', borderRadius: 10, padding: '1.5rem', border: '1px solid #e0e0e0', borderLeft: '4px solid #00b3b0' }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{story.name}</h2>
            <p style={{ margin: '0 0 0.5rem', color: '#888', fontSize: '0.8rem' }}>
              Slug: <code>{story.slug}</code>
            </p>
            {story.content?.title && (
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{story.content.title}</h3>
            )}
            {story.content?.body && typeof story.content.body === 'string' && (
              <p style={{ margin: 0, color: '#444' }}>{story.content.body}</p>
            )}
            <details style={{ marginTop: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', color: '#888', fontSize: '0.8rem' }}>Raw content</summary>
              <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.75rem', overflow: 'auto', marginTop: '0.5rem' }}>
                {JSON.stringify(story.content, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', background: '#e8fffe', border: '1px solid #00b3b0', borderRadius: 8, padding: '1rem', fontSize: '0.85rem', color: '#006' }}>
        <strong>How to edit:</strong> Log into app.storyblok.com → your space → Content. Publish changes to see them here.
      </div>
    </main>
  )
}