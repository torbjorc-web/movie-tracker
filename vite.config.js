import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const watchmodeBaseUrl = 'https://api.watchmode.com/v1'
const supportedRegions = new Set([
  'US', 'NO', 'GB', 'CA', 'AU', 'SE', 'DK', 'FI',
  'DE', 'FR', 'NL', 'ES', 'IT', 'NZ',
])

function watchmodeApi(apiKey) {
  const handleRequest = async (request, response, next) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')
    const pathname = requestUrl.pathname

    if (!pathname.startsWith('/api/watchmode/')) {
      next()
      return
    }

    if (request.method !== 'GET') {
      response.writeHead(405, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'Only GET requests are supported.' }))
      return
    }

    if (!apiKey) {
      response.writeHead(503, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'Add WATCHMODE_API_KEY to your local .env file to enable catalog search.' }))
      return
    }

    let upstreamUrl
    if (pathname === '/api/watchmode/search') {
      const query = requestUrl.searchParams.get('q')?.trim()
      if (!query || query.length < 2 || query.length > 100) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'Enter a movie title between 2 and 100 characters.' }))
        return
      }

      upstreamUrl = new URL(`${watchmodeBaseUrl}/search/`)
      upstreamUrl.searchParams.set('search_field', 'name')
      upstreamUrl.searchParams.set('search_value', query)
      upstreamUrl.searchParams.set('types', 'movie')
    } else {
      const titleMatch = pathname.match(/^\/api\/watchmode\/title\/(\d+)\/sources\/?$/)
      const region = requestUrl.searchParams.get('region') ?? 'US'
      if (!titleMatch || !supportedRegions.has(region)) {
        response.writeHead(400, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'Choose a supported movie and region.' }))
        return
      }

      upstreamUrl = new URL(`${watchmodeBaseUrl}/title/${titleMatch[1]}/sources/`)
      upstreamUrl.searchParams.set('regions', region)
    }

    try {
      const upstreamResponse = await fetch(upstreamUrl, {
        headers: { 'X-API-Key': apiKey },
      })
      const payload = await upstreamResponse.text()
      response.writeHead(upstreamResponse.status, {
        'Content-Type': upstreamResponse.headers.get('content-type') ?? 'application/json',
        'Cache-Control': 'no-store',
      })
      response.end(payload)
    } catch {
      response.writeHead(502, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'The movie catalog could not be reached. Try again shortly.' }))
    }
  }

  return {
    name: 'watchmode-api',
    configureServer(server) {
      server.middlewares.use(handleRequest)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRequest)
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), watchmodeApi(environment.WATCHMODE_API_KEY)],
  }
})
