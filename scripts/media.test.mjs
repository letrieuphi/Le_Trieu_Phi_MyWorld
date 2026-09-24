import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedUrl, safeMediaUrl } from '../src/lib/media.ts';
test('YouTube watch, share, shorts and privacy embed links normalize', () => {
  for (const url of ['https://youtu.be/dQw4w9WgXcQ', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=3', 'https://youtube.com/shorts/dQw4w9WgXcQ', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ']) assert.equal(embedUrl(url), 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
});
test('Vimeo public and unlisted hash links remain playable', () => {
  assert.equal(embedUrl('https://vimeo.com/123456789'), 'https://player.vimeo.com/video/123456789');
  assert.equal(embedUrl('https://vimeo.com/123456789/abc123'), 'https://player.vimeo.com/video/123456789?h=abc123');
  assert.equal(embedUrl('https://player.vimeo.com/video/123456789?h=abc123'), 'https://player.vimeo.com/video/123456789?h=abc123');
});
test('Untrusted iframe origins and malformed IDs are rejected', () => {
  for (const url of ['https://evil.example/embed/123', 'https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ', 'javascript:alert(1)', 'https://youtube.com/watch?v=bad', 'http://vimeo.com/123', 'garbage']) assert.equal(embedUrl(url), undefined);
});
test('Local assets and HTTPS direct MP4 URLs work; unsafe protocols fail', () => {
  assert.equal(safeMediaUrl('/videos/film.mp4'), '/videos/film.mp4');
  assert.equal(safeMediaUrl('https://cdn.example/film.mp4?signature=x'), 'https://cdn.example/film.mp4?signature=x');
  for (const url of ['//evil.example/video.mp4','javascript:alert(1)','data:text/html,hello','http://cdn.example/video.mp4','relative.mp4', undefined]) assert.equal(safeMediaUrl(url), undefined);
});
