import cv2
import numpy as np
from typing import Dict, Any, Tuple

class GarmentWarperService:
    """
    Handles scaling, rotation, perspective warping, and alpha blending
    for draping garments realistically over estimated body poses.
    """
    
    @staticmethod
    def extract_garment_and_mask(garment_img_bgra: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Extracts RGB garment image and binary transparency mask.
        Supports RGBA PNGs and auto-background subtraction for JPGs.
        """
        if garment_img_bgra.shape[2] == 4:
            b, g, r, alpha = cv2.split(garment_img_bgra)
            garment_bgr = cv2.merge([b, g, r])
            mask = alpha
        else:
            garment_bgr = garment_img_bgra.copy()
            # Generate mask based on non-white background
            gray = cv2.cvtColor(garment_bgr, cv2.COLOR_BGR2GRAY)
            _, mask = cv2.threshold(gray, 245, 255, cv2.THRESH_BINARY_INV)
            
            # Smooth mask edges
            mask = cv2.GaussianBlur(mask, (5, 5), 0)

        return garment_bgr, mask

    def warp_garment_to_pose(
        self,
        garment_img: np.ndarray,
        person_shape: Tuple[int, int, int],
        pose_info: Dict[str, Any],
        garment_type: str = "top"
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        Warps and aligns the garment image onto target person dimensions using keypoints.
        """
        p_h, p_w, _ = person_shape
        garment_bgr, g_mask = self.extract_garment_and_mask(garment_img)
        gh, gw, _ = garment_bgr.shape

        ls = pose_info["keypoints"]["left_shoulder"]
        rs = pose_info["keypoints"]["right_shoulder"]
        lh = pose_info["keypoints"]["left_hip"]
        rh = pose_info["keypoints"]["right_hip"]

        target_shoulder_w = pose_info["shoulder_width"]
        target_torso_h = pose_info["torso_height"]
        s_center = pose_info["shoulder_center"]

        # Calculate scale factors based on shoulder width and torso height
        scale_x = (target_shoulder_w * 1.5) / float(gw)
        scale_y = (target_torso_h * 1.3) / float(gh)

        new_gw = int(max(gw * scale_x, 20))
        new_gh = int(max(gh * scale_y, 20))

        # Resize garment and mask
        resized_g = cv2.resize(garment_bgr, (new_gw, new_gh), interpolation=cv2.INTER_AREA)
        resized_mask = cv2.resize(g_mask, (new_gw, new_gh), interpolation=cv2.INTER_AREA)

        # Calculate rotation angle based on shoulder slope
        dx = rs[0] - ls[0]
        dy = rs[1] - ls[1]
        angle_deg = np.degrees(np.arctan2(dy, dx))

        # Rotate garment to match user pose inclination
        M_rot = cv2.getRotationMatrix2D((new_gw // 2, new_gh // 2), angle_deg, 1.0)
        rotated_g = cv2.warpAffine(resized_g, M_rot, (new_gw, new_gh), flags=cv2.INTER_LINEAR)
        rotated_mask = cv2.warpAffine(resized_mask, M_rot, (new_gw, new_gh), flags=cv2.INTER_LINEAR)

        # Canvas positioning
        warped_garment = np.zeros((p_h, p_w, 3), dtype=np.uint8)
        warped_mask = np.zeros((p_h, p_w), dtype=np.uint8)

        # Center top of garment slightly above shoulder center
        top_left_x = s_center[0] - (new_gw // 2)
        top_left_y = s_center[1] - int(new_gh * 0.15)

        # Calculate overlap boundaries inside person canvas
        start_x_g = max(0, -top_left_x)
        start_y_g = max(0, -top_left_y)
        end_x_g = min(new_gw, p_w - top_left_x)
        end_y_g = min(new_gh, p_h - top_left_y)

        start_x_c = max(0, top_left_x)
        start_y_c = max(0, top_left_y)
        end_x_c = min(p_w, top_left_x + new_gw)
        end_y_c = min(p_h, top_left_y + new_gh)

        if end_x_g > start_x_g and end_y_g > start_y_g:
            warped_garment[start_y_c:end_y_c, start_x_c:end_x_c] = rotated_g[start_y_g:end_y_g, start_x_g:end_x_g]
            warped_mask[start_y_c:end_y_c, start_x_c:end_x_c] = rotated_mask[start_y_g:end_y_g, start_x_g:end_x_g]

        return warped_garment, warped_mask
