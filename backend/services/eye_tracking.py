import cv2
import mediapipe as mp
import os

# Lazy initialization to handle Windows subprocess spawning issues
_face_detector = None

def _initialize_face_detector():
    global _face_detector
    if _face_detector is None:
        try:
            # Use the new MediaPipe Tasks API
            vision = mp.tasks.vision
            base_options = mp.tasks.BaseOptions(model_asset_path=None)
            options = vision.FaceDetectorOptions(base_options=base_options)
            _face_detector = vision.FaceDetector.create_from_options(options)
        except Exception as e:
            print(f"Error initializing MediaPipe Face Detector: {e}")
            raise

    return _face_detector

def detect_eye_contact(image_path):
    try:
        image = cv2.imread(image_path)
        if image is None:
            return "No Eye Contact"

        # Convert BGR to RGB
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Create MediaPipe Image object
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_image)
        
        # Get face detector
        face_detector = _initialize_face_detector()
        detection_result = face_detector.detect(mp_image)
        
        # Check if faces were detected
        if detection_result.detections:
            return "Eye Contact Detected"
        else:
            return "No Eye Contact"
    except Exception as e:
        print(f"Error in detect_eye_contact: {e}")
        return "No Eye Contact"