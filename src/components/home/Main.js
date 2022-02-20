import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #5d8bd7;
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  @media all and (max-width: 1024px) {
    grid-column: 1 / 11;
  }
  @media all and (max-width: 768px) {
    grid-column: 1 / 2;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 57.5% 50%;
  position: relative;
  z-index: 2;
`;
const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 32%;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 1;
  transform: translate(-50%, -50%);
`;
const Text1 = styled.div`
  font-size: 62px;
  font-family: 'Zen Dots', cursive;
  @media all and (max-width: 1024px) {
    font-size: 50px;
  }
  @media all and (max-width: 768px) {
    font-size: 35px;
  }
`;
const Text2 = styled.div`
  margin: 40px 0 15px 0;
  font-size: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  @media all and (max-width: 1024px) {
    font-size: 20px;
    margin: 30px 0 10px 0;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    margin: 20px 0 7px 0;
  }
`;
const Wave = styled.div`
  position: absolute;
  opacity: 0.4;
  top: calc(50% + 168vw);
  left: 50%;
  background: #5eb0d7;
  width: 320vw;
  height: 320vw;
  margin-left: -160vw;
  margin-top: -160vw;
  transform-origin: 50% 48%;
  border-radius: 43%;
  z-index: 0;
  animation: drift 10000ms infinite linear;
  @keyframes drift {
    from {
      transform: rotate(0deg);
    }
    from {
      transform: rotate(360deg);
    }
  }
  @media all and (max-width: 1024px) {
    top: calc(50% + 155vw);
    width: 300vw;
    height: 300vw;
    margin-left: -150vw;
    margin-top: -150vw;
  }
  @media all and (max-width: 768px) {
    top: calc(50% + 145vw);
    width: 280vw;
    height: 280vw;
    margin-left: -140vw;
    margin-top: -140vw;
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <Image src="/images/home/Back.png" alt="MainImage" />
      <TextWrapper>
        <Text1>
          Develop
          <br />
          Blog
        </Text1>
        <Text2>개발 기록을 남기는 공간</Text2>
      </TextWrapper>
      <Wave />
    </Wrapper>
  );
};

export default Main;
