import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { parseMarkdown } from './md-to-html.ts';

async function makeTempDir(prefix: string): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

test('parseMarkdown preserves mixed markdown and Obsidian wikilink image order', async (t) => {
  const root = await makeTempDir('x-md-to-html-wikilinks-');
  t.after(() => fs.rm(root, { recursive: true, force: true }));

  const articleDir = path.join(root, 'article');
  const attachmentsDir = path.join(articleDir, 'Attachments');
  const tempDir = path.join(root, 'tmp');
  await fs.mkdir(attachmentsDir, { recursive: true });
  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(path.join(articleDir, 'a.png'), 'a');
  await fs.writeFile(path.join(articleDir, 'b.jpg'), 'b');
  await fs.writeFile(path.join(attachmentsDir, 'c.webp'), 'c');

  const markdownPath = path.join(articleDir, 'post.md');
  await fs.writeFile(
    markdownPath,
    [
      '# Title',
      '',
      '![[a.png]]',
      '',
      '![B alt](b.jpg)',
      '',
      '![[c.webp|C alt]]',
      '',
      '![[note]]',
    ].join('\n'),
  );

  const result = await parseMarkdown(markdownPath, { tempDir });

  assert.deepEqual(
    result.contentImages.map(({ placeholder, originalPath, alt, localPath }) => ({
      placeholder,
      originalPath,
      alt,
      localPath,
    })),
    [
      {
        placeholder: 'XIMGPH_1',
        originalPath: 'a.png',
        alt: '',
        localPath: path.join(articleDir, 'a.png'),
      },
      {
        placeholder: 'XIMGPH_2',
        originalPath: 'b.jpg',
        alt: 'B alt',
        localPath: path.join(articleDir, 'b.jpg'),
      },
      {
        placeholder: 'XIMGPH_3',
        originalPath: 'c.webp',
        alt: 'C alt',
        localPath: path.join(attachmentsDir, 'c.webp'),
      },
    ],
  );
  assert.match(result.html, /XIMGPH_1[\s\S]*XIMGPH_2[\s\S]*XIMGPH_3/);
  assert.match(result.html, /!\[\[note\]\]/);
});

test('parseMarkdown resolves encoded spaces and literal percent image paths', async (t) => {
  const root = await makeTempDir('baoyu-post-to-x-images-');
  t.after(() => fs.rm(root, { recursive: true, force: true }));

  const articlePath = path.join(root, 'article.md');
  const tempDir = path.join(root, 'tmp');
  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(path.join(root, 'Pasted image.png'), 'png');
  await fs.writeFile(path.join(root, '100%.png'), 'png');
  await fs.writeFile(
    articlePath,
    [
      '# Title',
      '',
      '![encoded](Pasted%20image.png)',
      '',
      '![literal](100%.png)',
    ].join('\n'),
  );

  const result = await parseMarkdown(articlePath, { tempDir });

  assert.equal(result.contentImages[0]?.localPath, path.join(root, 'Pasted image.png'));
  assert.equal(result.contentImages[1]?.localPath, path.join(root, '100%.png'));
});
