from fastapi import APIRouter

from backend.services.code_evaluator import (
    evaluate_code
)

router = APIRouter()

@router.post("/evaluate-code")
async def evaluate(data: dict):

    question = data.get("question")

    code = data.get("code")

    feedback = evaluate_code(
        question,
        code
    )

    return {
        "feedback": feedback
    }