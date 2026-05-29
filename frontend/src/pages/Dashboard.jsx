// export default function Dashboard() {

//   const user = JSON.parse(
//     localStorage.getItem("user")
//   )

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-10">

//       <h1 className="text-4xl font-bold">
//         Welcome {user?.name}
//       </h1>

//     </div>
//   )
// }

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Dashboard() {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 p-4 sm:p-8">

        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

          <div className="glass p-6 rounded-3xl">
            <h2 className="text-xl font-bold">
              Total Interviews
            </h2>

            <p className="text-5xl mt-5 font-bold">
              12
            </p>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h2 className="text-xl font-bold">
              Confidence Score
            </h2>

            <p className="text-5xl mt-5 font-bold">
              82%
            </p>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h2 className="text-xl font-bold">
              Average Rating
            </h2>

            <p className="text-5xl mt-5 font-bold">
              8.5
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}