# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# load_dotenv()

# genai.configure(
#     api_key=os.getenv("GEMINI_API_KEY")
# )

# # Use a supported Gemini model name for the current API version.
# model = genai.GenerativeModel(
#     "gemini-2.5-flash"
# )

# def generate_questions(skills):

#     prompt = f"""
#     Generate 10 technical interview questions
#     for these skills:

#     {skills}

#     Return only questions.
#     """

#     response = model.generate_content(prompt)

#     return response.text




import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(os.getenv("GEMINI_MODEL", "gemini-2.5-flash"))

def _normalize_skills(skills):
    if isinstance(skills, str):
        skills_list = [skills.strip()]
    elif isinstance(skills, (list, tuple)):
        skills_list = [str(s).strip() for s in skills if str(s).strip()]
    else:
        skills_list = [str(skills).strip()]

    if not skills_list:
        raise ValueError("Skills must be provided to generate questions.")

    return skills_list


def _clean_questions(text, max_questions=10):
    questions = [q.strip() for q in text.splitlines() if q.strip()]
    clean_questions = [q.replace("*", "") for q in questions if len(q) > 5]
    return clean_questions[:max_questions]


def _fallback_questions(skills_list, coding=False):
    questions = []
    for skill in skills_list:
        if coding:
            questions.extend([
                f"Write a function or program that uses {skill} to solve a real-world problem.",
                f"Describe an algorithm or code pattern you would use when working with {skill}.",
                f"What are common performance pitfalls when building applications with {skill}?"
            ])
        else:
            questions.extend([
                f"Explain the main use cases of {skill}.",
                f"Describe a real-world project where {skill} is an important technology.",
                f"What are the biggest challenges when working with {skill}, and how do you solve them?"
            ])
    return questions[:10]


def generate_questions(skills):
    skills_list = _normalize_skills(skills)

    prompt = f"""
    Generate 10 unique technical interview questions.

    Skills:
    {', '.join(skills_list)}

    Rules:
    - Questions must be technical
    - Questions must be related to skills
    - All questions must be different
    - Return only questions
    - One question per line
    """

    try:
        response = model.generate_content(prompt)
        questions = _clean_questions(response.text)
    except google_exceptions.ResourceExhausted as exc:
        return _fallback_questions(skills_list, coding=False)
    except google_exceptions.GoogleAPICallError as exc:
        return _fallback_questions(skills_list, coding=False)
    except google_exceptions.NotFound as exc:
        raise RuntimeError(
            "AI model is not available. Check GEMINI_MODEL and your Google AI configuration."
        ) from exc

    return questions or _fallback_questions(skills_list, coding=False)


def generate_coding_questions(skills):
    skills_list = _normalize_skills(skills)

    prompt = f"""
    Generate 10 coding interview questions.

    Skills:
    {', '.join(skills_list)}

    Rules:
    - Questions must be coding/programming based
    - Questions should include DSA and development
    - Return only questions
    - One question per line
    """

    try:
        response = model.generate_content(prompt)
        questions = _clean_questions(response.text)
    except google_exceptions.ResourceExhausted as exc:
        return _fallback_questions(skills_list, coding=True)
    except google_exceptions.GoogleAPICallError as exc:
        return _fallback_questions(skills_list, coding=True)
    except google_exceptions.NotFound as exc:
        raise RuntimeError(
            "AI model is not available. Check GEMINI_MODEL and your Google AI configuration."
        ) from exc

    return questions or _fallback_questions(skills_list, coding=True)
