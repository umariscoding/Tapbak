import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../Components/base/TextField";
import ColorBox from "../../Components/base/ColorPicker";
import ImageUploader from "../../Components/base/ImageUploader";
import {
  getVendorConfiguration,
  updateVendorConfiguration,
  getFieldDefinitions,
} from "../../states/app";
import CardField from "../../Components/base/CardField";
import Button from "../../Components/base/Button";
import LoyaltySetup from "../../Components/LoyaltySetup";
import Container from "../../Components/base/Container";
import { showSuccess, showError, showValidationErrors } from "../../utils/toast";

function CardDesign() {
  const navigate = useNavigate();
  const [configuration, setConfiguration] = useState({});
  const [fields, setFields] = useState({
    header_field: null,
    secondary_fields: [],
  });
  const [images, setImages] = useState({
    logo_url: null,
    icon_url: null,
    strip_image_url: null,
  });
  const [fieldOptions, setFieldOptions] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [fieldDefs, vendorData] = await Promise.all([
          getFieldDefinitions(),
          getVendorConfiguration(),
        ]);
        if (!isMounted) return;
        console.log(fieldDefs)

        setFieldOptions(fieldDefs || []);

        if (vendorData?.configuration) {
          setConfiguration(vendorData.configuration);
          setImages({
            logo_url: vendorData.configuration.logo_url,
            icon_url: vendorData.configuration.icon_url,
            strip_image_url: vendorData.configuration.strip_image_url,
          });
        }
        console.log(vendorData)

        // Only load existing fields if the points system is already configured
        const hasPointsSystem = vendorData?.configuration?.points_system;
        
        if (hasPointsSystem && vendorData?.fields) {
          const headerFieldId =
            vendorData.fields
              .filter((field) => field.field_type === "header")
              .map((field) => field.field_definition?.id)[0] ?? null;
          const secondaryFieldIds = vendorData.fields
            .filter((field) => field.field_type === "secondary")
            .map((field) => field.field_definition?.id)
            .filter(Boolean);
          setFields({
            header_field: headerFieldId,
            secondary_fields: secondaryFieldIds,
          });
        } else {
          // Ensure fields are empty for initial setup
          setFields({
            header_field: null,
            secondary_fields: [],
          });
        }

        if (hasPointsSystem) {
          setIsSetupComplete(true);
        }
      } catch (error) {
        console.error("Failed to load configuration:", error);
        showError("Failed to load configuration");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleHeaderFieldChange = (fieldId, isSelected) => {
    setFields((prev) => ({
      ...prev,
      header_field: isSelected ? fieldId : null,
    }));
  };

  const handleSecondaryFieldChange = (fieldId, isSelected) => {
    setFields((prev) => {
      const alreadySelected = prev.secondary_fields.includes(fieldId);
      if (isSelected) {
        if (alreadySelected) return prev;
        if (prev.secondary_fields.length >= 3) return prev;
        return {
          ...prev,
          secondary_fields: [...prev.secondary_fields, fieldId],
        };
      }
      return {
        ...prev,
        secondary_fields: prev.secondary_fields.filter((id) => id !== fieldId),
      };
    });
  };

  const handleLoyaltySettingsChange = (field, value) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setConfiguration({});
    setFields({
      header_field: null,
      secondary_fields: [],
    });
    setImages({
      logo_url: null,
      icon_url: null,
      strip_image_url: null,
    });
  };

  const handleInitialSetup = async () => {
    try {
      setIsLoading(true);
      await updateVendorConfiguration({
        configuration: configuration,
        fields: fields,
      }, images);

      setIsSetupComplete(true);
      showSuccess("Points system configuration saved successfully!");
      
      // Reset form after successful setup
      resetForm();
      
      // Navigate to dashboard after successful setup
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Failed to save points system configuration:", error);
      showError("Failed to save points system configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const validateConfiguration = () => {
    const errors = [];

    // Check if points system is selected
    if (!configuration.points_system) {
      errors.push("Please select a loyalty system (Points or Stamps)");
    }

    // Check if total points/stamps is set
    if (!configuration.total_points || configuration.total_points < 1) {
      errors.push("Please set a valid number of points/stamps required");
    }

    // Check stamp limit for stamp system
    if (configuration.points_system === "stamps" && configuration.total_points > 10) {
      errors.push("Stamps required cannot exceed 10");
    }

    // Check if at least one header field is selected
    if (!fields.header_field) {
      errors.push("Please select at least one header field");
    }

    // Check if background color is set
    if (!configuration.background_color) {
      errors.push("Please set a background color for the card");
    }

    // Check if foreground color is set
    if (!configuration.foreground_color) {
      errors.push("Please set a foreground color for the card");
    }

    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateConfiguration();
    
    if (validationErrors.length > 0) {
      showValidationErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      await updateVendorConfiguration(
        {
          configuration: configuration,
          fields: fields,
        },
        images
      );
      
      showSuccess("Configuration saved successfully!");
      
      // Reset form after successful save
      resetForm();
      
      // Navigate to dashboard after successful save
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      console.error("Failed to save configuration:", error);
      showError("Failed to save configuration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isHeaderFieldDisabled = (fieldId) => {
    return fields.header_field !== null && fields.header_field !== fieldId;
  };

  const isSecondaryFieldDisabled = (fieldId) => {
    if (fields.secondary_fields.includes(fieldId)) {
      return false;
    }
    return fields.secondary_fields.length >= 3;
  };

  if (!isSetupComplete) {
    return (
      <LoyaltySetup
        configuration={configuration}
        onLoyaltySettingsChange={handleLoyaltySettingsChange}
        onInitialSetup={handleInitialSetup}
        isLoading={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Container className="font-medium min-h-96">
          <div>Card Preview</div>
        </Container>
        <div className="flex flex-col gap-4">
          <Container title="Loyalty Settings">
            <div className="text-sm text-gray-500 mb-4">
              {configuration.points_system === "points"
                ? "Minimum points required for redemption"
                : "Number of stamps required for reward"}
            </div>
            <div className="max-w-xs">
              <TextField
                label={
                  configuration.points_system === "points"
                    ? "Minimum Points"
                    : "Stamps Required"
                }
                value={configuration.total_points}
                onChange={(e) =>
                  setConfiguration((prev) => ({
                    ...prev,
                    total_points: parseInt(e.target.value) || 0,
                  }))
                }
                type="number"
                min="1"
                max={configuration.points_system === "stamps" ? "10" : undefined}
                placeholder={
                  configuration.points_system === "points"
                    ? "e.g., 100"
                    : "e.g., 10"
                }
              />
            </div>
          </Container>
          <Container title="Card Colors">
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
          </Container>
          <Container title="Card Images">
            <div className="flex mt-5 gap-4 flex-wrap">
              <ImageUploader
                label="Logo"
                image={images.logo_url}
                setImage={(image) =>
                  setImages({ ...images, logo_url: image })
                }
              />
              <ImageUploader
                label="Icon"
                image={images.icon_url}
                setImage={(image) =>
                  setImages({ ...images, icon_url: image })
                }
              />
              <ImageUploader
                label="Strip Image"
                image={images.strip_image_url}
                setImage={(image) =>
                  setImages({ ...images, strip_image_url: image })
                }
              />
            </div>
          </Container>
          <Container title="Header Fields">
            <div className="text-sm text-gray-500 mb-4">
              * You can select only one field.
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {fieldOptions
                ?.filter((field) => field.suggested_section === "header")
                .map((field) => (
                  <CardField
                    key={field.id}
                    label={field.name}
                    value={fields.header_field === field.id}
                    setValue={(isSelected) =>
                      handleHeaderFieldChange(field.id, isSelected)
                    }
                    disabled={isHeaderFieldDisabled(field.id)}
                  />
                ))}
            </div>
          </Container>
          <Container title="Secondary Fields">
            <div className="text-sm text-gray-500 mb-4">
              * You can select at most 3 fields. (
              {fields.secondary_fields.length}/3)
            </div>
            <div className="flex mt-5 gap-4 flex-wrap">
              {fieldOptions
                ?.filter((field) => field.suggested_section === "secondary")
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
          </Container>
        </div>
      </div>
    </div>
  );
}

export default CardDesign;
