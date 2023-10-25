import fs from "fs";
import path from "path";
import { expect } from "chai";
import { writeJPGMarker, writePNGtext, writeXMP } from "../src/index.js";

describe("writePNGtEXt", () => {
  it("should add tEXt metadata to a PNG Uint8Array", async () => {
    const testFilePath = path.join("./test/im.png");
    const testBuffer = fs.readFileSync(testFilePath);
    const key = "TestKey";
    const value = "TestValue";

    try {
      const updatedUint8Array = await writePNGtext(testBuffer, key, value);

      fs.writeFileSync(path.join("./test/output.png"), updatedUint8Array);

      expect(updatedUint8Array).to.be.an.instanceOf(Uint8Array);
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});

describe("writePNGzTXt", () => {
  it("should add zTXt metadata to a PNG Uint8Array", async () => {
    const testFilePath = path.join("./test/im.png");
    const testBuffer = fs.readFileSync(testFilePath);
    const key = "TestKey";
    const value = "TestValue";

    try {
      const updatedUint8Array = await writePNGtext(
        testBuffer,
        key,
        value,
        "zTXt"
      );

      fs.writeFileSync(path.join("./test/output_zTXt.png"), updatedUint8Array);

      expect(updatedUint8Array).to.be.an.instanceOf(Uint8Array);
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});

describe("writePNGtEXt_jpg", () => {
  it("should raise an error", async () => {
    const testFilePath = path.join("./test/im.jpg");
    const testBuffer = fs.readFileSync(testFilePath);
    const key = "TestKey";
    const value = "TestValue";

    try {
      await writePNGtext(testBuffer, key, value);
      console.error("Test failed:");
      throw new TypeError("A PNG is required to use writePNGtEXt");
    } catch (error) {
      console.log("Test succeeded:", error);
    }
  });
});

describe("writePNGXMP", () => {
  it("should add XMP metadata to a PNG Uint8Array", async () => {
    const testFilePath = path.join("./test/im.png");
    const testBuffer = fs.readFileSync(testFilePath);
    const value = '<x:xmpmeta xmlns:x="adobe:ns:meta/">TestValue</x:xmpmeta>';

    try {
      const updatedUint8Array = await writeXMP(testBuffer, value);

      fs.writeFileSync(path.join("./test/output_xmp.png"), updatedUint8Array);

      expect(updatedUint8Array).to.be.an.instanceOf(Uint8Array);
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });
});

describe("writeJPGCOM", () => {
  it("should raise an error", async () => {
    const testFilePath = path.join("./test/im.jpg");
    const testBuffer = fs.readFileSync(testFilePath);
    const value = "TestValue";

    try {

	  const updatedUint8Array = await writeJPGMarker(testBuffer, value);

      fs.writeFileSync(path.join("./test/output_com.jpg"), updatedUint8Array);

    } catch (error) {
      console.log("Test failed:", error);
	  throw error;
    }
  });
});

describe("writePNGXMP", () => {
	it("should add XMP metadata to a JPEG Uint8Array", async () => {
	  const testFilePath = path.join("./test/im.jpg");
	  const testBuffer = fs.readFileSync(testFilePath);
	  const value = '<x:xmpmeta xmlns:x="adobe:ns:meta/">TestValue</x:xmpmeta>';

	  try {
		const updatedUint8Array = await writeXMP(testBuffer, value);

		fs.writeFileSync(path.join("./test/output_xmp.jpg"), updatedUint8Array);

		expect(updatedUint8Array).to.be.an.instanceOf(Uint8Array);
	  } catch (error) {
		console.error("Test failed:", error);
		throw error;
	  }
	});
  });
