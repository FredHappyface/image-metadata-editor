import pkg from "crc-32";
const { buf } = pkg;
import fastXmlParser from "fast-xml-parser";
import pako from "pako";
import WebP from "node-webpmux";

/**
 * Writes tEXt metadata to a PNG Uint8Array.
 * @param {Uint8Array} image - The original PNG Uint8Array.
 * @param {string} key - The metadata key.
 * @param {string} value - The metadata value.
 * @returns {Uint8Array} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non PNG image is used
 * @throws {TypeError} If using an unsupported text mode
 */
export function writePNGtext(image, key, value, mode = "tEXt") {
  if (getMimeType(image) !== "image/png") {
    throw new TypeError("A PNG is required to use writePNGtEXt");
  }

  if (!["tEXt", "zTXt"].includes(mode)) {
    throw new TypeError("Unsupported text mode");
  }

  var keyValue = `${key}\0${value}`;
  var keyValueBytes = new TextEncoder().encode(keyValue);

  if (mode === "zTXt") {
    pako.deflate(value);
    const keyBytes = new TextEncoder().encode(`${key}\0\0`);
    const ValueBytes = pako.deflate(value);
    var keyValueBytes = new Uint8Array(keyBytes.length + ValueBytes.length);
    keyValueBytes.set(keyBytes);
    keyValueBytes.set(ValueBytes, keyBytes.length);
  }

  const tEXtKeyValue = new Uint8Array(keyValueBytes.length + 4);
  tEXtKeyValue.set(new TextEncoder().encode(mode));
  tEXtKeyValue.set(keyValueBytes, 4);
  const crc32 = buf(tEXtKeyValue);
  const keyValueLen = new Uint8Array(4);
  new DataView(keyValueLen.buffer).setUint32(0, keyValueBytes.length, false);

  // Build the chunk_tEXt
  const tEXt = new Uint8Array(keyValueBytes.length + 12);
  tEXt.set(keyValueLen, 0);
  tEXt.set(tEXtKeyValue, 4);
  new DataView(tEXt.buffer).setUint32(keyValueBytes.length + 8, crc32, false);

  // Update the PNG with the chunk_tEXt
  const insertPosition = new TextDecoder().decode(image).indexOf("IHDR") + 21;
  const imgBytesBefore = image.slice(0, insertPosition);
  const imgBytesAfter = image.slice(insertPosition);
  const newPng = new Uint8Array(
    imgBytesBefore.length + tEXt.length + imgBytesAfter.length
  );
  newPng.set(imgBytesBefore);
  newPng.set(tEXt, imgBytesBefore.length);
  newPng.set(imgBytesAfter, imgBytesBefore.length + tEXt.length);

  return newPng;
}

/**
 * Writes metadata to a JPG Uint8Array.
 * @param {Uint8Array} image - The original JPG Uint8Array.
 * @param {string} value - The metadata value.
 * @param {number[]} marker - The jpg marker, defaults to COM.
 * @returns {Uint8Array} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non JPG image is used
 * @throws {TypeError} If a marker is invalid
 */
export function writeJPGMarker(image, value, marker = [0xff, 0xfe]) {
  if (getMimeType(image) !== "image/jpeg") {
    throw new TypeError("A JPG is required to use writeJPGCOM");
  }

  if (marker[0] !== 0xff) {
    throw new TypeError("Invalid Marker");
  }

  const valueBytes = new TextEncoder().encode(value);
  const tEXt = new Uint8Array(4 + valueBytes.length);
  tEXt.set(marker, 0);
  new DataView(tEXt.buffer).setUint16(2, valueBytes.length + 2, false);
  tEXt.set(valueBytes, 4);

  // Update the JPG
  const insertPosition = 2;
  const imgBytesBefore = image.slice(0, insertPosition);
  const imgBytesAfter = image.slice(insertPosition);
  const newJpg = new Uint8Array(
    imgBytesBefore.length + tEXt.length + imgBytesAfter.length
  );
  newJpg.set(imgBytesBefore);
  newJpg.set(tEXt, imgBytesBefore.length);
  newJpg.set(imgBytesAfter, imgBytesBefore.length + tEXt.length);

  return newJpg;
}

/**
 * Writes metadata to a Webp Uint8Array.
 * @param {Uint8Array} image - The original Webp Uint8Array.
 * @param {string} value - The metadata value.
 * @returns {Uint8Array} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non Webp image is used
 * @throws {TypeError} If a marker is invalid
 */
export async function writeWebpXMP(image, value) {
  if (getMimeType(image) !== "image/webp") {
    throw new TypeError("A webp is required to use writeWebpXMP");
  }
  const img = new WebP.Image();
  await img.load(image)
	img.xmp = new TextEncoder().encode(value);
	const data = await img.save(null, {xmp:true})
	return data
}

/**
 * Writes EXIF metadata to an image Uint8Array.
 * @param {Uint8Array} image - The original image Uint8Array.
 * @param {string} key - The EXIF key.
 * @param {string} value - The EXIF value.
 * @returns {Uint8Array} - Updated Uint8Array.
 *
 * @throws {TypeError} NotImplemented
 */
export function writeExif(image, key, value) {
  throw new TypeError("NotImplemented :(");
}

/**
 * Writes XMP metadata to an image Uint8Array.
 * @param {Uint8Array} image - The original image Uint8Array.
 * @param {string} value - The XMP value.
 * @returns {Uint8Array} - Updated Uint8Array.
 *
 * @throws {TypeError} If the XMP is invalid/ badly structured
 * @throws {TypeError} If an unsupported image is used
 */
export function writeXMP(image, value) {
  const err = fastXmlParser.XMLValidator.validate(value);
  if (err !== true) {
    throw new TypeError(
      "XMP must be valid XML...\n" + err.err.code + ": " + err.err.msg
    );
  }

  if (getMimeType(image) === "image/png") {
    return writePNGtext(image, "XML:com.adobe.xmp", value);
  }
  if (getMimeType(image) === "image/jpeg") {
    return writeJPGMarker(
      image,
      `http://ns.adobe.com/xap/1.0/\0${value}`,
      [0xff, 0xe1]
    );
  }
  if (getMimeType(image) === "image/webp") {
    return writeWebpXMP(image, value);
  }
  throw new TypeError("This image is not supported :(");
}

/**
 * Get the MIME type of an image based on its magic bytes.
 * @param {Uint8Array} image - The image as a Uint8Array.
 * @returns {string|null} - The MIME type (e.g., "image/png", "image/jpeg", "image/webp"), or null if the format is not recognized.
 */
export function getMimeType(image) {
  const magic = image.slice(0, 4);

  if (
    magic[0] === 0x89 &&
    magic[1] === 0x50 &&
    magic[2] === 0x4e &&
    magic[3] === 0x47
  ) {
    return "image/png";
  } else if (magic[0] === 0xff && magic[1] === 0xd8 && magic[2] === 0xff) {
    return "image/jpeg";
  } else if (
    magic[0] === 0x52 &&
    magic[1] === 0x49 &&
    magic[2] === 0x46 &&
    magic[3] === 0x46
  ) {
    // Check for the WebP RIFF header
    return "image/webp";
  } else {
    return null; // Unknown format
  }
}
