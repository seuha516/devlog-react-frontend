import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineFundProjectionScreen, AiOutlineReload } from 'react-icons/ai';
import { BiTrashAlt, BiLike, BiArrowBack, BiReply } from 'react-icons/bi';
import { BsBook, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { RiBallPenLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 20px 0;
  padding: 40px 30px 10px 30px;
  background-color: white;
  @media all and (max-width: 700px) {
    padding: 40px 15px 10px 15px;
  }
  @media all and (max-width: 500px) {
    padding: 40px 10px 10px 10px;
  }
  @media all and (max-width: 400px) {
    padding: 40px 5px 10px 6px;
  }
`;
const PostWrapper = styled.div`
  width: 100%;
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
const ProjectLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProjectLinkRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    margin-top: 5px;
  }
`;
const ProjectLinkText = styled.div`
  font-size: 27px;
  margin-right: 8px;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
`;
const ProjectLinkBlock = styled(Link)`
  font-size: 24px;
  margin-top: 1px;
  &:hover {
    font-weight: 600;
  }
`;
const ProjectLinkToSeries = styled(Link)`
  color: #0056ac;
  margin-top: 5px;
  font-size: 15px;
  &:hover {
    font-weight: 600;
  }
`;
const SeriesLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -5px 0 30px 0;
  svg {
    width: 35px;
    height: 35px;
    margin: 2px 5px 0 0;
  }
`;
const SeriesLinkText = styled.div`
  font-size: 27px;
  margin-right: 8px;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
`;
const SeriesLinkBlock = styled(Link)`
  font-size: 16px;
  margin-top: 1px;
  line-height: 20px;
  &:hover {
    font-weight: 600;
  }
`;
const TagsWrapper = styled.div`
  background-color: #494949;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  a {
    font-size: 16px;
    line-height: 20px;
    word-break: keep-all;
  }
`;
const AuthWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const LikeWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  font-size: 24px;
  font-family: 'PT Sans', sans-serif;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 0 15px 0 12.5px;
  background-color: #dfdfdf;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    background-color: #bfbfbf;
  }
`;
const AuthButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const AuthButton = styled.div`
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
  @media all and (max-width: 400px) {
    width: 80px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
  @media all and (max-width: 340px) {
    width: 60px;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
const AuthButtonText = styled.div`
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  @media all and (max-width: 400px) {
    font-size: 15px;
  }
  @media all and (max-width: 340px) {
    display: none;
  }
`;
const AroundWrapper = styled.div`
  width: 100%;
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
  text-align: center;
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
const ListButtonWrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin: 10px 0 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #585858;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  text-shadow: 2px 2px 2px white;
  transition: all 0.2s linear;
  svg {
    margin-right: 10px;
    transition: all 0.3s linear;
  }
  &:hover {
    font-size: 30px;
    svg {
      transform: rotateX(180deg);
    }
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: solid 1px gray;
  padding: 15px 0 0 0;
`;
const CommentCount = styled.div`
  width: 100%;
  font-size: 24px;
  font-family: 'Hubballi', cursive;
  margin-bottom: 10px;
`;
const NoComment = styled.div`
  width: 100%;
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  color: #515151;
  font-family: 'Poor Story', cursive;
`;
const CommentInputWrapper = styled.div`
  width: 100%;
  height: 105px;
  margin-top: 10px;
  padding: 5px;
  background-color: #e9e9e9;
  border-radius: 5px;
`;
const CommentInputSmallWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
`;
const CommentNickname = styled.input`
  width: 90px;
  height: 40px;
  padding: 0 5px;
  margin-right: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;
const CommentPassword = styled.input`
  width: 140px;
  height: 40px;
  padding: 0 5px;
  &::placeholder {
    font-size: 12px;
    letter-spacing: -1px;
  }
  border: 1px solid grey;
  border-radius: 5px;
`;
const CommentInputContent = styled.input`
  width: calc(100% - 53px);
  height: 50px;
  border: 1px solid grey;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 5px;
  &::placeholder {
    font-size: 14px;
  }
`;
const CommentInputWriteButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  background-color: #4c4c4c;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s linear;
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #323232;
  }
`;
const CommentBox = styled.div`
  width: 100%;
`;
const CommentItemWrapper = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: #f1f1f1;
  margin-top: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) =>
    props.die &&
    css`
      height: 55px;
      min-height: 55px;
    `}
  ${(props) =>
    props.reply &&
    css`
      background-color: #d9d9d9;
    `}
  ${(props) =>
    props.nickname === '전승하' &&
    (props.reply
      ? css`
          background-color: #e1e9ef;
        `
      : css`
          background-color: #f0f9ff;
        `)}
`;
const CommentItemNicknameAndContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const CommentItemNickname = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  font-size: 17px;
  font-weight: ${(props) => (props.nickname === '전승하' ? '700' : '400')};
  ${(props) =>
    props.die &&
    css`
      display: none;
    `}
`;
const CommentItemContent = styled.div`
  width: 100%;
  font-size: 15px;
  line-height: 18px;
  word-break: break-all;
  margin: 5px 0;
  color: #525252;
`;
const CommentItemInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const CommentItemDate = styled.div`
  font-size: 14px;
`;
const CommentItemButton = styled.div`
  display: flex;
`;
const CommentItemButtonItem = styled.div`
  margin-left: 5px;
  cursor: pointer;
  position: relative;
`;
const RemovePopupWrapper = styled.div`
  position: absolute;
  top: -38px;
  left: -168px;
  width: 200px;
  height: 35px;
  cursor: default;
  background-color: #cbcbcb;
  border-radius: 5px;
  border: 1px solid #5c5c5c;
`;
const RemovePopup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  input {
    width: calc(100% - 25px);
    height: 100%;
    padding: 0 3px;
    border: 1px solid grey;
    font-size: 15px;
    border-radius: 5px;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #363636;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
const LoadMoreCommentButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px 0;
  background-color: #f1f1f1;
  margin-top: 5px;
  display: flex;
  flex-direction: center;
  justify-content: center;
  transition: all 0.15s linear;
  cursor: pointer;
  &:hover {
    background-color: #c9c9c9;
  }
  svg {
    width: 20px;
    height: 20px;
    margin: -1px 5px 0 0;
  }
  div {
    height: 20px;
  }
`;

const Read = ({ match, history }) => {
  const { readBlog, loading, removeLoading, likeLoading, commentLoading, user } = useSelector(
    ({ readBlog, loading, user }) => ({
      readBlog: readBlog,
      loading: loading['readBlog/READ_POST'],
      removeLoading: loading['readBlog/REMOVE_POST'],
      likeLoading: loading['readBlog/LIKE_POST'],
      commentLoading:
        loading['readBlog/WRITE_COMMENT_POST'] || loading['readBlog/REMOVE_COMMENT_POST'],
      user: user.user,
    }),
  );
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
  } else if (removeLoading || !readBlog.post) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  } else {
    return (
      <Wrapper>
        <PostBlock post={readBlog.post} />
        <AuthWrapper>
          {loading || likeLoading ? (
            <LikeWrapper>
              <Loading r="24px" />
            </LikeWrapper>
          ) : (
            <LikeWrapper onClick={() => dispatch(likePost(match.params.id))}>
              <BiLike />
              <div>{readBlog.post.like.length}</div>
            </LikeWrapper>
          )}
          {user && (
            <AuthButtonWrapper>
              <AuthButton className="EditButton" onClick={onEdit}>
                <RiBallPenLine />
                <AuthButtonText>Edit</AuthButtonText>
              </AuthButton>
              <AuthButton className="DeleteButton" onClick={onRemove}>
                <BiTrashAlt />
                <AuthButtonText>Delete</AuthButtonText>
              </AuthButton>
            </AuthButtonWrapper>
          )}
        </AuthWrapper>
        <CommentBlock
          comment={readBlog.post.comment}
          loading={loading || commentLoading}
          user={user}
          id={match.params.id}
          reload={readBlog.reload}
        />
        <AroundWrapper>
          <AroundContent>
            <AroundText>이전글</AroundText>
            {readBlog.prev ? (
              <AroundLink to={`/blog/read/${readBlog.prev._id}`}>{readBlog.prev.title}</AroundLink>
            ) : (
              <AroundNull>이전글이 없습니다.</AroundNull>
            )}
          </AroundContent>
          <AroundContent>
            <AroundText>다음글</AroundText>
            {readBlog.next ? (
              <AroundLink to={`/blog/read/${readBlog.next._id}`}>{readBlog.next.title}</AroundLink>
            ) : (
              <AroundNull>다음글이 없습니다.</AroundNull>
            )}
          </AroundContent>
        </AroundWrapper>
        <ListButtonWrapper to="/blog/list">
          <BiArrowBack />
          List
        </ListButtonWrapper>
      </Wrapper>
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
      {project !== '' && (
        <ProjectLinkWrapper>
          <ProjectLinkRow>
            <AiOutlineFundProjectionScreen />
            <ProjectLinkText>Project: </ProjectLinkText>
            <ProjectLinkBlock to={`/project/read/${project}`}>{project}</ProjectLinkBlock>
          </ProjectLinkRow>
          <ProjectLinkRow>
            <ProjectLinkToSeries
              to={`/blog/list?project=${project}`}
            >{`${project} 관련 포스트 보기`}</ProjectLinkToSeries>
          </ProjectLinkRow>
        </ProjectLinkWrapper>
      )}
      <PostBody className="ql-editor" dangerouslySetInnerHTML={{ __html: body }} />
      {series !== '' && (
        <SeriesLinkWrapper>
          <BsBook />
          <SeriesLinkText>Series: </SeriesLinkText>
          <SeriesLinkBlock to={`/blog/series?series=${series}`}>
            <em>{`'${series}'`}</em> 의 다른 글 보기
          </SeriesLinkBlock>
        </SeriesLinkWrapper>
      )}
      {tags.length > 0 && (
        <TagsWrapper>
          {tags.map((tag) => (
            <Link
              to={`/blog/list/?tag=${tag.name}`}
              key={tag._id}
              style={{ color: tag.color, marginRight: '10px' }}
            >
              {`#${tag.name}`}
            </Link>
          ))}
        </TagsWrapper>
      )}
    </PostWrapper>
  );
};
const CommentBlock = ({ comment, loading, user, id, reload }) => {
  const dispatch = useDispatch();
  const initialState = {
    nickname: user ? '전승하' : '',
    password: user ? '9999' : '',
    content: '',
    replyNickname: user ? '전승하' : '',
    replyPassword: user ? '9999' : '',
    replyContent: '',
    removePassword: '',
  };
  const reducer = (state, action) => {
    var newValue = action.target && action.target.value;
    switch (action.name) {
      case 'nickname':
      case 'replyNickname':
        newValue = newValue.substring(0, 6);
        break;
      case 'password':
      case 'replyPassword':
      case 'removePassword':
        var passwordPattern = /[^0-9]/g;
        if (passwordPattern.test(newValue)) newValue = newValue.replace(passwordPattern, '');
        newValue = newValue.substring(0, 6);
        break;
      case 'content':
      case 'replyContent':
        newValue = newValue.substring(0, 600);
        break;
      case 'resetAll':
        return initialState;
      case 'resetReply':
        return user
          ? { ...state, replyNickname: '전승하', replyPassword: '9999', replyContent: '' }
          : { ...state, replyNickname: '', replyPassword: '', replyContent: '' };
      case 'resetRemove':
        return { ...state, removePassword: '' };
      default:
        break;
    }
    return {
      ...state,
      [action.name]: newValue,
    };
  };
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${format(year % 100)}-${format(month)}-${format(day)} ${format(hour)}:${format(
      minute,
    )}`;
  };
  const countComment = (comment) => {
    let count = 0;
    for (let i = 0; i < comment.length; i++) {
      if (!comment[i].die) count++;
      for (let j = 0; j < comment[i].reply.length; j++) {
        if (!comment[i].reply[j].die) count++;
      }
    }
    return count;
  };
  const loadMoreComment = (i) => {
    let limit = 10;
    for (; i < comment.length; i++) {
      limit -= comment[i].reply.length + 1;
      if (limit <= 0) break;
    }
    return i + 1;
  };
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [replyId, setReplyId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [visibleCommentIndex, setVisibleCommentIndex] = useState(loadMoreComment(0));

  useEffect(() => {
    if (reload) {
      stateDispatch({ name: 'resetAll' });
      setReplyId(null);
      setRemoveId(null);
    }
  }, [reload]);

  const onClickWriteComment = (commentId) => {
    const nickname = commentId !== '' ? state.replyNickname : state.nickname;
    const password = commentId !== '' ? state.replyPassword : state.password;
    const content = commentId !== '' ? state.replyContent : state.content;
    if (nickname.length === 0) {
      alert('닉네임을 입력해 주세요.');
      return;
    }
    if (!user && nickname.includes('승하')) {
      alert('사용할 수 없는 닉네임입니다.');
      return;
    }
    if (password.length < 4) {
      alert('비밀번호가 너무 짧습니다.');
      return;
    }
    if (content.length === 0) {
      alert('댓글 내용을 입력해 주세요.');
      return;
    }
    if (commentId === '') {
      setVisibleCommentIndex(comment.length + 9999);
    }
    dispatch(
      writeCommentPost({
        id: id,
        comment: {
          commentId: commentId,
          comment: { nickname, password, content },
        },
      }),
    );
  };
  const onClickRemoveComment = (commentId) => {
    if (state.removePassword.length === 0) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    dispatch(
      removeCommentPost({
        id: id,
        comment: {
          commentId: commentId,
          password: state.removePassword,
        },
      }),
    );
  };

  return (
    <CommentWrapper>
      <CommentCount>{`${countComment(comment)} Comments`}</CommentCount>
      {comment.slice(0, visibleCommentIndex).map((i) => (
        <CommentBox key={i._id}>
          <CommentItemWrapper nickname={i.nickname} die={i.die}>
            <CommentItemNicknameAndContent>
              <CommentItemNickname nickname={i.nickname} die={i.die}>
                {i.nickname}
              </CommentItemNickname>
              <CommentItemContent>{i.content}</CommentItemContent>
            </CommentItemNicknameAndContent>
            <CommentItemInfo>
              <CommentItemDate>{dateToString(new Date(i.date))}</CommentItemDate>
              <CommentItemButton>
                <CommentItemButtonItem
                  onClick={() => {
                    stateDispatch({ name: 'resetReply' });
                    setReplyId(replyId === i._id ? null : i._id);
                    setRemoveId(null);
                  }}
                >
                  답글
                </CommentItemButtonItem>
                {!i.die && (user || !(i.nickname === '전승하')) && (
                  <CommentItemButtonItem>
                    <div
                      onClick={() => {
                        stateDispatch({ name: 'resetRemove' });
                        setReplyId(null);
                        setRemoveId(removeId === i._id ? null : i._id);
                      }}
                    >
                      삭제
                    </div>
                    {removeId === i._id && (
                      <RemovePopupWrapper>
                        <RemovePopup>
                          <input
                            placeholder="비밀번호"
                            value={state.removePassword}
                            onChange={(e) => stateDispatch({ ...e, name: 'removePassword' })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') onClickRemoveComment(i._id);
                            }}
                          />
                          {loading ? (
                            <div style={{ width: '20px', height: '20px' }}>
                              <Loading r="18px" />
                            </div>
                          ) : (
                            <BsFillTrashFill onClick={() => onClickRemoveComment(i._id)} />
                          )}
                        </RemovePopup>
                      </RemovePopupWrapper>
                    )}
                  </CommentItemButtonItem>
                )}
              </CommentItemButton>
            </CommentItemInfo>
          </CommentItemWrapper>
          {i.reply.map((j) => (
            <CommentItemWrapper
              key={j._id}
              style={{ width: 'calc(100% - 30px)', marginLeft: '30px' }}
              nickname={j.nickname}
              die={j.die}
              reply={true}
            >
              <CommentItemNicknameAndContent>
                <CommentItemNickname nickname={j.nickname} die={j.die}>
                  {j.nickname}
                </CommentItemNickname>
                <CommentItemContent>{j.content}</CommentItemContent>
              </CommentItemNicknameAndContent>
              <CommentItemInfo>
                <CommentItemDate>{dateToString(new Date(j.date))}</CommentItemDate>
                <CommentItemButton>
                  <CommentItemButtonItem
                    onClick={() => {
                      stateDispatch({ name: 'resetReply' });
                      setReplyId(replyId === i._id ? null : i._id);
                      setRemoveId(null);
                    }}
                  >
                    답글
                  </CommentItemButtonItem>
                  {!j.die && (user || !(j.nickname === '전승하')) && (
                    <CommentItemButtonItem>
                      <div
                        onClick={() => {
                          stateDispatch({ name: 'resetRemove' });
                          setReplyId(null);
                          setRemoveId(removeId === j._id ? null : j._id);
                        }}
                      >
                        삭제
                      </div>
                      {removeId === j._id && (
                        <RemovePopupWrapper>
                          <RemovePopup>
                            <input
                              placeholder="비밀번호"
                              value={state.removePassword}
                              onChange={(e) => stateDispatch({ ...e, name: 'removePassword' })}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickRemoveComment(j._id);
                              }}
                            />
                            {loading ? (
                              <div style={{ width: '20px', height: '20px' }}>
                                <Loading r="18px" />
                              </div>
                            ) : (
                              <BsFillTrashFill onClick={() => onClickRemoveComment(j._id)} />
                            )}
                          </RemovePopup>
                        </RemovePopupWrapper>
                      )}
                    </CommentItemButtonItem>
                  )}
                </CommentItemButton>
              </CommentItemInfo>
            </CommentItemWrapper>
          ))}
          {replyId === i._id && (
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                style={{
                  width: '30px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  transform: 'rotate(180deg)',
                  marginTop: '10px',
                }}
              >
                <BiReply style={{ width: '27px', height: '27px' }} />
              </div>
              <CommentInputWrapper style={{ margin: '3px 0 10px 0', width: 'calc(100% - 30px)' }}>
                <CommentInputSmallWrapper>
                  <CommentNickname
                    placeholder="닉네임"
                    value={state.replyNickname}
                    onChange={(e) => stateDispatch({ ...e, name: 'replyNickname' })}
                  />
                  <CommentPassword
                    placeholder="비밀번호 (숫자 4 ~ 6자리)"
                    value={state.replyPassword}
                    onChange={(e) => stateDispatch({ ...e, name: 'replyPassword' })}
                  />
                </CommentInputSmallWrapper>
                <CommentInputSmallWrapper>
                  <CommentInputContent
                    placeholder="내용을 입력하세요."
                    value={state.replyContent}
                    onChange={(e) => stateDispatch({ ...e, name: 'replyContent' })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') onClickWriteComment(i._id);
                    }}
                  />
                  <CommentInputWriteButton onClick={() => onClickWriteComment(i._id)}>
                    {loading ? <Loading r="30px" /> : <BsFillPencilFill />}
                  </CommentInputWriteButton>
                </CommentInputSmallWrapper>
              </CommentInputWrapper>
            </div>
          )}
        </CommentBox>
      ))}
      {comment.length === 0 && (
        <NoComment>
          댓글이 없습니다.
          <br />첫 댓글을 남겨보세요!
        </NoComment>
      )}
      {visibleCommentIndex <= comment.length && (
        <LoadMoreCommentButtonWrapper
          onClick={() => {
            setVisibleCommentIndex(loadMoreComment(visibleCommentIndex));
          }}
        >
          <AiOutlineReload />
          <div>댓글 더 보기</div>
        </LoadMoreCommentButtonWrapper>
      )}
      <CommentInputWrapper>
        <CommentInputSmallWrapper>
          <CommentNickname
            placeholder="닉네임"
            value={state.nickname}
            onChange={(e) => stateDispatch({ ...e, name: 'nickname' })}
          />
          <CommentPassword
            placeholder="비밀번호 (숫자 4 ~ 6자리)"
            value={state.password}
            onChange={(e) => stateDispatch({ ...e, name: 'password' })}
          />
        </CommentInputSmallWrapper>
        <CommentInputSmallWrapper>
          <CommentInputContent
            placeholder="내용을 입력하세요."
            value={state.content}
            onChange={(e) => stateDispatch({ ...e, name: 'content' })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onClickWriteComment('');
            }}
          />
          <CommentInputWriteButton onClick={() => onClickWriteComment('')}>
            {loading ? <Loading r="30px" /> : <BsFillPencilFill />}
          </CommentInputWriteButton>
        </CommentInputSmallWrapper>
      </CommentInputWrapper>
    </CommentWrapper>
  );
};

export default Read;
