import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TagWrapper = styled(Link)`
  display: flex;
  margin: 7.5px 10px;
  padding: 7.5px 12px;
  border-radius: 3px;
  max-height: 42.8px;
  overflow: hidden;
  background-color: #4e4e4e;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 2px 2px 2px #1b1b1b;
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

const TagItem = ({ tag }) => {
  return (
    <TagWrapper key={tag.name} to={`/blog/list?tag=${tag.name}`}>
      <Name style={{ color: tag.color }}>{tag.name}</Name>
      <Count>{tag.count}</Count>
    </TagWrapper>
  );
};

export default TagItem;
