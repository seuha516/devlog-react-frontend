import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 45px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 20px;
  padding-bottom: 2px;
  margin: 5px 10px;
  transition: all 0.3s ease-in-out;
  svg {
    width: 25px;
    height: 25px;
    margin: 2px 7.5px 0 0;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: ${(props) => props.hoverColor};
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

const Buttons = ({ onEdit, onRemove }) => {
  return (
    <Wrapper>
      <Button hoverColor="#714900" onClick={onEdit}>
        <AiOutlineEdit />
        Edit
      </Button>
      <Button hoverColor="#850000" onClick={onRemove}>
        <AiOutlineDelete />
        Delete
      </Button>
    </Wrapper>
  );
};

export default withRouter(Buttons);
