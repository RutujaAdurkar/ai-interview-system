from fastapi import APIRouter

from backend.services.interview_storage import (
    save_interview
)

router = APIRouter()

@router.post("/save-interview")
async def save(data: dict):

    save_interview(data)

    return {
        "message":"Interview Saved"
    }


from backend.database.connection import db

@router.get("/interview-history")
async def history():

    interviews = list(
        db.interviews.find(
            {},
            {"_id":0}
        )
    )

    return interviews