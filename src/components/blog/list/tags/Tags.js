import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
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
      background-color: gray;
    `}
  transition: all 0.3s linear;
  &:hover {
    box-shadow: 1px 1px 1px 1px black;
  }
`;
const Name = styled.div`
  font-size: 25px;
  font-family: 'Exo 2', sans-serif;
  margin: 0 10px 3px 0;
`;
const Count = styled.div`
  font-size: 20px;
  font-family: 'Exo 2', sans-serif;
  color: white;
`;

const Tags = ({ tags, location, setPage }) => {
  const nowTag = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).tag;
  const makeQueryString = (tag) => {
    return qs.stringify({ tag });
  };

  return (
    <Wrapper>
      {tags.map((tag) => (
        <TagWrapper
          key={tag.name}
          to={`/blog/list?${makeQueryString(tag.name)}`}
          active={nowTag === tag.name ? 'on' : 'off'}
          onClick={() => setPage(1)}
        >
          <Name style={{ color: tag.color }}>{tag.name}</Name>
          <Count>{tag.count}</Count>
        </TagWrapper>
      ))}
    </Wrapper>
  );
};

export default Tags;
