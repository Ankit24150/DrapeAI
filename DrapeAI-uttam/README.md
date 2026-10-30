# Virtual Try-On AI

A small local project for trying clothes on a person photo using **FASHN
VTON v1.5**. Give it a photo of a person and a garment image, and it
generates a new image showing the person wearing the garment.

This README focuses on running the project on Windows with VS Code.

## What it does

-   Try on tops, bottoms, or one-piece outfits
-   Use `.jpg`, `.jpeg`, `.png`, or `.webp` images
-   Run inference locally on a supported NVIDIA GPU
-   Save generated results to the `outputs` folder

## Requirements

-   Windows 10 or 11
-   Python 3.11 recommended
-   Git
-   NVIDIA GPU recommended for faster generation
-   Enough disk space for the Python environment and model weights
    (around 2 GB for the main model files)

Performance depends on your hardware. Lower sampling steps can be
faster, but may reduce image quality.

## Setup on Windows

Open the project folder in VS Code, then open a PowerShell terminal in
that folder.

### 1. Create and activate a virtual environment

``` powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can use this for the current
terminal session:

``` powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### 2. Install the project

``` powershell
python -m pip install --upgrade pip
pip install -e .
```

### 3. Download model weights

``` powershell
python scripts/download_weights.py --weights-dir ./weights
```

The weights are downloaded separately and are not included in this
repository.

## Add your images

Create a folder named `my_images` in the project root. Put your images
inside it, for example:

``` text
my_images/
├── person.jpg
└── shirt.jpg
```

-   `person.jpg`: a clear photo of the person
-   `shirt.jpg`: the garment you want to try on

The file extensions and names in the command must match your actual
files.

## Generate a try-on image

Run this from the project root:

``` powershell
python examples/basic_inference.py --weights-dir ./weights --person-image my_images/person.jpg --garment-image my_images/shirt.jpg --category tops
```

Choose the category that matches the garment:

  Category       Use for
  -------------- ------------------------------------
  `tops`         T-shirts, shirts, blouses, jackets
  `bottoms`      Pants, shorts, skirts
  `one-pieces`   Dresses and jumpsuits

The generated image is saved in:

``` text
outputs/output_00.png
```

Open the result from PowerShell:

``` powershell
start outputs\output_00.png
```

## Generate faster

You can reduce the number of sampling steps with `--num-timesteps`. For
example:

``` powershell
python examples/basic_inference.py --weights-dir ./weights --person-image my_images/person.jpg --garment-image my_images/shirt.jpg --category tops --num-timesteps 10
```

Fewer steps usually means faster generation, but image quality may drop.
The actual speed depends on the GPU, image inputs, and model setup;
under 30 seconds is not guaranteed on every computer.

To see all command-line options:

``` powershell
python examples/basic_inference.py --help
```

## Troubleshooting

**Image not found**

Check the folder and exact filename:

``` powershell
Get-ChildItem .\my_images
```

**Check that the NVIDIA GPU is detected**

``` powershell
nvidia-smi
```

**Check whether PyTorch can use CUDA**

``` powershell
python -c "import torch; print(torch.cuda.is_available()); print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CUDA GPU not available')"
```

**Output image is overwritten**

The basic example may reuse `outputs/output_00.png` on each run. Rename
or copy the image if you want to keep a previous result.

## Notes

-   This project uses the FASHN VTON v1.5 model. Check the upstream
    project and model terms before redistributing weights or using
    generated results commercially.
-   Model weights are downloaded separately.
-   A clear, well-lit person photo and a garment image that shows the
    clothing clearly usually make a better starting point.

## Credits

Built using [FASHN VTON
v1.5](https://github.com/fashn-AI/fashn-vton-1.5).

See the upstream repository for model details, licenses, and updates.
