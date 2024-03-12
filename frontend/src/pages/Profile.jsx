import {useSelector} from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg max-auto ">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <from className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 
          object-cover cursor-pointer self-center mt-2 "/>
          <input type="username" placeholder="username" className="border p-3 rounded-lg" />
          <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          name="email"
          // value={formData.email}
          // onChange={handleChange}
          // required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          // value={formData.password}
          // onChange={handleChange}
          // required
        />
        <button
          type="submit"
          className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75" >
        {/* //   disabled={loading}
        //   {loading ? "Signing in..." : "Sign In"} */}
        </button>
      </from>
    </div>
  )
}
