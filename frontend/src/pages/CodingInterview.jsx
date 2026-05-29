import { useState } from "react"

import Editor from "@monaco-editor/react"

import API from "../services/api"

export default function CodingInterview() {

 const questions = JSON.parse(
  localStorage.getItem(
    "codingQuestions"
  )
) || []

const [currentQuestionIndex,
setCurrentQuestionIndex] =
useState(0)

const currentQuestion =
questions[currentQuestionIndex]

  const [code, setCode] = useState(
`def reverse_string(s):

    # Write your code here

    pass`
  )

  const [feedback, setFeedback] =
    useState("")

    const [output, setOutput] =
  useState("")

  const evaluateCode = async () => {

    try {

      const response = await API.post(
        "/evaluate-code",
        {
          question: currentQuestion,
          code
        }
      )

      setFeedback(
        response.data.feedback
      )

    } catch (error) {

      console.log(error)
    }
  }

const runCode = async () => {

  try {

const response = await API.post(
        "/run-code",
      {
        code
      }
    )

    if (response.data.error) {

      setOutput(
        response.data.error
      )

    } else {

      setOutput(
        response.data.output
      )
    }

  } catch (error) {

    console.log(error)
  }
}

const nextQuestion = () => {

  if (
    currentQuestionIndex <
    questions.length - 1
  ) {

    setCurrentQuestionIndex(
      prev => prev + 1
    )

    setCode("")

    setOutput("")

    setFeedback("")

  } else {

    alert(
      "Coding Interview Completed"
    )
  }
}

  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">

        AI Coding Interview

      </h1>
      <div className="mb-5 text-xl text-yellow-400">

  Question
  {currentQuestionIndex + 1}  
  / {questions.length}

</div> 

      {/* QUESTION */}
      <div className="glass p-6 rounded-3xl mb-10">

        <h2 className="text-2xl mb-4">
          Coding Question
        </h2>

        <p className="text-xl">
          {currentQuestion}
        </p>

      </div>

      {/* CODE EDITOR */}
      <div className="glass p-6 rounded-3xl">

        <Editor
          height="500px"
          defaultLanguage="python"
          value={code}
          onChange={(value)=>
            setCode(value)
          }
          theme="vs-dark"
        />

        <button
  onClick={runCode}
  className="bg-green-600 px-6 py-3 rounded-xl mt-6 mr-5"
>
  Run Code
</button>
<button
  onClick={nextQuestion}
  className="bg-purple-600 px-6 py-3 rounded-xl mt-6 mr-5"
>
  Next Question
</button>

        <button
          onClick={evaluateCode}
          className="bg-blue-600 px-6 py-3 rounded-xl mt-6"
        >
          Evaluate Code
        </button>

      </div>

      <div className="glass p-6 rounded-3xl mt-10">

  <h2 className="text-2xl mb-5">
    Output Console
  </h2>

  <div className="bg-black p-5 rounded-2xl min-h-[150px] whitespace-pre-wrap text-green-400">

    {output}

  </div>

</div>

      {/* FEEDBACK */}
      <div className="glass p-6 rounded-3xl mt-10">

        <h2 className="text-2xl mb-5">

          AI Feedback

        </h2>

        <div className="whitespace-pre-wrap">

          {feedback}

        </div>

      </div>
    </div>
  </div>
  )
}