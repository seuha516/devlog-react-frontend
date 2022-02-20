import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineFileAdd } from 'react-icons/ai';

const AddButtonWrapper = styled(Link)`
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
const AddButtonText = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
`;

const AddButton = () => {
  return (
    <AddButtonWrapper to="/project/write">
      <AiOutlineFileAdd />
      <AddButtonText>Add</AddButtonText>
    </AddButtonWrapper>
  );
};

export default AddButton;
