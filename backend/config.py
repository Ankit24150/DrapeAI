import os
from pathlib import Path

# Base Directory
BASE_DIR = Path(__file__).resolve().parent

# Data & Asset Directories
DATA_DIR = BASE_DIR / "data"
UPLOAD_DIR = DATA_DIR / "uploads"
GARMENTS_DIR = DATA_DIR / "garments"
OUTPUT_DIR = DATA_DIR / "output"

# Create directories if they don't exist
for folder in [DATA_DIR, UPLOAD_DIR, GARMENTS_DIR, OUTPUT_DIR]:
    os.makedirs(folder, exist_ok=True)

# CORS Settings
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
    "*"
]

# Backend Server Host & Port
HOST = "0.0.0.0"
PORT = 8000

# VTON Settings
DEFAULT_TARGET_WIDTH = 768
DEFAULT_TARGET_HEIGHT = 1024
