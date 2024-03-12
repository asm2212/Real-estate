import {useSelector} from "react-redux";
import { useRef } from "react";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg max-auto ">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <from className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 
          object-cover cursor-pointer self-center mt-2 "/>
          <input type="text" placeholder="Username" className="border p-3 rounded-lg" />
          <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          // value={formData.email}
          // onChange={handleChange}
          // required
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          // value={formData.password}
          // onChange={handleChange}
          // required
        />
        <button
          type="submit"
          className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75" >
        update
        </button>
      </from>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">delete the account</span>
        <span className="text-red-700 cursor-pointer">signout</span>
      </div>
    </div>
  )
}
