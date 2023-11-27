[image-metadata-editor](../README.md) / utils

# Module: utils

## Table of contents

### Functions

- [cast2Uint8Array](utils.md#cast2uint8array)
- [typeCheck](utils.md#typecheck)

## Functions

### cast2Uint8Array

▸ **cast2Uint8Array**(`blob`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blob` | `Blob` \| `Uint8Array` | The image as a Blob or Uint8Array. |

#### Returns

`Promise`<`Uint8Array`\>

- The image as a Uint8Array

**`Throws`**

- if the arg is an invalid type

#### Defined in

[utils.ts:8](https://github.com/FredHappyface/image-metadata-editor/blob/4bc11cc/src/utils.ts#L8)

___

### typeCheck

▸ **typeCheck**(`elem`, `types`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elem` | `any` | {any} |
| `types` | `any`[] | {any[]} |

#### Returns

`void`

#### Defined in

[utils.ts:22](https://github.com/FredHappyface/image-metadata-editor/blob/4bc11cc/src/utils.ts#L22)
