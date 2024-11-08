import React, { useState } from 'react'
import useUserContext from '../../context/userContext';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loader,setLoader}=useUserContext();
  const signupHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try{
      const {data}=await axios.post(`${server}/user/register`,{username:name,email:email,password:password},{
        headers:{
         "Content-Type":"application/json",
        },
        withCredentials:true,
       });
      toast.success(data.message);
      console.log("Login Successful");
      setIsAuthenticated(true);
      setLoader(false);
    }
    catch(e){
      toast.error(error.response?.data?.message|| "An error occurred");
      // console.log(e.response.data.message);
      // console.log(e)
      setIsAuthenticated(false);
      setLoader(false);
    }
  }
  if(isAuthenticated)
    return <Navigate to={"/"}/>
  return (
    <div className="signUp flex justify-center mt-5 h-2/3">
      <div className="bg-green-100 bg-opacity-10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md font-mono font-bold text-center">
        <h2 className='text-2xl mb-6 text-white hover:text-orange-400'>SignUp</h2>
        <form onSubmit={signupHandler} autoComplete="on" className="space-y-6" >
          <div className="nameDiv relative">
            <input type="text" value={name}
              className="signUpForm w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900"
              onChange={(e) => setName(e.target.value)} placeholder='Name' required autoComplete="name"  />
          </div>
          <div className="emailDiv relative">
            <input type="email" placeholder='Email' value={email}
              className="signUpForm w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900" 
              onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div className="passwordDiv relative">
            <input type="password" placeholder='Password' value={password}
              className="signUpForm w-full px-4 py-2 rounded bg-green-100 bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-500 placeholder:text-green-900"
              onChange={(e) => setPassword(e.target.value)} required autoComplete="password"/>
          </div>

          <button type='submit' className="btn w-full bg-orange-200 text-green-900 py-2 rounded hover:bg-orange-600 hover:text-white"  disabled={loader}>Sign Up</button>
          <div className="text-center">
            <p className="text-white">Or</p>
            <Link to="/login" className="text-white hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
