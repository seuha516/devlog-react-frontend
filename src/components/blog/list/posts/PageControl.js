import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
//페이지 컨트롤 구역
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
  background: white;
  box-shadow: 1px 2px gray;
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;

const PageControl = ({ location, postCount }) => {
  const lastPage = Math.max(Math.floor((postCount + 5) / 6), 1);
  const { page, tag, project, sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const nowPage = parseInt(page || '1', 10);
  const makeQueryString = (targetPage) => {
    return qs.stringify({ page: targetPage, tag, project, sort });
  };

  const setList = (start, end) => {
    let ret = [];
    if (postCount === 0) {
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
      {nowPage > 1 && postCount > 0 && (
        <PageControlButton
          to={`/blog/list?${makeQueryString(1)}`}
          style={{ marginRight: '5px' }}
        >{`<<`}</PageControlButton>
      )}
      {nowPage > 1 && postCount > 0 && (
        <PageControlButton
          to={`/blog/list?${makeQueryString(nowPage - 1)}`}
          style={{ marginRight: '5px' }}
        >{`<`}</PageControlButton>
      )}
      <PageControlNumberWrapper>
        {setList(nowPage - 2, nowPage + 2).map((n) => (
          <PageControlNumber
            key={n}
            to={`/blog/list?${makeQueryString(n)}`}
            style={n === nowPage ? { background: 'black', color: 'white' } : {}}
          >
            {n}
          </PageControlNumber>
        ))}
      </PageControlNumberWrapper>
      {nowPage < lastPage && postCount > 0 && (
        <PageControlButton
          to={`/blog/list?${makeQueryString(nowPage + 1)}`}
          style={{ marginLeft: '5px' }}
        >{`>`}</PageControlButton>
      )}
      {nowPage < lastPage && postCount > 0 && (
        <PageControlButton
          to={`/blog/list?${makeQueryString(lastPage)}`}
          style={{ marginLeft: '5px' }}
        >{`>>`}</PageControlButton>
      )}
    </PageControlWrapper>
  );
};

export default PageControl;
