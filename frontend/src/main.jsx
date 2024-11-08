import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createRoutesFromChildren,createBrowserRouter, Route,RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import AboutMe from './components/AboutMe/AboutMe.jsx'
import ContactUs from './components/ContactUs/ContactUs.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
export const server="http://localhost:4000/api/v1";
const router=createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<App/>}>
        <Route index element={<Home />} /> 
        <Route path="about" element={<AboutMe/>}/>
        <Route path="contactus" element={<ContactUs/>}/>
        <Route path="Login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>  
        <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2 times toast is coming because of this strictmode.This commonly happens in development mode when using React's strict mode, which intentionally runs components twice on initial render to help detect side effects.  */}
  <RouterProvider router={router} />
  </StrictMode>
)
