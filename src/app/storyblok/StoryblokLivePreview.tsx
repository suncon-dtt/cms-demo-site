'use client'

import { useStoryblokState, StoryblokComponent } from '@storyblok/react'

function renderBody(body: any): string {
  if (!body) return ''
  if (typeof body === 'string') return body
  if (Array.isArray(body)) {
    return body
      .flatMap((block: any) => block.children ?? [])
      .filter((n: any) => n.type === 'text' && n.text)
      .map((n: any) => n.text)
      .join(' ')
  }
  if (body?.type === 'doc' && Array.isArray(body.content)) {
    return body.content
      .flatMap((block: any) => block.content ?? [])
      .filter((n: any) => n.type === 'text')
      .map((n: any) => n.text)
      .join(' ')
  }
  return ''
}

export default function StoryblokLivePreview({ initialStory }: { initialStory: any }) {
  const story = useStoryblokState(initialStory, {}) ?? initialStory
  const content = story?.content

  const title = content?.title ?? content?.name ?? story.name ?? 'Untitled'
  const body = renderBody(content?.body ?? content?.intro ?? content?.content ?? content?.description)
  const date = story.published_at ?? story.created_at

  return (
    <article style={{ maxWidth: 680, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
        {title}
      </h1>

      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem', color: '#888', fontSize: '0.825rem' }}>
        <span>
          <span style={{ color: '#bbb' }}>Slug: </span>
          <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: 3, fontSize: '0.8em' }}>{story.slug}</code>
        </span>
        {date && (
          <span>
            <span style={{ color: '#bbb' }}>Published: </span>
            {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}
      </div>

      {body ? (
        <div style={{ color: '#333', fontSize: '1.05rem', lineHeight: 1.75 }}>
          {body.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} style={{ margin: '0 0 1.25rem' }}>{para}</p>
          ))}
        </div>
      ) : (
        <p style={{ color: '#aaa', fontStyle: 'italic' }}>No body content found on this story.</p>
      )}

      <details style={{ marginTop: '2.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#bbb', userSelect: 'none' }}>Raw API response</summary>
        <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.72rem', overflow: 'auto', marginTop: '0.75rem', color: '#555' }}>
          {JSON.stringify(content, null, 2)}
        </pre>
      </details>
    </article>
  )
}
