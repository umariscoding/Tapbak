import React, { useState } from "react";
import TextField from "../../Components/base/TextField";
import { updateVendor } from "../../states/app";
import Button from "../../Components/base/Button";
import Container from "../../Components/base/Container";
import { useUser } from "../../states/contexts/User";

function Settings() {
  const {user} = useUser();
  const [businessInfo, setBusinessInfo] = useState({
    business_name: user?.business_name,
    business_description: user?.business_description,
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
        <Container title="Basic Information">
          <div className="flex flex-col gap-4">
            <TextField
              label="Business Name"
              value={businessInfo.business_name}
              onChange={(e) => handleBusinessInfoChange("business_name", e.target.value)}
              placeholder="Enter your business name"
            />
            <TextField
              label="Description"
              value={businessInfo.business_description}
              onChange={(e) =>
                handleBusinessInfoChange("business_description", e.target.value)
              }
              placeholder="This will be shown on the card as a description"
              multiline
              rows={3}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Settings;
