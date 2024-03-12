

import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className="bg-orange-500 shadow-md">
      <div className="flex justify-between items-center max-w-6xl max-auto p-3">
        <nav>
          <Link to="/">
            <h1 className="font-bold text-base sm:text-xl flex flex-wrap">
              <span className="text-slate-500">Asmare</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </Link>
        </nav>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <nav>
          <ul className="flex gap-4">
            <Link to="/" key="home">
              <li className="text-slate-700 hover:underline">Home</li>
            </Link>
            <Link to="/about" key="about">
              <li className="text-slate-700 hover:underline">About</li>
            </Link>
            <Link to="/profile" >
              {currentUser?(
                  <img className='rounded-full w-7 h-7 object-cover'
                  src={currentUser.avatar} alt="Profile Picture"/>
              ):(
                <li className="text-slate-700 hover:underline">Sign in</li>
              )}

          
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
