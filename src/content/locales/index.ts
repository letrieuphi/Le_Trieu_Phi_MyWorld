import { vi } from './vi.ts';
import { en } from './en.ts';
export type Locale = 'vi' | 'en';
export const DEFAULT_LOCALE: Locale = 'vi';
export const LOCALE_STORAGE_KEY = 'tp-locale';
export function isLocale(value: unknown): value is Locale { return value === 'vi' || value === 'en'; }
export function translate(locale: Locale, key: string | number | undefined, values: Record<string, string | number> = {}): string {
  const source = String(key ?? '');
  const normalized = source.trim();
  if (normalized.startsWith('View ') && normalized !== 'View {title}') return translate(locale, 'View {title}', { title: normalized.slice(5) });
  let result = (locale === 'vi' ? vi[normalized] : undefined) ?? en[normalized];
  if (result === undefined && locale === 'vi' && / (?:·|\/) /.test(normalized)) {
    result = normalized.split(/( · | \/ )/).map(part => vi[part] ?? part).join('');
  }
  result ??= normalized;
  result = result.replace(/\{(\w+)\}/g, (match, name: string) => name in values ? translate(locale, values[name]) : match);
  return source.replace(normalized, result);
}
