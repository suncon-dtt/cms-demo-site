import { draftMode } from 'next/headers'
import { apiPlugin, storyblokInit } from '@storyblok/js'
import StoryblokProvider from '../StoryblokProvider'
import StoryblokLivePreview from '../StoryblokLivePreview'

export const revalidate = 0

function getApi() {
  const result = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
    use: [apiPlugin],
  })
  if (!result.storyblokApi) throw new Error('Storyblok API not initialised')
  return result.storyblokApi
}

export default async function StoryblokStoryPage({ params }: { params: { slug: string } }) {
  const api = getApi()

  let story: any = null
  let error: string | null = null

  try {
    const { data } = await api.get(`cdn/stories/${params.slug}`, {
      version: 'draft',
    })
    story = data.story
  } catch (e: any) {
    error = e.message ?? 'Recipe not found'
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <a href="/storyblok" style={{ fontSize: '0.825rem', color: '#aaa', textDecoration: 'none' }}>
          ← Italian Cookbook
        </a>
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
    </main>
  )
}
