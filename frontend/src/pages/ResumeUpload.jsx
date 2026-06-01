import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

const getErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred."

  const detail = error?.response?.data?.detail
  const message = error?.response?.data?.message || error?.message

  const formatObject = (obj) => {
    if (!obj) return ""
    if (typeof obj === "string") return obj
    if (typeof obj === "object") {
      if (obj.detail) return formatObject(obj.detail)
      if (obj.message) return formatObject(obj.message)
      if (obj.error) return formatObject(obj.error)
      return JSON.stringify(obj, null, 2)
    }
    return String(obj)
  }

  if (typeof detail === "string") return detail
  if (Array.isArray(detail)) {
    return detail.map((item) => formatObject(item)).join(" \n")
  }
  if (detail && typeof detail === "object") return formatObject(detail)
  if (message) return formatObject(message)

  return JSON.stringify(error, null, 2)
}

export default function ResumeUpload() {

  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const [skills, setSkills] = useState([])
  const [questions, setQuestions] = useState([])
  
  const [codingQuestions,
  setCodingQuestions] = useState([]) 
  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a resume PDF before uploading.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await API.post(
        "/upload-resume",
        formData
      )

      setSkills(response.data.skills)

      if (response.data.skills.length === 0) {
        alert("No skills were found in the uploaded resume. Try a different resume or add skills manually.")
      }
    } catch (error) {
      console.log(error)
      alert(getErrorMessage(error))
    }
  }

  const generateQuestions = async () => {
    if (skills.length === 0) {
      alert("Please upload a resume with extracted skills before generating questions.")
      return
    }

    try {
      const response = await API.post(
        "/generate-questions",
        {
          skills
        }
      )

      setQuestions(
        response.data.questions
      )

      if (response.data.questions.length === 0) {
        alert("No questions were generated. Try again later.")
      }
    } catch (error) {
      console.log(error)
      alert(getErrorMessage(error))
    }
  }

const generateCodingQuestions =
async () => {
  if (skills.length === 0) {
    alert("Please upload a resume with extracted skills before generating coding questions.")
    return
  }

  try {
    const response = await API.post(
      "/generate-coding-questions",
      {
        skills
      }
    )

    setCodingQuestions(
      response.data.questions
    )

    if (response.data.questions.length === 0) {
      alert("No coding questions were generated. Try again later.")
    }
  } catch (error) {
    console.log(error)
    alert(getErrorMessage(error))
  }
}

const startInterview = () => {
  if (questions.length === 0) {
    alert("Please generate interview questions before starting the interview.")
    return
  }

  localStorage.setItem(
    "questions",
    JSON.stringify(questions)
  )

  navigate("/interview")
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
        Upload Resume
      </h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-5 py-3 rounded-xl ml-5"
      >
        Upload
      </button>

      <button
  onClick={generateQuestions}
  className="bg-purple-600 px-5 py-3 rounded-xl ml-5"
>
  Generate Questions
</button>
<button
  onClick={generateCodingQuestions}
  className="bg-orange-600 px-5 py-3 rounded-xl ml-5"
>
  Generate Coding Questions
</button>

      <div className="mt-10">

        <h2 className="text-2xl mb-5">
          Extracted Skills
        </h2>

        <div className="flex gap-4 flex-wrap">

          {
            skills.map((skill,index)=>(
              <div
                key={index}
                className="bg-slate-800 px-4 py-2 rounded-xl"
              >
                {skill}
              </div>
            ))
          }

        </div>

      </div>

      <div className="mt-10">

  <h2 className="text-2xl mb-5">
    Generated Questions
  </h2>

  <div className="space-y-3">

    {
      questions.map((q,index)=>(

        <div
          key={index}
          className="bg-slate-800 p-4 rounded-xl"
        >

          {q}

        </div>
      ))
    }

  </div>

</div>

{
  questions.length > 0 && (

    <button
      onClick={startInterview}
      className="bg-green-600 px-6 py-3 rounded-xl mt-10"
    >
      Start Interview
    </button>

  )
}

{
  codingQuestions.length > 0 && (

    <button
      onClick={() => {

        localStorage.setItem(
          "codingQuestions",
          JSON.stringify(codingQuestions)
        )

        navigate("/coding")
      }}
      className="bg-green-600 px-6 py-3 rounded-xl mt-10"
    >
      Start Coding Interview
    </button>

  )
}

      </div>
    </div>
  )
}