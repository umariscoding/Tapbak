import { toast } from 'react-toastify';

// Success toasts
export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Error toasts
export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Warning toasts
export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Info toasts
export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// API success handler
export const handleApiSuccess = (message, data = null) => {
  showSuccess(message);
  return data;
};

// API error handler
export const handleApiError = (error, defaultMessage = "Something went wrong") => {
  const message = error?.response?.data?.message || error?.message || defaultMessage;
  showError(message);
  throw error;
};

// Form validation error handler
export const showValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    errors.forEach(error => showError(error));
  } else if (typeof errors === 'string') {
    showError(errors);
  } else {
    showError("Please fix the validation errors");
  }
};
