import React, { useEffect, useState } from 'react'
import Navbar from "./components/Navbar/Navbar.jsx"
import backgroundImage from './assets/backgroundImage.jpg';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import {UserContextProvider} from "./context/userContext.js";
import { server } from './main.jsx';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [user,setUser]=useState({});
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    setLoader(true);
    axios.get(`${server}/user/getme`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoader(false);
    }).catch((error)=>{
      toast.error(error.response.data.message);
      setUser({});
      setIsAuthenticated(false);
      setLoader(false);
    });
  },[]);
  return (
    <UserContextProvider value={
      {
        isAuthenticated,
        user,
        loader,
        setIsAuthenticated,
        setUser,
        setLoader
      }
    }>
    <div><Toaster/></div>
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
    </UserContextProvider>
  )
}

export default App
