import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 100px;
`;
const Rectangle1 = styled.div`
  width: calc(100% - 80px);
  height: 100%;
  background-color: #ffffffde;
`;
const Rectangle2 = styled.div`
  width: 80px;
  height: 20px;
  margin-top: 80px;
  border-right: 2px solid gray;
  background-color: #ffffffde;
`;
const Triangle = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  margin-left: calc(min(100%, 1020px) - 100px);
  display: inline-block;
  vertical-align: middle;
  border-top: solid 40px transparent;
  border-right: solid 40px transparent;
  border-bottom: solid 40px #898989;
  border-left: solid 40px #898989;
  box-shadow: -2px 2px 2px black;
`;

const Header = () => {
  return (
    <Wrapper>
      <Rectangle1 />
      <Triangle />
      <Rectangle2 />
    </Wrapper>
  );
};

export default Header;
