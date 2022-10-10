import React from 'react';
import { useLocation } from 'react-router-dom';

const usePath = () => {
  const location = useLocation();

  const getCurrPath = () => {
    return location.pathname;
  };
  return { getCurrPath };
};

export default usePath;
