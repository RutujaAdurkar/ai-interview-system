import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import AIAvatar from "../components/AIAvatar"
import LiveAnalytics from "../components/LiveAnalytics"

export default function Interview() {

  const navigate = useNavigate()

  const [questions] = useState(() => {
    const saved = localStorage.getItem("questions")
    if (!saved) return []
    try {
      return JSON.parse(saved) || []
    } catch {
      return []
    }
  })

  const [isRecording, setIsRecording] =
    useState(false)

  const [transcript, setTranscript] =
    useState("")

  const [emotion, setEmotion] =
    useState("")

  const [feedback, setFeedback] =
    useState("")

  const user = JSON.parse(
   localStorage.getItem("user")
  )

  const [eyeContact, setEyeContact] =
    useState("")

  const [currentQuestionIndex,
   setCurrentQuestionIndex] = useState(0)

   const currentQuestion =
  questions[currentQuestionIndex] || ""

  const hasQuestions = questions.length > 0

  const [confidenceScore, setConfidenceScore] =
     useState(0)

  const [timeLeft, setTimeLeft] =
   useState(30)

  const [isSpeaking, setIsSpeaking] =
   useState(false)

   const [liveConfidence, setLiveConfidence] =
  useState([])

const [liveEmotion, setLiveEmotion] =
  useState([])

const [questionProgress, setQuestionProgress] =
  useState([])

  const [cameraError, setCameraError] =
    useState("")

  const mediaRecorderRef = useRef(null)

  const audioChunksRef = useRef([])

  const webcamRef = useRef(null)

  const cameraStreamRef = useRef(null)

  const [allAnswers, setAllAnswers] =
  useState([])

useEffect(() => {

  if (timeLeft <= 0) {

    stopRecording()

    setTimeout(() => {

      setQuestionProgress(prev => [
  ...prev,
  {
    question:
      currentQuestionIndex + 1,
    completed: true
  }
])

      nextQuestion()

    }, 3000)

    return
  }

  const timer = setInterval(() => {

    setTimeLeft((prev) => prev - 1)

  }, 1000)

  return () => clearInterval(timer)

}, [timeLeft])

useEffect(() => {
  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      cameraStreamRef.current = stream

      if (webcamRef.current) {
        webcamRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Camera access failed", error)
      setCameraError(
        "Grant camera access so the interview camera can display."
      )
    }
  }

  enableCamera()

  return () => {
    const stream = cameraStreamRef.current
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }
}, [])

 useEffect(() => {

  speakQuestion()

  startRecording()

}, [currentQuestionIndex])

  // START RECORDING
  const startRecording = async () => {

    try {
      let audioStream

      if (
        cameraStreamRef.current &&
        cameraStreamRef.current.getAudioTracks().length > 0
      ) {
        audioStream = new MediaStream(
          cameraStreamRef.current.getAudioTracks()
        )
      } else {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
      }

      const mediaRecorder = new MediaRecorder(audioStream)

      mediaRecorderRef.current =
        mediaRecorder

      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start()

      setIsRecording(true)
    } catch (error) {
      console.log(error)
    }
  }

  // STOP RECORDING
  const stopRecording = async () => {
    try {
      if (!mediaRecorderRef.current) {
        return
      }

      mediaRecorderRef.current.stop()

      mediaRecorderRef.current.onstop =
        async () => {
          const audioBlob = new Blob(
            audioChunksRef.current,
            {
              type: "audio/webm"
            }
          )

          const formData = new FormData()

          formData.append(
            "file",
            audioBlob,
            "recording.webm"
          )

          const response = await API.post(
            "/speech-to-text",
            formData
          )

          setTranscript(
            response.data.transcript
          )
        }

      setIsRecording(false)
    } catch (error) {
      console.log(error)
    }
  }

  const captureImage = () => {
    if (!webcamRef.current) return null

    const video = webcamRef.current
    if (!video.videoWidth || !video.videoHeight) {
      return null
    }

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL("image/jpeg")
  }

  const evaluateAnswer = async () => {

  if (!transcript.trim()) {
    setFeedback(
      "Please record your answer before requesting evaluation."
    )
    return
  }

  try {

const response = await API.post(
        "/evaluate-answer",
      {
        question: currentQuestion,
        answer: transcript
      }
    )

    setFeedback(
      response.data.feedback
    )

  } catch (error) {

    console.log(error)
    setFeedback(
      error.response?.data?.detail ||
      "Evaluation failed. Please try again."
    )
  }
}

const detectEmotion = async () => {
    try {
      const imageSrc = captureImage()
      if (!imageSrc) {
        throw new Error("Camera image not available")
      }

      const blob = await fetch(imageSrc)
        .then(res => res.blob())

      const formData = new FormData()

      formData.append(
        "file",
        blob,
        "emotion.jpg"
      )

      const response = await API.post(
        "/detect-emotion",
        formData
      )

      setEmotion(
        response.data.emotion
      )

      setLiveEmotion(prev => [
        ...prev,
        {
          question:
            currentQuestionIndex + 1,
          emotion: response.data.emotion
        }
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const detectEyeContact = async () => {
    try {
      const imageSrc = captureImage()
      if (!imageSrc) {
        throw new Error("Camera image not available")
      }

      const blob = await fetch(imageSrc)
        .then(res => res.blob())

      const formData = new FormData()

      formData.append(
        "file",
        blob,
        "eye.jpg"
      )

      const response = await API.post(
        "/eye-contact",
        formData
      )

      setEyeContact(
        response.data.eye_contact
      )
    } catch (error) {
      console.log(error)
    }
  }
const generateConfidenceScore = () => {

  let score = 50

  if (
    emotion === "happy" ||
    emotion === "neutral"
  ) {
    score += 20
  }

  if (
    eyeContact ===
    "Eye Contact Detected"
  ) {
    score += 30
  }

  setConfidenceScore(score)

  setLiveConfidence(prev => [
  ...prev,
  {
    question:
      currentQuestionIndex + 1,
    score
  }
])
}

const downloadReport = async () => {

  try {

    const response = await API.post(
      "/generate-report",
      {
        Name: user?.name,
        Question: currentQuestion,
        Transcript: transcript,
        Emotion: emotion,
        "Eye Contact": eyeContact,
        "Confidence Score":
          `${confidenceScore}%`,
        Feedback: feedback
      },
      {
        responseType: "blob"
      }
    )

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      )

    const link =
      document.createElement("a")

    link.href = url

    link.setAttribute(
      "download",
      "AI_Interview_Report.pdf"
    )

    document.body.appendChild(link)

    link.click()

  } catch (error) {

    console.log(error)
  }
}

const saveInterview = async () => {

  try {

    await API.post(
      "/save-interview",
      {
        name: user?.name,
        email: user?.email,
        question: currentQuestion,
        transcript,
        feedback,
        emotion,
        eyeContact,
        confidenceScore
      }
    )

    alert("Interview Saved")

  } catch (error) {

    console.log(error)
  }
}

const nextQuestion = async () => {

  // SAVE CURRENT ANSWER
  await saveCurrentAnswer()

  // MOVE TO NEXT
  if (
    currentQuestionIndex <
    questions.length - 1
  ) {

    setCurrentQuestionIndex(
      prev => prev + 1
    )

    setTranscript("")

    setTimeLeft(30)

  } else {

    // FINAL PROCESS
    await finishInterview()
  }
}

const saveCurrentAnswer = async () => {

  const answerData = {
    question: currentQuestion,
    answer: transcript
  }

  setAllAnswers(prev => [
    ...prev,
    answerData
  ])
}

const finishInterview = async () => {

  alert("Interview Completed")

  try {

    await evaluateAnswer()

    await detectEmotion()

    await detectEyeContact()

    generateConfidenceScore()

    await saveInterview()

    await downloadReport()

  } catch (error) {

    console.log(error)
  }
}

const speakQuestion = async () => {

  try {

    setIsSpeaking(true)

    if (!currentQuestion || !currentQuestion.trim()) {
      throw new Error("No current question to speak")
    }

    const response = await API.post(
      "/speak-question",
      {
        question: currentQuestion
      },
      {
        responseType: "blob"
      }
    )

    const audioURL =
      URL.createObjectURL(response.data)

    const audio = new Audio(audioURL)

    audio.play()

    audio.onended = () => {

      setIsSpeaking(false)
    }

  } catch (error) {

    console.log(error)
  }
}
  if (!hasQuestions) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">
        <div className="max-w-3xl mx-auto glass p-8 rounded-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            No interview questions loaded
          </h1>
          <p className="text-slate-300 mb-6">
            Please upload your resume and generate questions on the Resume page before starting the interview.
          </p>
          <button
            onClick={() => navigate("/resume")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Go to Resume
          </button>
        </div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">

      <h1 className="text-4xl font-bold mb-6">
        AI Interview Room
      </h1>

      <div className="mb-5 text-xl text-yellow-400">
        Question {currentQuestionIndex + 1} / {questions.length}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="glass p-6 rounded-3xl">

          <h2 className="text-2xl mb-5">
            AI Question
          </h2>
 
          <div className="bg-slate-900 p-6 rounded-2xl text-xl">

            {currentQuestion}

          </div>

          <div className="mt-5 text-2xl font-bold text-yellow-400">

           Time Left: {timeLeft}s

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">

            <button
              onClick={startRecording}
              className="w-full bg-green-600 px-6 py-3 rounded-xl text-center"
            >
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              className="w-full bg-red-600 px-6 py-3 rounded-xl text-center"
            >
              Stop Recording
            </button>

            <button
              onClick={nextQuestion}
              className="bg-indigo-600 px-6 py-3 rounded-xl"
            >
              Next Question
            </button>

          </div>

          {
            isRecording &&
            <p className="mt-5 text-red-400">
              Recording...
            </p>
          }

        </div>

        {/* RIGHT */}
        <div className="glass p-6 rounded-3xl">

    <div className="hidden">

  <video
    ref={webcamRef}
    autoPlay
    muted
    playsInline
    className="w-full h-80 object-cover"
  />

</div>  

          {cameraError && ( 
            <p className="text-sm text-red-400 mb-4">
              {cameraError}
            </p>
          )}

          <AIAvatar isSpeaking={isSpeaking} />

          <LiveAnalytics
  confidenceData={liveConfidence}
  emotionData={liveEmotion}
/>

          <div className="mt-10">

            <h2 className="text-2xl mb-4">
              Transcript
            </h2>

            <div className="bg-slate-900 p-5 rounded-2xl min-h-[150px]">

              {transcript}

            </div>

          </div>
          <div className="mt-10">

             <h2 className="text-2xl mb-4">
                AI Feedback
             </h2>

            <div className="bg-slate-900 p-5 rounded-2xl whitespace-pre-wrap">

              {feedback}

            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl mb-4">
              Detected Emotion
            </h2>

            <div className="bg-slate-900 p-5 rounded-2xl">

             {emotion}

            </div>

          </div>

          <div className="mt-10">

  <h2 className="text-2xl mb-4">
    Eye Contact
  </h2>

  <div className="bg-slate-900 p-5 rounded-2xl">

    {eyeContact}

  </div>

</div>

<div className="mt-10">

  <h2 className="text-2xl mb-4">
    Confidence Score
  </h2>

  <div className="bg-slate-900 p-5 rounded-2xl text-3xl font-bold">

    {confidenceScore}%

  </div>

</div>

        </div>

      </div>
    </div>
    
  )
}