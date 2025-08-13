import apiClient from "./apiClient";
import { api } from "./constants.js";

export const initializeAuth = () => {
  const currentVendor = window.localStorage.getItem("currentVendor");
  if (currentVendor) {
    return JSON.parse(currentVendor);
  }
  return null;
};

export const loadStatistics = async () => {
  const response = await apiClient.get(api.endpoints.GET_STATISTICS);
  console.log(response.data);
  return response.data;
};

export const addToWalletHandler = async (name, email, phone, vendorName) => {
  try {
    const formData = new FormData();
    formData.append("firstName", name.split(" ")[0]);
    formData.append("lastName", name.split(" ")[1]);
    formData.append("email", email);
    formData.append("contactNumber", phone);

    const response = await apiClient.post(
      api.endpoints.CREATE_PASS.replace(":vendorName", vendorName),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.apple.pkpass",
    });
    const url = window.URL.createObjectURL(blob);
    window.location.href = url;
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    return true;
  } catch (error) {
    console.error("Error adding to wallet:", error);
    throw error;
  }
};

export const getFieldDefinitions = async () => {
  const response = await apiClient.get(api.endpoints.GET_FIELD_DEFINITIONS);
  return response.data;
};

export const createVendor = async (data) => {
  const response = await apiClient.post(api.endpoints.CREATE_VENDOR, {
    email: data.email,
    password: data.password,
    name: data.name,
    business_name: data.businessName,
    business_description: data.businessTagline,
  });
  return response.data;
};

export const loginVendor = async (data) => {
  const response = await apiClient.post(api.endpoints.LOGIN_VENDOR, {
    email: data.email,
    password: data.password,
  });
  if (response.data.message === "Login successful") {
    window.localStorage.setItem(
      "currentVendor",
      JSON.stringify(response.data.vendor)
    );
  }
  return response.data;
};

export const getVendorConfiguration = async () => {
  const response = await apiClient.get(api.endpoints.GET_VENDOR_CONFIGURATION);
  return {
    configuration: response.data.configuration,
    fields: response.data.fields,
  };
};

export const updateVendorConfiguration = async (data) => {
  console.log(data);
  const fields = [];
  fields.push(data.fields.header_field);
  fields.push(...data.fields.secondary_fields);
  console.log(fields);

  const response = await apiClient.post(
    api.endpoints.UPDATE_VENDOR_CONFIGURATION,
    {
      configuration: data.configuration,
      fields: fields,
    }
  );
  return response.data;
};

export const getCustomerData = async (data) => {
  const response = await apiClient.get(api.endpoints.GET_CUSTOMER_DATA, {
    params: data,
  });
  return response.data;
};

export const updateCustomerStatus = async (customer_id, status) => {
  const response = await apiClient.put(
    api.endpoints.UPDATE_CUSTOMER_STATUS.replace(":customer_id", customer_id),
    {
      status: status,
    }
  );
  return response.data;
};

export const updateVendor = async (data) => {
  const response = await apiClient.put(api.endpoints.UPDATE_VENDOR, {
    business_name: data.business_name,
    business_description: data.business_description,
  });
  return response.data;
};

