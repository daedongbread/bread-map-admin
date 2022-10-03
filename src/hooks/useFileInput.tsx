import React from 'react';

const useFileInput = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClickTriggerFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const getSrc = (file: File | string | null) => {
    // 서버에서 내려주는 img가 어떤형태인가?
    if (!file) return null;

    if (typeof file === 'string') {
      if (file.includes('http')) {
        // storage imag ?
        return file;
      } else {
        return '';
      }
    } else {
      return URL.createObjectURL(file);
    }
  };

  return { inputRef, onClickTriggerFile, getSrc };
};

export default useFileInput;
