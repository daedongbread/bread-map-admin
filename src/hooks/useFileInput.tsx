import React from 'react';

const useFileInput = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickTriggerFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const getSrc = (file: File | string | null) => {
    if (!file) return null;

    if (typeof file === 'string') {
      if (file.includes('http')) {
        // storage imag ?
        return file;
      } else {
        return file;
      }
    } else {
      return URL.createObjectURL(file);
    }
  };

  return { inputRef, onClickTriggerFile, getSrc };
};

export default useFileInput;
