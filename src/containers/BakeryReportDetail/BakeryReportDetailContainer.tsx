import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBakeryReport } from '@/apis';
import { Report } from '@/components/BakeryReportDetail';
import { Button, SelectBox, StatusSelectOption, StatusSelectTrigger } from '@/components/Shared';
import { Header } from '@/components/Shared/Header';
import { GhRoutes } from '@/constants/routes';
import useSelectBox from '@/hooks/useSelectBox';
import { color } from '@/styles';
import { extractContentsWithType } from '@/utils';
import styled from '@emotion/styled';

const options = [
  { name: '검토전', value: 'BEFORE_REFLECT', color: color.primary500 },
  { name: '반영완료', value: 'REFLECT', color: color.green },
  { name: '미반영', value: 'NOT_REFLECT', color: color.red },
];

export const BakeryReportDetailContainer = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const { bakeryReport, error } = useGetBakeryReport({ reportId: Number(reportId) });
  const { isOpen, selectedOption, onToggleSelectBox, onSelectOption } = useSelectBox(options[0]);

  const onClickBack = () => {
    navigate(GhRoutes.BAKERY_REPORT);
  };

  const onClickAddBakery = () => {
    navigate(`${GhRoutes.BAKERIES}/new`);
  };

  return (
    <>
      <Header name={'제보관리 > 제보 내용 상세'} />
      <Container>
        <Content>
          <ContentHeader>
            <Button btnSize={'small'} text={'목록 돌아가기'} type={'gray'} onClickBtn={onClickBack} />
            <Wrapper>
              <Button btnSize={'small'} text={'신규등록'} type={'orange'} onClickBtn={onClickAddBakery} />
              <SelectBox
                width={120}
                isOpen={isOpen}
                onToggleSelectBox={onToggleSelectBox}
                triggerComponent={<StatusSelectTrigger selectedOption={selectedOption} />}
              >
                {options.map((option, idx) => (
                  <StatusSelectOption key={idx} active={option.name === selectedOption?.name} option={option} onSelectOption={onSelectOption} />
                ))}
              </SelectBox>
            </Wrapper>
          </ContentHeader>
          {bakeryReport && <Report contents={extractContentsWithType(bakeryReport)} />}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.color.gray50};
  padding: 2rem;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-bottom: 1rem;
    &:first-of-type {
      justify-self: flex-start;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  button {
    margin-right: 1rem;
  }
`;
