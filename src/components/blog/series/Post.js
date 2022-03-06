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
const PostWrapper = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 110px;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff7d;
  margin: 10px;
  padding: 15px;
  border: 1px solid gray;
  box-shadow: 2px 2px gray;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px;
  }
`;

const ThumbnailWrapper = styled(FlexRow)`
  width: 75px;
  height: 75px;
  border-radius: 5px;
  background: white;
  margin: 0 15px;
  @media all and (max-width: 470px) {
    display: none;
  }
`;
const PostThumbnail = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 5px;
  object-fit: cover;
`;
const PostTextWrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  min-height: 75px;
  align-items: flex-start;
  justify-content: space-between;
  color: black;
`;
const PostTitleAndDate = styled(FlexRow)`
  width: 100%;
  height: auto;
`;
const PostTitle = styled.div`
  width: calc(100% - 90px);
  font-size: 27.5px;
  line-height: 32px;
  font-family: 'Noto Serif KR', serif;
  @media all and (max-width: 600px) {
    width: 100%;
  }
`;
const PostPublishedDate = styled(FlexRow)`
  width: 90px;
  margin-top: 5px;
  align-self: flex-start;
  justify-content: flex-end;
  letter-spacing: -1px;
  font-family: 'Nanum Myeongjo', serif;
  @media all and (max-width: 600px) {
    display: none;
  }
`;
const PostSubTitle = styled.div`
  color: black;
  font-size: 18px;
  letter-spacing: -0.5px;
  margin-top: 12.5px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Post = ({ post, index }) => {
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${format(year % 100)}-${format(month)}-${format(day)}`;
  };

  return (
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
          <PostPublishedDate>{dateToString(new Date(post.date.publishedDate))}</PostPublishedDate>
        </PostTitleAndDate>
        <PostSubTitle>{post.subTitle}</PostSubTitle>
      </PostTextWrapper>
    </PostWrapper>
  );
};

export default Post;
