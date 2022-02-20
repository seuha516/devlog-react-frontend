import React from 'react';
import styled from 'styled-components';

import Info from 'components/blog/list/posts/Info';
import Query from 'components/blog/list/posts/Query';
import Post from 'components/blog/list/posts/Post';
import PageControl from 'components/blog/list/posts/PageControl';
import WriteButton from 'components/blog/list/posts/WriteButton';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  flex-direction: column;
  justify-content: space-between;
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
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostList = ({ posts, postCount, location, user, setPage }) => {
  return (
    <Wrapper>
      <FlexBox style={{ width: '100%' }}>
        <Info postCount={postCount} />
        <Query location={location} setPage={setPage} />
        <Post posts={posts} />
      </FlexBox>
      <FlexBox>
        <PageControl location={location} postCount={postCount} />
        {user && <WriteButton />}
      </FlexBox>
    </Wrapper>
  );
};

export default PostList;
