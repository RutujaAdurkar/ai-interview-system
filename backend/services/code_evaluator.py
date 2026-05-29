import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
import os

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Use environment variable for model selection and fall back to a supported default
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
model = genai.GenerativeModel(MODEL_NAME)


def evaluate_code(question, code):

    prompt = f"""
    Coding Interview Question:
    {question}

    Candidate Code:
    {code}

    Evaluate:
    1. Correctness
    2. Code Quality
    3. Optimization
    4. Best Practices

    Give score out of 10
    and improvement suggestions.
    """

    try:
        response = model.generate_content(prompt)
    except google_exceptions.NotFound as exc:
        raise RuntimeError(
            f"AI model '{MODEL_NAME}' was not available. Update GEMINI_MODEL to a supported model name."
        ) from exc
    except google_exceptions.GoogleAPICallError as exc:
        raise RuntimeError("AI service returned an error while evaluating code.") from exc

    return response.text