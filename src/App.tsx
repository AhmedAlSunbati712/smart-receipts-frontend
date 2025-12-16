import React from 'react'
import AuthForm from "./components/AuthForm/AuthForm"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
  <div className="flex w-full h-screen items-center justify-center bg-darkteal">
    <AuthForm />
  </div>
  </>
  )
}

export default App
