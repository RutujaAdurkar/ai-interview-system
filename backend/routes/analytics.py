from fastapi import APIRouter
from backend.database.connection import db

router = APIRouter()

@router.get("/analytics-data")
async def analytics():

    interviews = list(
        db.interviews.find(
            {},
            {"_id":0}
        )
    )

    total_interviews = len(interviews)

    confidence_scores = []

    emotions = {}

    for item in interviews:

        # CONFIDENCE
        score = item.get(
            "confidenceScore",
            0
        )

        confidence_scores.append({
            "interview":
            len(confidence_scores) + 1,
            "score": score
        })

        # EMOTION
        emotion = item.get(
            "emotion",
            "neutral"
        )

        emotions[emotion] = (
            emotions.get(emotion, 0) + 1
        )

    emotion_data = []

    for key, value in emotions.items():

        emotion_data.append({
            "name": key,
            "value": value
        })

    avg_confidence = 0

    if total_interviews > 0:

        avg_confidence = sum(
            item.get("confidenceScore",0)
            for item in interviews
        ) / total_interviews

    return {
        "totalInterviews":
        total_interviews,

        "avgConfidence":
        round(avg_confidence,2),

        "confidenceData":
        confidence_scores,

        "emotionData":
        emotion_data
    }