/*
 * run with `npx tsc`
 */

import pkg from "crc-32";
const { buf } = pkg;
import fastXmlParser from "fast-xml-parser";
import pako from "pako";
// @ts-ignore
import WebP from "node-webpmux";

/**
 * Writes tEXt metadata to a PNG Uint8Array.
 * @param {Blob|Uint8Array} image - The original PNG Uint8Array.
 * @param {string} key - The metadata key.
 * @param {string} value - The metadata value.
 * @param {string} mode - The encoding mode to use. Default = "tEXt".
 * @returns {Promise<Uint8Array>} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non PNG image is used
 * @throws {TypeError} If using an unsupported text mode
 */
export async function writePNGtext(
  image: Blob | Uint8Array,
  key: string,
  value: string,
  mode: string = "tEXt"
) {
  typeCheck(key, ["string"]);
  typeCheck(value, ["string"]);
  typeCheck(mode, ["string"]);
  const imageArr = await cast2Uint8Array(image);
  if ((await getMimeType(imageArr)) !== "image/png") {
    throw new TypeError("A PNG is required to use writePNGtEXt");
  }

  if (!["tEXt", "zTXt"].includes(mode)) {
    throw new TypeError("Unsupported text mode");
  }

  var keyValue = `${key}\0${value}`;
  var keyValueBytes = new TextEncoder().encode(keyValue);

  if (mode === "zTXt") {
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
  const insertPosition =
    new TextDecoder().decode(imageArr).indexOf("IHDR") + 21;
  const imgBytesBefore = imageArr.slice(0, insertPosition);
  const imgBytesAfter = imageArr.slice(insertPosition);
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
 * @param {Blob|Uint8Array} image - The original JPG Uint8Array.
 * @param {string} value - The metadata value.
 * @param {number[]} marker - The jpg marker, defaults to COM.
 * @returns {Promise<Uint8Array>} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non JPG image is used
 * @throws {TypeError} If a marker is invalid
 */
export async function writeJPGMarker(
  image: Blob | Uint8Array,
  value: string,
  marker: number[] = [0xff, 0xfe]
) {
  typeCheck(value, ["string"]);
  typeCheck(marker, [Array<number>]);
  const imageArr = await cast2Uint8Array(image);
  if ((await getMimeType(imageArr)) !== "image/jpeg") {
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
  const imgBytesBefore = imageArr.slice(0, insertPosition);
  const imgBytesAfter = imageArr.slice(insertPosition);
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
 * @param {Blob|Uint8Array} image - The original Webp Uint8Array.
 * @param {string} value - The metadata value.
 * @returns {Promise<Uint8Array>} - Updated Uint8Array.
 *
 * @throws {TypeError} If a non Webp image is used
 * @throws {TypeError} If a marker is invalid
 */
export async function writeWebpXMP(image: Blob | Uint8Array, value: string) {
  typeCheck(value, ["string"]);
  const imageArr = await cast2Uint8Array(image);
  if ((await getMimeType(imageArr)) !== "image/webp") {
    throw new TypeError("A webp is required to use writeWebpXMP");
  }
  const img = new WebP.Image();
  await img.load(imageArr);
  img.xmp = new TextEncoder().encode(value);
  const data = await img.save(null, { xmp: true });
  return data;
}

/**
 * Writes EXIF metadata to an image Uint8Array.
 * @param {Blob|Uint8Array} image - The original image Uint8Array.
 * @param {string} key - The EXIF key.
 * @param {string} value - The EXIF value.
 * @returns {Promise<Uint8Array>} - Updated Uint8Array.
 *
 * @throws {TypeError} NotImplemented
 */
export function writeExif(
  image: Blob | Uint8Array,
  key: string,
  value: string
) {
  typeCheck(key, ["string"]);
  typeCheck(value, ["string"]);
  throw new TypeError("NotImplemented :(");
}

/**
 * Writes XMP metadata to an image Uint8Array.
 * @param {Blob|Uint8Array} image - The original image Uint8Array.
 * @param {string} value - The XMP value.
 * @returns {Promise<Uint8Array>} - Updated Uint8Array.
 *
 * @throws {TypeError} If the XMP is invalid/ badly structured
 * @throws {TypeError} If an unsupported image is used
 */
export async function writeXMP(image: Blob | Uint8Array, value: string) {
  typeCheck(value, ["string"]);
  const imageArr = await cast2Uint8Array(image);
  const err = fastXmlParser.XMLValidator.validate(value);
  if (err !== true) {
    throw new TypeError(
      "XMP must be valid XML...\n" + err.err.code + ": " + err.err.msg
    );
  }

  if ((await getMimeType(imageArr)) === "image/png") {
    return writePNGtext(imageArr, "XML:com.adobe.xmp", value);
  }
  if ((await getMimeType(imageArr)) === "image/jpeg") {
    return writeJPGMarker(
      imageArr,
      `http://ns.adobe.com/xap/1.0/\0${value}`,
      [0xff, 0xe1]
    );
  }
  if ((await getMimeType(imageArr)) === "image/webp") {
    return writeWebpXMP(imageArr, value);
  }
  throw new TypeError("This image is not supported :(");
}

/**
 * Get the MIME type of an image based on its magic bytes.
 * @param {Blob|Uint8Array} image - The image as a Uint8Array.
 * @returns {string} - The MIME type (e.g., "image/png", "image/jpeg", "image/webp"), or "null" if the format is not recognized.
 */
export async function getMimeType(image: Blob | Uint8Array) {
  const imageArr = await cast2Uint8Array(image);
  const magic = imageArr.slice(0, 4);

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
    return "null"; // Unknown format
  }
}

/**
 *
 * @param {Blob|Uint8Array} blob - The image as a Blob or Uint8Array.
 * @returns {Promise<Uint8Array>} - The image as a Uint8Array
 *
 * @throws {TypeError} - if the arg is an invalid type
 */
async function cast2Uint8Array(blob: Blob | Uint8Array) {
  typeCheck(blob, [Blob, Uint8Array]);
  if (blob instanceof Uint8Array) {
    return blob;
  }
  const buffer = await new Response(blob).arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 *
 * @param elem {any}
 * @param types {any[]}
 */
function typeCheck(elem: any, types: any[]) {
  for (const _type of types) {
    if (typeof elem === _type) {
      return;
    } else if (elem instanceof _type) {
      return;
    }
  }
  throw new TypeError(`This type is not supported :(: ${typeof elem}`);
}

/**
 * Reads tEXt metadata to a PNG Uint8Array.
 * @param {Blob|Uint8Array} image - The original PNG Uint8Array.
 * @param {string} key - The metadata key.
 * @returns {string} - The metadata value.
 *
 * @throws {TypeError} If a non PNG image is used
 * @throws {TypeError} If the value cannot be found
 */
export async function readPNGtext(image: Blob | Uint8Array, key: string) {
  typeCheck(key, ["string"]);
  const imageArr = await cast2Uint8Array(image);
  if ((await getMimeType(imageArr)) !== "image/png") {
    throw new TypeError("A PNG is required to use writePNGtEXt");
  }

  var readPosition = 0;
  var mode = "";
  for (mode of ["tEXt", "zTXt"]) {
    readPosition =
      new TextDecoder().decode(imageArr).indexOf(`${mode}${key}`) - 3;
    if (readPosition !== -4) {
      break;
    }
  }

  if (readPosition === -4) {
    throw new TypeError(`"${key}" not found!`);
  }

  const keyValueLen = imageArr.slice(readPosition, readPosition + 4);
  const size = keyValueLen[3] + (keyValueLen[2] << 8) + (keyValueLen[1] << 16) + (keyValueLen[0] << 24)

  const keyValueOffset = readPosition + 8

  const keyValueBytes = imageArr.slice(
	keyValueOffset,
    keyValueOffset + size,
  );


  if (mode === "zTXt") {
    const ValueBytes = keyValueBytes.slice(
      key.length + 2,
      keyValueBytes.length
    );
    return new TextDecoder().decode(pako.inflate(ValueBytes));
  }

  const ValueBytes = keyValueBytes.slice(key.length + 1, keyValueBytes.length);
  return new TextDecoder().decode(ValueBytes);
}



/**
 * Reads XMP metadata to an image Uint8Array.
 * @param {Blob|Uint8Array} image - The original image Uint8Array.
 * @returns {string} - The stringified XMP
 *
 * @throws {TypeError} If the XMP is invalid/ badly structured
 * @throws {TypeError} If an unsupported image is used
 */
export async function readXMP(image: Blob | Uint8Array) {
	const imageArr = await cast2Uint8Array(image);

	if ((await getMimeType(imageArr)) === "image/png") {
	  return readPNGtext(imageArr, "XML:com.adobe.xmp");
	}
	if ((await getMimeType(imageArr)) === "image/webp") {
	  return readWebpXMP(imageArr);
	}
	throw new TypeError("This image is not supported :(");
  }

  /**
 * Reads metadata to a Webp Uint8Array.
 * @param {Blob|Uint8Array} image - The original Webp Uint8Array.
 * @returns {string}
 *
 * @throws {TypeError} If a non Webp image is used
 * @throws {TypeError} If a marker is invalid
 */
export async function readWebpXMP(image: Blob | Uint8Array) {
	const imageArr = await cast2Uint8Array(image);
	if ((await getMimeType(imageArr)) !== "image/webp") {
	  throw new TypeError("A webp is required to use readWebpXMP");
	}
	const img = new WebP.Image();
	await img.load(imageArr);
	return new TextDecoder().decode(img.xmp);
  }
