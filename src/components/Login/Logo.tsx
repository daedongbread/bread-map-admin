import React from 'react';
import styled from '@emotion/styled';

export const Logo = () => {
  return (
    <Container>
      <BreadLogo>
        <img src="/bread-map-admin/images/deabbang.png" />
      </BreadLogo>
      <TextLogo>
        <img src="/bread-map-admin/images/text-logo.png" />
      </TextLogo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BreadLogo = styled.div`
  width: 18rem;
  height: 18rem;
  background-color: ${({ theme }) => theme.color.primary500};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  > img {
    width: 100%;
  }
`;

const TextLogo = styled.div`
  width: 20rem;
  margin-top: 3rem;

  > img {
    width: 100%;
  }
`;
