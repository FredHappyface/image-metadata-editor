/**
 *
 * @param {Blob|Uint8Array} blob - The image as a Blob or Uint8Array.
 * @returns {Promise<Uint8Array>} - The image as a Uint8Array
 *
 * @throws {TypeError} - if the arg is an invalid type
 */
export async function cast2Uint8Array(blob: Blob | Uint8Array) {
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
export function typeCheck(elem: any, types: any[]) {
  for (const _type of types) {
    if (typeof elem === _type) {
      return;
    } else if (elem instanceof _type) {
      return;
    }
  }
  throw new TypeError(`This type is not supported :(: ${typeof elem}`);
}
