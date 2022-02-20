import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { BiArrowBack } from 'react-icons/bi';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 62px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #000000c7;
  font-family: 'Zen Dots', cursive;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const Title = styled.div`
  font-size: 30px;
`;
const Home = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 35px;
  font-size: 24px;
  color: #9b9b9b;
  svg {
    width: 30px;
    height: 30px;
    margin: 0 10px 1.5px 0;
  }
`;

const NotFound = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Not Found';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  return (
    <Wrapper>
      <Title>Not Found</Title>
      <Home to="/">
        <BiArrowBack />
        Home
      </Home>
    </Wrapper>
  );
};

export default NotFound;
