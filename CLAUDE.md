# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js demo application comparing two headless CMS platforms: Storyblok and Strapi. It fetches and displays content from both systems side-by-side.

## Key Commands
- `npm run dev` - Start the development server (runs on http://localhost:3000)
- `npm run build` - Build the production bundle
- `npm start` - Run the production server

## Architecture
- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript
- **CMS Integrations**:
  - Storyblok (SaaS) - configured via environment variables
  - Strapi (self-hosted) - expects local instance at localhost:1337

## Project Structure
- `/src/app/` - Next.js app router pages
  - `page.tsx` - Landing page with CMS comparison
  - `storyblok/page.tsx` - Fetches and displays Storyblok content
  - `strapi/page.tsx` - Fetches and displays Strapi content
  - `compare/page.tsx` - Side-by-side comparison view
  - `layout.tsx` - Root layout

## Environment Configuration
Required environment variables (see `.env.local.example`):
- `NEXT_PUBLIC_STORYBLOK_TOKEN` - Storyblok preview API token
- `NEXT_PUBLIC_STORYBLOK_SPACE_ID` - Storyblok space identifier
- `STRAPI_URL` - Strapi instance URL (default: http://localhost:1337)
- `STRAPI_TOKEN` - Strapi API authentication token

## CMS Content Handling
- **Storyblok**: Uses `@storyblok/js` SDK to fetch stories from CDN API
- **Strapi**: Attempts to fetch from multiple endpoints (`articles`, `posts`, `blogs`, `pages`)
- Both pages handle rich text content that may come as objects with `{type, children}` structure

## Common Issues & Solutions
1. **React rendering errors with CMS content**: Rich text fields from CMSs may return objects instead of strings. Always check the type before rendering.
2. **Strapi connection errors**: Ensure Strapi is running locally with `npm run develop` in the Strapi project directory.
3. **Missing content**: Check that content is published in the respective CMS admin panels.