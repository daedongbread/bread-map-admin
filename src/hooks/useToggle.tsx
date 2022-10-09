import React from 'react';

const useToggle = (initialState = false) => {
  const [activate, setActivate] = React.useState(initialState);

  const onActive = () => {
    setActivate(true);
  };

  const onInactive = () => {
    setActivate(false);
  };

  const onToggleActive = () => {
    setActivate(prev => !prev);
  };

  return { activate, onActive, onInactive, onToggleActive };
};

export default useToggle;
