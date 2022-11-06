import React from 'react';
import { SelectOption } from '@/components/Shared/SelectBox';

const useSelectBox = (defaultOption?: SelectOption) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<SelectOption | null>(null);

  React.useEffect(() => {
    if (defaultOption) {
      console.log(defaultOption);
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
  // 해당 함수들은 UI 업데이트를 위한 함수들이고, 여러개를 이용하는 경우 상태는 외부에서 따로 관리 필요
};

export default useSelectBox;
