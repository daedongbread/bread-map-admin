import React from 'react';
import { Button, SelectOption } from '@/components/Shared';
import { Row, RowContents } from '@/styles';
import styled from '@emotion/styled';
import LinkItem from './LinkItem';

export type Option = {
  name: string;
  value: string;
};

export type Link = {
  key: string;
  value: string;
};

type Props = {
  label: string;
  links: Link[];
  updateLinks: (links: Link[]) => void;
};

export const LinkForm = ({ label, links, updateLinks }: Props) => {
  const [openedLinkIdx, setOpenedLinkIdx] = React.useState<number | null>(null);

  const onToggleLinkOption = (currIdx: number) => {
    if (currIdx === openedLinkIdx) setOpenedLinkIdx(null);
    else setOpenedLinkIdx(currIdx);
  };

  const onSelectLinkOption = (currIdx: number, option: SelectOption | null) => {
    // 이미 존재하는 유형을 선택할 경우 막아주기
    const updatedLinks = links.map((link, idx) => {
      if (currIdx === idx) {
        if (option) {
          return {
            ...link,
            key: option.value,
          };
        } else {
          return {
            key: '',
            value: '',
          };
        }
      } else return link;
    });
    updateLinks(updatedLinks);
  };

  const onChangeLinkUrl = (currIdx: number, url: string) => {
    const updatedLinks = links.map((link, idx) => {
      if (currIdx === idx) {
        return {
          ...link,
          value: url,
        };
      } else {
        return link;
      }
    });
    updateLinks(updatedLinks);
  };

  const onRemoveLink = (currIdx: number) => {
    const updatedLinks = links.filter((link, idx) => currIdx !== idx);
    updateLinks(updatedLinks);
  };

  const onAddLink = () => {
    updateLinks([...links, { key: '', value: '' }]);
  };

  return (
    <Row>
      <Row alignTop>
        <label>{label}</label>
        <CustomRowContents>
          <>
            {links.map((link, idx) => (
              <CustomRow key={`link-${idx}`}>
                <LinkItem
                  idx={idx}
                  link={link}
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

/** constants */

const options: Option[] = [
  { name: '웹사이트', value: 'websiteURL' },
  { name: '인스타그램', value: 'instagramURL' },
  { name: '페이스북', value: 'facebookURL' },
  { name: '기타', value: 'blogURL' },
];

// const initialLink: Link[] = [
//   {
//     key: 'websiteURL',
//     value: '',
//   },
//   {
//     key: 'instagramURL',
//     value: '',
//   },
// ];

/** style */

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
