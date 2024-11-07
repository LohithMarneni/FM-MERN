import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {server} from "../../main";
import useUserContext from '../../context/userContext';
// import toast from "react-hot-toast";
import axios from "axios";
function Login() {
  const {isAuthenticated,setIsAuthenticated,loader,setLoader}=useUserContext();
  useEffect(() => {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  }, [isAuthenticated]);
  const loginHandler=async(e)=>{
    e.preventDefault();
    setLoader(true);
    try{
      const {data}=await axios.post(`${server}/user/login`,{
        email:email,
        password:password,
      },
      {
        headers:{
          "Content-Type":"application/json",
         },
         withCredentials:true,
      });
      // toast.success(data.message);
      setIsAuthenticated(true);
      setLoader(false);
      // console.log("Success")
    } 
    catch(e){
      // toast.error(e.response?.data?.message || "An error occurred");
      console.log(e.response?.data?.message || "An error occurred");
      setIsAuthenticated(false);
      setLoader(false);
    }
  }

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-green-100 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md font-mono font-bold text-center ">
        <h2 className='text-2xl mb-6 text-white hover:text-orange-400'>Login Here</h2>
        <form autoComplete="on" className="space-y-6" onSubmit={loginHandler}>
          <div className="emailDiv relative">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="LoginForm w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900" 
              required 
              autoComplete="email"  
              placeholder='Email'
            />
            
          </div>
          <div className="passwordDiv relative">
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="LoginForm w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900" 
              required 
              autoComplete="password"
              placeholder='Password'
            />
            
          </div>
          <button type="submit" className="btn w-full bg-orange-200 text-green-900 py-2 rounded hover:bg-orange-600 hover:text-white">
            Sign in
          </button>
          <div className="text-center">
            <p className="text-white">
              Not a member? <Link to="/signup" className="text-white hover:underline">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
