import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    max-width: 1500px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 35px;
    padding: 0 10px;
`;
//포스트 구역
const PostWrapper = styled(Link)`
    display: flex;
    width: 100%;
    max-width: 600px;
    height: auto;
    justify-content: space-between;
    align-items: center;
    background-color: #000000ad;
    margin: 10px;
    padding: 15px;
    border: 1px solid gray;
    box-shadow: 2px 2px gray;
    transition: all 0.2s linear;
    cursor: pointer;
    &:hover {
        box-shadow: 5px 5px;
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
    width: calc(100% - 90px);
    font-size: 27.5px;
    line-height: 32px;
    font-family: "Noto Serif KR", serif;
    @media all and (max-width: 377px) {
        width: 100%;
    }
`;
const PostPublishedDate = styled(FlexRow)`
    width: 90px;
    margin-top: 5px;
    align-self: flex-start;
    justify-content: flex-end;
    letter-spacing: -1px;
    font-family: "Nanum Myeongjo", serif;
    @media all and (max-width: 377px) {
        display: none;
    }
`;
const PostSubTitle = styled.div`
    color: #ededed;
    font-size: 18px;
    letter-spacing: -0.5px;
    margin: 10px 0 30px 0;
    font-family: "Noto Sans KR", sans-serif;
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
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return `${year}-${format(month)}-${format(day)}`;
    };
    return (
        <Wrapper>
            {posts &&
                posts.map((post) => (
                    <PostWrapper key={post._id} to={`/blog/read/${post._id}`}>
                        <ThumbnailWrapper>
                            <PostThumbnail
                                src={
                                    post.thumbnail === ""
                                        ? "/images/Blog/Default.png"
                                        : `${process.env.REACT_APP_API_URL}/get/${post.thumbnail}`
                                }
                            />
                        </ThumbnailWrapper>
                        <PostTextWrapper>
                            <PostTitleAndDate>
                                <PostTitle>{post.title}</PostTitle>
                                <PostPublishedDate>
                                    {dateToString(
                                        new Date(post.date.publishedDate)
                                    )}
                                </PostPublishedDate>
                            </PostTitleAndDate>
                            <PostSubTitle>{post.subTitle}</PostSubTitle>
                            <PostTags>
                                {post.tags.map((tag, index) => {
                                    if (index < 3) {
                                        return (
                                            <PostTag
                                                key={tag.tag}
                                                style={{ color: tag.color }}
                                            >{`#${tag.tag}`}</PostTag>
                                        );
                                    } else if (index === 3) {
                                        return (
                                            <TagsText key={tag.tag}>{` + ${
                                                post.tags.length - 3
                                            }`}</TagsText>
                                        );
                                    } else return null;
                                })}
                            </PostTags>
                        </PostTextWrapper>
                    </PostWrapper>
                ))}
        </Wrapper>
    );
};

export default Post;