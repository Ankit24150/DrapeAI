
from pathlib import Path
from time import perf_counter

import torch
from PIL import Image
from fashn_vton import TryOnPipeline

WEIGHTS_DIR = "./weights"
STEPS = 10

Path("outputs").mkdir(exist_ok=True)

print("Loading model onto GPU...")
pipeline = TryOnPipeline(
    weights_dir=WEIGHTS_DIR,
    device="cuda",
)
print("Model loaded. Ready for try-ons.")

count = 1

while True:
    person_path = input(
        "\nPerson image path (or q to quit): "
    ).strip().strip('"')

    if person_path.lower() == "q":
        break

    garment_path = input(
        "Garment image path: "
    ).strip().strip('"')

    category = input(
        "Category (tops/bottoms/one-pieces): "
    ).strip().lower()

    if category not in {"tops", "bottoms", "one-pieces"}:
        print("Invalid category.")
        continue

    if not Path(person_path).is_file():
        print(f"Person image not found: {person_path}")
        continue

    if not Path(garment_path).is_file():
        print(f"Garment image not found: {garment_path}")
        continue

    try:
        with Image.open(person_path) as im:
            person = im.convert("RGB")

        with Image.open(garment_path) as im:
            garment = im.convert("RGB")

        if torch.cuda.is_available():
            torch.cuda.synchronize()

        start = perf_counter()

        with torch.inference_mode():
            result = pipeline(
                person_image=person,
                garment_image=garment,
                category=category,
                num_samples=1,
                num_timesteps=STEPS,
                guidance_scale=1.5,
                skip_cfg_last_n_steps=1,
                seed=42,
                segmentation_free=True,
            )

        if torch.cuda.is_available():
            torch.cuda.synchronize()

        elapsed = perf_counter() - start

        output_path = Path("outputs") / f"fast_{count:03d}.png"
        result.images[0].save(output_path)

        print(f"Saved image: {output_path}")
        print(f"Inference time: {elapsed:.1f} seconds")

        count += 1

    except Exception as exc:
        print(f"Try-on failed: {exc}")

print("Exiting.")
