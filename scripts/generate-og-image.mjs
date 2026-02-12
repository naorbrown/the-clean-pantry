import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#1a1a1a';
const SAGE = '#7A9E7E';
const SAGE_DIM = '#5a7e5e';
const CX = WIDTH / 2;

// Draw the leaf large and filled so it's visible at any size
const compositeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>

  <!-- Large filled leaf centered at top -->
  <g transform="translate(${CX}, 200) scale(5)">
    <!-- Leaf body - filled -->
    <path d="M0 -24C-6 -22 -12 -16 -10 -4c1.5 6 5 9 10 12
             c5 -3 8.5 -6 10 -12c2 -12 -4 -18 -10 -20z"
          fill="${SAGE}" opacity="0.15"/>
    <!-- Leaf outline -->
    <path d="M0 -24C-6 -22 -12 -16 -10 -4c1.5 6 5 9 10 12" stroke="${SAGE}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M0 -24c6 2 12 8 10 20c-1.5 6-5 9-10 12" stroke="${SAGE}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Center vein -->
    <path d="M0 -22v30" stroke="${SAGE}" stroke-width="0.8" stroke-linecap="round"/>
    <!-- Side veins -->
    <path d="M0 -12c-3 2-5 5-5.5 8" stroke="${SAGE}" stroke-width="0.6" stroke-linecap="round" opacity="0.5"/>
    <path d="M0 -12c3 2 5 5 5.5 8" stroke="${SAGE}" stroke-width="0.6" stroke-linecap="round" opacity="0.5"/>
    <path d="M0 -6c-2 1.5-3.5 3.5-4 6" stroke="${SAGE}" stroke-width="0.5" stroke-linecap="round" opacity="0.35"/>
    <path d="M0 -6c2 1.5 3.5 3.5 4 6" stroke="${SAGE}" stroke-width="0.5" stroke-linecap="round" opacity="0.35"/>
  </g>

  <!-- Site name -->
  <text x="${CX}" y="420" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="52" font-weight="600" fill="${SAGE}">
    The Clean Pantry
  </text>

  <!-- Tagline -->
  <text x="${CX}" y="475" text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="22" fill="#888">
    Simple recipes for a cleaner home
  </text>
</svg>`;

await sharp(Buffer.from(compositeSvg))
  .png()
  .toFile(resolve(__dirname, '../public/og-image.png'));

console.log('Generated public/og-image.png (1200x630)');
