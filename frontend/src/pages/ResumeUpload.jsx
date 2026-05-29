import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

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
      alert(
        error?.response?.data?.detail ||
        "Resume upload failed. Please check the file and try again."
      )
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
      alert(
        error?.response?.data?.detail ||
        "Failed to generate questions. Please try again."
      )
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
    alert(
      error?.response?.data?.detail ||
      "Failed to generate coding questions. Please try again."
    )
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