// Builds a horizontal logo lockup (house mark + wordmark) from the official square logo.
import sharp from 'sharp';
const base = 'src/assets/images/brand/';
for (const v of ['roamza-logo', 'roamza-logo-white']) {
  const src = sharp(base + v + '.png');
  const { width, height } = await src.metadata();
  const markH = Math.round(height * 0.64);
  const mark = await sharp(base + v + '.png').extract({ left: 0, top: 0, width, height: markH }).trim({ threshold: 1 }).resize({ height: 520 }).toBuffer();
  const wTop = Math.round(height * 0.645), wH = Math.round(height * 0.23);
  const word = await sharp(base + v + '.png').extract({ left: 0, top: wTop, width, height: wH }).trim({ threshold: 1 }).resize({ height: 300 }).toBuffer();
  const mm = await sharp(mark).metadata(); const wm = await sharp(word).metadata();
  const W = mm.width + 50 + wm.width;
  await sharp({ create: { width: W, height: 520, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: mark, left: 0, top: 0 }, { input: word, left: mm.width + 50, top: Math.round((520 - wm.height) / 2) + 20 }])
    .png({ compressionLevel: 9 }).toFile(base + v + '-horizontal.png');
  console.log(v, W, 'x 520');
}
