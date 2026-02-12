import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

function getFiles(dir: string, ext: string): string[] {
  const results: string[] = [];
  function walk(d: string) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(ext)) results.push(full);
    }
  }
  walk(dir);
  return results.sort();
}

function getHeadings(content: string): { text: string; line: number }[] {
  return content.split('\n').reduce<{ text: string; line: number }[]>((acc, line, i) => {
    if (/^## .+/.test(line.trim())) {
      acc.push({ text: line.trim(), line: i + 1 });
    }
    return acc;
  }, []);
}

const recipesDir = path.resolve(__dirname, '../../src/content/recipes');
const ingredientsDir = path.resolve(__dirname, '../../src/content/ingredients');

const recipeFiles = getFiles(recipesDir, '.mdx');
const ingredientFiles = getFiles(ingredientsDir, '.mdx');

describe('Recipe content consistency', () => {
  it('has recipe files to test', () => {
    expect(recipeFiles.length).toBeGreaterThan(200);
  });

  it('every recipe uses ## Steps (not ## How to Make It)', () => {
    const violations: string[] = [];
    for (const file of recipeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes('## How to Make It')) {
        violations.push(path.relative(recipesDir, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it('every recipe has ## Steps heading', () => {
    const missing: string[] = [];
    for (const file of recipeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const headings = getHeadings(content);
      if (!headings.some((h) => h.text === '## Steps')) {
        missing.push(path.relative(recipesDir, file));
      }
    }
    expect(missing).toEqual([]);
  });

  it('every recipe has ## Why It Works heading', () => {
    const missing: string[] = [];
    for (const file of recipeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const headings = getHeadings(content);
      if (!headings.some((h) => h.text === '## Why It Works')) {
        missing.push(path.relative(recipesDir, file));
      }
    }
    expect(missing).toEqual([]);
  });

  it('## Alternative comes before ## Tips when both exist', () => {
    const violations: string[] = [];
    for (const file of recipeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const headings = getHeadings(content);
      const tipsIdx = headings.findIndex((h) => h.text === '## Tips');
      const altIdx = headings.findIndex((h) => h.text.startsWith('## Alternative'));
      if (tipsIdx !== -1 && altIdx !== -1 && tipsIdx < altIdx) {
        violations.push(path.relative(recipesDir, file));
      }
    }
    expect(violations).toEqual([]);
  });

  it('no non-standard section headings exist', () => {
    const banned = [
      '## How to Make It',
      '## Alternative Approach',
      '## Suggested Blends',
      '## Where to Use It',
      '## Important Notes',
      '## What Not to Soak',
    ];
    const violations: string[] = [];
    for (const file of recipeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const headings = getHeadings(content);
      for (const h of headings) {
        if (banned.includes(h.text)) {
          violations.push(`${path.relative(recipesDir, file)}: "${h.text}" at line ${h.line}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });
});

describe('Ingredient content consistency', () => {
  it('has 6 ingredient files', () => {
    expect(ingredientFiles.length).toBe(6);
  });

  it('every ingredient has ## What It Does', () => {
    const missing: string[] = [];
    for (const file of ingredientFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (!content.includes('## What It Does')) {
        missing.push(path.relative(ingredientsDir, file));
      }
    }
    expect(missing).toEqual([]);
  });

  it('every ingredient has ## How to Use It', () => {
    const missing: string[] = [];
    for (const file of ingredientFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (!content.includes('## How to Use It')) {
        missing.push(path.relative(ingredientsDir, file));
      }
    }
    expect(missing).toEqual([]);
  });

  it('every ingredient has ## Buying & Storage', () => {
    const missing: string[] = [];
    for (const file of ingredientFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (!content.includes('## Buying & Storage')) {
        missing.push(path.relative(ingredientsDir, file));
      }
    }
    expect(missing).toEqual([]);
  });

  it('ingredient sections appear in correct order', () => {
    const expectedOrder = ['## What It Does', '## How to Use It', '## Buying & Storage'];
    const violations: string[] = [];
    for (const file of ingredientFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const headings = getHeadings(content);
      const indices = expectedOrder.map((h) => headings.findIndex((hd) => hd.text === h));
      for (let i = 0; i < indices.length - 1; i++) {
        if (indices[i] === -1 || indices[i + 1] === -1 || indices[i] >= indices[i + 1]) {
          violations.push(path.relative(ingredientsDir, file));
          break;
        }
      }
    }
    expect(violations).toEqual([]);
  });
});
