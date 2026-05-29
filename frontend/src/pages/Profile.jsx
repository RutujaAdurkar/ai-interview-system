import { useState } from "react"

export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [name, setName] = useState(
    user?.name || ""
  )

  const [email] = useState(
    user?.email || ""
  )

  const [skills, setSkills] = useState([
    "React",
    "Python",
    "MongoDB"
  ])

  const [confidence] = useState(82)

  const [interviews] = useState(12)

  const saveProfile = () => {

    const updatedUser = {
      ...user,
      name
    }

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    )

    alert("Profile Updated")
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Profile
      </h1>

      <div className="grid grid-cols-3 gap-10">

        {/* LEFT CARD */}
        <div className="glass p-8 rounded-3xl flex flex-col items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-40 h-40 rounded-full mb-6"
          />

          <h2 className="text-3xl font-bold">
            {name}
          </h2>

          <p className="text-slate-400 mt-2">
            {email}
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-2 space-y-8">

          {/* PROFILE INFO */}
          <div className="glass p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-6">
              Profile Information
            </h2>

            <div className="space-y-5">

              <div>

                <label className="block mb-2">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e)=>
                    setName(e.target.value)
                  }
                  className="w-full p-4 rounded-xl bg-slate-900"
                />

              </div>

              <div>

                <label className="block mb-2">
                  Email
                </label>

                <input
                  type="text"
                  value={email}
                  disabled
                  className="w-full p-4 rounded-xl bg-slate-900"
                />

              </div>

              <button
                onClick={saveProfile}
                className="bg-blue-600 px-6 py-3 rounded-xl"
              >
                Save Profile
              </button>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-5">

            <div className="glass p-6 rounded-3xl">

              <h3 className="text-xl mb-4">
                Interviews
              </h3>

              <p className="text-4xl font-bold">
                {interviews}
              </p>

            </div>

            <div className="glass p-6 rounded-3xl">

              <h3 className="text-xl mb-4">
                Confidence
              </h3>

              <p className="text-4xl font-bold">
                {confidence}%
              </p>

            </div>

            <div className="glass p-6 rounded-3xl">

              <h3 className="text-xl mb-4">
                Skills
              </h3>

              <p className="text-2xl font-bold">
                {skills.length}
              </p>

            </div>

          </div>

          {/* SKILLS */}
          <div className="glass p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-6">
              Skills
            </h2>

            <div className="flex gap-4 flex-wrap">

              {
                skills.map((skill,index)=>(

                  <div
                    key={index}
                    className="bg-slate-800 px-5 py-3 rounded-xl"
                  >

                    {skill}

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}