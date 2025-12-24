import React, { useState } from "react";
type NavBarProps = {
  active: "dashboard" | "category" | "vendor";
  setActive: (value: "dashboard" | "category" | "vendor") => void;
};

const NavBar = ({ active = "dashboard", setActive }: NavBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-4 left-1/2 -translate-x-1/2 z-20 rounded-[15px] shadow-2xl w-[90%] max-w-screen-xl border-2 border-darkteal">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="text-[24px] font-semibold text-teal whitespace-nowrap">
          Smart Receipts
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            <li className={`hover:bg-teal hover:text-white rounded-[8px] p-2 font-semibold text-[16px] ${active == "dashboard" ? "text-white font-bold bg-teal" : "text-teal"}`}><button className="hover:cursor-pointer" onClick={() => setActive("dashboard")}>Dashboard</button></li>
            <li className={`hover:bg-teal hover:text-white rounded-[8px] p-2 font-semibold text-[16px] ${active == "category" ? "text-white font-bold bg-teal" : "text-teal"}`}><button className="hover:cursor-pointer" onClick={() => setActive("category")}>Category Analytics</button></li>
            <li className={`hover:bg-teal hover:text-white rounded-[8px] p-2 font-semibold text-[16px] ${active == "vendor" ? "text-white font-bold bg-teal" : "text-teal"}`}><button className="hover:cursor-pointer" onClick={() => setActive("vendor")}>Vendor Analytics</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
