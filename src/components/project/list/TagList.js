import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';
import qs from 'qs';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  animation: appear 0.3s ease-out;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @keyframes appear {
    from {
      opacity: 0;
      margin-top: 60px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0;
  padding: 5px 25px;
`;
const InfoCount = styled.div`
  font-size: 70px;
  font-weight: 600;
  font-family: 'Roboto Slab', serif;
  margin: 0 20px 5px 0;
  color: white;
  text-shadow: 3px 3px 3px black;
`;
const InfoText = styled.div`
  font-size: 45px;
  font-family: 'Roboto Slab', serif;
  color: #ffffffdb;
  text-shadow: 1.5px 1.5px 2px black;
`;

const MovePageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  margin: -15px 0 30px 0;
`;
const MovePageSetPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  cursor: pointer;
  color: #b3b3b3;
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
`;
const MovePageSetPageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
`;

const TagsWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 800px;
  margin-bottom: 35px;
  flex-wrap: wrap;
  justify-content: center;
`;
const TagWrapper = styled(Link)`
  display: flex;
  margin: 7.5px;
  padding: 7.5px 12px;
  border-radius: 3px;
  background-color: #4e4e4e;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active === 'on' &&
    css`
      background-color: #323232;
      opacity: 0.75;
    `}
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 1px 1px 1px 1px #323232;
  }
`;
const TagName = styled.div`
  font-size: 25px;
  font-family: 'Exo 2', sans-serif;
  margin: 0 10px 3px 0;
`;
const TagCount = styled.div`
  font-size: 20px;
  font-family: 'Exo 2', sans-serif;
  color: white;
`;

const TagList = ({ tags, location, setPage }) => {
  const nowTag = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).tag;
  const makeQueryString = (tag) => qs.stringify({ tag });

  return (
    <Wrapper>
      <InfoWrapper>
        <InfoCount>{tags.length}</InfoCount>
        <InfoText>Tags</InfoText>
      </InfoWrapper>
      <MovePageWrapper>
        <MovePageSetPage style={{ justifyContent: 'flex-end' }} onClick={() => setPage(1)}>
          <MovePageSetPageText>Posts</MovePageSetPageText>
          <AiOutlineRightCircle />
        </MovePageSetPage>
      </MovePageWrapper>
      <TagsWrapper>
        {tags.map((tag) => (
          <TagWrapper
            key={tag.name}
            to={`/project/list?${makeQueryString(tag.name)}`}
            active={nowTag === tag.name ? 'on' : 'off'}
            onClick={() => setPage(1)}
          >
            <TagName style={{ color: tag.color }}>{tag.name}</TagName>
            <TagCount>{tag.count}</TagCount>
          </TagWrapper>
        ))}
      </TagsWrapper>
    </Wrapper>
  );
};

export default TagList;
