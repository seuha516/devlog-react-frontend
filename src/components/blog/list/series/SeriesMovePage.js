import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(FlexBox)`
  width: 100%;
  margin-top: 5px;
  margin: -15px 0 30px 0;
  justify-content: space-between;
`;
const SetPage = styled(FlexBox)`
  width: 106px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    margin: 0 3px -1.5px 3px;
    border-radius: 30px;
    transition: all 0.2s linear;
  }
  &:hover {
    text-shadow: 1px 1px 1px gray;
    svg {
      background-color: black;
      color: white;
    }
  }
`;
const SetPageText = styled(FlexBox)`
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
`;

const SeriesMovePage = ({ setPage }) => {
  return (
    <Wrapper>
      <SetPage
        style={{ justifyContent: 'flex-start' }}
        onClick={() => setPage(1)}
      >
        <AiOutlineLeftCircle />
        <SetPageText>Posts</SetPageText>
      </SetPage>
      <SetPage
        style={{ justifyContent: 'flex-end' }}
        onClick={() => setPage(0)}
      >
        <SetPageText>Tags</SetPageText>
        <AiOutlineRightCircle />
      </SetPage>
    </Wrapper>
  );
};

export default SeriesMovePage;
