import styled from '@emotion/styled';

export const Row = styled.div<{ alignTop?: boolean }>`
  display: flex;
  align-items: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};

  > label {
    width: 12rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  &:not(label) {
    flex: 1;
  }
`;

export const RowHalf = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2.5rem;

  > div {
    flex-basis: 46%;
    display: flex;
    align-items: center;

    > label {
      width: 5rem;
    }
  }
`;

export const RowContents = styled.div`
  flex: 1;
`;
