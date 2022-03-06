import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineFileAdd, AiOutlineRollback } from 'react-icons/ai';
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

const WriteButton = ({ history }) => {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.writeProjects);
  const user = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(false);

  const onPublish = () => {
    if (!user) {
      alert('로그인 중이 아닙니다.');
      return;
    }
    if (project.title === '') {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (project.thumbnail === '') {
      alert('썸네일 이미지가 필요합니다.');
      return;
    }
    if (project.workingPeriod.start === '') {
      alert('작업 시작일을 입력해 주세요.');
      return;
    }
    if (project.originalProjectId) {
      dispatch(
        updateProject({
          id: project.originalProjectId,
          project: {
            title: project.title,
            subTitle: project.subTitle,
            body: project.body,
            thumbnail: project.thumbnail,
            images: project.images,
            tags: project.tags,
            update: project.update,
            workingPeriod: project.workingPeriod,
            moreInfo: project.moreInfo,
            link: project.link,
          },
        }),
      );
    } else {
      dispatch(
        writeProject({
          title: project.title,
          subTitle: project.subTitle,
          body: project.body,
          thumbnail: project.thumbnail,
          images: project.images,
          tags: project.tags,
          update: project.update,
          workingPeriod: project.workingPeriod,
          moreInfo: project.moreInfo,
          link: project.link,
        }),
      );
    }
    setLoading(true);
  };
  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (project.projectError) {
      alert('업로드 중 오류가 발생했습니다.');
      setLoading(false);
    } else if (project.project) {
      history.push(`/project/read/${project.project._id}`);
    }
  }, [history, project.project, project.projectError]);

  if (loading)
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <Loading />
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
