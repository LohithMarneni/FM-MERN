import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import useUserContext from '../../context/userContext';
import axios from 'axios';
import { server } from '../../main';
export default function Navbar() {
  const {isAuthenticated,setIsAuthenticated}=useUserContext();
  const logoutHandler=async(e)=>{
    try {
      // console.log("heyy");
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      // console.log("Heyy");
    setIsAuthenticated(false);
    toast.success("Logout Successful");
    <Navigate to="/login"/>
    }
    catch(e){
      console.log(e.response?.data?.message || "Logout failed");
      toast.error(e.response?.data?.message || "Logout failed");
    }
  }
  return (
    <div>
      <nav className="bg-green-100 bg-opacity-50 p-5">
        <ul className="flex justify-between text-orange-600 text-lg font-mono font-bold">
          <li className="mr-4"><NavLink 
            className={({ isActive }) =>
              `relative transition duration-600 ${
                isActive ? 'border-b-4 border-white' : 'hover:border-b-4 hover:border-white'
              }`
            }
            to="/">Home</NavLink></li>
          <li className="mr-4"><NavLink 
            className={({ isActive }) =>
              `relative transition duration-600 ${
                isActive ? 'border-b-4 border-white' : 'hover:border-b-4 hover:border-white'
              }`
            }
            to="/about">About</NavLink></li>
          <li className="mr-4"><NavLink 
            className={({ isActive }) =>
              `relative transition duration-600 ${
                isActive ? 'border-b-4 border-white' : 'hover:border-b-4 hover:border-white'
              }`
            }
            to="/contactus">Contact Us</NavLink>
          </li>
          {isAuthenticated?(<li className="mr-4">
              <button
                onClick={logoutHandler}
                className="relative hover:border-b-4 hover:border-white transition duration-600"
              >
                Logout
              </button>
            </li>
          ):
          (<li className="mr-4"><NavLink 
            className={({ isActive }) =>
              `relative transition duration-600 ${
                isActive ? 'border-b-4 border-white' : 'hover:border-b-4 hover:border-white'
              }`
            }
            to="/login">Login</NavLink></li>)}
          
          {/* <li className="mr-4"><NavLink className="relative hover:border-b-4 hover:border-white transition duration-600" to="/signup">SignUp</NavLink></li> */}
        </ul>
    </nav>
    
    </div>
  )
}
