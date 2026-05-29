def detect_emotion(image_path):

    try:
        from deepface import DeepFace
    except Exception as e:
        raise ImportError(
            "DeepFace import failed. This usually means TensorFlow 2.21+ requires the tf-keras package. "
            "Install it with `pip install tf-keras` or downgrade TensorFlow to a compatible version."
        ) from e

    try:
        result = DeepFace.analyze(
            img_path=image_path,
            actions=['emotion'],
            enforce_detection=False
        )
    except Exception as e:
        raise RuntimeError(
            "Emotion detection failed. Check that TensorFlow and DeepFace are compatible, "
            "and that tf-keras is installed."
        ) from e

    emotion = result[0]['dominant_emotion']

    return emotion