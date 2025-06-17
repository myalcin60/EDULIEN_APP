import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from 'react';

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
};//



// Error handler
export const handleError = (error, contextMessage = 'Error occurred') => {
  console.error(contextMessage, error);
  showToast(contextMessage, 'error');
};

// Confirm dialog helper
export const confirmDialog = (message) => {
  return window.confirm(message);
};

//Hamburger menu

export const Hamburger=()=>{
const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          isOpen &&
          navRef.current &&
          !navRef.current.contains(e.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);
    const toggleMenu = () => setIsOpen(!isOpen);
    return {
    isOpen,
    toggleMenu,
    navRef,
    hamburgerRef,
    setIsOpen,
  };

};
