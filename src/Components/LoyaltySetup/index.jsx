import React from "react";
import CardField from "../base/CardField";
import TextField from "../base/TextField";
import Button from "../base/Button";

const OptionCard = ({ 
  label, 
  description, 
  isSelected, 
  onSelect, 
  configurationField 
}) => (
  <div className={`border-2 rounded-xl p-4 transition-all duration-200 ${
    isSelected 
      ? "border-blue-500 bg-blue-50" 
      : "border-gray-200 hover:border-gray-300"
  }`}>
    <CardField
      label={label}
      value={isSelected}
      setValue={onSelect}
    />
    <div className="text-sm text-gray-600 ml-6 mt-2">
      {description}
    </div>
  </div>
);

const ConfigurationSection = ({ 
  title, 
  description, 
  children 
}) => (
  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
    <div className="text-lg font-semibold text-gray-800 mb-4">{title}</div>
    <div className="max-w-xs">
      {children}
    </div>
    <div className="text-sm text-gray-600 mt-2">
      {description}
    </div>
  </div>
);

const Header = () => (
  <div className="mb-6 text-center">
    <div className="text-3xl font-bold text-gray-800 mb-3">
      Loyalty Program Setup
    </div>
    <div className="text-gray-600 text-lg max-w-2xl mx-auto">
      Configure your loyalty program type to get started with card customization. 
      This setting cannot be changed once configured.
    </div>
  </div>
);

const SetupForm = ({ 
  configuration, 
  onLoyaltySettingsChange, 
  onInitialSetup 
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
    <div className="mb-8">
      <div className="text-2xl font-bold text-gray-800 mb-3">
        Choose Your Program Type
      </div>
      <div className="text-gray-600">
        Select the loyalty program structure that best fits your business model. 
        This decision will determine how customers earn and redeem rewards.
      </div>
    </div>
    
    <div className="space-y-6">
      <OptionCard
        label="Points Based"
        description="Customers earn points for purchases and redeem them for rewards. Perfect for businesses with frequent customers."
        isSelected={configuration.points_system === "points"}
        onSelect={() => onLoyaltySettingsChange("points_system", "points")}
      />

      <OptionCard
        label="Stamps Based"
        description="Customers collect stamps for each visit and get rewards after collecting a certain number. Great for visit-based businesses."
        isSelected={configuration.points_system === "stamps"}
        onSelect={() => onLoyaltySettingsChange("points_system", "stamps")}
      />
    </div>

    {configuration.points_system === "points" && (
      <ConfigurationSection
        title="Points Configuration"
        description="Set the minimum number of points customers need to redeem rewards"
      >
        <TextField
          label="Minimum Points for Redemption"
          value={configuration.total_points}
          onChange={(e) => onLoyaltySettingsChange("total_points", e.target.value)}
          type="number"
          min={1}
          placeholder="e.g., 100"
        />
      </ConfigurationSection>
    )}

    {configuration.points_system === "stamps" && (
      <ConfigurationSection
        title="Stamps Configuration"
        description="Set how many stamps customers need to collect for a reward"
      >
        <TextField
          label="Stamps Required for Reward"
          value={configuration.total_points}
          onChange={(e) => onLoyaltySettingsChange("total_points", e.target.value)}
          type="number"
          min={1}
          placeholder="e.g., 10"
        />
      </ConfigurationSection>
    )}

    <div className="mt-8 flex justify-center">
      <Button
        onClick={onInitialSetup}
        variant="primary"
        disabled={!configuration.points_system}
        className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {configuration.points_system ? "Continue to Card Design" : "Select Program Type"}
      </Button>
    </div>
  </div>
);

function LoyaltySetup({ configuration, onLoyaltySettingsChange, onInitialSetup }) {
  return (
    <div className="flex flex-col p-5 gap-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <SetupForm
          configuration={configuration}
          onLoyaltySettingsChange={onLoyaltySettingsChange}
          onInitialSetup={onInitialSetup}
        />
      </div>
    </div>
  );
}

export default LoyaltySetup;
