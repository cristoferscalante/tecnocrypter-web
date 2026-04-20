import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en', 'fr', 'pt'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: true,
})
