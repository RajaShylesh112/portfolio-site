import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  'client/public/kx01-thumbnail.png',
  'client/public/wanderguide-thumbnail.png',
  'client/public/blog-thumbnail.png'
];

images.forEach(img => {
  const fullPath = path.join(__dirname, img);
  if (fs.existsSync(fullPath)) {
    const base64 = fs.readFileSync(fullPath, { encoding: 'base64' });
    console.log(`--- ${img} ---`);
    console.log(`data:image/png;base64,${base64.substring(0, 50)}...`); // Just show preview to verify
  }
});
