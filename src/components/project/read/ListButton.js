import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

const Wrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  svg {
    margin-right: 10px;
  }
`;

const ListButton = () => {
  return (
    <Wrapper to="/project/list">
      <BiArrowBack />
      List
    </Wrapper>
  );
};

export default ListButton;
