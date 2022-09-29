import React from 'react';

const useFileInput = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickTriggerFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const getSrc = (file: File | null) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  return { inputRef, onClickTriggerFile, getSrc };
};

export default useFileInput;
