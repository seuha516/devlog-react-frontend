import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { initWriteProject } from 'modules/projects/writeProjects';

//Components
import Header from 'components/project/write/Header';
import Thumbnail from 'components/project/write/Thumbnail';
import Input from 'components/project/write/Input';
import Images from 'components/project/write/Images';
import Tags from 'components/project/write/Tags';
import Update from 'components/project/write/Update';
import WorkingPeriod from 'components/project/write/WorkingPeriod';
import MoreInfo from 'components/project/write/MoreInfo';
import Link from 'components/project/write/Link';
import WriteButton from 'components/project/write/WriteButton';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  padding: 50px 20px;
`;
const WriteWrapper = styled(FlexColumn)`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: #b4b4b4de;
  border-right: 2px solid #000000e8;
  border-bottom: 2px solid #000000e8;
  padding: 25px 20px 50px 20px;
`;

const Write = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Project Write';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  useEffect(() => {
    return () => {
      dispatch(initWriteProject());
    };
  }, [dispatch]);
  return (
    <Wrapper>
      <Header />
      <WriteWrapper>
        <Thumbnail />
        <Input />
        <Images />
        <Tags />
        <Update />
        <WorkingPeriod />
        <MoreInfo />
        <Link />
        <WriteButton />
      </WriteWrapper>
    </Wrapper>
  );
};

export default Write;
