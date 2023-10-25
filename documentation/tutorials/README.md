
# Tutorial: Writing Metadata to Image Files

In this tutorial, you'll learn how to use image-medatadata-editorP to add different types of metadata to image files.

## Prerequisites

Before you get started, make sure you have the following:

- Node.js installed on your system.
- A basic understanding of JavaScript and image file formats like PNG and JPG.

## Step 1: Setup

1. Create a new directory for your project and navigate to it in your terminal.

2. Initialize a new Node.js project by running the following command:

   ```bash
   npm init -y
   ```

3. Install the required npm packages by running:

   ```bash
   npm install image-metadata-editor
   ```

4. Create a JavaScript file, e.g., `metadata.js`, and copy the provided code into it.

## Step 2: Writing tEXt Metadata to a PNG

The `writePNGtext` function allows you to write tEXt metadata to a PNG image. Here's how to use it:

```javascript
import fs from "fs";
import { writeJPGMarker, writePNGtext, writeXMP } from "../src/index.js";

// Read the PNG image
const imageBuffer = fs.readFileSync('your_image.png');

// Add tEXt metadata
const updatedImage = writePNGtext(imageBuffer, 'Title', 'A beautiful sunset');
fs.writeFileSync('updated_image.png', updatedImage);
console.log('tEXt metadata added to the PNG image.');

```

Replace `'your_image.png'` with the path to your PNG image.

## Step 3: Writing Metadata Markers to a JPG

The `writeJPGMarker` function allows you to write metadata markers to a JPG image. Here's how to use it:

```javascript
import fs from "fs";
import { writeJPGMarker, writePNGtext, writeXMP } from "../src/index.js";

// Read the JPG image
const imageBuffer = fs.readFileSync('your_image.jpg');

// Add metadata marker
const updatedImage = writeJPGMarker(imageBuffer, 'A comment in the image');
fs.writeFileSync('updated_image.jpg', updatedImage);
console.log('Metadata marker added to the JPG image.');

```

Replace `'your_image.jpg'` with the path to your JPG image.

## Step 4: Writing XMP Metadata to Images

The `writeXMP` function allows you to write XMP metadata to both PNG and JPG images. Here's how to use it:

```javascript
import fs from "fs";
import { writeJPGMarker, writePNGtext, writeXMP, getMimeType } from "../src/index.js";

// Read the image
const imageBuffer = fs.readFileSync('your_image.png'); // Replace with your image file

// Check the MIME type of the image
const mimeType = getMimeType(imageBuffer);

// Define your XMP metadata
const xmpMetadata = `
<x:xmpmeta xmlns:x="adobe:ns:meta/">
	<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
	<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
		<dc:title>Your Title</dc:title>
		<dc:description>Your Description</dc:description>
	</rdf:Description>
	</rdf:RDF>
</x:xmpmeta>
`;

try {
// Add XMP metadata to the image
const updatedImage = writeXMP(imageBuffer, xmpMetadata);
fs.writeFileSync('updated_image.png', updatedImage); // Adjust the file extension
console.log('XMP metadata added to the image.');
} catch (error) {
console.error(error.message);
}

```

Replace `'your_image.png'` with the path to your image and adjust the XMP metadata as needed.

## Step 5: Run the Code

To run the code, execute the appropriate command in your terminal, depending on the specific functionality you want to use. The code will update the image file with the metadata, and you can verify the changes in the updated image file.

Keep in mind that XMP metadata should be well-structured XML data, so ensure that the content of your XMP metadata adheres to the XML format and any specific requirements of your use case.
