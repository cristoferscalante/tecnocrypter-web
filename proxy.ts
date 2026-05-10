import createMiddleware from 'next-intl/middleware'
import {routing} from './i18n/routing'

const intlMiddleware = createMiddleware(routing)
const INDEXABLE_LOCALES = new Set(['es'])

export default function proxy(request: Parameters<typeof intlMiddleware>[0]) {
  const response = intlMiddleware(request)
  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0]

  if (routing.locales.includes(firstSegment as (typeof routing.locales)[number]) && !INDEXABLE_LOCALES.has(firstSegment)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  // Match all pathnames except for:
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
