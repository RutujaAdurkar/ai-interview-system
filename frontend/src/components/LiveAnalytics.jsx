import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

export default function LiveAnalytics({
  confidenceData,
  emotionData
}) {

  const emotionCount = {}

  emotionData.forEach((item) => {

    emotionCount[item.emotion] =
      (emotionCount[item.emotion] || 0) + 1
  })

  const pieData = Object.keys(
    emotionCount
  ).map((key) => ({
    name: key,
    value: emotionCount[key]
  }))

  return (

    <div className="grid grid-cols-2 gap-10 mt-10">

      {/* CONFIDENCE CHART */}
      <div className="glass p-6 rounded-3xl">

        <h2 className="text-2xl mb-5">
          Live Confidence
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={confidenceData}>

            <XAxis dataKey="question" />

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

      {/* EMOTION CHART */}
      <div className="glass p-6 rounded-3xl">

        <h2 className="text-2xl mb-5">
          Emotion Analysis
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >

              <Cell fill="#3B82F6" />
              <Cell fill="#10B981" />
              <Cell fill="#F59E0B" />
              <Cell fill="#EF4444" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}