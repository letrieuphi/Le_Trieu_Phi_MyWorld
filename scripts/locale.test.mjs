import { test } from 'node:test';
import assert from 'node:assert/strict';
import { translate, DEFAULT_LOCALE, isLocale } from '../src/content/locales/index.ts';
import { vi } from '../src/content/locales/vi.ts';
import { projects, categories } from '../src/content/projects.ts';
import { profile } from '../src/content/profile.ts';
test('Vietnamese default, supported locale validation and English fallback', () => {
  assert.equal(DEFAULT_LOCALE, 'vi'); assert.ok(isLocale('vi')); assert.ok(isLocale('en')); assert.ok(!isLocale('fr'));
  assert.equal(translate('vi', 'Unknown source copy'), 'Unknown source copy');
  assert.equal(translate('en', 'Home'), 'Home'); assert.equal(translate('vi', 'Home'), 'Trang chủ');
  assert.equal(translate('en', 'nav.work'), 'My Work'); assert.equal(translate('vi', 'nav.work'), 'Dự án');
});
test('Interpolated accessible labels and joined fields translate without altering brands', () => {
  assert.equal(translate('vi', 'View Photography Collection'), 'Xem Bộ sưu tập Nhiếp ảnh');
  assert.equal(translate('en', 'View Photography Collection'), 'View Photography Collection');
  assert.equal(translate('vi', 'Lighting · Photography · Sony'), 'Ánh sáng · Nhiếp ảnh · Sony');
  assert.equal(translate('vi', ' HCMC, VIETNAM '), ' TP.HCM, VIỆT NAM ');
  assert.equal(translate('en', 'category.pending', {category:'film'}), 'Selected film work is being curated. New projects will appear here.');
});
test('All supplied project narrative and new personal copy has Vietnamese translations', () => {
  const copy = [...categories.map(c=>c.text), ...profile.aboutParagraphs, ...profile.manifesto, ...profile.values.map(v=>v.text), profile.shortIntro];
  for (const p of projects) {
    copy.push(...[p.summary,p.description,p.challenge,p.approach,p.outcome].filter(Boolean));
    for(const item of p.process || [])copy.push(item.title,item.text);
  }
  for(const text of copy)assert.ok(vi[text], `Missing VI: ${text}`);
});
