import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="bg-green-100 bg-opacity-75 p-5">
        <ul className="flex justify-between text-orange-600 text-lg font-mono font-bold">
          <li className="mr-4"><Link className="relative hover:border-b-4 hover:border-white transition duration-600" to="/home">Home</Link></li>
          <li className="mr-4"><Link className="relative hover:border-b-4 hover:border-white transition duration-600" to="/about">About</Link></li>
          <li className="mr-4"><Link className="relative hover:border-b-4 hover:border-white transition duration-600" to="/contactus">Contact Us</Link></li>
          <li className="mr-4"><Link className="relative hover:border-b-4 hover:border-white transition duration-600" to="/login">Login</Link></li>
          {/* <li className="mr-4"><Link className="relative hover:border-b-4 hover:border-white transition duration-600" to="/signup">SignUp</Link></li> */}
        </ul>
    </nav>
    
    </div>
  )
}
