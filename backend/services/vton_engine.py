import cv2
import numpy as np
import time
import os
from pathlib import Path
from typing import Dict, Any, Optional

from backend.config import OUTPUT_DIR, DEFAULT_TARGET_WIDTH, DEFAULT_TARGET_HEIGHT
from backend.services.pose_detector import PoseDetectorService
from backend.services.garment_warper import GarmentWarperService

class VTONEngine:
    """
    Virtual Try-On (VTON) Core Engine.
    Executes body detection, garment warping, lighting integration, and image synthesis.
    """
    def __init__(self):
        self.pose_detector = PoseDetectorService()
        self.garment_warper = GarmentWarperService()

    def process_tryon(
        self,
        person_img_path: str,
        garment_img_path: str,
        garment_type: str = "top",
        color_variant: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Main entry point for running a Virtual Try-On request.
        """
        start_time = time.time()

        # 1. Load Images
        person_bgr = cv2.imread(person_img_path)
        if person_bgr is None:
            raise ValueError(f"Could not load person image from {person_img_path}")

        garment_bgra = cv2.imread(garment_img_path, cv2.IMREAD_UNCHANGED)
        if garment_bgra is None:
            raise ValueError(f"Could not load garment image from {garment_img_path}")

        # Standardize target canvas size if image is overly large
        ph, pw, _ = person_bgr.shape
        if pw > 1200 or ph > 1600:
            scale = 1200.0 / pw
            person_bgr = cv2.resize(person_bgr, (1200, int(ph * scale)), interpolation=cv2.INTER_AREA)
            ph, pw, _ = person_bgr.shape

        # 2. Extract Body Landmarks & Pose
        pose_info = self.pose_detector.detect_landmarks(person_bgr)

        # 3. Warp Garment to Match Torso & Pose
        warped_garment, warped_mask = self.garment_warper.warp_garment_to_pose(
            garment_bgra,
            person_bgr.shape,
            pose_info,
            garment_type=garment_type
        )

        # Optional Color Variant Modification
        if color_variant:
            warped_garment = self._apply_color_variant(warped_garment, color_variant)

        # 4. Blend Garment seamlessly onto Person Image
        result_bgr = self._blend_garment(person_bgr, warped_garment, warped_mask)

        # 5. Save Generated Output
        timestamp = int(time.time() * 1000)
        output_filename = f"tryon_result_{timestamp}.jpg"
        output_filepath = os.path.join(OUTPUT_DIR, output_filename)
        cv2.imwrite(output_filepath, result_bgr)

        processing_time = round(time.time() - start_time, 3)

        return {
            "status": "success",
            "output_filename": output_filename,
            "output_filepath": output_filepath,
            "processing_time_seconds": processing_time,
            "canvas_size": {"width": pw, "height": ph},
            "pose_detected": pose_info.get("has_mediapipe", True)
        }

    def _blend_garment(self, person_bgr: np.ndarray, warped_garment: np.ndarray, mask: np.ndarray) -> np.ndarray:
        """
        Blends the warped garment onto the person's photo with smooth edge anti-aliasing.
        """
        # Normalize alpha mask to range 0.0 - 1.0
        alpha = cv2.GaussianBlur(mask, (7, 7), 0).astype(float) / 255.0
        alpha = np.clip(alpha, 0.0, 1.0)
        alpha_3d = np.repeat(alpha[:, :, np.newaxis], 3, axis=2)

        # Perform alpha composition
        person_float = person_bgr.astype(float)
        garment_float = warped_garment.astype(float)

        blended = (garment_float * alpha_3d) + (person_float * (1.0 - alpha_3d))
        return np.clip(blended, 0, 255).astype(np.uint8)

    def _apply_color_variant(self, garment_bgr: np.ndarray, hex_color: str) -> np.ndarray:
        """
        Adjusts garment hue/saturation while preserving original shadows and folds.
        """
        try:
            hsv = cv2.cvtColor(garment_bgr, cv2.COLOR_BGR2HSV)
            # Simple tint shift implementation
            hex_color = hex_color.lstrip("#")
            r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
            
            # Convert target RGB to HSV target hue
            target_hsv = cv2.cvtColor(np.uint8([[[b, g, r]]]), cv2.COLOR_BGR2HSV)[0][0]
            
            hsv[:, :, 0] = target_hsv[0] # Set Hue
            hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.2, 0, 255) # Slightly boost saturation
            
            return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        except Exception as e:
            print(f"[VTONEngine] Color tint warning: {e}")
            return garment_bgr
