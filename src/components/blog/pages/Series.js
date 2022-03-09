import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiTimeFive, BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';
import qs from 'qs';

import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import NotFound from 'components/utils/NotFound';
import { listPost } from 'modules/blog/listBlog';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  height: 100%;
  min-height: calc(100vh - 62px);
  animation: appear 0.3s ease-out;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  padding: 30px 20px;
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
  @media all and (max-width: 1200px) {
    max-width: 800px;
    padding: 30px 20px;
  }
  @media all and (max-width: 600px) {
    max-width: 800px;
    padding: 30px 10px;
  }
  @media all and (max-width: 450px) {
    max-width: 800px;
    padding: 30px 5px;
  }
`;
const ListButtonWrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin-bottom: 25px;
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
  text-shadow: 2px 2px 2px lightgrey;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  svg {
    margin-right: 10px;
  }
`;
const TitleWrapper = styled.div`
  align-self: flex-start;
  background: #adadadde;
  padding: 15px;
  font-size: 50px;
  font-family: 'Nanum Pen Script', cursive;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: #adadadde;
  margin: 25px 0 30px 0;
  padding: 25px 0px;
`;

const SortAndPostWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const SortItem = styled(Link)`
  margin: 0px 0 15px 0;
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
const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1040px;
  @media all and (max-width: 1200px) {
    padding: 0 10px;
  }
`;
const PostItemWrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: auto;
  background-color: #ffffff7d;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  box-shadow: 2px 2px gray;
  transition: box-shadow 0.2s linear;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px;
  }
  @media all and (max-width: 1200px) {
    margin: 10px 0;
  }
`;
const FakePostItemWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 10px;
  padding: 10px;
  display: hidden;
  @media all and (max-width: 1200px) {
    display: none;
  }
`;
const PostNumber = styled.div`
  width: 44px;
  min-width: 44px;
  height: 100%;
  font-size: 40px;
  letter-spacing: -2px;
  margin-right: 6px;
  font-family: 'MuseoModerno', cursive;
  @media all and (max-width: 530px) {
    display: none;
  }
`;
const PostThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90px;
  min-width: 90px;
  height: 90px;
  border-radius: 5px;
  background: white;
  margin: 0 15px 0 5px;
  @media all and (max-width: 450px) {
    display: none;
  }
`;
const PostThumbnail = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  object-fit: cover;
`;
const PostTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: calc(100% - 162px);
  min-height: 90px;
  color: black;
  @media all and (max-width: 530px) {
    width: calc(100% - 112px);
  }
  @media all and (max-width: 450px) {
    width: calc(100% - 2px);
  }
`;
const PostTitleAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;
const PostTitle = styled.div`
  width: calc(100% - 70px);
  font-size: 27.5px;
  line-height: 32px;
  font-family: 'Noto Serif KR', serif;
  @media all and (max-width: 400px) {
    width: 100%;
  }
`;
const PostPublishedDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  min-width: 70px;
  margin-top: 5px;
  align-self: flex-start;
  justify-content: flex-end;
  letter-spacing: -1px;
  font-family: 'Nanum Myeongjo', serif;
  @media all and (max-width: 360px) {
    display: none;
  }
`;
const PostSubTitle = styled.div`
  color: black;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  letter-spacing: -0.5px;
  margin-top: 10px;
  line-height: normal;
  font-family: 'Noto Sans KR', sans-serif;
`;

const PageControlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
const PageControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
const PageControlButton = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-top: 1px;
  cursor: pointer;
  font-family: 'Nanum Gothic Coding', monospace;
  transition: all 0.3s linear;
  @media all and (max-width: 432px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  width: 30px;
  height: 30px;
  margin: 0px 7.5px;
  border-radius: 15px;
  background: white;
  box-shadow: 1px 2px gray;
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;

const Series = ({ location }) => {
  const { posts, postCount, error, loading } = useSelector(({ listBlog, loading }) => ({
    posts: listBlog.posts,
    postCount: listBlog.postCount,
    error: listBlog.error,
    loading: loading['listBlog/LIST_POST'],
  }));
  const dispatch = useDispatch();
  const { series, sort, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const nowPage = parseInt(page || '1');
  const lastPage = Math.max(Math.floor((postCount + 5) / 6), 1);
  const setList = (start, end) => {
    let ret = [];
    if (postCount === 0) {
      return [];
    } else if (nowPage > lastPage) {
      return [lastPage];
    } else {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= lastPage) ret.push(i);
      }
      return ret;
    }
  };
  const makeQueryString = ({ series, sort, page }) => {
    const queryObject = {
      ...(series ? { series: series } : {}),
      ...(sort ? { sort: sort } : {}),
      ...(page ? { page: page } : {}),
    };
    return qs.stringify(queryObject);
  };
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${format(year % 100)}-${format(month)}-${format(day)}`;
  };
  const addZero = (x) => (x < 10 ? `0${x}` : x);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = `Series: ${series}`;
    window.scrollTo(0, 0);
    dispatch(listPost(location.search));
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch, location.search, series]);

  if (error) {
    return <Error />;
  } else if (loading) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  } else if (postCount === 0) {
    return <NotFound />;
  } else {
    return (
      <Wrapper>
        <ListButtonWrapper to="/blog/list/series">
          <BiArrowBack />
          List
        </ListButtonWrapper>
        <TitleWrapper>{series}</TitleWrapper>
        <ContentWrapper>
          <SortAndPostWrapper>
            <SortItem
              to={`/blog/series?${makeQueryString({
                series: series,
                sort: sort === '-1' ? 1 : -1,
                page: 1,
              })}`}
            >
              <BiTimeFive />
              {sort === '-1' ? '작성순으로 보기' : '최신순으로 보기'}
            </SortItem>
            <PostWrapper>
              {posts.map((post) => (
                <PostItemWrapper key={post._id} to={`/blog/read/${post._id}`}>
                  <PostNumber>{addZero(post.seriesNumber)}</PostNumber>
                  <PostThumbnailWrapper>
                    <PostThumbnail
                      src={
                        post.thumbnail === ''
                          ? '/images/Blog/Default.png'
                          : `${process.env.REACT_APP_API_IMAGE}/${post.thumbnail}`
                      }
                    />
                  </PostThumbnailWrapper>
                  <PostTextWrapper>
                    <PostTitleAndDate>
                      <PostTitle>{post.title}</PostTitle>
                      <PostPublishedDate>
                        {dateToString(new Date(post.date.publishedDate))}
                      </PostPublishedDate>
                    </PostTitleAndDate>
                    <PostSubTitle>{post.subTitle}</PostSubTitle>
                  </PostTextWrapper>
                </PostItemWrapper>
              ))}
              {posts.length % 2 === 1 && posts.length > 2 && <FakePostItemWrapper />}
            </PostWrapper>
          </SortAndPostWrapper>
          <PageControlWrapper>
            <PageControl>
              {nowPage > 1 && postCount > 0 && (
                <PageControlButton
                  to={`/blog/series?${makeQueryString({ series: series, sort: sort, page: 1 })}`}
                  style={{ marginRight: '5px' }}
                >{`<<`}</PageControlButton>
              )}
              {nowPage > 1 && postCount > 0 && (
                <PageControlButton
                  to={`/blog/series?${makeQueryString({
                    series: series,
                    sort: sort,
                    page: nowPage - 1,
                  })}`}
                  style={{ marginRight: '5px' }}
                >{`<`}</PageControlButton>
              )}
              <PageControlNumberWrapper>
                {setList(nowPage - 2, nowPage + 2).map((n) => (
                  <PageControlNumber
                    key={n}
                    to={`/blog/series?${makeQueryString({ series: series, sort: sort, page: n })}`}
                    style={n === nowPage ? { background: 'black', color: 'white' } : {}}
                  >
                    {n}
                  </PageControlNumber>
                ))}
              </PageControlNumberWrapper>
              {nowPage < lastPage && postCount > 0 && (
                <PageControlButton
                  to={`/blog/series?${makeQueryString({
                    series: series,
                    sort: sort,
                    page: nowPage + 1,
                  })}`}
                  style={{ marginLeft: '5px' }}
                >{`>`}</PageControlButton>
              )}
              {nowPage < lastPage && postCount > 0 && (
                <PageControlButton
                  to={`/blog/series?${makeQueryString({
                    series: series,
                    sort: sort,
                    page: lastPage,
                  })}`}
                  style={{ marginLeft: '5px' }}
                >{`>>`}</PageControlButton>
              )}
            </PageControl>
          </PageControlWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
};

export default Series;
