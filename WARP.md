# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Gatsby-based static website** for Tahoe City Kayak, a business offering kayak and paddleboard rentals, sales, tours and lessons. The site uses a **headless Strapi CMS** as the data source and is built with TypeScript and React.

## Key Development Commands

### Development
- `npm run develop` - Start development server with type checking
- `npm run start` - Alias for develop with TypeScript validation (recommended)
- `npm run dirty-start` - Skip TypeScript validation for faster startup
- `npm run cleanstart` - Clean build cache and start development server

### Production Build
- `npm run build` - Build for production and upload source maps to Sentry
- `npm run serve` - Serve the production build locally
- `npm run clean` - Clean Gatsby build cache

### Code Quality
- `npm run typecheck` - Run TypeScript type checking without building
- `npx @biomejs/biome check .` - Run Biome linter and formatter
- `npx @biomejs/biome format --write .` - Auto-format code with Biome

### Node Version
- Uses Node.js 22.x (specified in `.nvmrc` and `package.json`)
- Run `nvm use` to switch to the correct Node version

## High-Level Architecture

### Data Flow Pattern
**Strapi CMS → Gatsby GraphQL → React Components**

The site follows a headless CMS pattern where:
1. Content is managed in **Strapi** (external CMS)
2. **gatsby-source-strapi** plugin fetches data at build time
3. Data is available via **Gatsby's GraphQL layer** with auto-generated TypeScript types
4. React components query data using **useStaticQuery** and **graphql** template literals

### Core Directory Structure

```
src/
├── pages/           # Gatsby page components (auto-routing)
├── components/      # Reusable UI components
├── content/         # Content-specific components
├── fragments/       # GraphQL fragments for reusable queries
├── hooks/           # Custom React hooks for Strapi data
├── images/          # SVG components and image assets
└── gatsby-types.d.ts # Auto-generated TypeScript types
```

### External Dependencies
- **@rileybathurst/paddle** - Custom component library providing business-specific UI components (`PaddleBookNow`, `PaddleLocationDeck`, `PaddleTicket`, etc.)
- **Strapi CMS** - Headless CMS providing all dynamic content
- **Sentry** - Error monitoring and performance tracking

### Data Architecture
- **Content Types**: Location, Tour, Retail, Announcement, FAQ, Team, Testimonial, etc.
- **Single Types**: About, Experience, Demo, Shop, Rental, etc.
- **GraphQL Fragments**: Defined in `src/fragments/` for consistent data fetching
- **Type Safety**: Full TypeScript support with auto-generated types from GraphQL schema

### Styling & Tooling
- **PostCSS** with nested CSS support
- **Biome** for linting and formatting (replaces ESLint/Prettier)
- **TypeKit fonts** and **Google Fonts** (@fontsource packages)
- **Content Security Policy** configured for security

### Performance & SEO
- **Gatsby Image** for optimized image delivery
- **Sharp** for image processing
- **Sitemap** and **Manifest** generation
- **Google Analytics** and **Google Ads** tracking
- **Schema.org** structured data via PaddleSEO component

## Strapi Integration Patterns

### Common Query Pattern
```typescript
const data = useStaticQuery(graphql`
  query {
    allStrapiLocation(filter: {locale: {slug: {eq: "tahoe-city"}}}) {
      nodes {
        ...locationCardFragment
      }
    }
  }
`);
```

### Content Filtering
Most queries filter by `locale: {slug: {eq: "tahoe-city"}}` since this is a multi-location business but this site is specific to the Tahoe City location.

### GraphQL Fragments
Use fragments from `src/fragments/` for consistent data shapes:
- `locationCardFragment` - Location data for cards
- `purchaseFragment` - Retail item data
- `ticketFragment` - Tour/lesson data

## Environment & Configuration

### Required Environment Variables
- `STRAPI_API_URL` - Strapi backend URL
- `STRAPI_TOKEN` - Strapi access token
- `TYPEKIT_ID` - Adobe Typekit project ID
- `SENTRY_DSN` - Sentry error tracking DSN

### Build Configuration
- **Node.js 22.x** (specified in engines)
- **TypeScript strict mode** enabled
- **JSX pragma** set to "jsx" for React 18
- **Source maps** uploaded to Sentry on build

## Development Notes

### Known Issues
- README mentions "Node 24 issue I need to get locked down" - be aware of Node version compatibility
- CSP configuration may need updates when adding new external services
- Some TODOs exist for updating shop links and other minor improvements

### Content Management
- Most content is managed through Strapi CMS
- Some hardcoded content exists (like page titles) that could be moved to Strapi
- Business hierarchy follows: Sport → Dimensions → Weight → Capacity → Crew structure

### Testing Gatsby Build
After making changes, always test with `npm run build` since some issues only appear in production builds due to Gatsby's build-time data fetching.
