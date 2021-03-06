import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  top: calc(100% - 90px);
  left: calc(100% - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #ffffff2e;
  cursor: pointer;
  transition: 0.2s all linear;
  svg {
    width: 40px;
    height: 40px;
  }
  &:hover {
    background: #ffffff66;
  }
  @media all and (max-width: 512px) {
    width: 40px;
    height: 40px;
    top: calc(100% - 60px);
    left: calc(100% - 60px);
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const Buttons = () => (
  <Wrapper
    onClick={() => {
      window.scrollTo(0, 0);
    }}
  >
    <AiOutlineArrowUp />
  </Wrapper>
);
export default Buttons;
