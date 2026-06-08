'use client'

import { storyblokInit, apiPlugin } from '@storyblok/react'

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN!,
  use: [apiPlugin],
  components: {},
})

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
