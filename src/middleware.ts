import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './config';

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix
});

export const config = {
  matcher: [
    '/',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};