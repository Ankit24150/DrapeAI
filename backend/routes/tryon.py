from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Request
from typing import Optional
import os
import uuid
import shutil
from pathlib import Path

from backend.config import UPLOAD_DIR, GARMENTS_DIR, OUTPUT_DIR
from backend.services.vton_engine import VTONEngine
from backend.routes.garments import load_catalog

router = APIRouter(prefix="/api/v1/try-on", tags=["Virtual Try-On"])

vton_engine = VTONEngine()

@router.post("")
async def execute_tryon(
    request: Request,
    person_image: UploadFile = File(..., description="User full-body or upper-body photo"),
    garment_id: Optional[str] = Form(None, description="Catalog ID of garment (e.g. g-001)"),
    garment_image: Optional[UploadFile] = File(None, description="Direct custom garment upload image"),
    garment_type: str = Form("top", description="Garment category: top, bottom, dress, outerwear"),
    color_hex: Optional[str] = Form(None, description="Optional hex tint override e.g. #FF0000")
):
    """
    Executes real-time Virtual Try-On draping requested by frontend.
    """
    # 1. Save uploaded person image
    person_filename = f"user_{uuid.uuid4().hex[:8]}_{person_image.filename}"
    person_filepath = UPLOAD_DIR / person_filename
    with open(person_filepath, "wb") as buffer:
        shutil.copyfileobj(person_image.file, buffer)

    # 2. Determine garment source
    garment_filepath = None
    garment_title = "Custom Garment"

    if garment_image and garment_image.filename:
        g_filename = f"custom_g_{uuid.uuid4().hex[:8]}_{garment_image.filename}"
        garment_filepath = UPLOAD_DIR / g_filename
        with open(garment_filepath, "wb") as buffer:
            shutil.copyfileobj(garment_image.file, buffer)
    elif garment_id:
        catalog = load_catalog()
        matched = next((g for g in catalog if g["id"] == garment_id), None)
        if not matched:
            raise HTTPException(status_code=404, detail=f"Garment ID {garment_id} not found in catalog")
        
        garment_title = matched["title"]
        garment_type = matched.get("category", garment_type)
        # Convert web relative URL to local file path
        rel_img_name = Path(matched["image_url"]).name
        garment_filepath = GARMENTS_DIR / rel_img_name

    if not garment_filepath or not os.path.exists(garment_filepath):
        # Create a default fallback garment image if catalog sample file does not exist on disk
        garment_filepath = GARMENTS_DIR / "sample_shirt.png"
        if not os.path.exists(garment_filepath):
            _create_default_sample_garment(garment_filepath)

    # 3. Run VTON Engine
    try:
        result = vton_engine.process_tryon(
            person_img_path=str(person_filepath),
            garment_img_path=str(garment_filepath),
            garment_type=garment_type,
            color_variant=color_hex
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Virtual Try-On engine error: {str(e)}")

    # 4. Construct response URL
    base_url = str(request.base_url).rstrip("/")
    result_url = f"{base_url}/static/output/{result['output_filename']}"

    return {
        "status": "success",
        "result_image_url": result_url,
        "processing_time_seconds": result["processing_time_seconds"],
        "garment_title": garment_title,
        "canvas_size": result["canvas_size"],
        "pose_detected": result["pose_detected"]
    }

def _create_default_sample_garment(filepath: Path):
    """Generates a default PNG garment image for testing out-of-the-box."""
    import numpy as np
    import cv2
    img = np.zeros((400, 400, 4), dtype=np.uint8)
    # Draw simple shirt shape on transparent canvas
    cv2.rectangle(img, (100, 100), (300, 350), (220, 150, 50, 255), -1) # Blue torso
    cv2.rectangle(img, (40, 100), (100, 200), (200, 130, 40, 255), -1)  # Left sleeve
    cv2.rectangle(img, (300, 100), (360, 200), (200, 130, 40, 255), -1) # Right sleeve
    cv2.ellipse(img, (200, 100), (40, 20), 0, 0, 180, (0, 0, 0, 0), -1)  # Collar cutout
    cv2.imwrite(str(filepath), img)
