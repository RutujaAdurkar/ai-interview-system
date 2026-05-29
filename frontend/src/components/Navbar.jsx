export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (
    <div className="bg-slate-900 p-5 rounded-2xl flex justify-between">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <h2>
        Welcome, {user?.name}
      </h2>

    </div>
  )
}