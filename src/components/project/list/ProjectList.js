import React from 'react';
import styled from 'styled-components';

import Info from 'components/project/list/projects/Info';
import Query from 'components/project/list/projects/Query';
import Project from 'components/project/list/projects/Project';
import PageControl from 'components/project/list/projects/PageControl';
import WriteButton from 'components/project/list/projects/WriteButton';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: appear 0.3s ease-out;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @keyframes appear {
    from {
      opacity: 0;
      margin-top: 60px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectList = ({ projects, projectCount, location, user, setPage }) => {
  return (
    <Wrapper>
      <FlexBox style={{ width: '100%' }}>
        <Info projectCount={projectCount} />
        <Query location={location} setPage={setPage} />
        <Project projects={projects} />
      </FlexBox>
      <FlexBox>
        <PageControl location={location} projectCount={projectCount} />
        {user && <WriteButton />}
      </FlexBox>
    </Wrapper>
  );
};

export default ProjectList;
