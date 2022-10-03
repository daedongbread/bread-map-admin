import React from 'react';
import { SelectOption } from '@/components/Shared/SelectBox';

const useSelectBox = (defaultOption?: SelectOption) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(null);

  React.useEffect(() => {
    if (defaultOption) {
      onSelectOption(defaultOption);
    }
  }, []);

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
