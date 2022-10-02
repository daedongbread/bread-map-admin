import React from 'react';
import { useNavigate } from 'react-router-dom';
import Routes from '@/constants/routes';

const useNavigation = () => {
  const navigate = useNavigate();

  const navigatePath = (path: Routes) => {
    navigate(path);
  };

  return { navigatePath };
};

export default useNavigation;
