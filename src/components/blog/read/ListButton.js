import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const Wrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  text-shadow: 2px 2px 2px white;
  transition: all 0.2s linear;
  svg {
    margin-right: 10px;
    transition: all 0.3s linear;
  }
  &:hover {
    font-size: 30px;
    svg {
      transform: rotateX(180deg);
    }
  }
`;

const ListButton = () => {
  return (
    <Wrapper to="/blog/list">
      <BiArrowBack />
      List
    </Wrapper>
  );
};

export default ListButton;
