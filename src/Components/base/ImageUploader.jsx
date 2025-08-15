import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

function ImageUploader({ 
  label, 
  image, 
  setImage, 
  maxWidth, 
  maxHeight, 
  minWidth, 
  minHeight 
}) {
  const ref = useRef(null);
  const [error, setError] = useState(null);

  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        let isValid = true;
        let errorMessage = "";

        if (maxWidth && width > maxWidth) {
          isValid = false;
          errorMessage = `Width must be ${maxWidth}px or less (current: ${width}px)`;
        } else if (minWidth && width < minWidth) {
          isValid = false;
          errorMessage = `Width must be ${minWidth}px or more (current: ${width}px)`;
        } else if (maxHeight && height > maxHeight) {
          isValid = false;
          errorMessage = `Height must be ${maxHeight}px or less (current: ${height}px)`;
        } else if (minHeight && height < minHeight) {
          isValid = false;
          errorMessage = `Height must be ${minHeight}px or more (current: ${height}px)`;
        }

        resolve({ isValid, errorMessage, width, height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);

    // If dimension limits are provided, validate them
    if (maxWidth || maxHeight || minWidth || minHeight) {
      const validation = await validateImageDimensions(file);
      if (!validation.isValid) {
        setError(validation.errorMessage);
        return;
      }
    }

    setImage(file);
  };

  const getDimensionText = () => {
    const parts = [];
    if (minWidth || minHeight) {
      parts.push(`Min: ${minWidth || 'any'}x${minHeight || 'any'}px`);
    }
    if (maxWidth || maxHeight) {
      parts.push(`Max: ${maxWidth || 'any'}x${maxHeight || 'any'}px`);
    }
    return parts.join(', ');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">
        {label}
        {(maxWidth || maxHeight || minWidth || minHeight) && (
          <div className="text-xs text-gray-400 mt-1">
            {getDimensionText()}
          </div>
        )}
      </div>
      <input
        ref={ref}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        className="w-48 justify-center text-xs font-medium text-gray-500 flex items-center gap-2 text-center p-4 h-fit truncate overflow-ellipsis rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => ref.current.click()}
      >
        <FaUpload className="min-w-5" />
        <div className="min-w-28 max-w-28">
          {image ? (image.name || image) : "Upload Image"}
        </div>
      </div>
      {error && (
        <div className="text-xs text-red-500 mt-1">
          {error}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
