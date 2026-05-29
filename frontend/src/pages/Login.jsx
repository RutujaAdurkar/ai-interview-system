import { useState } from "react"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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

      const response = await loginUser(formData)

      localStorage.setItem(
        "token",
        response.data.token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      alert("Login Successful")

      navigate("/dashboard")

    } 
    // catch (error) {

    //   alert("Login Failed")

    //   console.log(error)

    // }
    catch (error) {

  console.log(error)

  console.log(error.response)

  alert(
    error?.response?.data?.detail ||
    error?.message ||
    "Login Failed"
  )

}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="glass p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          AI Interview
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to continue
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-900 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-900 mb-6"
        />

        <button
          className="w-full bg-blue-600 p-3 rounded-xl"
        >
          Login
        </button>

      </form>

    </div>
  )
}