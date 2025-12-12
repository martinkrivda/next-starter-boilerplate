import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { LocaleProvider, ThemeProvider } from "@/providers";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: { locale: string };
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale as Locale;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
