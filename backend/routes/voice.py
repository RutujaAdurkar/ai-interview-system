from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from backend.services.text_to_speech import (
    generate_voice
)

router = APIRouter()

@router.post("/speak-question")
async def speak(data: dict):

    question = data.get("question")

    if not question or not str(question).strip():
        raise HTTPException(
            status_code=400,
            detail="No question text provided"
        )

    filename = "question.mp3"

    try:
        generate_voice(
            question,
            filename
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Text-to-speech failed: {exc}"
        )

    return FileResponse(
        filename,
        media_type="audio/mpeg",
        filename=filename
    )