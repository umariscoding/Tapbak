import React, { useRef } from "react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

function ImageUploader({ label, image, setImage }) {
  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">{label}</div>
      <input
        ref={ref}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <div
        className="w-48 justify-center text-xs font-medium text-gray-500 flex items-center  gap-2 text-center p-4 h-fit truncate overflow-ellipsis rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => ref.current.click()}
      >
        <FaUpload className="min-w-5" />{" "}
        <div class = "min-w-28 max-w-28">{image ? image.name : "Upload Image"}</div>
      </div>
    </div>
  );
}

export default ImageUploader;
