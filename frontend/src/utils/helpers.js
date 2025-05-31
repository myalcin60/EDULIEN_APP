import { toast } from "react-toastify";

export const showToast = (message, type = 'info') => {
  const config = { position: 'top-right', autoClose: 3000 };
  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'warning':
      toast.warning(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    default:
      toast.info(message, config);
  }
};



// Error handler
export const handleError = (error, contextMessage = 'Error occurred') => {
  console.error(contextMessage, error);
  showToast(contextMessage, 'error');
};

// Confirm dialog helper
export const confirmDialog = (message) => {
  return window.confirm(message);
};
