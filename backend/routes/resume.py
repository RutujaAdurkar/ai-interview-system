
from fastapi import APIRouter, HTTPException, UploadFile, File
import shutil
import os
import PyPDF2

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

SKILLS = [
    "python",
    "java",
    "react",
    "mongodb",
    "fastapi",
    "machine learning",
    "sql",
    "javascript",
    "html",
    "css"
]

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Resume upload must be a PDF file."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""

    try:
        with open(file_path, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail="Unable to read the uploaded PDF. Please upload a valid PDF resume."
        ) from exc

    extracted_skills = []
    lower_text = text.lower()

    for skill in SKILLS:
        if skill in lower_text:
            extracted_skills.append(skill)

    return {
        "filename": file.filename,
        "skills": extracted_skills,
        "resume_text": text[:1000]
    }