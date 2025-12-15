import { useState } from "react";

interface TextInputProps {
  label: string;
  type?: string;
  name?: string;
  className?: string;
}

export function TextInput({ label, type = "text", name, className }: TextInputProps) {
  const [value, setValue] = useState("");

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          block w-full px-4 pt-6 pb-3 text-base text-gray-900
          bg-white border border-darkgrey-300 border-2 rounded-md
          focus:outline-none focus:border-0 focus:ring-2 focus:ring-teal-500
          placeholder-transparent
          transition-colors duration-200 ease-in-out
        "
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-4 top-2 text-gray-500 text-base
          transition-all duration-200 ease-in-out
          pointer-events-none
          ${value ? "text-blue-500 text-sm -top-1" : "top-6 text-base"}
          ${value ? "scale-90" : "scale-100"}
        `}
      >
        {label}
      </label>
    </div>
  );
}
