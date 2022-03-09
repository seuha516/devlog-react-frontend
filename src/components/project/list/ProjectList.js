import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFileAdd, AiOutlineLeftCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsHash, BsFillPersonFill, BsPencilSquare } from 'react-icons/bs';
import { MdGroup } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import styled from 'styled-components';
import qs from 'qs';

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

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0;
  padding: 5px 25px;
`;
const InfoCount = styled.div`
  font-size: 70px;
  margin: 0 20px 5px 0;
  font-weight: 600;
  color: white;
  text-shadow: 3px 3px 3px black;
  font-family: 'Roboto Slab', serif;
`;
const InfoText = styled.div`
  font-size: 45px;
  color: #ffffffdb;
  text-shadow: 1.5px 1.5px 2px black;
  font-family: 'Roboto Slab', serif;
`;

const QueryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin: -15px 0 30px 0;
`;
const QueryTag = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: 'Do Hyeon', sans-serif;
  margin: -2.5px 5px;
  border-radius: 3px;
  padding: 5px;
  color: #b1b1b1;
  svg {
    width: 35px;
    height: 35px;
    margin: 0 0 2px -7px;
    color: white;
  }
  transition: all 0.15s linear;
  &:hover {
    background-color: #630d0d;
  }
`;
const QuerySortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-top: 5px;
  color: #b3b3b3;
`;
const QuerySortItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    margin: 0 3px -1.5px 0;
  }
  &:hover {
    color: #88a1ff;
    font-weight: 600;
  }
`;
const QuerySetPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    margin: 0 3px -1.5px 3px;
    border-radius: 30px;
    transition: all 0.2s linear;
  }
  &:hover {
    text-shadow: 1px 1px 1px black;
    svg {
      background-color: white;
      color: black;
    }
  }
  @media all and (max-width: 400px) {
    width: 50px;
  }
`;
const QuerySetPageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
  @media all and (max-width: 400px) {
    display: none;
  }
`;

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  margin-bottom: 35px;
  padding: 0 10px;
`;
const ProjectWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 400px;
  height: 320px;
  border-radius: 10px;
  margin: 15px;
  background-color: gray;
  box-shadow: 1px 1px 1px 1px black;
  transition: box-shadow 0.2s linear;
  &:hover {
    box-shadow: 1px 1px 1px 1px gray;
  }
  @media all and (max-width: 470px) {
    width: 85vw;
    height: 68vw;
    margin: 12.5px 0;
  }
  @media all and (max-width: 370px) {
    margin: 7.5px 0;
  }
`;
const ProjectThumbnailWrapper = styled.div`
  width: 100%;
  height: calc(100% / 320 * 225);
  position: relative;
`;
const ProjectThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
`;
const ProjectTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% / 320 * 95);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #363636;
  color: white;
  justify-content: space-evenly;
  padding: 0 5px;
`;
const ProjectTitle = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 25px;
  font-weight: 600;
  font-family: 'Noto Serif KR', serif;
  letter-spacing: 1px;
  line-height: normal;
  @media all and (max-width: 470px) {
    font-size: calc(85vw * 25 / 400);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;
const ProjectTags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 25px;
  overflow: hidden;
  @media all and (max-width: 470px) {
    height: 18px;
  }
`;
const ProjectTag = styled.div`
  font-size: 18px;
  & + & {
    margin-left: 10px;
  }
  @media all and (max-width: 470px) {
    font-size: calc(85vw * 18 / 400);
    & + & {
      margin-left: calc(85vw * 10 / 400);
    }
  }
`;
const ProjectTagsText = styled.div`
  font-size: 18px;
  color: #b6b6b6;
  margin-left: 10px;
  @media all and (max-width: 470px) {
    font-size: calc(85vw * 18 / 400);
    margin-left: calc(85vw * 10 / 400);
  }
`;
const ProjectClassWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 110px;
  height: 40px;
  margin: 3px;
  opacity: 0.7;
  color: white;
  font-size: 18px;
  font-family: 'PT Sans', sans-serif;
  svg {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  @media all and (max-width: 470px) {
    margin: calc(85vw * 3 / 400);
    width: calc(85vw * 110 / 400);
    height: calc(85vw * 40 / 400);
    border-radius: calc(85vw * 10 / 400);
    font-size: calc(85vw * 18 / 400);
    svg {
      width: calc(85vw * 25 / 400);
      height: calc(85vw * 25 / 400);
      margin-right: calc(85vw * 5 / 400);
    }
  }
`;
const ProjectClass = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const ProjectDevelopStateWrapper = styled.div`
  position: absolute;
  top: 190px;
  left: 290px;
  z-index: 1;
  width: 110px;
  height: 35px;
  font-size: 15px;
  font-family: 'PT Sans', sans-serif;
  color: ${(props) => props.color};
  background-color: black;
  svg {
    width: 21px;
    height: 21px;
    margin-right: 4px;
  }
  @media all and (max-width: 470px) {
    width: calc(85vw * 110 / 400);
    height: calc(85vw * 35 / 400);
    font-size: calc(85vw * 15 / 400);
    top: calc(85vw * 190 / 400);
    left: calc(85vw * 290 / 400);
    svg {
      width: calc(85vw * 21 / 400);
      height: calc(85vw * 21 / 400);
      margin-right: calc(85vw * 4 / 400);
    }
  }
`;
const ProjectDevelopState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PageControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: -15px 0 25px 0;
`;
const PageControlButton = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-top: 1px;
  cursor: pointer;
  color: lightgray;
  font-family: 'Nanum Gothic Coding', monospace;
  transition: all 0.3s linear;
  @media all and (max-width: 432px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  width: 30px;
  height: 30px;
  margin: 0px 7.5px;
  border-radius: 15px;
  background: black;
  color: white;
  box-shadow: 1px 2px #505050;
  transition: all 0.2s linear;
  &:hover {
    background: #252525;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;

const AddButtonWrapper = styled(Link)`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 35px;
  padding: 0px 10px;
  background-color: #2969ff;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    background-color: #0136b2;
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
const AddButtonText = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
`;

const ProjectList = ({ projects, projectCount, location, user, setPage }) => {
  const { page, tag, sort } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const nowPage = parseInt(page || '1');
  const lastPage = Math.max(Math.floor((projectCount + 5) / 6), 1);
  const setList = (start, end) => {
    let ret = [];
    if (projectCount === 0) {
      return [];
    } else if (nowPage > lastPage) {
      return [lastPage];
    } else {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= lastPage) ret.push(i);
      }
      return ret;
    }
  };
  const makeQueryString = ({ tag, sort }) => {
    const queryObject = {
      ...(tag ? { tag: tag } : {}),
      ...(sort ? { sort: sort } : {}),
    };
    return qs.stringify(queryObject);
  };
  const makeQueryStringByPage = (page) => qs.stringify({ page: page, tag, sort });
  const ClassList = {
    'Group Project': {
      text: 'Group',
      icon: <MdGroup />,
      color: '#547a11',
    },
    'Personal Project': {
      text: 'Personal',
      icon: <BsFillPersonFill />,
      color: '#000b8d',
    },
    Practice: {
      text: 'Practice',
      icon: <BsPencilSquare />,
      color: '#141414',
    },
  };
  const StateList = {
    'In Progress': {
      text: 'In Progress',
      icon: <VscDebugRestart />,
      color: '#ecc38a',
    },
    Complete: {
      text: 'Complete',
      icon: <AiOutlineCheckCircle />,
      color: '#9effa4',
    },
  };

  return (
    <Wrapper>
      <FlexBox style={{ width: '100%' }}>
        <InfoWrapper>
          <InfoCount>{projectCount}</InfoCount>
          <InfoText>Projects</InfoText>
        </InfoWrapper>
        <QueryWrapper>
          {tag && (
            <QueryTag to={`/project/list?${makeQueryString({ sort })}`}>
              <BsHash />
              {tag}
            </QueryTag>
          )}
          <QuerySortWrapper>
            <QuerySetPage style={{ justifyContent: 'flex-start' }} onClick={() => setPage(0)}>
              <AiOutlineLeftCircle />
              <QuerySetPageText>Tags</QuerySetPageText>
            </QuerySetPage>
            {sort === '1' ? (
              <QuerySortItem
                to={`/project/list?${makeQueryString({
                  tag,
                  sort: '-1',
                })}`}
              >
                <BiTimeFive />
                최신순으로 보기
              </QuerySortItem>
            ) : (
              <QuerySortItem to={`/project/list?${makeQueryString({ tag, sort: '1' })}`}>
                <BiTimeFive />
                작성순으로 보기
              </QuerySortItem>
            )}
            <QuerySetPage style={{ visibility: 'hidden' }}>
              <AiOutlineLeftCircle />
              <QuerySetPageText>Tags</QuerySetPageText>
            </QuerySetPage>
          </QuerySortWrapper>
        </QueryWrapper>
        <ProjectsWrapper>
          {projects.map((project) => (
            <ProjectWrapper key={project._id} to={`/project/read/${project._id}`}>
              <ProjectThumbnailWrapper>
                <ProjectThumbnail
                  src={
                    project.thumbnail === ''
                      ? 'images/Project/Default.png'
                      : `${process.env.REACT_APP_API_IMAGE}/${project.thumbnail}`
                  }
                />
                <ProjectClassWrapper>
                  <ProjectClass
                    style={{ backgroundColor: ClassList[project.moreInfo.projectClass].color }}
                  >
                    {ClassList[project.moreInfo.projectClass].icon}
                    {ClassList[project.moreInfo.projectClass].text}
                  </ProjectClass>
                </ProjectClassWrapper>
                <ProjectDevelopStateWrapper color={StateList[project.moreInfo.developState].color}>
                  <ProjectDevelopState>
                    {StateList[project.moreInfo.developState].icon}
                    {StateList[project.moreInfo.developState].text}
                  </ProjectDevelopState>
                </ProjectDevelopStateWrapper>
              </ProjectThumbnailWrapper>
              <ProjectTextWrapper>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectTags>
                  {project.tags.map((tag, index) => {
                    if (index < 3) {
                      return (
                        <ProjectTag
                          key={tag.name}
                          style={{ color: tag.color }}
                        >{`#${tag.name}`}</ProjectTag>
                      );
                    } else if (index === 3) {
                      return (
                        <ProjectTagsText key={tag.name}>{` + ${
                          project.tags.length - 3
                        }`}</ProjectTagsText>
                      );
                    } else return null;
                  })}
                </ProjectTags>
              </ProjectTextWrapper>
            </ProjectWrapper>
          ))}
        </ProjectsWrapper>
      </FlexBox>
      <FlexBox>
        <PageControlWrapper>
          {nowPage > 1 && (
            <PageControlButton
              to={`/project/list?${makeQueryStringByPage(1)}`}
              style={{ marginRight: '5px' }}
            >{`<<`}</PageControlButton>
          )}
          {nowPage > 1 && (
            <PageControlButton
              to={`/project/list?${makeQueryStringByPage(nowPage - 1)}`}
              style={{ marginRight: '5px' }}
            >{`<`}</PageControlButton>
          )}
          <PageControlNumberWrapper>
            {setList(nowPage - 2, nowPage + 2).map((n) => (
              <PageControlNumber
                key={n}
                to={`/project/list?${makeQueryStringByPage(n)}`}
                style={n === nowPage ? { background: 'white', color: 'black' } : {}}
              >
                {n}
              </PageControlNumber>
            ))}
          </PageControlNumberWrapper>
          {nowPage < lastPage && (
            <PageControlButton
              to={`/project/list?${makeQueryStringByPage(nowPage + 1)}`}
              style={{ marginLeft: '5px' }}
            >{`>`}</PageControlButton>
          )}
          {nowPage < lastPage && (
            <PageControlButton
              to={`/project/list?${makeQueryStringByPage(lastPage)}`}
              style={{ marginLeft: '5px' }}
            >{`>>`}</PageControlButton>
          )}
        </PageControlWrapper>
        {user && (
          <AddButtonWrapper to="/project/write">
            <AiOutlineFileAdd />
            <AddButtonText>Add</AddButtonText>
          </AddButtonWrapper>
        )}
      </FlexBox>
    </Wrapper>
  );
};

export default ProjectList;
