import React from 'react';
import { BsBook } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -5px 0 30px 0;
  svg {
    width: 35px;
    height: 35px;
    margin: 2px 5px 0 0;
  }
`;
const Text = styled.div`
  font-size: 27px;
  margin-right: 8px;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
`;
const LinkBlock = styled(Link)`
  font-size: 16px;
  margin-top: 1px;
  line-height: 20px;
  &:hover {
    font-weight: 600;
  }
`;

const SeriesLink = ({ series }) => {
  return (
    <FlexRow>
      <BsBook />
      <Text>Series: </Text>
      <LinkBlock to={`/blog/series/${series}`}>
        <em>{`'${series}'`}</em> 의 다른 글 보기
      </LinkBlock>
    </FlexRow>
  );
};

export default SeriesLink;
