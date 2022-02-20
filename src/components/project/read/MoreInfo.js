import React from 'react';
import styled from 'styled-components';
import { BiCodeBlock } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 12.5px 0px;
  font-size: 20px;
  font-family: 'PT Sans', sans-serif;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const color = {
  'Group Project': '#2e006f',
  'Personal Project': '#00138a',
  Practice: '#5a5a5a',
  'In Progress': '#604f00',
  Complete: '#00653e',
};

const MoreInfo = ({ moreInfo }) => {
  return (
    <Wrapper>
      <Info style={{ color: color[moreInfo.projectClass] }}>
        <BiCodeBlock />
        {moreInfo.projectClass}
      </Info>
      <Info style={{ color: color[moreInfo.developState] }}>
        <GiSandsOfTime />
        {moreInfo.developState}
      </Info>
    </Wrapper>
  );
};

export default MoreInfo;
