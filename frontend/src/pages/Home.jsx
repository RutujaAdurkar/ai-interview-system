import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-10">

      <h1 className="text-6xl font-bold text-center">

        AI Interview System

      </h1>

      <p className="text-slate-400 text-xl mt-6 text-center max-w-3xl">

        Practice AI-powered interviews with
        resume analysis, speech recognition,
        emotion detection, confidence analysis,
        and real-time AI feedback.

      </p>

      <div className="flex gap-6 mt-10">

        <button
          onClick={()=>navigate("/login")}
          className="bg-blue-600 px-8 py-4 rounded-2xl text-xl"
        >
          Login
        </button>

        <button
          onClick={()=>navigate("/signup")}
          className="bg-green-600 px-8 py-4 rounded-2xl text-xl"
        >
          Sign Up
        </button>

      </div>

    </div>
  )
}