// import React from 'react';
// import { Cell } from 'react-table';
// import { SelectBox } from '@/components/Shared/SelectBox';
// import type { SelectOption } from '@/components/Shared/SelectBox';
// import styled from '@emotion/styled';
// import { ChevronDown } from '../Shared/Icons';
// import { Option, SelectBoxProps, SelectOptions, SelectTrigger } from '../Shared/SelectBox/GraySelectBox';

// // TODO: 상세페이지로 이동, UI 수정 필요
// // 현재 사용되는곳 없음(22/08/10)
// export const StatusSelectBox = ({ isOpen, onToggleSelectBox, width, selectedOption, onSelectOption, options }: SelectBoxProps) => {
//   return (
//     <SelectBox isOpen={isOpen} onToggleSelectBox={onToggleSelectBox} width={width} selectedOption={selectedOption} onSelectOption={onSelectOption}>
//       <>
//         <SelectTrigger>
//           <div>circle</div>
//           <span>{selectedOption?.name}</span>
//           <ChevronDown />
//         </SelectTrigger>
//         <SelectOptions isOpen={isOpen}>
//           {options?.map((option, idx) => (
//             <Option key={idx} onClick={() => onSelectOption(option)}>
//               <div>circle</div>
//               <span>{option.name}</span>
//             </Option>
//           ))}
//         </SelectOptions>
//       </>
//     </SelectBox>
//   );
//   //<Select>{value}</Select>;
// };

// const Select = styled.div`
//   background-color: green;
// `;
