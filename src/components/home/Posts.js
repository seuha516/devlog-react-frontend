import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { listPost } from 'modules/blog/listBlog';
import LoadingComponent from 'components/utils/LoadingComponent';
import Post from 'components/home/Post';

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
  background-color: #d5d5d5;
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  padding: 35px 5%;
  @media all and (max-width: 1024px) {
    grid-column: 5 / 11;
    grid-row: 2 / 3;
  }
  @media all and (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;
const Header = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
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
    color: #021096;
  }
`;
const Content = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  min-height: 75px;
  justify-content: center;
`;

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postCount, error, loading } = useSelector(
    ({ listBlog, loading }) => ({
      posts: listBlog.posts,
      postCount: listBlog.postCount,
      error: listBlog.error,
      loading: loading['listBlog/LIST_POST'],
    }),
  );
  useEffect(() => {
    dispatch(listPost(''));
  }, [dispatch]);

  return (
    <Wrapper>
      <Header>
        <Title>Post</Title>
        <More to="blog/list">
          {posts && `${Math.max(postCount - 4, 0)} More`}
          <BsArrowRight />
        </More>
      </Header>
      <Content>
        {error ? (
          <div>Error</div>
        ) : loading ? (
          <LoadingComponent />
        ) : (
          posts &&
          posts.slice(0, 4).map((post) => <Post key={post._id} post={post} />)
        )}
      </Content>
    </Wrapper>
  );
};
export default Posts;
