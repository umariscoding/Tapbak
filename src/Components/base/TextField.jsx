import React from "react";

function TextField({ id, label, placeholder, value, onChange, type = "text", min, max }) {
  return (
    <div className="flex flex-col gap-2">
      <div class="text-sm text-gray-500 self-start" htmlFor={id}>
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full p-2 text-sm h-10 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;
