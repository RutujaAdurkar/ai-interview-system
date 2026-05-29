import { useState } from "react"
import { signupUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await signupUser(formData)

      alert("Signup Successful")

      navigate("/")

    } catch (error) {

      const message = error?.response?.data?.detail || error?.message || "Signup Failed"
      // alert(message)
      alert(
  error?.response?.data?.detail ||
  error?.message ||
  "Signup Failed"
)

      console.error(error)

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="glass p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center mb-8">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-900 mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-900 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-900 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-3 rounded-xl"
        >
          Signup
        </button>

      </form>

    </div>
  )
}