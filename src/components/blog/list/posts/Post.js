import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled(FlexRow)`
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
const ThumbnailWrapper = styled(FlexRow)`
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
const PostTextWrapper = styled(FlexColumn)`
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
const PostTitleAndDate = styled(FlexRow)`
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
const PostPublishedDate = styled(FlexRow)`
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
`;
const PostTags = styled(FlexRow)`
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const PostTag = styled(FlexRow)`
  font-size: 18px;
  line-height: 21px;
  margin-right: 10px;
`;
const TagsText = styled.div`
  font-size: 18px;
  color: white;
`;

const Post = ({ posts }) => {
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${format(year % 100)}-${format(month)}-${format(day)}`;
  };
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostWrapper key={post._id} to={`/blog/read/${post._id}`}>
          <ThumbnailWrapper>
            <PostThumbnail
              src={
                post.thumbnail === ''
                  ? '/images/Blog/Default.png'
                  : `${process.env.REACT_APP_API_IMAGE}/${post.thumbnail}`
              }
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
                    <PostTag key={tag.name} style={{ color: tag.color }}>{`#${tag.name}`}</PostTag>
                  );
                } else if (index === 3) {
                  return (
                    <TagsText key={tag.name} style={{ color: 'darkgray' }}>{` + ${
                      post.tags.length - 3
                    }`}</TagsText>
                  );
                } else return null;
              })}
            </PostTags>
          </PostTextWrapper>
        </PostWrapper>
      ))}
      {posts.length % 2 === 1 && posts.length > 2 && <FakePostWrapper key="fakePostWrapper" />}
    </Wrapper>
  );
};

export default Post;
