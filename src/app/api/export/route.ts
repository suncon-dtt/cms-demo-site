import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.STORYBLOK_MANAGEMENT_TOKEN
  const spaceId = process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID

  if (!token && !spaceId) {
    return NextResponse.json({ error: 'Both STORYBLOK_MANAGEMENT_TOKEN and NEXT_PUBLIC_STORYBLOK_SPACE_ID are not set' }, { status: 500 })
  }
  if (!token) {
    return NextResponse.json({ error: 'STORYBLOK_MANAGEMENT_TOKEN is not set in environment variables' }, { status: 500 })
  }
  if (!spaceId) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_STORYBLOK_SPACE_ID is not set in environment variables' }, { status: 500 })
  }

  try {
    const allStories: any[] = []
    let page = 1
    let totalPages = 1

    while (page <= totalPages) {
      const res = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: token,
          },
          cache: 'no-store',
        }
      )

      if (!res.ok) {
        const body = await res.text()
        return NextResponse.json(
          { error: `Storyblok Management API error ${res.status}`, detail: body },
          { status: res.status }
        )
      }

      const data = await res.json()
      allStories.push(...(data.stories ?? []))

      const total = parseInt(res.headers.get('total') ?? '0', 10)
      totalPages = Math.ceil(total / 100)
      page++
    }

    const exportData = {
      exported_at: new Date().toISOString(),
      space_id: spaceId,
      total_stories: allStories.length,
      stories: allStories,
    }

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="storyblok-export-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
