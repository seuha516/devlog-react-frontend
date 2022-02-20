import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineFileAdd, AiOutlineRollback } from 'react-icons/ai';
import { updatePost, writePost } from 'modules/blog/writeBlog';
import LoadingComponent from 'components/utils/LoadingComponent';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 45px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 20px;
  padding-bottom: 2px;
  transition: all 0.3s ease-in-out;
  svg {
    width: 25px;
    height: 25px;
    margin: 2px 12.5px 0 0;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: ${(props) => props.hoverColor};
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

const WriteButtons = ({ history }) => {
  const dispatch = useDispatch();
  const post = useSelector((store) => store.writeBlog);
  const user = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(false);

  const onPublish = () => {
    if (!user) {
      alert('로그인 중이 아닙니다.');
      return;
    }
    if (post.title === '') {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (post.subTitle === '') {
      alert('부제목을 입력해 주세요.');
      return;
    }
    if (post.originalPostId) {
      dispatch(
        updatePost({
          id: post.originalPostId,
          post: {
            title: post.title,
            subTitle: post.subTitle,
            body: post.body,
            thumbnail: post.thumbnail,
            series: post.series,
            tags: post.tags,
          },
        }),
      );
    } else {
      dispatch(
        writePost({
          title: post.title,
          subTitle: post.subTitle,
          body: post.body,
          thumbnail: post.thumbnail,
          series: post.series,
          tags: post.tags,
        }),
      );
    }
    setLoading(true);
  };
  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post.postError) {
      alert('업로드 중 오류가 발생했습니다.');
      setLoading(false);
    } else if (post.post) {
      history.push(`/blog/read/${post.post._id}`);
    }
  }, [history, post.post, post.postError]);

  if (loading)
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <LoadingComponent />
      </div>
    );
  return (
    <Wrapper>
      <Button hoverColor="#18630f" onClick={onPublish}>
        <AiOutlineFileAdd /> Write
      </Button>
      <Button hoverColor="gray" onClick={onCancel}>
        <AiOutlineRollback />
        Cancel
      </Button>
    </Wrapper>
  );
};

export default withRouter(WriteButtons);
