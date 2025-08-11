import React, { useState } from "react";
import TextField from "../../Components/base/TextField";
import ColorBox from "../../Components/base/ColorPicker";
import ImageUploader from "../../Components/base/ImageUploader";
import CardField from "../../Components/base/CardField";

function CardDesign() {
  const [color, setColor] = useState("#aabbcc");
  const [logo, setLogo] = useState(null);
  const [background, setBackground] = useState(null);
  
  // Header field state - only one can be selected
  const [headerField, setHeaderField] = useState(null);
  
  // Secondary fields state - up to 3 can be selected
  const [secondaryFields, setSecondaryFields] = useState([]);

  // Available field options
  const headerFieldOptions = [
    { id: "cardNumber", label: "Card Number" },
    { id: "customerName", label: "Customer Name" },
    { id: "points", label: "Points" }
  ];

  const secondaryFieldOptions = [
    { id: "cardNumber", label: "Card Number" },
    { id: "customerName", label: "Customer Name" },
    { id: "points", label: "Points" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "joinDate", label: "Join Date" }
  ];

  const handleHeaderFieldChange = (fieldId, isSelected) => {
    if (isSelected) {
      setHeaderField(fieldId);
    } else {
      setHeaderField(null);
    }
  };

  // Handle secondary field selection
  const handleSecondaryFieldChange = (fieldId, isSelected) => {
    if (isSelected) {
      if (secondaryFields.length < 3) {
        setSecondaryFields([...secondaryFields, fieldId]);
      }
    } else {
      setSecondaryFields(secondaryFields.filter(id => id !== fieldId));
    }
  };

  const isHeaderFieldDisabled = (fieldId) => {
    return headerField !== null && headerField !== fieldId;
  };

  const isSecondaryFieldDisabled = (fieldId) => {
    if (secondaryFields.includes(fieldId)) {
      return false;
    }
    return secondaryFields.length >= 3;
  };

  return (
    <div className="flex flex-col p-5 gap-4">
      <div className="mb-6">
        <div className="text-2xl">Card Design</div>
        <div className="text-gray-600 text-base">
          Manage your card designs with ease.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border h-fit border-gray-200 rounded-xl font-medium min-h-96 p-5">
          <div>Card Preview</div>
        </div>
        <div className="flex flex-col gap-4">
          
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Card Colors</div>
            <div className="text-sm flex-col flex gap-4">
              <ColorBox
                label="Background Color"
                color={color}
                setColor={setColor}
              />
              <ColorBox
                label="Foreground Color"
                color={color}
                setColor={setColor}
              />
              <ColorBox label="Text Color" color={color} setColor={setColor} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Card Images</div>
            <div className="flex mt-5 gap-4 flex-wrap">
              <ImageUploader label="Logo" image={logo} setImage={setLogo} />
              <ImageUploader
                label="Icon"
                image={background}
                setImage={setBackground}
              />
              <ImageUploader
                label="Strip Image"
                image={background}
                setImage={setBackground}
              />
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Header Fields</div>
            <div className="text-sm text-gray-500 mb-4">
               * You can select only one field.
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {headerFieldOptions.map((field) => (
                <CardField
                  key={field.id}
                  label={field.label}
                  value={headerField === field.id}
                  setValue={(isSelected) => handleHeaderFieldChange(field.id, isSelected)}
                  disabled={isHeaderFieldDisabled(field.id)}
                />
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Secondary Fields</div>
            <div className="text-sm text-gray-500 mb-4">
               * You can select at most 3 fields. ({secondaryFields.length}/3)
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {secondaryFieldOptions.map((field) => (
                <CardField
                  key={field.id}
                  label={field.label}
                  value={secondaryFields.includes(field.id)}
                  setValue={(isSelected) => handleSecondaryFieldChange(field.id, isSelected)}
                  disabled={isSecondaryFieldDisabled(field.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDesign;
