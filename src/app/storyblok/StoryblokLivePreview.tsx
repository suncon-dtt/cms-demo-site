'use client'

import { useStoryblokState } from '@storyblok/react'

const accentColor = '#00b3b0'

function RichText({ doc }: { doc: any }) {
  if (!doc) return null
  if (typeof doc === 'string') return <p style={{ margin: '0 0 1.25rem' }}>{doc}</p>
  if (doc.type !== 'doc' || !Array.isArray(doc.content)) return null

  return (
    <>
      {doc.content.map((block: any, i: number) => (
        <Block key={i} block={block} />
      ))}
    </>
  )
}

function Block({ block }: { block: any }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p style={{ margin: '0 0 1.1rem', lineHeight: 1.8 }}>
          {(block.content ?? []).map((n: any, i: number) => <Inline key={i} node={n} />)}
        </p>
      )
    case 'bullet_list':
      return (
        <ul style={{ margin: '0 0 1.25rem', paddingLeft: '1.4rem' }}>
          {(block.content ?? []).map((item: any, i: number) => (
            <li key={i} style={{ marginBottom: '0.3rem', lineHeight: 1.7 }}>
              {(item.content ?? []).flatMap((b: any) => b.content ?? []).map((n: any, j: number) => <Inline key={j} node={n} />)}
            </li>
          ))}
        </ul>
      )
    case 'ordered_list':
      return (
        <ol style={{ margin: '0 0 1.25rem', paddingLeft: '1.4rem' }}>
          {(block.content ?? []).map((item: any, i: number) => (
            <li key={i} style={{ marginBottom: '0.3rem', lineHeight: 1.7 }}>
              {(item.content ?? []).flatMap((b: any) => b.content ?? []).map((n: any, j: number) => <Inline key={j} node={n} />)}
            </li>
          ))}
        </ol>
      )
    case 'heading':
      const level = block.attrs?.level ?? 2
      const text = (block.content ?? []).map((n: any) => n.text ?? '').join('')
      const headingStyle = { margin: '1.75rem 0 0.6rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' }
      if (level === 1) return <h1 style={{ ...headingStyle, fontSize: '1.6rem' }}>{text}</h1>
      if (level === 2) return <h2 style={{ ...headingStyle, fontSize: '1.3rem' }}>{text}</h2>
      return <h3 style={{ ...headingStyle, fontSize: '1.1rem' }}>{text}</h3>
    case 'horizontal_rule':
      return <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />
    default:
      return null
  }
}

function Inline({ node }: { node: any }) {
  if (node.type !== 'text') return null
  let el: React.ReactNode = node.text
  if (node.marks?.some((m: any) => m.type === 'bold')) el = <strong>{el}</strong>
  if (node.marks?.some((m: any) => m.type === 'italic')) el = <em>{el}</em>
  if (node.marks?.some((m: any) => m.type === 'code')) el = <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: 3, fontSize: '0.9em' }}>{el}</code>
  return <>{el}</>
}

export default function StoryblokLivePreview({ initialStory }: { initialStory: any }) {
  const story = useStoryblokState(initialStory, {}) ?? initialStory
  const content = story?.content ?? {}

  const title = content.title ?? content.name ?? story.name ?? 'Untitled'
  const intro = typeof content.intro === 'string' ? content.intro : null
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
          {author && <span style={{ fontSize: '0.85rem', fontWeight: 600, color: accentColor }}>{author}</span>}
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

        <div style={{ color: '#333', fontSize: '1rem' }}>
          <RichText doc={content.body ?? content.content ?? content.description} />
        </div>

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
