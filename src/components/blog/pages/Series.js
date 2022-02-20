import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import NotFound from 'components/utils/NotFound';
import { seriesPost } from 'modules/blog/seriesBlog';
import styled from 'styled-components';
import Title from '../series/Title';
import ListButton from '../series/ListButton';
import Post from '../series/Post';
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';

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
  background: #949494;
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

const Series = ({ match, location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(({ seriesBlog, loading }) => ({
    posts: seriesBlog.posts,
    error: seriesBlog.error,
    loading: loading['seriesBlog/SERIES_POST'],
  }));
  const { name } = match.params;
  const { sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = `Series: ${name}`;
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [name]);
  useEffect(() => {
    dispatch(seriesPost({ series: name, query: location.search }));
  }, [dispatch, name, location.search]);

  if (error) {
    return <Error />;
  } else if (loading || !posts) {
    return <Loading />;
  } else if (posts.length === 0) {
    return <NotFound />;
  } else {
    return (
      <Wrapper>
        <ContentsWrapper>
          <ListButton />
          <Title name={name} />
          <PostWrapper>
            <SortItem to={`/blog/series/${name}?sort=${sort === '1' ? -1 : 1}`}>
              <BiTimeFive />
              {sort === '-1' ? '작성순으로 보기' : '최신순으로 보기'}
            </SortItem>
            {posts.map((post, index) => (
              <Post key={post._id} post={post} index={index} />
            ))}
          </PostWrapper>
        </ContentsWrapper>
      </Wrapper>
    );
  }
};

export default Series;
