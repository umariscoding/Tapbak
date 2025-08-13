import apiClient from "./apiClient";
import { api } from "./constants.js";
import { showSuccess } from "../utils/toast.js";

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

export const addToWalletHandler = async (
  firstName,
  lastName,
  email,
  phone,
  vendorName,
  dateOfBirth
) => {
  try {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contactNumber", phone);
    formData.append("dateOfBirth", dateOfBirth);

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

export const updateVendorConfiguration = async (data, images) => {
  for (const [key, value] of Object.entries(images)) {
    if (value) {
      const response = await uploadImage(value);
      data.configuration[key] = response.url;
    }
  }
  console.log(data.configuration);
  const fields = [];
  fields.push(data.fields.header_field);
  fields.push(...data.fields.secondary_fields);

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
  if(response.status === 200){
    showSuccess("Vendor updated successfully!");
  window.localStorage.setItem(
      "currentVendor",
      JSON.stringify(response.data.vendor)
    );
  }
  return response.data;
};

export const getPublicVendor = async (vendor_id) => {
  const response = await apiClient.get(
    api.endpoints.GET_PUBLIC_VENDOR.replace(":vendor_id", vendor_id)
  );
  return response.data;
};

export const uploadImage = async (file) => {
  // If it's already a URL string, return it as is
  if (
    typeof file === "string" &&
    (file.startsWith("http://") || file.startsWith("https://"))
  ) {
    return { url: file };
  }

  // Otherwise, upload the file
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiClient.post(api.endpoints.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const fetchCustomerData = async (customer_id) => {
  const response = await apiClient.get(
    api.endpoints.FETCH_CUSTOMER_DATA.replace(":customer_id", customer_id)
  );
  console.log(response.data);
  return response.data;
};

export const processTransaction = async (
  customer_id,
  transaction_type,
  transaction_amount,
  transaction_points
) => {
  const response = await apiClient.post(
    api.endpoints.PROCESS_TRANSACTION,
    {
      customer_id: customer_id,
      transaction_type: transaction_type,
      transaction_amount: transaction_amount,
      transaction_points: transaction_points,
    }
  );
  return response.data;
};

export const getTransactions = async (data) => {
  const response = await apiClient.get(api.endpoints.GET_TRANSACTIONS, {
    params: data,
  });
  return response.data;
};