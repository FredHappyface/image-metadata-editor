image-metadata-editor

# image-metadata-editor

## Table of contents

### Functions

- [getMimeType](README.md#getmimetype)
- [readPNGtext](README.md#readpngtext)
- [readWebpXMP](README.md#readwebpxmp)
- [readXMP](README.md#readxmp)
- [writeExif](README.md#writeexif)
- [writeJPGMarker](README.md#writejpgmarker)
- [writePNGtext](README.md#writepngtext)
- [writeWebpXMP](README.md#writewebpxmp)
- [writeXMP](README.md#writexmp)

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

[index.ts:210](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L210)

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

[index.ts:277](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L277)

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

[index.ts:351](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L351)

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

[index.ts:331](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L331)

___

### writeExif

▸ **writeExif**(`image`, `key`, `value`): `void`

Writes EXIF metadata to an image Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Blob` \| `Uint8Array` | The original image Uint8Array. |
| `key` | `string` | The EXIF key. |
| `value` | `string` | The EXIF value. |

#### Returns

`void`

- Updated Uint8Array.

**`Throws`**

NotImplemented

#### Defined in

[index.ts:160](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L160)

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

[index.ts:93](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L93)

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

[index.ts:26](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L26)

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

[index.ts:138](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L138)

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

[index.ts:179](https://github.com/FredHappyface/image-metadata-editor/blob/3ff895d/src/index.ts#L179)
