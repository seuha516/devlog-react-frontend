import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiTimeFive, BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';
import qs from 'qs';

import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import NotFound from 'components/utils/NotFound';
import Post from '../series/Post';
import PageControl from '../series/PageControl';
import { listPost } from 'modules/blog/listBlog';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  justify-content: center;
  background: #949494;
  background-image: url('/images/Common/Background10.png');
  padding: 50px 30px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 700px) {
    padding: 50px 15px;
  }
  @media all and (max-width: 450px) {
    padding: 50px 7.5px;
  }
`;
const ContentsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const PostWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: #9d9d9dde;
  justify-content: center;
  flex-wrap: wrap;
  margin: 45px 0 30px 0;
  padding: 25px 0px;
`;
const SortItem = styled(Link)`
  width: 100%;
  margin: 15px 0 30px 0;
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
const TitleWrapper = styled.div`
  align-self: flex-start;
  background: #9d9d9dde;
  max-width: 800px;
  padding: 15px;
  font-size: 60px;
  font-family: 'Nanum Pen Script', cursive;
`;
const ListButtonWrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin-bottom: 25px;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  text-shadow: 2px 2px 2px black;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  svg {
    margin-right: 10px;
  }
`;

const Series = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, postCount, error, loading } = useSelector(({ listBlog, loading }) => ({
    posts: listBlog.posts,
    postCount: listBlog.postCount,
    error: listBlog.error,
    loading: loading['listBlog/LIST_POST'],
  }));
  const { series, sort, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const makeQueryString = (sort) => qs.stringify({ series, sort: sort, page: 1 });

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = `Series: ${series}`;
    dispatch(listPost(location.search));
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch, location.search, series]);

  if (error) {
    return <Error />;
  } else if (loading || !posts) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  } else if (posts.length === 0) {
    return <NotFound />;
  } else {
    return (
      <Wrapper>
        <ContentsWrapper>
          <ListButtonWrapper to="/blog/list">
            <BiArrowBack />
            List
          </ListButtonWrapper>
          <TitleWrapper>{series}</TitleWrapper>
          <PostWrapper>
            <SortItem to={`/blog/series?${makeQueryString(sort === '1' ? -1 : 1)}`}>
              <BiTimeFive />
              {sort === '-1' ? '작성순으로 보기' : '최신순으로 보기'}
            </SortItem>
            {posts.map((post, index) => (
              <Post key={post._id} post={post} index={index} />
            ))}
          </PostWrapper>
          <PageControl location={location} postCount={postCount} />
        </ContentsWrapper>
      </Wrapper>
    );
  }
};

export default Series;
