import sys
from pathlib import Path

if __package__ in (None, ""):
    package_root = Path(__file__).resolve().parents[1]
    sys.path.insert(0, str(package_root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.resume import router as resume_router
from backend.routes.interview import router as interview_router
from backend.routes.audio import router as audio_router
from backend.routes.auth import router as auth_router
from backend.routes.evaluation import (
    router as evaluation_router
)
from backend.routes.emotion import (
    router as emotion_router
)
from backend.routes.eye_contact import (
    router as eye_router
)
from backend.routes.report import (
    router as report_router
)
from backend.routes.save_interview import (
    router as save_router
)
from backend.routes.voice import (
    router as voice_router
)
from backend.routes.coding import (
    router as coding_router
)
from backend.routes.run_code import (
    router as run_router
)
from backend.routes.analytics import (
    router as analytics_router
)

app = FastAPI()

app.include_router(interview_router)
app.include_router(audio_router)
app.include_router(evaluation_router)
app.include_router(emotion_router)
app.include_router(eye_router)
app.include_router(report_router)
app.include_router(save_router)
app.include_router(voice_router)
app.include_router(coding_router)
app.include_router(run_router)
app.include_router(analytics_router)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message":"Backend Running"
    }