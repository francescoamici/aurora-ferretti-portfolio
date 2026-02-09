import { cpSync, rmSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const out = resolve(root, 'dist');

// Clean and create output directory
if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });

// Copy gateway to root
cpSync(resolve(root, 'gateway/dist'), out, { recursive: true });

// Copy each theme into /v{N}/
for (let i = 1; i <= 15; i++) {
  const names = [
    '', 'v1-nero-assoluto', 'v2-carta-bianca', 'v3-brutalismo',
    'v4-rinascimento', 'v5-neon-roma', 'v6-giardino-segreto',
    'v7-futurismo', 'v8-giocoso', 'v9-architetto', 'v10-cinematica',
    'v11-atelier', 'v12-botanica', 'v13-lumiere', 'v14-maison', 'v15-etoile',
  ];
  const src = resolve(root, `apps/${names[i]}/dist`);
  const dest = resolve(out, `v${i}`);
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
    console.log(`  Copied ${names[i]} -> /v${i}/`);
  } else {
    console.warn(`  WARNING: ${src} not found, skipping`);
  }
}

console.log(`\nBundled to ${out}`);
console.log('Serve with: npx serve dist');
