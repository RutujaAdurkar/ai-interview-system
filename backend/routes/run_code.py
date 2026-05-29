from fastapi import APIRouter

from backend.services.code_runner import (
    run_python_code
)

router = APIRouter()

@router.post("/run-code")
async def run_code(data: dict):

    code = data.get("code")

    result = run_python_code(code)

    return result