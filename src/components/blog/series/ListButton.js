import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const Wrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin-bottom: 25px;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 2px black;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  svg {
    margin-right: 10px;
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
