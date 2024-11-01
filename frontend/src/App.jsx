import React from 'react'
import backgroundImage from './assets/backgroundImage.jpg';
function App() {

  return (
    <>
    {/* <h1 className="bg-slate-700">This is FrontEnd of FM project(This line is for Debugging)</h1>  */}
    <div
     className="bg-fixed bg-cover bg-center min-h-screen"
     style={{
      backgroundImage: `url(${backgroundImage})`,
     }}
    >
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <nav className="bg-green-100 bg-opacity-75 p-5">
        <ul className="flex justify-between text-orange-600 text-lg font-mono font-bold">
          <li className="mr-4"><a className="relative hover:border-b-4 hover:border-white transition duration-600" href="#Home">Home</a></li>
          <li className="mr-4"><a className="relative hover:border-b-4 hover:border-white transition duration-600" href="#About">About</a></li>
          <li className="mr-4"><a className="relative hover:border-b-4 hover:border-white transition duration-600" href="#Contact Us">Contact Us</a></li>
          <li className="mr-4"><a className="relative hover:border-b-4 hover:border-white transition duration-600" href="#Login/Signup">Login/Signup</a></li>
        </ul>
    </nav>
    </div>
    </>
  )
}

export default App
