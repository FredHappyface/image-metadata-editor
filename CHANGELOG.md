# Changelog

All major and minor version changes will be documented in this file. Details of
patch-level version changes can be found in [commit messages](../../commits/master).

## 2023.1 - 2023/10/27

- Rebase on Typescript
- Quality and type safety improvements
- Support Blobs in addition to Uint8Arrays with internal function `cast2Uint8Array`
- Addition of following public functions:
	- [readPNGtext](README.md#readpngtext)
	- [readWebpXMP](README.md#readwebpxmp)
	- [readXMP](README.md#readxmp)
- Use `typedoc` with `typedoc-plugin-markdown` to generate technical docs
- Remove `babel` and `rollup` as this is not used
- Extend package.json "scripts"

## 2023 - 2023/10/25

- Initial version of `image-metadata-editor` providing the following public functions:
	- [getMimeType](README.md#getmimetype)
	- [writeJPGMarker](README.md#writejpgmarker)
	- [writePNGtext](README.md#writepngtext)
	- [writeWebpXMP](README.md#writewebpxmp)
	- [writeXMP](README.md#writexmp)
