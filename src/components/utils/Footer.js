import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';

const Wrapper = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 35px 100px;
  color: white;
  background-color: #171717;
  @media all and (max-width: 1024px) {
    height: 130px;
    padding: 33.5px 80px;
  }
  @media all and (max-width: 768px) {
    height: 100px;
    padding: 25px 40px;
  }
`;
const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const URL = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  @media all and (max-width: 1024px) {
    font-size: 18px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
`;
const Name = styled.div`
  font-size: 20px;
  font-family: 'Noto Serif KR', serif;
  @media all and (max-width: 1024px) {
    font-size: 18px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
`;
const Login = styled(Link)`
  font-size: 18px;
  font-family: 'Noto Serif KR', serif;
  color: gray;
  margin-top: 0.5px;
  margin-left: 20px;
  @media all and (max-width: 1024px) {
    font-size: 15px;
    margin-top: 1.5px;
    margin-left: 10px;
  }
  @media all and (max-width: 768px) {
    font-size: 13px;
  }
`;
const Icon = styled.a`
  margin-left: 20px;
  @media all and (max-width: 1024px) {
    margin-left: 18px;
  }
  @media all and (max-width: 768px) {
    margin-left: 15px;
  }
  @media all and (max-width: 400px) {
    margin-left: 10px;
  }
  svg {
    width: 30px;
    height: 30px;
    @media all and (max-width: 1024px) {
      width: 27px;
      height: 27px;
    }
    @media all and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
    @media all and (max-width: 400px) {
      width: 18px;
      height: 18px;
    }
  }
`;
const VisitorIcon = styled(Link)`
  margin-left: 20px;
  @media all and (max-width: 1024px) {
    margin-left: 18px;
  }
  @media all and (max-width: 768px) {
    margin-left: 15px;
  }
  @media all and (max-width: 400px) {
    margin-left: 10px;
  }
  svg {
    width: 30px;
    height: 30px;
    @media all and (max-width: 1024px) {
      width: 27px;
      height: 27px;
    }
    @media all and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
    @media all and (max-width: 400px) {
      width: 18px;
      height: 18px;
    }
  }
`;
const Info = styled.div`
  font-size: 16px;
  font-family: 'Nanum Myeongjo', serif;
  margin-top: 3px;
  margin-left: 15px;
  @media all and (max-width: 1024px) {
    font-size: 14px;
    margin-left: 10px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
    margin-left: 8px;
  }
  @media all and (max-width: 620px) {
    display: none;
  }
`;

const Footer = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <Wrapper>
      <Flexbox>
        <URL>seungha-devlog.com</URL>
        <Flexbox>
          {user && (
            <VisitorIcon to="/visitor">
              <BsGraphUp />
            </VisitorIcon>
          )}
          <Icon
            href="https://github.com/seuha516"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </Icon>
          <Icon
            href="https://www.facebook.com/seuha516"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFacebook />
          </Icon>
        </Flexbox>
      </Flexbox>
      <Flexbox>
        <Flexbox>
          <Name>전승하</Name>
          {!user && <Login to="/login">Admin Login</Login>}
        </Flexbox>
        <Flexbox>
          <Info>이메일: seuha516@naver.com</Info>
          <Info>카카오톡: seuha516</Info>
          <Info>깃허브: seuha516</Info>
        </Flexbox>
      </Flexbox>
    </Wrapper>
  );
};

export default Footer;
