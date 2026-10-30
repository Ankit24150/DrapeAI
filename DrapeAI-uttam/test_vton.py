from fashn_vton import TryOnPipeline
from PIL import Image

print("Loading FASHN model...")

pipeline = TryOnPipeline(
    weights_dir="./weights"
)

print("Model loaded!")

person = Image.open(
    "./inputs/person.jpeg"
).convert("RGB")

garment = Image.open(
    "./inputs/asd.jpg"
).convert("RGB")

print("Running virtual try-on...")

result = pipeline(
    person_image=person,
    garment_image=garment,
    category="tops",
)

result.images[0].save("./output.png")

print("Done!")
print("Result saved to: output.png")