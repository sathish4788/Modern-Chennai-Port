import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Ensure public dir exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Minimal pure Node PNG generator using standard zlib
function createPNG(width, height, drawFn) {
  // RGBA buffer: 4 bytes per pixel + 1 filter byte per row
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // color type 6 (RGBA)
  ihdr.writeUInt8(0, 10); // compression 0
  ihdr.writeUInt8(0, 11); // filter 0
  ihdr.writeUInt8(0, 12); // interlace 0

  function createChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    // CRC calculation
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc >>> 0, 8 + len);
    return buf;
  }

  // Table-based CRC32
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      const byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const bit = (byte ^ crc) & 1;
        crc = (crc >>> 1) ^ (bit ? 0xedb88320 : 0);
      }
    }
    return crc ^ 0xffffffff;
  }

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Drawing function for Modern Chennai Port Cargo icon
function drawCargoIcon(isMaskable) {
  return (x, y, w, h) => {
    const nx = x / w;
    const ny = y / h;

    // Center coordinates (-1 to 1)
    const cx = (nx - 0.5) * 2;
    const cy = (ny - 0.5) * 2;
    const dist = Math.sqrt(cx * cx + cy * cy);

    // Background gradient: Rich Marine Blue to Cyan
    const bgR = Math.floor(14 + (30 - 14) * ny);
    const bgG = Math.floor(64 + (140 - 64) * ny);
    const bgB = Math.floor(140 + (220 - 140) * ny);

    // If maskable, full bleed background with safe zone; else nice rounded icon
    if (!isMaskable && dist > 0.95) {
      return [0, 0, 0, 0]; // Transparent corners
    }

    // Cargo ship hull shape at bottom
    // ny between 0.65 and 0.85
    if (ny > 0.68 && ny < 0.84) {
      const hullWidth = 0.72 - (ny - 0.68) * 0.35;
      if (Math.abs(nx - 0.5) < hullWidth / 2) {
        // Red/Navy cargo ship hull
        return [220, 38, 38, 255]; // Bright red ship hull
      }
    }

    // Ship water waves
    if (ny >= 0.84) {
      const wave = Math.sin(nx * 18) * 0.02;
      if (ny > 0.84 + wave) {
        return [2, 132, 199, 255]; // Ocean blue wave
      }
    }

    // Containers stacked on ship:
    // Row 1 (bottom containers): ny 0.54 - 0.68
    if (ny >= 0.54 && ny <= 0.68) {
      // 3 containers: left (orange), middle (yellow/gold), right (emerald)
      if (nx >= 0.22 && nx <= 0.38) {
        return [249, 115, 22, 255]; // Orange container
      }
      if (nx >= 0.42 && nx <= 0.58) {
        return [245, 158, 11, 255]; // Amber container
      }
      if (nx >= 0.62 && nx <= 0.78) {
        return [16, 185, 129, 255]; // Green container
      }
    }

    // Row 2 (top container): ny 0.40 - 0.53
    if (ny >= 0.40 && ny <= 0.53) {
      if (nx >= 0.32 && nx <= 0.68) {
        return [59, 130, 246, 255]; // Blue container
      }
    }

    // Gantry Crane top arm (yellow crane): ny 0.20 - 0.38
    if (ny >= 0.20 && ny <= 0.24 && nx >= 0.18 && nx <= 0.82) {
      return [253, 224, 71, 255]; // Bright yellow crane horizontal boom
    }
    // Crane tower vertical post
    if (ny >= 0.20 && ny <= 0.65 && nx >= 0.18 && nx <= 0.25) {
      return [234, 179, 8, 255]; // Yellow crane tower
    }
    // Crane cable
    if (ny >= 0.24 && ny <= 0.40 && Math.abs(nx - 0.5) < 0.015) {
      return [255, 255, 255, 230]; // Crane hoist wire
    }

    // Cute Star or Sun in sky: cx ~ 0.55, cy ~ -0.55
    const sunDist = Math.sqrt((nx - 0.8) ** 2 + (ny - 0.22) ** 2);
    if (sunDist < 0.08) {
      return [255, 225, 50, 255];
    }

    // Default background
    return [bgR, bgG, bgB, 255];
  };
}

console.log('Generating PWA PNG icons...');

const png192 = createPNG(192, 192, drawCargoIcon(false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);

const png512 = createPNG(512, 512, drawCargoIcon(false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);

const pngMaskable = createPNG(512, 512, drawCargoIcon(true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pngMaskable);

const appleIcon = createPNG(180, 180, drawCargoIcon(false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Also generate high-res SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="60%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
    <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#075985"/>
    </linearGradient>
    <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Background Rounded Canvas -->
  <rect width="512" height="512" rx="108" fill="url(#skyGrad)" />

  <!-- Sun -->
  <circle cx="410" cy="110" r="42" fill="#fbbf24" opacity="0.9" />

  <!-- Port Gantry Crane -->
  <path d="M70 340 L100 110 L130 110 L160 340" fill="none" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>
  <line x1="85" y1="110" x2="440" y2="110" stroke="#f59e0b" stroke-width="16" stroke-linecap="round"/>
  <line x1="100" y1="200" x2="130" y2="200" stroke="#f59e0b" stroke-width="8"/>
  <line x1="90" y1="270" x2="140" y2="270" stroke="#f59e0b" stroke-width="8"/>

  <!-- Crane Cable & Spreader -->
  <line x1="256" y1="118" x2="256" y2="195" stroke="#334155" stroke-width="4" stroke-dasharray="6,4"/>
  <rect x="236" y="195" width="40" height="8" rx="2" fill="#334155"/>

  <!-- Cargo Containers Stacked -->
  <!-- Upper Container (lifted / mid-stack) -->
  <g filter="url(#shadow)">
    <rect x="176" y="210" width="160" height="65" rx="8" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
    <line x1="216" y1="215" x2="216" y2="270" stroke="#60a5fa" stroke-width="3"/>
    <line x1="256" y1="215" x2="256" y2="270" stroke="#60a5fa" stroke-width="3"/>
    <line x1="296" y1="215" x2="296" y2="270" stroke="#60a5fa" stroke-width="3"/>
    <text x="256" y="252" font-family="sans-serif" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle">CHENNAI</text>
  </g>

  <!-- Lower Containers Row -->
  <g filter="url(#shadow)">
    <!-- Orange container -->
    <rect x="96" y="285" width="100" height="60" rx="6" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
    <line x1="129" y1="290" x2="129" y2="340" stroke="#fb923c" stroke-width="2.5"/>
    <line x1="162" y1="290" x2="162" y2="340" stroke="#fb923c" stroke-width="2.5"/>

    <!-- Green container -->
    <rect x="206" y="285" width="100" height="60" rx="6" fill="#10b981" stroke="#047857" stroke-width="3"/>
    <line x1="239" y1="290" x2="239" y2="340" stroke="#34d399" stroke-width="2.5"/>
    <line x1="272" y1="290" x2="272" y2="340" stroke="#34d399" stroke-width="2.5"/>

    <!-- Amber container -->
    <rect x="316" y="285" width="100" height="60" rx="6" fill="#eab308" stroke="#a16207" stroke-width="3"/>
    <line x1="349" y1="290" x2="349" y2="340" stroke="#fde047" stroke-width="2.5"/>
    <line x1="382" y1="290" x2="382" y2="340" stroke="#fde047" stroke-width="2.5"/>
  </g>

  <!-- Cargo Ship Hull -->
  <path d="M50 350 L80 430 Q256 445 432 430 L462 350 Z" fill="url(#hullGrad)" filter="url(#shadow)"/>
  <rect x="70" y="345" width="372" height="12" rx="4" fill="#ffffff"/>

  <!-- Water Waves -->
  <path d="M-10 420 C60 405, 120 435, 190 420 C260 405, 320 435, 390 420 C460 405, 510 425, 530 420 L530 520 L-10 520 Z" fill="url(#oceanGrad)"/>
  <path d="M-10 450 C70 440, 140 460, 210 448 C290 435, 360 460, 440 448 C490 440, 520 450, 530 448 L530 520 L-10 520 Z" fill="#0369a1" opacity="0.6"/>

  <!-- Star Badge -->
  <g transform="translate(420, 420) scale(0.9)">
    <circle cx="0" cy="0" r="32" fill="#facc15" stroke="#ffffff" stroke-width="4"/>
    <polygon points="0,-20 6,-6 20,-6 9,4 13,18 0,9 -13,18 -9,4 -20,-6 -6,-6" fill="#eab308"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
console.log('Icons generated successfully.');
