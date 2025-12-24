import React, {useState} from "react";
import NavBar from '../../components/NavBar/NavBar';
import { ToastContainer } from "react-toastify";
import Dashboard from "../Dashboard/Dashboard";
import CategoryAnal from "../CategoryAnal/CategoryAnal";

const Main = () => {
    const [active, setActive] = useState<"dashboard" | "category" | "vendor">("dashboard");
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
      <NavBar active={active} setActive={setActive}/>
      <div className="flex flex-col w-full min-h-screen items-center justify-center bg-white">
        {active == "dashboard" && (
            <CategoryAnal />
        )}
      </div>
      </>
    )
}

export default Main;