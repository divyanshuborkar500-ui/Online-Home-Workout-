import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function crc32(buf) {
    let table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
      }
      table[i] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data with filter byte per row
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(height * rowSize);
  
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.42;
  
  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const idx = y * rowSize + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Draw dark background with emerald emblem
      if (dist < radius) {
        // Center home emblem or emerald fill
        raw[idx] = 16;     // R
        raw[idx + 1] = 185; // G (emerald-500)
        raw[idx + 2] = 129; // B
        raw[idx + 3] = 255; // A
      } else {
        raw[idx] = 15;     // Slate-900
        raw[idx + 1] = 23;
        raw[idx + 2] = 42;
        raw[idx + 3] = 255;
      }
    }
  }

  const idat = zlib.deflateSync(raw);
  const ihdrChunk = chunk('IHDR', ihdr);
  const idatChunk = chunk('IDAT', idat);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

fs.writeFileSync('public/pwa-192x192.png', createPNG(192, 192, 16, 185, 129));
fs.writeFileSync('public/pwa-512x512.png', createPNG(512, 512, 16, 185, 129));
fs.writeFileSync('public/apple-touch-icon.png', createPNG(180, 180, 16, 185, 129));
console.log('PNG icons generated successfully');
