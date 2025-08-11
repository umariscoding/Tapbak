import React, { useState } from "react";
import TextField from "../../Components/base/TextField";
import CardField from "../../Components/base/CardField";


function Settings() {

  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    description: ""
  });

  const [loyaltyType, setLoyaltyType] = useState("points"); // points or stamps
  const [pointsSettings, setPointsSettings] = useState({
    minimumPoints: 100
  });

  const [stampsSettings, setStampsSettings] = useState({
    stampsToReward: 10
  });

  const handleBusinessInfoChange = (field, value) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoyaltySettingsChange = (field, value) => {
    if (loyaltyType === 'points') {
      setPointsSettings(prev => ({ ...prev, [field]: value }));
    } else {
      setStampsSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="flex flex-col p-5 gap-4">
      <div className="mb-6">
        <div className="text-2xl">Settings</div>
        <div className="text-gray-600 text-base">
          Configure your business and loyalty program settings.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Basic Information */}
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
              onChange={(e) => handleBusinessInfoChange("description", e.target.value)}
              placeholder="Brief description of your business"
              multiline
              rows={3}
            />
          </div>
        </div>

        {/* Right Column - Loyalty Card Type */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <div className="font-medium mb-4">Loyalty Card Type</div>
          <div className="flex gap-4 mb-6">
            <CardField
              label="Points Based"
              value={loyaltyType === "points"}
              setValue={() => setLoyaltyType("points")}
            />
            <CardField
              label="Stamps Based"
              value={loyaltyType === "stamps"}
              setValue={() => setLoyaltyType("stamps")}
            />
          </div>

          {loyaltyType === "points" ? (
            <div className="flex flex-col gap-4">
              <TextField
                label="Minimum Points for Redemption"
                value={pointsSettings.minimumPoints}
                onChange={(e) => handleLoyaltySettingsChange("minimumPoints", e.target.value)}
                type="number"
                min={1}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <TextField
                label="Stamps Required for Reward"
                value={stampsSettings.stampsToReward}
                onChange={(e) => handleLoyaltySettingsChange("stampsToReward", e.target.value)}
                type="number"
                min={1}
              />
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default Settings;
