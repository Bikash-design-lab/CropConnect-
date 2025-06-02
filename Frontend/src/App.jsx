import React from "react"
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Loader from "./components/Loader"
import AppRoutes from "./components/routes/AppRoutes"
import NotFound from "./components/pages/common/NotFound"
import Signup from "./components/pages/Auth/Signup"
import Signin from "./components/pages/Auth/Signin"
import ResetPassword from "./components/pages/Auth/ResetPassword"
import ForgotPassword from "./components/pages/Auth/ForgotPassword"
import AuthContext from "./components/context/AuthContext"
import BuyerProfileForm from "./components/pages/profile/BuyerProfileForm"


function App() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline" >This is App.jsx page</h1> */}
      <Navbar/>
     <AppRoutes/>
     {/* <BuyerProfileForm/> */}
     {/* <AuthContext/> */}
     {/* <NotFound/> */}
    {/* <Loader/> */} 
    {/* <Signup/> */}
    {/* <Signin/> */}
    {/* <ResetPassword/> */}
    {/* <ForgotPassword/> */}
    </>
  )
}

export default App
