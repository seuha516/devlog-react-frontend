import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { BiTimeFive, BiCodeAlt } from 'react-icons/bi';
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
  color: #464646;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 0 2px -7px;
    color: black;
  }
  &:hover {
    background-color: #fc8e8e;
  }
`;
const Project = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: 'Do Hyeon', sans-serif;
  margin: -2.5px 5px;
  border-radius: 3px;
  padding: 5px;
  color: #464646;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 5px 3px 0px;
    color: black;
  }
  &:hover {
    background-color: #fc8e8e;
  }
`;
const Sort = styled(FlexBox)`
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  align-items: flex-start;
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
    color: #2519c7;
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
    text-shadow: 1px 1px 1px gray;
    svg {
      background-color: black;
      color: white;
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
  const { tag, project, sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const makeQueryString = ({ tag, project, sort }) => {
    const queryObject = {
      ...(tag ? { tag: tag } : {}),
      ...(project ? { project: project } : {}),
      ...(sort ? { sort: sort } : {}),
    };
    return qs.stringify(queryObject);
  };
  return (
    <Wrapper>
      {tag && (
        <Tag to={`/blog/list?${makeQueryString({ project, sort })}`}>
          <BsHash />
          {tag}
        </Tag>
      )}
      {project && (
        <Project to={`/blog/list?${makeQueryString({ tag, sort })}`}>
          <BiCodeAlt />
          {project}
        </Project>
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
            to={`/blog/list?${makeQueryString({ tag, project, sort: '-1' })}`}
          >
            <BiTimeFive />
            최신순으로 보기
          </SortItem>
        ) : (
          <SortItem
            to={`/blog/list?${makeQueryString({ tag, project, sort: '1' })}`}
          >
            <BiTimeFive />
            작성순으로 보기
          </SortItem>
        )}
        <SetPage
          style={{ justifyContent: 'flex-end' }}
          onClick={() => setPage(2)}
        >
          <SetPageText>Series</SetPageText>
          <AiOutlineRightCircle />
        </SetPage>
      </Sort>
    </Wrapper>
  );
};

export default Query;
