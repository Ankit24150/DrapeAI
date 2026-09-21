from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import List, Optional
import os
import uuid
import shutil
import json
from pathlib import Path
from pydantic import BaseModel

from backend.config import GARMENTS_DIR

router = APIRouter(prefix="/api/v1/garments", tags=["Garments Catalog"])

# Metadata store path
CATALOG_DB_PATH = GARMENTS_DIR / "catalog.json"

class GarmentItem(BaseModel):
    id: str
    title: str
    category: str  # top, bottom, dress, outerwear
    image_url: str
    price: Optional[float] = 29.99
    available_colors: Optional[List[str]] = ["#000000", "#FFFFFF", "#FF0000", "#0000FF"]

def load_catalog() -> List[dict]:
    if not CATALOG_DB_PATH.exists():
        # Seed initial sample catalog if empty
        default_catalog = [
            {
                "id": "g-001",
                "title": "Classic White Oxford Shirt",
                "category": "top",
                "image_url": "/static/garments/sample_shirt.png",
                "price": 45.00,
                "available_colors": ["#FFFFFF", "#000000", "#1D4ED8", "#DC2626"]
            },
            {
                "id": "g-002",
                "title": "Casual Denim Jacket",
                "category": "outerwear",
                "image_url": "/static/garments/sample_jacket.png",
                "price": 89.99,
                "available_colors": ["#1D4ED8", "#1E293B", "#64748B"]
            },
            {
                "id": "g-003",
                "title": "Summer Floral Dress",
                "category": "dress",
                "image_url": "/static/garments/sample_dress.png",
                "price": 65.00,
                "available_colors": ["#F43F5E", "#EAB308", "#8B5CF6"]
            }
        ]
        with open(CATALOG_DB_PATH, "w") as f:
            json.dump(default_catalog, f, indent=2)
        return default_catalog

    with open(CATALOG_DB_PATH, "r") as f:
        return json.load(f)

def save_catalog(catalog: List[dict]):
    with open(CATALOG_DB_PATH, "w") as f:
        json.dump(catalog, f, indent=2)

@router.get("", response_model=List[GarmentItem])
def get_garment_catalog(category: Optional[str] = None):
    """
    Returns list of all available garments in the catalog.
    Optionally filter by category (e.g. ?category=top).
    """
    catalog = load_catalog()
    if category:
        catalog = [item for item in catalog if item["category"].lower() == category.lower()]
    return catalog

@router.get("/{garment_id}", response_model=GarmentItem)
def get_garment_by_id(garment_id: str):
    """
    Returns specific garment details by ID.
    """
    catalog = load_catalog()
    for item in catalog:
        if item["id"] == garment_id:
            return item
    raise HTTPException(status_code=404, detail="Garment not found")

@router.post("", response_model=GarmentItem)
async def upload_new_garment(
    title: str = Form(...),
    category: str = Form("top"),
    price: float = Form(29.99),
    garment_image: UploadFile = File(...)
):
    """
    Uploads a new garment image into the DrapeAI catalog.
    """
    garment_id = f"g-{uuid.uuid4().hex[:8]}"
    file_ext = Path(garment_image.filename).suffix or ".png"
    filename = f"{garment_id}{file_ext}"
    target_path = GARMENTS_DIR / filename

    with open(target_path, "wb") as buffer:
        shutil.copyfileobj(garment_image.file, buffer)

    new_item = {
        "id": garment_id,
        "title": title,
        "category": category,
        "image_url": f"/static/garments/{filename}",
        "price": price,
        "available_colors": ["#000000", "#FFFFFF"]
    }

    catalog = load_catalog()
    catalog.append(new_item)
    save_catalog(catalog)

    return new_item
