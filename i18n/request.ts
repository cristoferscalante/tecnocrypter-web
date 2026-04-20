import {getRequestConfig} from 'next-intl/server'
import {hasLocale} from 'next-intl'
import {routing} from './routing'

const messageFiles = [
  'common',
  'home',
  'toolsPage',
  'blog',
  'contact',
  'products',
  'security',
  'categories',
  'privacy',
  'terms',
  'cookiesPolicy',
  'notFound',
] as const

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const modules = await Promise.all(
    messageFiles.map(f =>
      import(`../messages/${locale}/${f}.json`).then(m => m.default).catch(() => ({}))
    )
  )

  const messages = Object.assign({}, ...modules)

  return { locale, messages }
})
