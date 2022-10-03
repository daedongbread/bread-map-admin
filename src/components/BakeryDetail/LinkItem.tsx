import React from 'react';
import { Button, Input, SelectBox, BasicSelectTrigger, BasicSelectOption } from '@/components/Shared';
import type { SelectOption } from '@/components/Shared';
import useSelectBox from '@/hooks/useSelectBox';
import { Link, Option } from './LinkForm';

type Props = {
  idx: number;
  link: Link;
  opened: boolean;
  options: Option[];
  onToggleLinkOption: (currIdx: number) => void;
  onSelectLinkOption: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onChangeLinkValue: (payload: { currIdx: number; optionValue: string; linkValue: string }) => void;
  onRemoveLink: (currIdx: number) => void;
};

const LinkItem = ({ idx, link, opened, options, onToggleLinkOption, onSelectLinkOption, onChangeLinkValue, onRemoveLink }: Props) => {
  const { selectedOption, onSelectOption } = useSelectBox();

  const onSelectLink = (option: SelectOption | null) => {
    if (!option) return;
    onSelectOption(option);
    onSelectLinkOption({ currIdx: idx, optionValue: option?.value, linkValue: link.value });
  };

  const onChageLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedOption?.name) return;
    onChangeLinkValue({ currIdx: idx, optionValue: selectedOption?.value, linkValue: e.target.value });
  };

  React.useEffect(() => {
    const option = options.find(option => option.value === link.key);
    if (!option) {
      onSelectOption(null);
    } else {
      onSelectOption(option);
    }
  }, [link]);

  return (
    <>
      <SelectBox
        width={130}
        isOpen={opened}
        onToggleSelectBox={() => onToggleLinkOption(idx)}
        triggerComponent={<BasicSelectTrigger selectedOption={selectedOption} />}
      >
        {options.map((option, idx) => (
          <BasicSelectOption key={idx} option={option} onSelectOption={onSelectLink} />
        ))}
      </SelectBox>
      <Input type={'plain'} onChangeInput={onChageLink} value={link.value} />
      <Button type={'gray'} text={'삭제'} btnSize={'small'} onClickBtn={() => onRemoveLink(idx)} />
    </>
  );
};

export default LinkItem;
