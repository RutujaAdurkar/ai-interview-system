from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from backend.services.speech_to_text import (
    transcribe_audio
)

router = APIRouter()

@router.post("/speech-to-text")
async def speech_to_text(
    file: UploadFile = File(...)
):

    if not file or not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Audio file is required."
        )

    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = transcribe_audio(file_path)

    return {
        "transcript": text
    }