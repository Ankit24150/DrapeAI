import cv2
import numpy as np
from typing import Dict, Any, Tuple, Optional
import mediapipe as mp

class PoseDetectorService:
    """
    Detects human body landmarks (shoulders, chest, hips, arms) from images
    to guide garment deformation and positioning in DrapeAI.
    """
    def __init__(self):
        self.has_mediapipe = False
        try:
            if hasattr(mp, "solutions") and hasattr(mp.solutions, "pose"):
                self.mp_pose = mp.solutions.pose
                self.pose = self.mp_pose.Pose(
                    static_image_mode=True,
                    model_complexity=1,
                    enable_segmentation=True,
                    min_detection_confidence=0.5
                )
                self.has_mediapipe = True
                self.legacy_mode = True
            elif hasattr(mp, "tasks") and hasattr(mp.tasks, "vision"):
                self.has_mediapipe = True
                self.legacy_mode = False
        except Exception as e:
            print(f"[PoseDetector] MediaPipe notice: {e}")
            self.has_mediapipe = False

    def detect_landmarks(self, image_bgr: np.ndarray) -> Dict[str, Any]:
        """
        Extracts keypoint coordinates for upper body & torso fitting.
        """
        h, w, _ = image_bgr.shape
        landmarks = {}
        segmentation_mask = None

        if self.has_mediapipe and getattr(self, "legacy_mode", False):
            try:
                image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
                results = self.pose.process(image_rgb)
                if results.pose_landmarks:
                    mp_lm = results.pose_landmarks.landmark
                    def get_pt(idx):
                        lm = mp_lm[idx]
                        return (int(lm.x * w), int(lm.y * h), lm.visibility)

                    landmarks = {
                        "left_shoulder": get_pt(self.mp_pose.PoseLandmark.LEFT_SHOULDER),
                        "right_shoulder": get_pt(self.mp_pose.PoseLandmark.RIGHT_SHOULDER),
                        "left_elbow": get_pt(self.mp_pose.PoseLandmark.LEFT_ELBOW),
                        "right_elbow": get_pt(self.mp_pose.PoseLandmark.RIGHT_ELBOW),
                        "left_wrist": get_pt(self.mp_pose.PoseLandmark.LEFT_WRIST),
                        "right_wrist": get_pt(self.mp_pose.PoseLandmark.RIGHT_WRIST),
                        "left_hip": get_pt(self.mp_pose.PoseLandmark.LEFT_HIP),
                        "right_hip": get_pt(self.mp_pose.PoseLandmark.RIGHT_HIP),
                        "nose": get_pt(self.mp_pose.PoseLandmark.NOSE),
                    }
                    if results.segmentation_mask is not None:
                        segmentation_mask = (results.segmentation_mask * 255).astype(np.uint8)
            except Exception as e:
                print(f"[PoseDetector] Legacy process note: {e}")

        # Contour & computer vision torso keypoint extraction
        if not landmarks or "left_shoulder" not in landmarks:
            landmarks, segmentation_mask = self._estimate_torso_contour(image_bgr)

        ls = landmarks["left_shoulder"]
        rs = landmarks["right_shoulder"]
        lh = landmarks["left_hip"]
        rh = landmarks["right_hip"]

        shoulder_center = ((ls[0] + rs[0]) // 2, (ls[1] + rs[1]) // 2)
        hip_center = ((lh[0] + rh[0]) // 2, (lh[1] + rh[1]) // 2)
        shoulder_width = int(np.sqrt((rs[0] - ls[0]) ** 2 + (rs[1] - ls[1]) ** 2))
        torso_height = int(np.sqrt((hip_center[0] - shoulder_center[0]) ** 2 + (hip_center[1] - shoulder_center[1]) ** 2))

        return {
            "keypoints": landmarks,
            "shoulder_center": shoulder_center,
            "hip_center": hip_center,
            "shoulder_width": max(shoulder_width, 50),
            "torso_height": max(torso_height, 80),
            "segmentation_mask": segmentation_mask,
            "has_mediapipe": self.has_mediapipe
        }

    def _estimate_torso_contour(self, image_bgr: np.ndarray) -> Tuple[Dict[str, Tuple[int, int, float]], np.ndarray]:
        """
        Uses OpenCV silhouette and contour analysis to detect torso landmarks.
        """
        h, w, _ = image_bgr.shape
        gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        _, thresh = cv2.threshold(blur, 240, 255, cv2.THRESH_BINARY_INV)

        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if contours:
            c = max(contours, key=cv2.contourArea)
            x, y, cw, ch = cv2.boundingRect(c)
            ls = (int(x + cw * 0.2), int(y + ch * 0.22), 1.0)
            rs = (int(x + cw * 0.8), int(y + ch * 0.22), 1.0)
            lh = (int(x + cw * 0.25), int(y + ch * 0.65), 1.0)
            rh = (int(x + cw * 0.75), int(y + ch * 0.65), 1.0)
            nose = (int(x + cw * 0.5), int(y + ch * 0.1), 1.0)
            mask = np.zeros((h, w), dtype=np.uint8)
            cv2.drawContours(mask, [c], -1, 255, -1)
        else:
            ls = (int(w * 0.30), int(h * 0.25), 1.0)
            rs = (int(w * 0.70), int(h * 0.25), 1.0)
            lh = (int(w * 0.35), int(h * 0.60), 1.0)
            rh = (int(w * 0.65), int(h * 0.60), 1.0)
            nose = (int(w * 0.50), int(h * 0.12), 1.0)
            mask = None

        return {
            "left_shoulder": ls,
            "right_shoulder": rs,
            "left_hip": lh,
            "right_hip": rh,
            "nose": nose
        }, mask

