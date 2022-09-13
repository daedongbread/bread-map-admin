import React, { MouseEvent, useEffect, useState } from 'react';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import { Button } from '../Shared/Button';
import { SelectOption } from '../Shared/SelectBox';
import LinkItem from './LinkItem';

export type Option = {
  name: string;
  value: string;
};

const options: Option[] = [
  { name: '웹사이트', value: 'websiteURL' },
  { name: '인스타그램', value: 'instagramURL' },
  { name: '페이스북', value: 'facebookURL' },
  { name: '기타', value: 'blogURL' },
];

type Props = {
  label: string;
  form: { [key: string]: any };
  onChangeForm: (key: string, value: any) => void;
};

export type Link = {
  value: string;
  url: string;
};

const initialLink: Link[] = [
  {
    value: 'websiteURL',
    url: '',
  },
  {
    value: 'instagramURL',
    url: '',
  },
];

export const LinkForm = ({ label, form, onChangeForm }: Props) => {
  const [links, setLinks] = useState<Link[]>(initialLink);
  const [openedLinkIdx, setOpenedLinkIdx] = useState<number | null>(null);

  useEffect(() => {
    links.forEach(link => {
      onChangeForm(link.value, link.url);
    });
  }, [links]);

  const onToggleLinkOption = (currIdx: number) => {
    if (currIdx === openedLinkIdx) setOpenedLinkIdx(null);
    else setOpenedLinkIdx(currIdx);
  };

  const onSelectLinkOption = (currIdx: number, option: SelectOption | null) => {
    // 이미 존재하는 유형을 선택할 경우 막아주기
    const updatedLinks: Link[] = links.map((link, idx) => {
      if (currIdx === idx) {
        if (option) {
          return {
            ...link,
            value: option.value,
          };
        } else {
          return {
            value: '',
            url: '',
          };
        }
      } else return link;
    });

    setLinks([...updatedLinks]);
  };

  const onChangeLinkUrl = (currIdx: number, url: string) => {
    const updatedLinks: Link[] = links.map((link, idx) => {
      if (currIdx === idx) {
        const option = options.find(option => option.value === link.value);
        if (option) {
          onChangeForm(option.value, url);
        }
        return {
          ...link,
          url,
        };
      } else return link;
    });

    setLinks([...updatedLinks]);
  };

  const onRemoveLink = (currIdx: number) => {
    const updatedLinks = links.filter((link, idx) => {
      const option = links[currIdx];
      if (option) {
        onChangeForm(option.value, '');
      }
      return currIdx !== idx;
    });
    setLinks([...updatedLinks]);
  };

  const onAddLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLinks(prev => [...prev, { value: '', url: '' }]);
  };

  return (
    <Row>
      <Row alignTop>
        <label>{label}</label>
        <CustomRowContents>
          <>
            {links.map((_, idx) => (
              <CustomRow key={`link-${idx}`}>
                <LinkItem
                  idx={idx}
                  link={links[idx]}
                  opened={openedLinkIdx === idx}
                  options={options}
                  onToggleLinkOption={onToggleLinkOption}
                  onSelectLinkOption={onSelectLinkOption}
                  onChangeLinkUrl={onChangeLinkUrl}
                  onRemoveLink={onRemoveLink}
                />
              </CustomRow>
            ))}
          </>
          <Row>
            <BtnWrapper>
              <Button type={'lightOrange'} text={'추가하기'} btnSize={'small'} onClickBtn={onAddLink} />
            </BtnWrapper>
          </Row>
        </CustomRowContents>
      </Row>
    </Row>
  );
};

const CustomRowContents = styled(RowContents)`
  input {
    flex: 1;
    margin: 0 5px 0 10px;
  }
`;

const CustomRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  /* * {
    &:not(:last-of-type) {
      margin-right: 10px;
    }
  } */
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 6.4rem;
`;
