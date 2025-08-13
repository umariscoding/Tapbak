import React, { useState, useEffect } from "react";
import TextField from "../../Components/base/TextField";
import ColorBox from "../../Components/base/ColorPicker";
import ImageUploader from "../../Components/base/ImageUploader";
import {
  getVendorConfiguration,
  updateVendorConfiguration,
} from "../../states/app";
import CardField from "../../Components/base/CardField";
import Button from "../../Components/base/Button";
import { getFieldDefinitions } from "../../states/app";
import LoyaltySetup from "../../Components/LoyaltySetup";

function CardDesign() {
  const [configuration, setConfiguration] = useState({
    background_color: "#aabbcc",
    foreground_color: "#aabbcc",
    label_color: "#aabbcc",
    logo: null,
    icon: null,
    strip: null,
    points_system: null,
    total_points: 100,
  });
  const [fields, setFields] = useState({
    header_field: null,
    secondary_fields: [],
  });
  const [fieldOptions, setFieldOptions] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    getFieldDefinitions().then((data) => {
      setFieldOptions(data);
    });
    getVendorConfiguration().then((data) => {
      console.log(data);
      setConfiguration(data.configuration);
      setFields({
        header_field: data.fields.filter(field => field.field_type == "header").map(field => field.field_definition.id)[0],
        secondary_fields: data.fields.filter(field => field.field_type == "secondary").map(field => field.field_definition.id),
      });
      
      if (data.configuration.points_system) {
        setIsSetupComplete(true);
      }
    });
  }, []);

  const handleHeaderFieldChange = (fieldId, isSelected) => {
    console.log(fieldId, isSelected);
    if (isSelected) {
      setFields({ ...fields, header_field: fieldId });
    } else {
      setFields({ ...fields, header_field: null });
    }
  };

  const handleSecondaryFieldChange = (fieldId, isSelected) => {
    if (isSelected) {
      if (fields.secondary_fields.length < 3) {
        setFields({
          ...fields,
          secondary_fields: [...fields.secondary_fields, fieldId],
        });
      }
    } else {
      setFields({
        ...fields,
        secondary_fields: fields.secondary_fields.filter(
          (id) => id !== fieldId
        ),
      });
    }
  };

  const handleLoyaltySettingsChange = (field, value) => {
    setConfiguration(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInitialSetup = async () => {
    try {
      await updateVendorConfiguration({
        configuration: configuration,
        fields: fields,
      });
      
      setIsSetupComplete(true);
          
      console.log("Points system configuration saved successfully:", configuration);
    } catch (error) {
      console.error("Failed to save points system configuration:", error);
    }
  };

  const isHeaderFieldDisabled = (fieldId) => {
    return fields.header_field !== null && fields.header_field !== fieldId;
  };

  const isSecondaryFieldDisabled = (fieldId) => {
    if (fields.secondary_fields.find((f) => f == fieldId)) {
      return false;
    }
    return fields.secondary_fields.length >= 3;
  };

  const handleSave = () => {
    updateVendorConfiguration({
      configuration: configuration,
      fields: fields,
    });
  };

  if (!isSetupComplete) {
    return (
      <LoyaltySetup
        configuration={configuration}
        onLoyaltySettingsChange={handleLoyaltySettingsChange}
        onInitialSetup={handleInitialSetup}
      />
    );
  }

  return (
    <div className="flex flex-col p-5 gap-4">
      <div className="mb-6">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl">Card Design</div>
            <div className="text-gray-600 text-base">
              Manage your card designs with ease.
            </div>
          </div>
          <Button
            onClick={handleSave}
            variant="primary"
            className="w-fit p-0 h-10"
          >
            Save
          </Button>
        </div>
      </div>
      
             <div className="grid grid-cols-2 gap-4">
         <div className="bg-white border h-fit border-gray-200 rounded-xl font-medium min-h-96 p-5">
           <div>Card Preview</div>
         </div>
         <div className="flex flex-col gap-4">
           <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
             <div className="font-medium mb-4">Loyalty Settings</div>
             <div className="text-sm text-gray-500 mb-4">
               {configuration.points_system === "points" 
                 ? "Minimum points required for redemption"
                 : "Number of stamps required for reward"
               }
             </div>
             <div className="max-w-xs">
               <TextField
                 label={configuration.points_system === "points" ? "Minimum Points" : "Stamps Required"}
                 value={configuration.total_points}
                 onChange={(e) => setConfiguration(prev => ({
                   ...prev,
                   total_points: parseInt(e.target.value) || 0
                 }))}
                 type="number"
                 min={1}
                 placeholder={configuration.points_system === "points" ? "e.g., 100" : "e.g., 10"}
               />
             </div>
           </div>
           <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
             <div className="font-medium mb-4">Card Colors</div>
            <div className="text-sm flex-col flex gap-4">
              <ColorBox
                label="Background Color"
                color={configuration.background_color}
                setColor={(color) =>
                  setConfiguration({
                    ...configuration,
                    background_color: color,
                  })
                }
              />
              <ColorBox
                label="Foreground Color"
                color={configuration.foreground_color}
                setColor={(color) =>
                  setConfiguration({
                    ...configuration,
                    foreground_color: color,
                  })
                }
              />
              <ColorBox
                label="Label Color"
                color={configuration.label_color}
                setColor={(color) =>
                  setConfiguration({ ...configuration, label_color: color })
                }
              />
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Card Images</div>
            <div className="flex mt-5 gap-4 flex-wrap">
              <ImageUploader
                label="Logo"
                image={configuration.logo}
                setImage={(image) =>
                  setConfiguration({ ...configuration, logo: image })
                }
              />
              <ImageUploader
                label="Icon"
                image={configuration.icon}
                setImage={(image) =>
                  setConfiguration({ ...configuration, icon: image })
                }
              />
              <ImageUploader
                label="Strip Image"
                image={configuration.strip}
                setImage={(image) =>
                  setConfiguration({ ...configuration, strip: image })
                }
              />
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Header Fields</div>
            <div className="text-sm text-gray-500 mb-4">
              * You can select only one field.
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {fieldOptions
                ?.filter((field) => field.suggested_section == "header")
                .map((field) => (
                  <CardField
                    key={field.id}
                    label={field.name}
                    value={fields.header_field == field.id}
                    setValue={(isSelected) =>
                      handleHeaderFieldChange(field.id, isSelected)
                    }
                    disabled={isHeaderFieldDisabled(field.id)}
                  />
                ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 h-fit rounded-xl p-5">
            <div className="font-medium mb-4">Secondary Fields</div>
            <div className="text-sm text-gray-500 mb-4">
              * You can select at most 3 fields. (
              {fields.secondary_fields.length}/3)
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {fieldOptions
                ?.filter((field) => field.suggested_section == "secondary")
                .map((field) => (
                  <CardField
                    key={field.id}
                    label={field.name}
                    value={fields.secondary_fields.includes(field.id)}
                    setValue={(isSelected) =>
                      handleSecondaryFieldChange(field.id, isSelected)
                    }
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
