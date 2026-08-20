import { closeSync, openSync, readSync } from "node:fs";

export type ImageSize = { width: number; height: number };

/** Enough for the header of any format below. */
const HEADER_BYTES = 65536;

const PNG_SIGNATURE = "89504e470d0a1a0a";

/**
 * Reads intrinsic pixel dimensions straight from an image header, so a
 * showcase frame can match its asset exactly instead of assuming a ratio.
 * Build-time only — every V2 route is statically prerendered.
 */
export function readImageSize(path: string): ImageSize | null {
  const buffer = readHeader(path);
  if (!buffer) return null;

  return pngSize(buffer) ?? jpegSize(buffer) ?? webpSize(buffer);
}

function readHeader(path: string): Buffer | null {
  let handle: number | undefined;
  try {
    handle = openSync(path, "r");
    const buffer = Buffer.alloc(HEADER_BYTES);
    const read = readSync(handle, buffer, 0, HEADER_BYTES, 0);
    return buffer.subarray(0, read);
  } catch {
    return null;
  } finally {
    if (handle !== undefined) closeSync(handle);
  }
}

function pngSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 24) return null;
  if (buffer.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) return null;
  // IHDR is always the first chunk: width and height are big-endian uint32.
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1; // Resynchronize on fill bytes.
      continue;
    }

    const marker = buffer[offset + 1];

    // Start-of-frame markers carry the dimensions; DHT/DAC/DRI do not.
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }

  return null;
}

function webpSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 30) return null;
  if (buffer.subarray(0, 4).toString("ascii") !== "RIFF") return null;
  if (buffer.subarray(8, 12).toString("ascii") !== "WEBP") return null;

  const format = buffer.subarray(12, 16).toString("ascii");

  if (format === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (format === "VP8X") {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    };
  }

  return null;
}
