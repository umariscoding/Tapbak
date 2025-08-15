const { baseUrl, api } = {
  baseUrl: "https://b8313854cade.ngrok-free.app",
  api: {
    endpoints: {
      CREATE_PASS: "/pass/create/:vendorName",
      GET_FIELD_DEFINITIONS: "/pass/field-definitions",

      GET_STATISTICS: "/pass/statistics",

      CREATE_VENDOR: "/pass/create-vendor",
      LOGIN_VENDOR: "/pass/login",

      GET_VENDOR_CONFIGURATION: "/pass/config",
      UPDATE_VENDOR_CONFIGURATION: "/pass/save-config",

      GET_CUSTOMER_DATA: "/pass/customers",
      UPDATE_CUSTOMER_STATUS: "/pass/customers/:customer_id/status",
      UPDATE_VENDOR: "/pass/vendor", 
      GET_PUBLIC_VENDOR: "/pass/public-vendor/:vendor_id",
      UPLOAD_IMAGE: "/pass/upload-image", 

      FETCH_CUSTOMER_DATA: "/pass/customers/:customer_id", 

      PROCESS_TRANSACTION: "/pass/process-transaction",
      GET_TRANSACTIONS: "/pass/transactions"
    },
  },
};

export { baseUrl, api };
