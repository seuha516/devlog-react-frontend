import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineReload } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

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
  font-size: 35px;
  margin-bottom: 45px;
`;
const Reload = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-bottom: 15px;
  color: #9b9b9b;
  svg {
    width: 30px;
    height: 30px;
    margin: 0 10px 1.5px 0;
  }
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: white;
  }
`;
const Home = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #9b9b9b;
  svg {
    width: 30px;
    height: 30px;
    margin: 0 10px 1.5px 0;
  }
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: white;
  }
`;

const Error = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Error';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  return (
    <Wrapper>
      <Title>Error</Title>
      <Reload onClick={() => window.location.reload(true)}>
        <AiOutlineReload />
        Reload
      </Reload>
      <Home to="/">
        <BiArrowBack />
        Home
      </Home>
    </Wrapper>
  );
};

export default Error;
