from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from backend.services.emotion_detector import detect_emotion

router = APIRouter()

@router.post("/detect-emotion")
async def emotion_detection(
    file: UploadFile = File(...)
):

    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        emotion = detect_emotion(file_path)
    except (ImportError, RuntimeError) as exc:
        return {
            "emotion": "unavailable",
            "error": str(exc)
        }
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Unexpected emotion detection error."
        ) from exc

    return {
        "emotion": emotion
    }