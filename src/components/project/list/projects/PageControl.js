import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PageControlWrapper = styled(FlexRow)`
  height: 60px;
  margin: -15px 0 25px 0;
`;
const PageControlButton = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-top: 1px;
  cursor: pointer;
  color: lightgray;
  font-family: 'Nanum Gothic Coding', monospace;
  transition: all 0.3s linear;
  @media all and (max-width: 432px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled(FlexRow)`
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  width: 30px;
  height: 30px;
  margin: 0px 7.5px;
  border-radius: 15px;
  background: black;
  color: white;
  box-shadow: 1px 2px #505050;
  transition: all 0.2s linear;
  &:hover {
    background: #252525;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;

const PageControl = ({ projectCount, location }) => {
  const lastPage = Math.max(Math.floor((projectCount + 5) / 6), 1);
  const { page, tag, sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const nowPage = parseInt(page || '1', 10);
  const makeQueryString = (targetPage) => {
    return qs.stringify({ page: targetPage, tag, sort });
  };

  const setList = (start, end) => {
    let ret = [];
    if (projectCount === 0) {
      return [];
    } else if (nowPage > lastPage) {
      return [lastPage];
    } else {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= lastPage) ret.push(i);
      }
      return ret;
    }
  };

  return (
    <PageControlWrapper>
      {nowPage > 1 && (
        <PageControlButton
          to={`/project/list?${makeQueryString(1)}`}
          style={{ marginRight: '5px' }}
        >{`<<`}</PageControlButton>
      )}
      {nowPage > 1 && (
        <PageControlButton
          to={`/project/list?${makeQueryString(nowPage - 1)}`}
          style={{ marginRight: '5px' }}
        >{`<`}</PageControlButton>
      )}
      <PageControlNumberWrapper>
        {setList(nowPage - 2, nowPage + 2).map((n) => (
          <PageControlNumber
            key={n}
            to={`/project/list?${makeQueryString(n)}`}
            style={n === nowPage ? { background: 'white', color: 'black' } : {}}
          >
            {n}
          </PageControlNumber>
        ))}
      </PageControlNumberWrapper>
      {nowPage < lastPage && (
        <PageControlButton
          to={`/project/list?${makeQueryString(nowPage + 1)}`}
          style={{ marginLeft: '5px' }}
        >{`>`}</PageControlButton>
      )}
      {nowPage < lastPage && (
        <PageControlButton
          to={`/project/list?${makeQueryString(lastPage)}`}
          style={{ marginLeft: '5px' }}
        >{`>>`}</PageControlButton>
      )}
    </PageControlWrapper>
  );
};

export default PageControl;
