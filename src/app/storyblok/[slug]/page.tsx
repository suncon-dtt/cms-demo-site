import { draftMode } from 'next/headers'
import { apiPlugin, storyblokInit } from '@storyblok/js'
import StoryblokProvider from '../StoryblokProvider'
import StoryblokLivePreview from '../StoryblokLivePreview'

const accentColor = '#00b3b0'

function getApi() {
  const result = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
    use: [apiPlugin],
  })
  if (!result.storyblokApi) throw new Error('Storyblok API not initialised')
  return result.storyblokApi
}

export default async function StoryblokStoryPage({ params }: { params: { slug: string } }) {
  const { isEnabled: preview } = draftMode()
  const api = getApi()

  let story: any = null
  let error: string | null = null

  try {
    const { data } = await api.get(`cdn/stories/${params.slug}`, {
      version: preview ? 'draft' : 'published',
    })
    story = data.story
  } catch (e: any) {
    error = e.message ?? 'Story not found'
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <a href="/storyblok" style={{ fontSize: '0.825rem', color: '#aaa', textDecoration: 'none' }}>
          ← All stories
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #eee' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: accentColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Storyblok</span>
        {preview && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: '#fef9c3', color: '#854d0e', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
            Live Preview Active
          </span>
        )}
      </div>

      {error ? (
        <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem 1.25rem', color: '#b91c1c', fontSize: '0.9rem' }}>
          {error}
        </div>
      ) : story ? (
        <StoryblokProvider>
          <StoryblokLivePreview initialStory={story} />
        </StoryblokProvider>
      ) : null}

      {!preview && (
        <div style={{ marginTop: '2.5rem', background: '#f0fffe', border: '1px solid #99e6e4', borderRadius: 8, padding: '1rem 1.25rem', fontSize: '0.825rem', color: '#555' }}>
          <strong style={{ color: accentColor }}>Visual editor tip:</strong> To edit this page live, open your Storyblok space, go to this story, and click the preview icon. Changes appear instantly without saving.
        </div>
      )}
    </main>
  )
}
