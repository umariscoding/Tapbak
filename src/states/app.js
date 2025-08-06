import apiClient from "./apiClient";
import { api } from "./constants.js";

export const addToWalletHandler = async (name, email, phone, vendorName) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    const response = await apiClient.post(
      api.endpoints.createPass.replace(":vendorName", vendorName),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", 
      }
    );

    const blob = new Blob([response.data], { type: "application/vnd.apple.pkpass" });
    const url = window.URL.createObjectURL(blob);
    window.location.href = url;
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    return true;
  } catch (error) {
    console.error("Error adding to wallet:", error);
    throw error;
  }
};
