const { baseUrl, api } = {
  baseUrl: "http://localhost:8000",
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
      UPDATE_VENDOR: "/pass/vendor"
    },
  },
};

export { baseUrl, api };
