import React, {useState} from "react";
import NavBar from '../../components/NavBar/NavBar';
import { ToastContainer } from "react-toastify";
import Dashboard from "../Dashboard/Dashboard";
import CategoryAnal from "../CategoryAnal/CategoryAnal";
import VendorAnal from "../VendorAnal/VendorAnal"
import AuthForm from "@/components/AuthForm/AuthForm";
import ModalOverlay from "@/components/common/ModalOverlay";
import NewReceiptModal from "@/components/NewReceiptModal/NewReceiptModal";

const Main = () => {
    const [active, setActive] = useState<"dashboard" | "category" | "vendor">("dashboard");
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [showNewReceipt, setShowNewReceipt] = useState(false);

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
      {authenticated ? (
        <>
      <NavBar active={active} setActive={setActive} onAddReceipt={() => setShowNewReceipt(true)} />
      <div className="flex flex-col w-full min-h-screen items-center justify-center bg-white">
        {active == "dashboard" && ( <Dashboard /> )}
        {active == "category" && ( <CategoryAnal /> )}
        {active == "vendor" && ( <VendorAnal /> )}
        {showNewReceipt && (
            <ModalOverlay onClose={() => setShowNewReceipt(false)}>
              <NewReceiptModal onClose={() => setShowNewReceipt(false)} />
            </ModalOverlay>
          )}
      </div>
      </>
      ) : (
        <div className="w-full flex min-h-screen justify-center items-center">
          <AuthForm setAuthenticated={setAuthenticated} />
        </div>
      )}

      </>
    )
}

export default Main;