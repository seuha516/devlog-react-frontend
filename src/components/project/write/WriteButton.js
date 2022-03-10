import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { AiOutlineFileAdd, AiOutlineRollback } from 'react-icons/ai';
import styled from 'styled-components';
import { writeProject, updateProject } from 'modules/projects/writeProjects';
import Loading from 'components/utils/Loading';

const Wrapper = styled.div`
  width: 50%;
  min-width: 240px;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 45px;
  margin: 5px;
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
    background-color: #18630f;
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

const WriteButton = ({ writeProjects, loading, history }) => {
  const dispatch = useDispatch();
  const serialize = (p) => {
    const post = { ...p };
    delete post.originalId;
    delete post.project;
    delete post.error;
    delete post.catalog;
    delete post.catalogError;
    return post;
  };

  const onPublish = () => {
    if (writeProjects.title === '') {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (writeProjects.thumbnail === '') {
      alert('썸네일 이미지가 필요합니다.');
      return;
    }
    if (writeProjects.workingPeriod.start === '') {
      alert('작업 시작일을 입력해 주세요.');
      return;
    }
    if (writeProjects.originalId) {
      dispatch(
        updateProject({
          id: writeProjects.originalId,
          project: serialize(writeProjects),
        }),
      );
    } else {
      dispatch(writeProject(serialize(writeProjects)));
    }
  };
  const onCancel = () => {
    history.goBack();
  };

  if (loading)
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <Loading r="50px" />
      </div>
    );
  return (
    <Wrapper>
      <Button onClick={onPublish}>
        <AiOutlineFileAdd /> Write
      </Button>
      <Button onClick={onCancel}>
        <AiOutlineRollback />
        Cancel
      </Button>
    </Wrapper>
  );
};

export default withRouter(WriteButton);
