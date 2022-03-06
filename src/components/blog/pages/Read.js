import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiTrashAlt, BiLike } from 'react-icons/bi';
import { RiBallPenLine } from 'react-icons/ri';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { setOriginalPost } from 'modules/blog/writeBlog';
import {
  initReadPost,
  readPost,
  removePost,
  likePost,
  writeCommentPost,
  removeCommentPost,
} from 'modules/blog/readBlog';

import Error from 'components/utils/Error';
import NotFound from 'components/utils/NotFound';
import Loading from 'components/utils/Loading';
import ListButton from '../read/ListButton';
import ProjectLink from '../read/ProjectLink';
import SeriesLink from '../read/SeriesLink';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FlexColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const ReadWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  padding: 40px 30px 10px 30px;
  background-color: white;
  @media all and (max-width: 700px) {
    padding: 40px 15px 10px 15px;
  }
`;
const PostWrapper = styled.div`
  background: white;
`;
const PostTitle = styled.h1`
  font-size: 40px;
  line-height: 45px;
  margin: 20px 0px;
  font-family: 'Noto Serif KR', serif;
`;
const PostSubTitle = styled.h2`
  font-size: 25px;
  margin: 20px 0px;
  font-family: 'Noto Sans KR', sans-serif;
`;
const PostDate = styled.div`
  font-size: 16px;
  line-height: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  color: rgb(50, 50, 50);
  margin-bottom: 20px;
`;
const PostBody = styled.div`
  padding: 50px 0 80px 0;
  line-height: 1.5;
  * {
    cursor: default;
  }
  a {
    cursor: pointer;
  }
  img {
    cursor: default;
  }
  ul,
  ol {
    padding: 0;
  }
  li:not(.ql-direction-rtl)::before {
    width: 20px;
    padding: 0;
    margin-right: 8px;
  }
`;
const TagsWrapper = styled.div`
  background-color: #494949;
  padding: 15px;
  margin-bottom: 20px;
`;
const AuthWrapper = styled(FlexRow)`
  justify-content: flex-end;
`;
const AuthButtonWrapper = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 10px;
  margin: 5px;
  padding: 0px 10px;
  background-color: #434343;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    &.EditButton {
      background-color: #2c008f;
    }
    &.DeleteButton {
      background-color: #ac0202;
    }
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
const AuthButtonText = styled.div`
  font-size: 18px;
  font-family: 'Lato', sans-serif;
`;
const AroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0 5px 0;
  padding-top: 22px;
  border-top: solid 1px gray;
`;
const AroundContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;
const AroundText = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-family: 'Nanum Myeongjo', serif;
  margin-bottom: 5px;
  text-align: center;
`;
const AroundLink = styled(Link)`
  font-size: 16px;
  font-family: 'Nanum Myeongjo', serif;
  line-height: 21px;
  color: #5079eb;
  text-decoration: underline;
  text-underline-position: under;
  &:hover {
    font-weight: 700;
  }
`;
const AroundNull = styled.div`
  font-size: 15px;
  font-family: 'Nanum Myeongjo', serif;
  line-height: 20px;
  color: #323232;
`;

const Read = ({ match, history }) => {
  const { readBlog, loading, likeLoading, commentLoading, user } = useSelector(({ readBlog, loading, user }) => ({
    readBlog: readBlog,
    loading: loading['readBlog/READ_POST'] || loading['readBlog/REMOVE_POST'],
    likeLoading: loading['readBlog/LIKE_POST'],
    commentLoading: loading['readBlog/WRITE_COMMENT_POST'] || loading['readBlog/REMOVE_COMMENT_POST'],
    user: user.user,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initReadPost());
    dispatch(readPost(match.params.id));
    return () => {
      dispatch(initReadPost());
    };
  }, [dispatch, match.params.id]);
  useEffect(() => {
    if (readBlog.remove) history.push('/blog/list');
    if (readBlog.reload) dispatch(readPost(match.params.id));
  }, [dispatch, history, readBlog.remove, readBlog.reload, match.params.id]);

  const onRemove = () => {
    if (window.confirm('정말 이 글을 삭제하시겠습니까?')) {
      dispatch(removePost(match.params.id));
    }
  };
  const onEdit = () => {
    dispatch(setOriginalPost(readBlog.post));
    history.push('/blog/write');
  };

  if (readBlog.error) {
    if (readBlog.error.response.status === 404) {
      return <NotFound />;
    } else {
      return <Error />;
    }
  } else if (loading) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  } else {
    return (
      <FlexColumn>
        <ReadWrapper>
          {readBlog.post && <PostBlock post={readBlog.post} />}
          {user && <AuthBlock onRemove={onRemove} onEdit={onEdit} />}
          <BiLike style={{ cursor: 'pointer' }} onClick={() => dispatch(likePost(match.params.id))} />
          {readBlog.post && <CommentBlock comment={readBlog.post.comment} />}
          {readBlog.post && <AroundBlock prev={readBlog.prev} next={readBlog.next} />}
        </ReadWrapper>
        <ListButton />
      </FlexColumn>
    );
  }
};

const PostBlock = ({ post }) => {
  const { title, subTitle, body, tags, date, series, project } = post;
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = title;
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [title]);
  const dateToString = (dateString) => {
    const date = new Date(dateString);
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${format(year % 100)}.${format(month)}.${format(day)}`;
  };

  return (
    <PostWrapper className="ql-snow">
      <hr />
      <PostTitle>{title}</PostTitle>
      <PostSubTitle>{subTitle}</PostSubTitle>
      <PostDate>
        {`작성일: ${dateToString(date.publishedDate)}`}
        <br />
        {`마지막 수정: ${dateToString(date.lastModifiedDate)}`}
      </PostDate>
      <hr />
      {project !== '' && <ProjectLink project={project} />}
      <PostBody className="ql-editor" dangerouslySetInnerHTML={{ __html: body }} />
      {series !== '' && <SeriesLink series={series} />}
      <PostTagsBlock tags={tags} />
    </PostWrapper>
  );
};
const PostTagsBlock = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Link to={`/blog/list/?tag=${tag.name}`} key={tag._id} style={{ color: tag.color, marginRight: '10px' }}>
          #{tag.name}
        </Link>
      ))}
    </TagsWrapper>
  );
};
const AuthBlock = ({ onRemove, onEdit }) => {
  return (
    <AuthWrapper>
      <AuthButtonWrapper className="EditButton" onClick={onEdit}>
        <RiBallPenLine />
        <AuthButtonText>Edit</AuthButtonText>
      </AuthButtonWrapper>
      <AuthButtonWrapper className="DeleteButton" onClick={onRemove}>
        <BiTrashAlt />
        <AuthButtonText>Delete</AuthButtonText>
      </AuthButtonWrapper>
    </AuthWrapper>
  );
};
const CommentBlock = ({ comment }) => {
  return <div></div>;
};
const AroundBlock = ({ prev, next }) => {
  return (
    <AroundWrapper>
      <AroundContent>
        <AroundText>이전글</AroundText>
        {prev ? (
          <AroundLink to={`/blog/read/${prev._id}`}>{prev.title}</AroundLink>
        ) : (
          <AroundNull>이전글이 없습니다.</AroundNull>
        )}
      </AroundContent>
      <AroundContent>
        <AroundText>다음글</AroundText>
        {next ? (
          <AroundLink to={`/blog/read/${next._id}`}>{next.title}</AroundLink>
        ) : (
          <AroundNull>다음글이 없습니다.</AroundNull>
        )}
      </AroundContent>
    </AroundWrapper>
  );
};

export default Read;
