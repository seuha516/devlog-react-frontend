import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { BiPencil, BiTimeFive, BiCodeAlt } from 'react-icons/bi';
import { BsHash } from 'react-icons/bs';
import styled from 'styled-components';
import qs from 'qs';

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
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0;
  padding: 5px 25px;
  background: #000000b3;
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

const QueryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin: -15px 0 30px 0;
`;
const QueryTag = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: 'Do Hyeon', sans-serif;
  margin: -2.5px 5px;
  border-radius: 3px;
  padding: 5px;
  color: #464646;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 0 2px -7px;
    color: black;
  }
  transition: all 0.15s linear;
  &:hover {
    background-color: #fc8e8e;
  }
`;
const QueryProject = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: 'Do Hyeon', sans-serif;
  margin: -2.5px 5px;
  border-radius: 3px;
  padding: 5px;
  color: #464646;
  transition: all 0.15s linear;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 5px 3px 0px;
    color: black;
  }
  &:hover {
    background-color: #fc8e8e;
  }
`;
const QuerySortWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  align-items: flex-start;
`;
const QuerySortItem = styled(Link)`
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
const QuerySetPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    margin: 0 3px -1.5px 3px;
    border-radius: 30px;
    transition: all 0.2s linear;
  }
  &:hover {
    text-shadow: 1px 1px 1px gray;
    svg {
      background-color: black;
      color: white;
    }
  }
  @media all and (max-width: 400px) {
    width: 50px;
  }
`;
const QuerySetPageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
  @media all and (max-width: 400px) {
    display: none;
  }
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 35px;
  padding: 0 10px;
  @media all and (max-width: 1300px) {
    max-width: 800px;
  }
  @media all and (max-width: 600px) {
    padding: 0 5px;
  }
  @media all and (max-width: 400px) {
    padding: 0;
  }
`;
const FakePostWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 10px;
  padding: 15px;
  display: hidden;
  @media all and (max-width: 1300px) {
    display: none;
  }
`;
const PostWrapper = styled(Link)`
  width: 100%;
  max-width: 600px;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000bd;
  margin: 10px;
  padding: 15px;
  border: 1px solid gray;
  box-shadow: 2px 2px gray;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px;
  }
  @media all and (max-width: 600px) {
    margin: 10px 5px;
  }
`;
const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 118px;
  height: 118px;
  border-radius: 5px;
  background: white;
  @media all and (max-width: 472px) {
    display: none;
  }
`;
const PostThumbnail = styled.img`
  width: 118px;
  height: 118px;
  border-radius: 5px;
  object-fit: cover;
`;
const PostTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 118px;
  margin-left: 20px;
  align-items: flex-start;
  justify-content: space-between;
  color: #ededed;
  @media all and (max-width: 472px) {
    margin-left: 0;
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
  font-size: 27.5px;
  line-height: normal;
  font-family: 'Noto Serif KR', serif;
  max-width: 360px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: -3px;
  @media all and (max-width: 1300px) {
    width: calc(100% - 70px);
    white-space: pre-wrap;
  }
  @media all and (max-width: 377px) {
    width: 100%;
  }
`;
const PostPublishedDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  margin-top: 5px;
  align-self: flex-start;
  justify-content: flex-end;
  letter-spacing: -1px;
  font-family: 'Nanum Myeongjo', serif;
  color: darkgray;
  @media all and (max-width: 377px) {
    display: none;
  }
`;
const PostSubTitle = styled.div`
  color: #ededed;
  font-size: 18px;
  letter-spacing: -0.5px;
  margin: 10px 0 30px 0;
  font-family: 'Noto Sans KR', sans-serif;
  max-width: 430px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media all and (max-width: 1300px) {
    white-space: pre-wrap;
  }
`;
const PostTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const PostTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  line-height: 21px;
  margin-right: 10px;
`;
const PostTagsText = styled.div`
  font-size: 18px;
  color: white;
`;

const PageControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: -15px 0 25px 0;
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

const WriteButtonWrapper = styled(Link)`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 35px;
  padding: 0px 10px;
  background-color: #2969ff;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: #0136b2;
  }
  @keyframes turn {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
const WriteButtonText = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
`;

const PostList = ({ posts, postCount, location, user, setPage }) => {
  const { page, tag, project, sort } = qs.parse(location.search, {
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
  const makeQueryString = ({ tag, project, sort }) => {
    const queryObject = {
      ...(tag ? { tag: tag } : {}),
      ...(project ? { project: project } : {}),
      ...(sort ? { sort: sort } : {}),
    };
    return qs.stringify(queryObject);
  };
  const makeQueryStringByPage = (page) => qs.stringify({ page: page, tag, project, sort });
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${format(year % 100)}-${format(month)}-${format(day)}`;
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <InfoWrapper>
          <InfoCount>{postCount}</InfoCount>
          <InfoText>Posts</InfoText>
        </InfoWrapper>
        <QueryWrapper>
          {tag && (
            <QueryTag to={`/blog/list?${makeQueryString({ project, sort })}`}>
              <BsHash />
              {tag}
            </QueryTag>
          )}
          {project && (
            <QueryProject to={`/blog/list?${makeQueryString({ tag, sort })}`}>
              <BiCodeAlt />
              {project}
            </QueryProject>
          )}
          <QuerySortWrapper>
            <QuerySetPage style={{ justifyContent: 'flex-start' }} onClick={() => setPage(0)}>
              <AiOutlineLeftCircle />
              <QuerySetPageText>Tags</QuerySetPageText>
            </QuerySetPage>
            {sort === '1' ? (
              <QuerySortItem to={`/blog/list?${makeQueryString({ tag, project, sort: '-1' })}`}>
                <BiTimeFive />
                최신순으로 보기
              </QuerySortItem>
            ) : (
              <QuerySortItem to={`/blog/list?${makeQueryString({ tag, project, sort: '1' })}`}>
                <BiTimeFive />
                작성순으로 보기
              </QuerySortItem>
            )}
            <QuerySetPage style={{ justifyContent: 'flex-end' }} onClick={() => setPage(2)}>
              <QuerySetPageText>Series</QuerySetPageText>
              <AiOutlineRightCircle />
            </QuerySetPage>
          </QuerySortWrapper>
        </QueryWrapper>
        <PostsWrapper>
          {posts.map((post) => (
            <PostWrapper key={post._id} to={`/blog/read/${post._id}`}>
              <ThumbnailWrapper>
                <PostThumbnail
                  src={
                    post.thumbnail === ''
                      ? '/images/Blog/Default.png'
                      : `${process.env.REACT_APP_API_IMAGE}/${post.thumbnail}`
                  }
                  alt="thumbnail"
                />
              </ThumbnailWrapper>
              <PostTextWrapper>
                <PostTitleAndDate>
                  <PostTitle>{post.title}</PostTitle>
                  <PostPublishedDate>
                    {dateToString(new Date(post.date.publishedDate))}
                  </PostPublishedDate>
                </PostTitleAndDate>
                <PostSubTitle>{post.subTitle}</PostSubTitle>
                <PostTags>
                  {post.tags.map((tag, index) => {
                    if (index < 3) {
                      return (
                        <PostTag
                          key={tag._id}
                          style={{ color: tag.color }}
                        >{`#${tag.name}`}</PostTag>
                      );
                    } else if (index === 3) {
                      return (
                        <PostTagsText key={tag._id} style={{ color: 'darkgray' }}>{` + ${
                          post.tags.length - 3
                        }`}</PostTagsText>
                      );
                    } else return null;
                  })}
                </PostTags>
              </PostTextWrapper>
            </PostWrapper>
          ))}
          {posts.length % 2 === 1 && posts.length > 2 && <FakePostWrapper />}
        </PostsWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <PageControlWrapper>
          {nowPage > 1 && postCount > 0 && (
            <PageControlButton
              to={`/blog/list?${makeQueryStringByPage(1)}`}
              style={{ marginRight: '5px' }}
            >{`<<`}</PageControlButton>
          )}
          {nowPage > 1 && postCount > 0 && (
            <PageControlButton
              to={`/blog/list?${makeQueryStringByPage(nowPage - 1)}`}
              style={{ marginRight: '5px' }}
            >{`<`}</PageControlButton>
          )}
          <PageControlNumberWrapper>
            {setList(nowPage - 2, nowPage + 2).map((n) => (
              <PageControlNumber
                key={n}
                to={`/blog/list?${makeQueryStringByPage(n)}`}
                style={n === nowPage ? { background: 'black', color: 'white' } : {}}
              >
                {n}
              </PageControlNumber>
            ))}
          </PageControlNumberWrapper>
          {nowPage < lastPage && postCount > 0 && (
            <PageControlButton
              to={`/blog/list?${makeQueryStringByPage(nowPage + 1)}`}
              style={{ marginLeft: '5px' }}
            >{`>`}</PageControlButton>
          )}
          {nowPage < lastPage && postCount > 0 && (
            <PageControlButton
              to={`/blog/list?${makeQueryStringByPage(lastPage)}`}
              style={{ marginLeft: '5px' }}
            >{`>>`}</PageControlButton>
          )}
        </PageControlWrapper>
        {user && (
          <WriteButtonWrapper to="/blog/write">
            <BiPencil />
            <WriteButtonText>Write</WriteButtonText>
          </WriteButtonWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default PostList;
