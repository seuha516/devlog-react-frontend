import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { AiOutlineFileAdd, AiOutlineRollback } from 'react-icons/ai';
import styled from 'styled-components';

import Loading from 'components/utils/Loading';
import { updatePost, writePost } from 'modules/blog/writeBlog';

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

const WriteButtons = ({ writeBlog, loading, history }) => {
  const dispatch = useDispatch();
  const serialize = (p) => {
    const post = { ...p };
    delete post.originalId;
    delete post.post;
    delete post.error;
    delete post.catalog;
    delete post.catalogError;
    return post;
  };
  const onPublish = () => {
    if (writeBlog.title === '') {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (writeBlog.subTitle === '') {
      alert('부제목을 입력해 주세요.');
      return;
    }
    if (writeBlog.originalId) {
      dispatch(updatePost({ id: writeBlog.originalId, post: serialize(writeBlog) }));
    } else {
      dispatch(writePost(serialize(writeBlog)));
    }
  };
  const onCancel = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <div style={{ width: '100%', height: '70px' }}>
        <Loading />
      </div>
    );
  }
  return (
    <Wrapper>
      <Button hoverColor="#18630f" onClick={onPublish}>
        <AiOutlineFileAdd /> Write
      </Button>
      <Button hoverColor="gray" onClick={onCancel}>
        <AiOutlineRollback /> Cancel
      </Button>
    </Wrapper>
  );
};

export default withRouter(WriteButtons);
