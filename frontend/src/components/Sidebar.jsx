import {
  FaHome,
  FaUser,
  FaVideo,
  FaFileAlt,
  FaHistory,
  FaSignOutAlt,
  FaChartBar,
  FaCode
} from "react-icons/fa"

import { useNavigate } from "react-router-dom"

export default function Sidebar() {

  const navigate = useNavigate()

  const logout = () => {
 
    localStorage.clear()

    navigate("/")
  }

  return (
    <div className="w-full lg:w-[250px] h-auto lg:h-screen bg-slate-900 p-6">

      <h1 className="text-2xl font-bold mb-8 lg:mb-10">
        AI Interview
      </h1>

      <div className="space-y-5">

        <button
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
          Dashboard
        </button>

       <button
         onClick={()=>navigate("/profile")}
         className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
        <FaUser />
          Profile
        </button>

        <button
          onClick={() => navigate("/interview")}
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaVideo />
          Interviews
        </button>

        <button
          onClick={() => navigate("/resume")}
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaFileAlt />
          Resume
        </button>

        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaHistory />
          History
        </button>

        <button
          onClick={()=>navigate("/analytics")}
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaChartBar />
          Analytics
        </button>

        <button
          onClick={()=>navigate("/coding")}
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaCode />
          Coding Interview
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:bg-slate-800 p-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  )
}