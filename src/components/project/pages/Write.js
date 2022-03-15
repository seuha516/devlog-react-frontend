import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Thumbnail from 'components/project/write/Thumbnail';
import Input from 'components/project/write/Input';
import Images from 'components/project/write/Images';
import Tags from 'components/project/write/Tags';
import Update from 'components/project/write/Update';
import WorkingPeriod from 'components/project/write/WorkingPeriod';
import MoreInfo from 'components/project/write/MoreInfo';
import Link from 'components/project/write/Link';
import WriteButton from 'components/project/write/WriteButton';
import { catalogProject, initWriteProject } from 'modules/projects/writeProjects';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50px 20px;
`;
const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: #b4b4b4de;
  border-right: 2px solid #000000e8;
  border-bottom: 2px solid #000000e8;
  padding: 25px 20px 50px 20px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 130px;
`;
const HeaderTextWrapper = styled.div`
  width: calc(100% - 80px);
  height: 100%;
  padding: 40px;
  background-color: #b4b4b4de;
`;
const HeaderText = styled.div`
  font-size: 40px;
  font-weight: 700;
  font-family: 'Bitter', serif;
  letter-spacing: 1px;
`;
const HeaderTriangle = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  margin-left: calc(min(100%, 1040px) - 120px);
  display: inline-block;
  vertical-align: middle;
  border-top: solid 40px transparent;
  border-right: solid 40px transparent;
  border-bottom: solid 40px #515151;
  border-left: solid 40px #515151;
  box-shadow: -2px 2px 4px black;
`;
const HeaderRectangle = styled.div`
  width: 80px;
  height: 50px;
  margin-top: 80px;
  border-right: 2px solid #000000e8;
  background-color: #b4b4b4de;
`;

const Write = () => {
  const navigate = useNavigate();
  const { writeProjects, loading, user } = useSelector(({ writeProjects, loading, user }) => ({
    writeProjects: writeProjects,
    loading: loading['writeProjects/WRITE_PROJECT'] || loading['writeProjects/UPDATE_PROJECT'],
    user: user.user,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(catalogProject());
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Project Write';
    return () => {
      dispatch(initWriteProject());
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch]);
  useEffect(() => {
    if (!user) {
      navigate(`/project/list`);
    }
    if (writeProjects.project) {
      navigate(`/project/read/${writeProjects.project._id}`);
    }
  }, [navigate, user, writeProjects.project]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <HeaderTextWrapper>
          <HeaderText>{writeProjects.originalId ? 'Edit Project' : 'New Project'}</HeaderText>
        </HeaderTextWrapper>
        <HeaderTriangle />
        <HeaderRectangle />
      </HeaderWrapper>
      <WriteWrapper>
        <Thumbnail thumbnail={writeProjects.thumbnail} />
        <Input title={writeProjects.title} subTitle={writeProjects.subTitle} body={writeProjects.body} />
        <Images images={writeProjects.images} />
        <Tags tags={writeProjects.tags} tagList={writeProjects.catalog.tags} />
        <Update update={writeProjects.update} />
        <WorkingPeriod workingPeriod={writeProjects.workingPeriod} />
        <MoreInfo moreInfo={writeProjects.moreInfo} />
        <Link link={writeProjects.link} />
        <WriteButton writeProjects={writeProjects} loading={loading} />
      </WriteWrapper>
    </Wrapper>
  );
};

export default Write;
