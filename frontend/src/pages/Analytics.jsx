import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts"
import API from "../services/api"

export default function Analytics() {
  const [analytics,
setAnalytics] = useState(null) 

  useEffect(() => {

  fetchAnalytics()

}, [])

const fetchAnalytics = async () => {

  try {

    const response = await API.get("/analytics-data")

    setAnalytics(response.data)

  } catch (error) {

    console.log(error)
  }
}

if (!analytics) {

  return (
    <div className="text-white p-10">

      Loading Analytics...

    </div>
  )
}
  return (

    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">
          Analytics Dashboard
        </h1>

      {/* TOP STATS */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="glass p-6 rounded-3xl">

          <h2 className="text-xl mb-4">
            Total Interviews
          </h2>

          <p className="text-5xl font-bold">
            {analytics.totalInterviews}
          </p>

        </div>

        <div className="glass p-6 rounded-3xl">

          <h2 className="text-xl mb-4">
            Avg Confidence
          </h2>

          <p className="text-5xl font-bold">
            {analytics.avgConfidence}%
          </p>

        </div>

        <div className="glass p-6 rounded-3xl">

          <h2 className="text-xl mb-4">
            Best Skill
          </h2>

          <p className="text-3xl font-bold">
            Python
          </p>

        </div>

        <div className="glass p-6 rounded-3xl">

          <h2 className="text-xl mb-4">
            AI Rating
          </h2>

          <p className="text-5xl font-bold">
            8.8
          </p>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LINE CHART */}
        <div className="glass p-6 rounded-3xl">

          <h2 className="text-2xl font-bold mb-6">
            Confidence Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={analytics.confidenceData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="interview" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}
        <div className="glass p-6 rounded-3xl">

          <h2 className="text-2xl font-bold mb-6">
            Emotion Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={analytics.emotionData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />
                <Cell fill="#EF4444" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="glass p-6 rounded-3xl col-span-2">

          <h2 className="text-2xl font-bold mb-6">
            Skill Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={skillData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="skill" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#8B5CF6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
      </div>
    </div>
  )
} 