import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';

import { listProject } from 'modules/projects/listProjects';
import Project from 'components/home/Project';
import LoadingComponent from 'components/utils/LoadingComponent';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  position: relative;
  background-color: black;
  color: white;
  grid-column: 1 / 2;
  grid-row: 2 / 4;
  padding: 35px 5%;
  @media all and (max-width: 1024px) {
    grid-column: 1 / 5;
    grid-row: 2 / 3;
  }
  @media all and (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }
`;
const Header = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
`;
const Title = styled.div`
  font-size: 45px;
  font-family: 'Anton', sans-serif;
`;
const More = styled(Link)`
  font-size: 25px;
  font-family: 'Antonio', sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    width: 27px;
    height: 27px;
    margin: 0 0 -2px 7px;
  }
  &:hover {
    color: #14a1ed;
  }
`;
const Content = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  min-height: 75px;
  justify-content: space-evenly;
`;

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, projectCount, error, loading } = useSelector(
    ({ listProjects, loading }) => ({
      projects: listProjects.projects,
      projectCount: listProjects.projectCount,
      error: listProjects.error,
      loading: loading['listProjects/LIST_PROJECT'],
    }),
  );
  useEffect(() => {
    dispatch(listProject(''));
  }, [dispatch]);
  return (
    <Wrapper>
      <Header>
        <Title>Project</Title>
        <More to="project/list">
          {projects && `${Math.max(projectCount - 2, 0)} More`}
          <BsArrowRight />
        </More>
      </Header>
      <Content>
        {error ? (
          <div>Error</div>
        ) : loading ? (
          <LoadingComponent />
        ) : (
          projects &&
          projects
            .slice(0, 2)
            .map((project) => <Project key={project._id} project={project} />)
        )}
      </Content>
    </Wrapper>
  );
};

export default Projects;
