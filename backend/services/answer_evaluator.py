import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
import os

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
model = genai.GenerativeModel(model_name)

def _fallback_evaluate(question, answer):
    if not answer:
        return (
            "Fallback evaluation: No answer was provided. "
            "Please answer the question before requesting a review."
        )

    score = 5
    answer_lower = answer.lower()
    if any(term in answer_lower for term in ["hooks", "state", "effect", "context", "reducer"]):
        score = 8
    elif any(term in answer_lower for term in ["react", "use", "component"]):
        score = 6

    return (
        f"Fallback evaluation due to AI service unavailability.\n"
        f"Score: {score}/10\n"
        "Technical Feedback: The answer contains some relevant React concepts, "
        "but may be incomplete or lack examples.\n"
        "Communication Feedback: The response is understandable, "
        "but should be more concise and structured.\n"
        "Improvement Tips: Add a sentence about the main use cases for React Hooks "
        "and how to avoid common pitfalls."
    )


def evaluate_answer(question, answer):

    if not os.getenv("GEMINI_API_KEY"):
        return _fallback_evaluate(question, answer)

    prompt = f"""
    You are an AI interviewer.

    Interview Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the answer.

    Give:
    1. Score out of 10
    2. Technical Feedback
    3. Communication Feedback
    4. Improvement Tips

    Keep response professional.
    """

    try:
        response = model.generate_content(prompt)
    except google_exceptions.ResourceExhausted as exc:
        return _fallback_evaluate(question, answer)
    except google_exceptions.GoogleAPICallError as exc:
        return _fallback_evaluate(question, answer)
    except Exception as exc:
        return _fallback_evaluate(question, answer)

    return response.text