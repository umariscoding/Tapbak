import React, { useState } from "react";
import TextField from "../../Components/base/TextField";
import { updateVendor } from "../../states/app";
import Button from "../../Components/base/Button";

function Settings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    description: "",
  });

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    await updateVendor(businessInfo);
  };

  return (
    <div className="flex flex-col p-5 gap-4">
      <div className="mb-6 flex justify-between">
        <div>
          <div className="text-2xl">Settings</div>
          <div className="text-gray-600 text-base">
            Configure your business and loyalty program settings.
          </div>
        </div>
        <Button onClick={handleSave} className="h-fit">Save</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <div className="font-medium mb-4">Basic Information</div>
          <div className="flex flex-col gap-4">
            <TextField
              label="Business Name"
              value={businessInfo.name}
              onChange={(e) => handleBusinessInfoChange("name", e.target.value)}
              placeholder="Enter your business name"
            />
            <TextField
              label="Description"
              value={businessInfo.description}
              onChange={(e) =>
                handleBusinessInfoChange("description", e.target.value)
              }
              placeholder="This will be shown on the card as a description"
              multiline
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
