import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  ...readdirSync(root).filter((name) => name.endsWith('.html')).map((name) => path.join(root, name)),
  ...readdirSync(path.join(root, 'articles')).filter((name) => name.endsWith('.html')).map((name) => path.join(root, 'articles', name))
];

function headerGithubPath(file) {
  const html = readFileSync(file, 'utf8');
  const match = html.match(/class="header-github"[^>]*>\s*<svg[^>]*>\s*<path d="([^"]+)"/);
  assert.ok(match, `Missing GitHub header icon in ${path.relative(root, file)}`);
  return match[1];
}

test('all pages use the same complete GitHub header icon', () => {
  const expected = headerGithubPath(path.join(root, 'index.html'));
  for (const file of pages) {
    assert.equal(headerGithubPath(file), expected, `GitHub icon differs in ${path.relative(root, file)}`);
  }
});
