import React from 'react'
import Navbar from "./components/Navbar/Navbar.jsx"
import backgroundImage from './assets/backgroundImage.jpg';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
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
    <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    <div className='relative z-10'>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
    </div>
    </>
  )
}

export default App
