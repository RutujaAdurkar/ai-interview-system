from fastapi import APIRouter, UploadFile, File
import shutil

from backend.services.eye_tracking import (
    detect_eye_contact
)

router = APIRouter()

@router.post("/eye-contact")
async def eye_contact(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = detect_eye_contact(file_path)

    return {
        "eye_contact": result
    }