
[![GitHub top language](https://img.shields.io/github/languages/top/FredHappyface/image-metadata-editor?style=for-the-badge&cacheSeconds=28800)](../../)
[![Issues](https://img.shields.io/github/issues/FredHappyface/image-metadata-editor?style=for-the-badge&cacheSeconds=28800)](../../issues)
[![License](https://img.shields.io/github/license/FredHappyface/image-metadata-editor?style=for-the-badge&cacheSeconds=28800)](/LICENSE.md)
[![Commit activity](https://img.shields.io/github/commit-activity/m/FredHappyface/image-metadata-editor?style=for-the-badge&cacheSeconds=28800)](../../commits/master)
[![Last commit](https://img.shields.io/github/last-commit/FredHappyface/image-metadata-editor?style=for-the-badge&cacheSeconds=28800)](../../commits/master)

<!-- omit in toc -->
# image-metadata-editor

<img src="readme-assets/icons/name.png" alt="Project Icon" width="750">

`image-metadata-editor`, is a JavaScript module that enables the addition of various types of metadata to image files, such as PNG and JPG. It includes functions for adding textual metadata (tEXt) to PNG images, metadata markers to JPG images, and XMP (Extensible Metadata Platform) metadata to both PNG and JPG images. Additionally, it offers a utility function for detecting the MIME type of an image file.

Here's a high-level description of the key functionalities and components of this module/library:

1. **Write tEXt Metadata to a PNG Image:**

   - Function: `writePNGtext`
   - Purpose: This function allows users to add textual metadata to PNG images. Textual metadata includes key-value pairs in a specific format.
   - Usage: Users provide the original PNG image, a key, a value, and an optional mode (e.g., "tEXt" or "zTXt"). The function checks if the image is a PNG, validates the text mode, and then adds the metadata to the image.

2. **Write Metadata Markers to a JPG Image:**

   - Function: `writeJPGMarker`
   - Purpose: This function is used for adding metadata markers to JPG images. Metadata markers can be used to add comments or other metadata to the image.
   - Usage: Users provide the original JPG image, the metadata value, and an optional marker (default is COM). The function checks if the image is a JPG and then inserts the metadata marker with the specified value.

3. **Write XMP Metadata to Images (PNG and JPG):**

   - Function: `writeXMP`
   - Purpose: This function is designed for adding XMP metadata to both PNG and JPG images. XMP is a standardized format for metadata, often used for detailed image metadata.
   - Usage: Users provide the original image and the XMP metadata as a well-structured XML document. The function checks the validity of the XMP XML, the image format, and then adds the XMP metadata to the image.

4. **Get the MIME Type of an Image:**

   - Function: `getMimeType`
   - Purpose: This utility function is used to detect the MIME type of an image based on its magic bytes. It can identify whether an image is a PNG, JPG, or another format.
   - Usage: Users provide the image as a `Uint8Array`, and the function returns the detected MIME type (e.g., "image/png", "image/jpeg") or null if the format is not recognized.

The library leverages other JavaScript libraries, such as `crc-32` for calculating CRC32 checksums, `fast-xml-parser` for XML validation, and `pako` for DEFLATE compression

`image-metadata-editor` simplifies the process of adding different types of metadata to image files and includes error handling to ensure that the image format is compatible with the chosen metadata type.

- [Documentation](#documentation)
- [Install With npm](#install-with-npm)
- [Download Project](#download-project)
	- [Clone](#clone)
		- [Using The Command Line](#using-the-command-line)
		- [Using GitHub Desktop](#using-github-desktop)
	- [Download Zip File](#download-zip-file)
- [Community Files](#community-files)
	- [Licence](#licence)
	- [Changelog](#changelog)
	- [Code of Conduct](#code-of-conduct)
	- [Contributing](#contributing)
	- [Security](#security)
	- [Support](#support)
	- [Rationale](#rationale)

See the documentation for each library for more information on things you
can use it for.

## Documentation

A high-level overview of how the documentation is organized organized will help you know
where to look for certain things:

- [Tutorials](/documentation/tutorials) take you by the hand through a series of steps to get
  started using the software. Start here if you’re new.
<!--
- The [Technical Reference](/documentation/reference) documents APIs and other aspects of the
  machinery. This documentation describes how to use the classes and functions at a lower level
  and assume that you have a good high-level understanding of the software. -->
<!--
- The [Help](/documentation/help) guide provides a starting point and outlines common issues that you
  may have.
-->

## Install With npm

```python
npm install image-metadata-editor
```

Head to https://www.npmjs.com/package/image-metadata-editor/ for more info

## Download Project

### Clone

#### Using The Command Line

1. Press the Clone or download button in the top right
2. Copy the URL (link)
3. Open the command line and change directory to where you wish to clone to
4. Type 'git clone' followed by URL in step 2
	```bash
	git clone https://github.com/FHPythonUtils/image-metadata-editor
	```

More information can be found at
https://help.github.com/en/articles/cloning-a-repository

#### Using GitHub Desktop

1. Press the Clone or download button in the top right
2. Click open in desktop
3. Choose the path for where you want and click Clone

More information can be found at
https://help.github.com/en/desktop/contributing-to-projects/cloning-a-repository-from-github-to-github-desktop

### Download Zip File

1. Download this GitHub repository
2. Extract the zip archive
3. Copy/ move to the desired location

## Community Files

### Licence

MIT License
Copyright (c) FredHappyface
(See the [LICENSE](/LICENSE.md) for more information.)

### Changelog

See the [Changelog](/CHANGELOG.md) for more information.

### Code of Conduct

Online communities include people from many backgrounds. The *Project*
contributors are committed to providing a friendly, safe and welcoming
environment for all. Please see the
[Code of Conduct](https://github.com/FHPythonUtils/.github/blob/master/CODE_OF_CONDUCT.md)
 for more information.

### Contributing

Contributions are welcome, please see the
[Contributing Guidelines](https://github.com/FHPythonUtils/.github/blob/master/CONTRIBUTING.md)
for more information.

### Security

Thank you for improving the security of the project, please see the
[Security Policy](https://github.com/FHPythonUtils/.github/blob/master/SECURITY.md)
for more information.

### Support

Thank you for using this project, I hope it is of use to you. Please be aware that
those involved with the project often do so for fun along with other commitments
(such as work, family, etc). Please see the
[Support Policy](https://github.com/FHPythonUtils/.github/blob/master/SUPPORT.md)
for more information.

### Rationale

The rationale acts as a guide to various processes regarding projects such as
the versioning scheme and the programming styles used. Please see the
[Rationale](https://github.com/FHPythonUtils/.github/blob/master/RATIONALE.md)
for more information.
