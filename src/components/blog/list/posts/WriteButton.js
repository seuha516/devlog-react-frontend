import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';

const WriteButtonWrapper = styled(Link)`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 35px;
  padding: 0px 10px;
  background-color: #2969ff;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: #0136b2;
  }
  @keyframes turn {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
const WriteButtonText = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
`;

const WriteButton = () => {
  return (
    <WriteButtonWrapper to="/blog/write">
      <BiPencil />
      <WriteButtonText>Write</WriteButtonText>
    </WriteButtonWrapper>
  );
};

export default WriteButton;
