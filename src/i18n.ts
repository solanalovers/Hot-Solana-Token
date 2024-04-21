import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid

  return {
    messages: (
      await import(`../i18n/${locale}.json`)
    ).default
  };
});