'use client'

import { useStoryblokState } from '@storyblok/react'

const accentColor = '#00b3b0'

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
  const content = story?.content ?? {}

  const title = content.title ?? content.name ?? story.name ?? 'Untitled'
  const intro = typeof content.intro === 'string' ? content.intro : renderBody(content.intro)
  const body = renderBody(content.body ?? content.content ?? content.description)
  const author = content.author ?? null
  const imageUrl = content.image?.filename ?? null
  const date = story.published_at ?? story.created_at

  return (
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
          {date && (
            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
              {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: accentColor, background: `${accentColor}18`, borderRadius: 4, padding: '2px 8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Storyblok
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
          <p style={{ color: '#bbb', fontStyle: 'italic' }}>No content yet — add a body field in Storyblok.</p>
        )}

        <details style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#ccc', userSelect: 'none' }}>Raw API response</summary>
          <pre style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6, fontSize: '0.72rem', overflow: 'auto', marginTop: '0.75rem', color: '#555' }}>
            {JSON.stringify(content, null, 2)}
          </pre>
        </details>
      </div>
    </article>
  )
}
