import React from 'react';
import styled from 'styled-components';
import Main from 'components/home/Main';
import Projects from 'components/home/Projects';
import Posts from 'components/home/Posts';
import Series from 'components/home/Series';
import Tags from 'components/home/Tags';

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  background: #232323;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  grid-template-rows: 300px auto auto;
  overflow: hidden;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 1024px) {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 250px auto auto;
  }
  @media all and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 200px auto auto auto auto;
  }
`;

const Home = () => {
  return (
    <Background>
      <Main />
      <Projects />
      <Posts />
      <Series />
      <Tags />
    </Background>
  );
};

export default Home;
