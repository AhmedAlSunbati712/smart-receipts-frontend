import React from 'react'
import AuthForm from "./components/AuthForm/AuthForm"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from './components/NavBar/NavBar';
import NewReceiptModal from './components/NewReceiptModal/NewReceiptModal';


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
      {/* <NavBar />
      

  <div className="flex w-full h-screen items-center justify-center bg-darkteal">
  <NewReceiptModal />
    <AuthForm />
  </div> */}
  <div className="flex w-full h-screen items-center justify-center bg-lightgrey">
    {/* <AuthForm /> */}
    <div className="w-100">
      <NewReceiptModal />
    </div>
  </div>
  </>
  )
}

export default App
