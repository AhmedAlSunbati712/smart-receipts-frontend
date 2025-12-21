import React, {useState} from 'react'
import AuthForm from "./components/AuthForm/AuthForm"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from './components/NavBar/NavBar';
import NewReceiptModal from './components/NewReceiptModal/NewReceiptModal';
import { HistoryDrop } from './components/Dashboard/HistoryDrop';

function App() {
    const [value, setValue] = useState<string>(undefined);

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
      <NavBar />
      

  
      <div className="flex w-full h-screen items-center justify-center bg-white">
  <div className="w-full max-w-[1000px] flex flex-wrap items-center justify-center gap-3">
    <div className="relative w-[274px] h-[164px] flex flex-col justify-center items-center bg-teal rounded-md border-3 border-darkteal shadow-xl md:mr-auto">
      <span className="absolute top-2 text-white font-bold text-[30px]"> Dashboard</span>
      <HistoryDrop value={value} setValue={setValue} />
    </div>
    <div className="flex w-[571px] h-[164px] bg-white rounded-md border-3 border-lightgrey shadow-xl">
      <div className="relative w-[190px] flex flex-col items-center border-r-3 border-lightgrey justify-center">
        <span className="absolute top-4 text-teal font-bold text-[20px]">Total spent</span>
        <span className="font-bold text-[40px]">$1,424</span>
      </div>
      <div className="relative w-[190px] flex flex-col items-center border-r-3 border-lightgrey justify-center">
        <span className="absolute top-4 text-teal font-bold text-[20px]">Receipts</span>
        <span className="font-bold text-[40px]">24</span>
      </div>
      <div className="relative w-[190px] flex flex-col items-center border-r-3 border-lightgrey justify-center">
        <span className="absolute top-4 text-teal font-bold text-[20px]">Top Category</span>
        <span className="font-bold text-[40px]">Food</span>
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default App
