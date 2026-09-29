// Builds the eye-tracking hero assets from the transparent portrait.
// public/images/hero-portrait.webp is the source; this writes
// hero-base.webp (iris painted out) and iris-{l,r}.png (movable iris sprites).
import sharp from 'sharp';

const SRC = 'public/images/hero-portrait-src.webp';
const W = 1000;
const H = 1200;

import { readFileSync } from 'node:fs';
const eyes = JSON.parse(readFileSync('src/eyes.json', 'utf8'));

const pts = (a) => a.map((p) => p.join(',')).join(' ');
const sclera = (id, e) => `
  <polygon points="${pts(e.open)}" fill="url(#${id})" filter="url(#soft)"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="soft"><feGaussianBlur stdDeviation="0.6"/></filter>
    <linearGradient id="sl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfc3bd"/><stop offset="0.35" stop-color="#efe9e5"/><stop offset="1" stop-color="#e2d6d0"/>
    </linearGradient>
  </defs>
  ${sclera('sl', eyes.l)}${sclera('sl', eyes.r)}
</svg>`;

const src = await sharp(SRC).resize({ width: W }).toBuffer();
await sharp(src)
  .composite([{ input: Buffer.from(svg) }])
  .webp({ quality: 90 })
  .toFile('public/images/hero-base.webp');

for (const [k, e] of Object.entries(eyes)) {
  const d = Math.round(e.r * 2 + 2);
  const left = Math.round(e.cx - d / 2);
  const top = Math.round(e.cy - d / 2);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${d}"><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2 - 0.5}" fill="#fff"/></svg>`
  );
  const crop = await sharp(src).extract({ left, top, width: d, height: d }).toBuffer();
  const masked = await sharp(crop)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(masked).resize({ width: d * 4, kernel: 'lanczos3' }).png().toFile(`public/images/iris-${k}.png`);
  console.log(k, { left, top, d });
}
