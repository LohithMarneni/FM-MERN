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
  <RouterProvider router={router} />
  </StrictMode>
)
