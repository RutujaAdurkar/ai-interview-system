from fastapi import APIRouter
from fastapi.responses import FileResponse

from backend.services.pdf_generator import (
    generate_pdf
)

router = APIRouter()

@router.post("/generate-report")
async def generate_report(data: dict):

    filename = "report.pdf"

    generate_pdf(data, filename)

    return FileResponse(
        filename,
        media_type='application/pdf',
        filename=filename
    )