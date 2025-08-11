const { baseUrl, api } = {
  baseUrl: "https://9674bf5a250a.ngrok-free.app",
  api: {
    endpoints: {
      CREATE_PASS: "/pass/create/:vendorName",
      GET_FIELD_DEFINITIONS: "/pass/field-definitions",
      CREATE_VENDOR: "/pass/create-vendor",
    },
  },
};

export { baseUrl, api };
