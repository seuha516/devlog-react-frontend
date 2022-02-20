import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import NotFound from 'components/utils/NotFound';
import { readPost, unloadPost } from 'modules/blog/readBlog';
import { removePost, initRemove } from 'modules/blog/removeBlog';
import 'react-quill/dist/quill.snow.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiBallPenLine } from 'react-icons/ri';
import { BiTrashAlt } from 'react-icons/bi';
import { setOriginalPost } from 'modules/blog/writeBlog';
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
//읽기 구역
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
//포스트 구역
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
//편집 구역
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
  const { Id } = match.params;
  const dispatch = useDispatch();
  const { post, error, removeBlog, loading, user } = useSelector(
    ({ readBlog, removeBlog, loading, user }) => ({
      post: readBlog.post,
      error: readBlog.error,
      removeBlog: removeBlog,
      loading:
        loading['readBlog/READ_POST'] || loading['removeBlog/REMOVE_POST'],
      user: user.user,
    }),
  );
  useEffect(() => {
    dispatch(readPost(Id));
    return () => {
      dispatch(unloadPost());
      dispatch(initRemove());
    };
  }, [dispatch, Id]);
  const onRemove = () => {
    if (window.confirm('정말 이 글을 삭제하시겠습니까?') === true) {
      dispatch(removePost(Id));
    }
  };
  const onEdit = () => {
    dispatch(setOriginalPost(post.post));
    history.push('/blog/write');
  };
  useEffect(() => {
    if (removeBlog.error) {
      alert('포스트 삭제에 실패했습니다.');
    } else if (removeBlog.remove) {
      history.push('/blog/list');
    }
  }, [history, removeBlog]);

  return (
    <ReadComponent
      post={post}
      loading={loading}
      error={error}
      user={user}
      onRemove={onRemove}
      onEdit={onEdit}
    />
  );
};
const ReadComponent = ({ post, error, loading, user, onRemove, onEdit }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <NotFound />;
    }
    return <Error />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <FlexColumn>
        <ReadWrapper>
          {post && <PostBlock post={post.post} />}
          {user && <AuthBlock onRemove={onRemove} onEdit={onEdit} />}
          {post && <AroundBlock prev={post.prev[0]} next={post.next[0]} />}
        </ReadWrapper>
        <ListButton />
      </FlexColumn>
    );
  }
};
const PostBlock = ({ post }) => {
  const { title, subTitle, body, tags, date, series } = post;
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = `${title}`;
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
    return `${year % 100}.${format(month)}.${format(day)}`;
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
      {series.project.name !== '' && <ProjectLink project={series.project} />}
      <PostBody
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {series.name !== '' && <SeriesLink series={series.name} />}
      <PostTagsBlock tags={tags} />
    </PostWrapper>
  );
};
const PostTagsBlock = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Link
          to={`/blog/list/?tag=${tag.tag}`}
          key={tag._id}
          style={{ color: tag.color, marginRight: '10px' }}
        >
          #{tag.tag}
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
