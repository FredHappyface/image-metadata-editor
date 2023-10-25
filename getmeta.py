
from PIL import Image

def load_image(path: str) -> Image.Image:
	print(f"\n == Testing: {path}")
	img = Image.open(path)
	img.load()
	return img

img = load_image("./test/output.png")
print(img.info["TestKey"])

img = load_image("./test/output_zTXt.png")
print(img.info["TestKey"])

img = load_image("./test/output_xmp.png")
print(img.getxmp())

img = load_image("./test/output_com.jpg")
print(img.info["comment"])

img = load_image("./test/output_xmp.jpg")
print(img.getxmp())

img = load_image("./test/output_xmp.webp")
print(img.getxmp())
