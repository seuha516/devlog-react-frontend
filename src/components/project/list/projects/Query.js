import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  margin: -15px 0 30px 0;
`;
const Tag = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: 'Do Hyeon', sans-serif;
  margin: -2.5px 5px;
  border-radius: 3px;
  padding: 5px;
  color: #b1b1b1;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 0 2px -7px;
    color: white;
  }
  &:hover {
    background-color: #630d0d;
  }
`;
const Sort = styled(FlexBox)`
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  align-items: flex-start;
  color: #b3b3b3;
`;
const SortItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    margin: 0 3px -1.5px 0;
  }
  &:hover {
    color: #88a1ff;
    font-weight: 600;
  }
`;
const SetPage = styled(FlexBox)`
  width: 106px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    margin: 0 3px -1.5px 3px;
    border-radius: 30px;
    transition: all 0.2s linear;
  }
  &:hover {
    text-shadow: 1px 1px 1px black;
    svg {
      background-color: white;
      color: black;
    }
  }
  @media all and (max-width: 400px) {
    width: 50px;
  }
`;
const SetPageText = styled(FlexBox)`
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
  @media all and (max-width: 400px) {
    display: none;
  }
`;

const Query = ({ location, setPage }) => {
  const { tag, sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const makeQueryString = ({ tag, sort }) => {
    const queryObject = {
      ...(tag ? { tag: tag } : {}),
      ...(sort ? { sort: sort } : {}),
    };
    return qs.stringify(queryObject);
  };
  return (
    <Wrapper>
      {tag && (
        <Tag to={`/project/list?${makeQueryString({ sort })}`}>
          <BsHash />
          {tag}
        </Tag>
      )}
      <Sort>
        <SetPage
          style={{ justifyContent: 'flex-start' }}
          onClick={() => setPage(0)}
        >
          <AiOutlineLeftCircle />
          <SetPageText>Tags</SetPageText>
        </SetPage>
        {sort === '1' ? (
          <SortItem
            to={`/project/list?${makeQueryString({
              tag,
              sort: '-1',
            })}`}
          >
            <BiTimeFive />
            최신순으로 보기
          </SortItem>
        ) : (
          <SortItem to={`/project/list?${makeQueryString({ tag, sort: '1' })}`}>
            <BiTimeFive />
            작성순으로 보기
          </SortItem>
        )}
        <SetPage></SetPage>
      </Sort>
    </Wrapper>
  );
};

export default Query;
