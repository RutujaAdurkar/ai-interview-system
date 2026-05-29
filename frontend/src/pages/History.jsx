import { useEffect, useState } from "react"
import API from "../services/api"

export default function History() {

  const [history, setHistory] =
    useState([])

  useEffect(()=>{

    fetchHistory()

  },[])

  const fetchHistory = async () => {

    try {

      const response = await API.get(
        "/interview-history"
      )

      setHistory(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
        Interview History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {
          history.map((item,index)=>(

            <div
              key={index}
              className="glass p-6 rounded-3xl"
            >

              <h2 className="text-xl font-bold mb-3">

                {item.question}

              </h2>

              <p>
                Emotion:
                {item.emotion}
              </p>

              <p>
                Confidence:
                {item.confidenceScore}%
              </p>

            </div>
          ))
        }

      </div>
      </div>
    </div>
  )
}