import React from 'react';
import { Button, Input } from '@/components/Shared';
import { GraySelectBox, SelectOption } from '@/components/Shared/SelectBox';
import useSelectBox from '@/hooks/useSelectBox';
import { Link, Option } from './LinkForm';

type Props = {
  idx: number;
  link: Link;
  opened: boolean;
  options: Option[];
  onToggleLinkOption: (currIdx: number) => void;
  onSelectLinkOption: (currIdx: number, option: SelectOption | null) => void;
  onChangeLinkUrl: (currIdx: number, url: string) => void;
  onRemoveLink: (currIdx: number) => void;
};

const LinkItem = ({ idx, link, opened, options, onToggleLinkOption, onSelectLinkOption, onChangeLinkUrl, onRemoveLink }: Props) => {
  const { selectedOption, onSelectOption } = useSelectBox();

  const onSelectLink = (option: SelectOption | null) => {
    onSelectOption(option);
    onSelectLinkOption(idx, option);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeLinkUrl(idx, e.target.value);
  };

  const onRemove = () => {
    onRemoveLink(idx);
  };

  const onToggle = () => {
    onToggleLinkOption(idx);
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
      <GraySelectBox isOpen={opened} selectedOption={selectedOption} onToggleSelectBox={onToggle} onSelectOption={onSelectLink} options={options} width={130} />
      <Input type={'plain'} onChangeInput={onChangeInput} value={link.value} />
      <Button type={'gray'} text={'삭제'} btnSize={'small'} onClickBtn={onRemove} />
    </>
  );
};

export default LinkItem;
