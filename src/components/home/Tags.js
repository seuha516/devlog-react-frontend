import React from 'react';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from 'components/utils/Loading';
import TagItem from './TagItem';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  position: relative;
  background-color: #3c404a;
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  padding: 35px 5%;
  @media all and (max-width: 1024px) {
    grid-column: 6 / 11;
    grid-row: 3 / 4;
  }
  @media all and (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
  }
`;
const Header = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
  color: white;
`;
const Title = styled.div`
  font-size: 45px;
  font-family: 'Anton', sans-serif;
`;
const More = styled(Link)`
  font-size: 25px;
  font-family: 'Antonio', sans-serif;
  display: flex;

  align-items: center;
  justify-content: center;
  svg {
    width: 27px;
    height: 27px;
    margin: 0 0 -2px 7px;
  }
  &:hover {
    color: #86b3ff;
  }
`;
const Content = styled(FlexRow)`
  width: 100%;
  height: 100%;
  min-height: 75px;
`;
const TagsWrapper = styled(FlexRow)`
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 231.2px;
  align-content: flex-start;
`;

const Tags = () => {
  const { tags, error, loading } = useSelector(({ listBlog, loading }) => ({
    tags: listBlog.tags,
    error: listBlog.error,
    loading: loading['listBlog/LIST_POST'],
  }));
  return (
    <Wrapper>
      <Header>
        <Title>Tags</Title>
        <More to="/blog/list/tags">
          {tags && `More`}
          <BsArrowRight />
        </More>
      </Header>
      <Content>{error ? <div>Error</div> : loading ? <Loading /> : <TagsWrapper>{tags && tags.slice(0, 8).map((i) => <TagItem key={i.name} tag={i} />)}</TagsWrapper>}</Content>
    </Wrapper>
  );
};

export default Tags;
