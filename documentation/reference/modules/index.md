[image-metadata-editor](../README.md) / index

# Module: index

## Table of contents

### Functions

- [getMimeType](index.md#getmimetype)
- [readPNGtext](index.md#readpngtext)
- [readWebpXMP](index.md#readwebpxmp)
- [readXMP](index.md#readxmp)
- [writeExif](index.md#writeexif)
- [writeJPGMarker](index.md#writejpgmarker)
- [writePNGtext](index.md#writepngtext)
- [writeWebpXMP](index.md#writewebpxmp)
- [writeXMP](index.md#writexmp)

## Functions

### getMimeType

▸ **getMimeType**(`image`): `Promise`<``"image/png"`` \| ``"image/jpeg"`` \| ``"image/webp"`` \| ``"null"``\>

Get the MIME type of an image based on its magic bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The image as a Uint8Array. |

#### Returns

`Promise`<``"image/png"`` \| ``"image/jpeg"`` \| ``"image/webp"`` \| ``"null"``\>

- The MIME type (e.g., "image/png", "image/jpeg", "image/webp"), or "null" if the format is not recognized.

#### Defined in

[index.ts:214](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L214)

___

### readPNGtext

▸ **readPNGtext**(`image`, `key`): `Promise`<`string`\>

Reads tEXt metadata to a PNG Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original PNG Uint8Array. |
| `key` | `string` | The metadata key. |

#### Returns

`Promise`<`string`\>

- The metadata value.

**`Throws`**

If a non PNG image is used

**`Throws`**

If the value cannot be found

#### Defined in

[index.ts:249](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L249)

___

### readWebpXMP

▸ **readWebpXMP**(`image`): `Promise`<`string`\>

Reads metadata to a Webp Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original Webp Uint8Array. |

#### Returns

`Promise`<`string`\>

**`Throws`**

If a non Webp image is used

**`Throws`**

If a marker is invalid

#### Defined in

[index.ts:321](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L321)

___

### readXMP

▸ **readXMP**(`image`): `Promise`<`string`\>

Reads XMP metadata to an image Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original image Uint8Array. |

#### Returns

`Promise`<`string`\>

- The stringified XMP

**`Throws`**

If the XMP is invalid/ badly structured

**`Throws`**

If an unsupported image is used

#### Defined in

[index.ts:301](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L301)

___

### writeExif

▸ **writeExif**(`image`, `key`, `value`): `Promise`<`void`\>

Writes EXIF metadata to an image Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original image Uint8Array. |
| `key` | `string` | The EXIF key. |
| `value` | `string` | The EXIF value. |

#### Returns

`Promise`<`void`\>

- Updated Uint8Array.

**`Throws`**

NotImplemented

#### Defined in

[index.ts:164](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L164)

___

### writeJPGMarker

▸ **writeJPGMarker**(`image`, `value`, `marker?`): `Promise`<`Uint8Array`\>

Writes metadata to a JPG Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original JPG Uint8Array. |
| `value` | `string` | The metadata value. |
| `marker` | `number`[] | The jpg marker, defaults to COM. |

#### Returns

`Promise`<`Uint8Array`\>

- Updated Uint8Array.

**`Throws`**

If a non JPG image is used

**`Throws`**

If a marker is invalid

#### Defined in

[index.ts:96](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L96)

___

### writePNGtext

▸ **writePNGtext**(`image`, `key`, `value`, `mode?`): `Promise`<`Uint8Array`\>

Writes tEXt metadata to a PNG Uint8Array.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | `undefined` | The original PNG Uint8Array. |
| `key` | `string` | `undefined` | The metadata key. |
| `value` | `string` | `undefined` | The metadata value. |
| `mode` | `string` | `"tEXt"` | The encoding mode to use. Default = "tEXt". |

#### Returns

`Promise`<`Uint8Array`\>

- Updated Uint8Array.

**`Throws`**

If a non PNG image is used

**`Throws`**

If using an unsupported text mode

#### Defined in

[index.ts:29](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L29)

___

### writeWebpXMP

▸ **writeWebpXMP**(`image`, `value`): `Promise`<`any`\>

Writes metadata to a Webp Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original Webp Uint8Array. |
| `value` | `string` | The metadata value. |

#### Returns

`Promise`<`any`\>

- Updated Uint8Array.

**`Throws`**

If a non Webp image is used

**`Throws`**

If a marker is invalid

#### Defined in

[index.ts:141](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L141)

___

### writeXMP

▸ **writeXMP**(`image`, `value`): `Promise`<`any`\>

Writes XMP metadata to an image Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original image Uint8Array. |
| `value` | `string` | The XMP value. |

#### Returns

`Promise`<`any`\>

- Updated Uint8Array.

**`Throws`**

If the XMP is invalid/ badly structured

**`Throws`**

If an unsupported image is used

#### Defined in

[index.ts:183](https://github.com/FredHappyface/image-metadata-editor/blob/3ed1112/src/index.ts#L183)
