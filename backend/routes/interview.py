# from fastapi import APIRouter, HTTPException
# from backend.services.ai_generator import generate_questions

# router = APIRouter()

# @router.post("/generate-questions")
# async def generate(data: dict):

#     skills = data.get("skills")
#     if not skills:
#         raise HTTPException(
#             status_code=400,
#             detail="Skills are required to generate interview questions."
#         )

#     questions = generate_questions(skills)

#     return {
#         "questions": questions
#     }




from fastapi import APIRouter, HTTPException
from backend.services.ai_generator import (
    generate_coding_questions,
    generate_questions
)

router = APIRouter()

@router.post("/generate-questions")
async def generate(data: dict):

    skills = data.get("skills")
    if not skills:
        raise HTTPException(
            status_code=400,
            detail="Skills are required to generate interview questions."
        )

    try:
        questions = generate_questions(skills)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc)
        ) from exc

    return {
        "questions": questions
    }

@router.post("/generate-coding-questions")
async def generate_coding(data: dict):

    skills = data.get("skills")
    if not skills:
        raise HTTPException(
            status_code=400,
            detail="Skills are required to generate coding questions."
        )

    try:
        questions = generate_coding_questions(skills)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc)
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc)
        ) from exc

    return {
        "questions": questions
    }