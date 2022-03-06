import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    margin-top: 5px;
  }
`;
const Text = styled.div`
  font-size: 27px;
  margin-right: 8px;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
`;
const LinkBlock = styled(Link)`
  font-size: 24px;
  margin-top: 1px;
  &:hover {
    font-weight: 600;
  }
`;
const LinkToSeries = styled(Link)`
  color: #0056ac;
  margin-top: 5px;
  font-size: 15px;
  &:hover {
    font-weight: 600;
  }
`;

const ProjectLink = ({ project }) => {
  return (
    <>
      <FlexRow>
        <AiOutlineFundProjectionScreen />
        <Text>Project: </Text>
        <LinkBlock to={`/project/read/${project}`}>{project}</LinkBlock>
      </FlexRow>
      <FlexRow>
        <LinkToSeries
          to={`/blog/list?project=${project}`}
        >{`${project} 관련 포스트 보기`}</LinkToSeries>
      </FlexRow>
    </>
  );
};

export default ProjectLink;
