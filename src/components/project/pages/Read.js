import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { readProject, unloadProject } from 'modules/projects/readProjects';
import { setOriginalProject } from 'modules/projects/writeProjects';
import { removeProject, initRemove } from 'modules/projects/removeProjects';

import Header from 'components/project/read/Header';
import Thumbnail from 'components/project/read/Thumbnail';
import Text from 'components/project/read/Text';
import Images from 'components/project/read/Images';
import Update from 'components/project/read/Update';
import WorkingPeriod from 'components/project/read/WorkingPeriod';
import MoreInfo from 'components/project/read/MoreInfo';
import ProjectLink from 'components/project/read/ProjectLink';
import Tags from 'components/project/read/Tags';
import Buttons from 'components/project/read/Buttons';
import ListButton from 'components/project/read/ListButton';

import Loading from 'components/utils/Loading';
import Error from 'components/utils/Error';
import NotFound from 'components/utils/NotFound';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  padding: 50px 10px;
`;
const ReadWrapper = styled(FlexColumn)`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: #ffffffde;
  border-right: 2px solid gray;
  border-bottom: 2px solid gray;
  padding: 0px 10px 50px 10px;
`;

const Read = ({ match, history }) => {
  const dispatch = useDispatch();
  const { project, error, removeProjects, loading, user } = useSelector(
    ({ readProjects, removeProjects, loading, user }) => ({
      project: readProjects.project,
      error: readProjects.error,
      removeProjects: removeProjects,
      loading:
        loading['readProjects/READ_PROJECT'] ||
        loading['removeProjects/REMOVE_PROJECT'],
      user: user.user,
    }),
  );

  const { Id } = match.params;
  useEffect(() => {
    dispatch(readProject(Id));
    return () => {
      dispatch(unloadProject());
      dispatch(initRemove());
    };
  }, [dispatch, Id]);

  const onEdit = () => {
    dispatch(setOriginalProject(project));
    history.push('/project/write');
  };
  const onRemove = () => {
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?') === true) {
      dispatch(removeProject(Id));
    }
  };
  useEffect(() => {
    if (removeProjects.error) {
      alert('프로젝트 삭제에 실패했습니다.');
    } else if (removeProjects.remove) {
      history.push('/project/list');
    }
  }, [history, removeProjects]);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = project ? `${project.title}` : `Devlog`;
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [project]);

  if (error) {
    if (error.response && error.response.status === 404) {
      return <NotFound />;
    }
    return <Error />;
  }
  if (loading || !project) return <Loading />;
  return (
    <Wrapper>
      <Header />
      <ReadWrapper>
        <Thumbnail thumbnail={project.thumbnail} />
        <Text
          title={project.title}
          subTitle={project.subTitle}
          body={project.body}
        />
        <ProjectLink title={project.title} link={project.link} />
        {project.images.length > 0 && <Images images={project.images} />}
        {project.update.length > 0 && <Update update={project.update} />}
        <WorkingPeriod workingPeriod={project.workingPeriod} />
        <MoreInfo moreInfo={project.moreInfo} />
        {project.tags.length > 0 && <Tags tags={project.tags} />}
        {user && <Buttons onEdit={onEdit} onRemove={onRemove} />}
      </ReadWrapper>
      <ListButton />
    </Wrapper>
  );
};

export default Read;
