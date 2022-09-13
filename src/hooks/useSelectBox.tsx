import React, { useState } from 'react';
import { SelectOption } from '@/components/Shared/SelectBox';

const useSelectBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

  const onToggleSelectBox = () => {
    setIsOpen(prev => !prev);
  };
  const onSelectOption = (option: SelectOption | null) => {
    setSelectedOption(option);
  };
  return { isOpen, selectedOption, onToggleSelectBox, onSelectOption };
  // 두개이상의 selectBox 사용시 selectedOption, onSelectOption만 사용
};

export default useSelectBox;
