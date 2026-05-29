from fastapi import APIRouter, HTTPException

from backend.services.answer_evaluator import (
    evaluate_answer
)

router = APIRouter()

@router.post("/evaluate-answer")
async def evaluate(data: dict):

    question = data.get("question")
    answer = data.get("answer")

    if not question or not answer:
        raise HTTPException(
            status_code=400,
            detail="Both question and answer are required."
        )

    feedback = evaluate_answer(
        question,
        answer
    )

    return {
        "feedback": feedback
    }