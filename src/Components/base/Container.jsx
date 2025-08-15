import React from "react";

function Container({ title, className = "", children }) {
  return (
    <div className={`bg-white border border-blue-200 h-fit rounded-xl p-5 ${className}`}>
      {title ? <div className="font-medium mb-4 text-blue-800">{title}</div> : null}
      {children}
    </div>
  );
}

export default Container;


