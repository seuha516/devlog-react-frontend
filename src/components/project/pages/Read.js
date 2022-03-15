import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillGithub, AiOutlineEdit, AiOutlineDelete, AiOutlineReload } from 'react-icons/ai';
import { BiLink, BiCodeBlock, BiTimer, BiLike, BiArrowBack, BiReply } from 'react-icons/bi';
import { BsImages, BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { ImNewspaper } from 'react-icons/im';
import { IoIosPricetags } from 'react-icons/io';
import { GiSandsOfTime } from 'react-icons/gi';
import { GrDocumentUpdate } from 'react-icons/gr';
import styled, { css } from 'styled-components';

import { setOriginalProject } from 'modules/projects/writeProjects';
import { initReadProject, readProject, removeProject, likeProject, writeCommentProject, removeCommentProject } from 'modules/projects/readProjects';

import Error from 'components/utils/Error';
import NotFound from 'components/utils/NotFound';
import Loading from 'components/utils/Loading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50px 10px;
`;
const ReadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: #ffffffde;
  border-right: 2px solid gray;
  border-bottom: 2px solid gray;
  padding: 0px 10px 20px 10px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 100px;
`;
const HeaderRectangle1 = styled.div`
  width: calc(100% - 80px);
  height: 100%;
  background-color: #ffffffde;
`;
const HeaderRectangle2 = styled.div`
  width: 80px;
  height: 20px;
  margin-top: 80px;
  border-right: 2px solid gray;
  background-color: #ffffffde;
`;
const HeaderTriangle = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  margin-left: calc(min(100%, 1020px) - 100px);
  display: inline-block;
  vertical-align: middle;
  border-top: solid 40px transparent;
  border-right: solid 40px transparent;
  border-bottom: solid 40px #898989;
  border-left: solid 40px #898989;
  box-shadow: -2px 2px 2px black;
`;
const ThumbnailWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
`;
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;
const TextWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TextTitle = styled.div`
  margin-bottom: 25px;
  font-size: 50px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
`;
const TextSubTitle = styled.div`
  margin-bottom: 25px;
  font-size: 27px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
`;
const TextBody = styled.textarea`
  width: 90%;
  height: 92px;
  padding: 3px;
  text-align: center;
  resize: none;
  outline: none;
  border: none;
  background-color: transparent;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const ProjectLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
const ProjectLinkTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 15px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 10px 0 0;
  }
`;
const ProjectLinkResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 10px 0px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #1e1e1e;
  overflow: auto;
`;
const ProjectLinkData = styled.a`
  margin: 7.5px 0px;
  color: white;
  font-size: 20px;
  transition: 0.3s all linear;
  svg {
    width: 25px;
    height: 25px;
    margin: 1.5px 15px 0px 0px;
  }
  &:hover {
    color: #bdfffc;
  }
`;
const ProjectLinkPost = styled(Link)`
  margin: 7.5px 0px;
  color: white;
  font-size: 20px;
  transition: 0.3s all linear;
  svg {
    width: 25px;
    height: 25px;
    margin: 1.5px 15px 0px 0px;
  }
  &:hover {
    color: #bdfffc;
  }
`;
const ProjectLinkDataIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const ImagesTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 15px 0 0;
  }
`;
const ImagesGallery = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const ImagesImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  &:hover {
    filter: contrast(80%);
  }
`;
const ImagesPopupBackground = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 250;
  background-color: #000000ca;
`;
const ImagesPopupImage = styled.img`
  max-width: 80vmin;
  max-height: 80vmin;
  z-index: 251;
`;
const UpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const UpdateTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 35px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 10px 0 0;
  }
`;
const UpdateResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  min-height: 40px;
  padding: 10px 0px;
  border-radius: 10px;
  background: #bababa;
`;
const UpdateData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 7.5px 0px;
`;
const UpdateContents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Nanum Myeongjo', serif;
  line-height: 24px;
  margin: 5px;
  color: black;
  text-align: center;
  word-break: break-all;
`;
const UpdateDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  margin: 5px;
  text-align: center;
  color: black;
`;
const WorkingPeriodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;
const WorkingPeriodTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 10px 0 0;
  }
`;
const WorkingPeriodDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const WorkingPeriodDate = styled.div`
  width: 125px;
  height: 40px;
  font-size: 25px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
`;
const WorkingPeriodText = styled.div`
  font-size: 35px;
  font-family: 'Crimson Pro', serif;
  margin: 0 5px 20px 5px;
`;
const MoreInfoWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MoreInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 12.5px 0px;
  font-size: 20px;
  font-family: 'PT Sans', sans-serif;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin-top: 40px;
`;
const TagsTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 35px;
    height: 35px;
    margin: 10px 10px 0 0;
  }
`;
const TagsTagBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 10px;
  flex-wrap: wrap;
  font-size: 20px;
  line-height: 22.5px;
  background-color: #222222;
`;
const Tag = styled(Link)`
  font-size: 18px;
  cursor: pointer;
  margin: 7.5px;
`;
const AuthWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  border-top: 1px solid grey;
`;
const LikeWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  font-size: 24px;
  font-family: 'PT Sans', sans-serif;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 0 15px 0 12.5px;
  background-color: #dfdfdf;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    background-color: #bfbfbf;
  }
`;
const AuthButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 40px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 20px;
  padding-bottom: 2px;
  margin: 5px 0px 5px 5px;
  transition: all 0.3s ease-in-out;
  @media all and (max-width: 400px) {
    width: 80px;
  }
  @media all and (max-width: 340px) {
    width: 60px;
    font-size: 16px;
  }
  svg {
    width: 25px;
    height: 25px;
    margin: 2px 7.5px 0 0;
    @media all and (max-width: 400px) {
      display: none;
    }
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
const ListButtonWrapper = styled(Link)`
  width: 200px;
  height: 50px;
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #414141;
  font-size: 28px;
  font-family: 'Rubik', sans-serif;
  transition: all 0.15s linear;
  svg {
    margin-right: 10px;
  }
  &:hover {
    color: black;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0 10px 0;
  border-bottom: 1px solid grey;
`;
const CommentCount = styled.div`
  width: 100%;
  font-size: 24px;
  font-family: 'Hubballi', cursive;
  margin-bottom: 10px;
`;
const NoComment = styled.div`
  width: 100%;
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  color: #515151;
  font-family: 'Poor Story', cursive;
`;
const CommentInputWrapper = styled.div`
  width: 100%;
  height: 105px;
  margin-top: 10px;
  padding: 5px;
  background-color: #cdcdcd;
  border-radius: 5px;
`;
const CommentInputSmallWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
`;
const CommentNickname = styled.input`
  width: 90px;
  height: 40px;
  padding: 0 5px;
  margin-right: 5px;
  border: 1px solid grey;
  border-radius: 5px;
`;
const CommentPassword = styled.input`
  width: 140px;
  height: 40px;
  padding: 0 5px;
  &::placeholder {
    font-size: 12px;
    letter-spacing: -1px;
  }
  border: 1px solid grey;
  border-radius: 5px;
`;
const CommentInputContent = styled.input`
  width: calc(100% - 53px);
  height: 50px;
  border: 1px solid grey;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 5px;
  &::placeholder {
    font-size: 14px;
  }
`;
const CommentInputWriteButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  background-color: #4c4c4c;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s linear;
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #323232;
  }
`;
const CommentBox = styled.div`
  width: 100%;
`;
const CommentItemWrapper = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: #f1f1f1;
  margin-top: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) =>
    props.die &&
    css`
      height: 55px;
      min-height: 55px;
    `}
  ${(props) =>
    props.reply &&
    css`
      background-color: #d9d9d9;
    `}
  ${(props) =>
    props.nickname === '전승하' &&
    (props.reply
      ? css`
          background-color: #e1e9ef;
        `
      : css`
          background-color: #f0f9ff;
        `)}
`;
const CommentItemNicknameAndContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const CommentItemNickname = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  font-size: 17px;
  font-weight: ${(props) => (props.nickname === '전승하' ? '700' : '400')};
  ${(props) =>
    props.die &&
    css`
      display: none;
    `}
`;
const CommentItemContent = styled.div`
  width: 100%;
  font-size: 15px;
  line-height: 18px;
  word-break: break-all;
  margin: 5px 0;
  color: #525252;
`;
const CommentItemInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const CommentItemDate = styled.div`
  font-size: 14px;
`;
const CommentItemButton = styled.div`
  display: flex;
`;
const CommentItemButtonItem = styled.div`
  margin-left: 5px;
  cursor: pointer;
  position: relative;
`;
const RemovePopupWrapper = styled.div`
  position: absolute;
  top: -38px;
  left: -168px;
  width: 200px;
  height: 35px;
  cursor: default;
  background-color: #cbcbcb;
  border-radius: 5px;
  border: 1px solid #5c5c5c;
`;
const RemovePopup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px;
  input {
    width: calc(100% - 25px);
    height: 100%;
    padding: 0 3px;
    border: 1px solid grey;
    font-size: 15px;
    border-radius: 5px;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #363636;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
const LoadMoreCommentButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px 0;
  background-color: #c9c9c9;
  margin-top: 5px;
  display: flex;
  flex-direction: center;
  justify-content: center;
  transition: all 0.15s linear;
  cursor: pointer;
  &:hover {
    background-color: #a1a1a1;
  }
  svg {
    width: 20px;
    height: 20px;
    margin: -1px 5px 0 0;
  }
  div {
    height: 20px;
  }
`;

const Read = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { readProjects, loading, removeLoading, likeLoading, commentLoading, user } = useSelector(({ readProjects, loading, user }) => ({
    readProjects: readProjects,
    loading: loading['readProjects/READ_PROJECT'],
    removeLoading: loading['readProjects/REMOVE_PROJECT'],
    likeLoading: loading['readProjects/LIKE_PROJECT'],
    commentLoading: loading['readProjects/WRITE_COMMENT_PROJECT'] || loading['readProjects/REMOVE_COMMENT_PROJECT'],
    user: user.user,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initReadProject());
    dispatch(readProject(id));
    return () => {
      dispatch(initReadProject());
    };
  }, [dispatch, id]);
  useEffect(() => {
    if (readProjects.remove) navigate('/project/list');
    if (readProjects.reload) dispatch(readProject(id));
  }, [dispatch, id, navigate, readProjects.reload, readProjects.remove]);

  const MoreInfocolor = {
    'Group Project': '#0b6412',
    'Personal Project': '#00138a',
    Practice: '#5a5a5a',
    'In Progress': '#604f00',
    Complete: '#00653e',
  };
  const [imagePopUp, setImagePopup] = useState(null);
  const onRemove = () => {
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      dispatch(removeProject(readProjects.project._id));
    }
  };
  const onEdit = () => {
    dispatch(setOriginalProject(readProjects.project));
    navigate('/project/write');
  };

  if (readProjects.error) {
    if (readProjects.error.response.status === 404) {
      return <NotFound />;
    } else {
      return <Error />;
    }
  } else if (removeLoading || !readProjects.project) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  } else {
    return (
      <Wrapper>
        <HeaderWrapper>
          <HeaderRectangle1 />
          <HeaderTriangle />
          <HeaderRectangle2 />
        </HeaderWrapper>
        <ReadWrapper>
          <ThumbnailWrapper>
            <ThumbnailImage src={readProjects.project.thumbnail === '' ? '/images/Project/Default.png' : `${process.env.REACT_APP_API_IMAGE}/${readProjects.project.thumbnail}`} alt="thumbnail" />
          </ThumbnailWrapper>
          <TextWrapper>
            <TextTitle>{readProjects.project.title}</TextTitle>
            <TextSubTitle>{readProjects.project.subTitle}</TextSubTitle>
            {readProjects.project.body !== '' && <TextBody defaultValue={readProjects.project.body} readOnly />}
          </TextWrapper>
          <ProjectLinkWrapper>
            <ProjectLinkTitle>
              <BiLink /> Link
            </ProjectLinkTitle>
            <ProjectLinkResult>
              {readProjects.project.link.website.map((item) => (
                <ProjectLinkData key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
                  <ProjectLinkDataIconWrapper>
                    <BiCodeBlock />
                    {item.info}
                  </ProjectLinkDataIconWrapper>
                </ProjectLinkData>
              ))}
              {readProjects.project.link.github.map((item) => (
                <ProjectLinkData key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
                  <ProjectLinkDataIconWrapper>
                    <AiFillGithub />
                    {item.info}
                  </ProjectLinkDataIconWrapper>
                </ProjectLinkData>
              ))}
              <ProjectLinkPost to={`/blog/list?project=${readProjects.project.title}`}>
                <ProjectLinkDataIconWrapper>
                  <ImNewspaper />
                  Post
                </ProjectLinkDataIconWrapper>
              </ProjectLinkPost>
            </ProjectLinkResult>
          </ProjectLinkWrapper>
          {readProjects.project.images.length > 0 && (
            <ImagesWrapper>
              <ImagesTitle>
                <BsImages /> Images
              </ImagesTitle>
              <ImagesGallery>
                {readProjects.project.images.map((item) => (
                  <ImagesImage key={item} src={`${process.env.REACT_APP_API_IMAGE}/${item}`} alt="projectImage" onClick={() => setImagePopup(item)} />
                ))}
              </ImagesGallery>
              {imagePopUp && (
                <ImagesPopupBackground onClick={() => setImagePopup(null)}>
                  <ImagesPopupImage src={`${process.env.REACT_APP_API_IMAGE}/${imagePopUp}`} alt="PopupImage" />
                </ImagesPopupBackground>
              )}
            </ImagesWrapper>
          )}
          {readProjects.project.update.length > 0 && (
            <UpdateWrapper>
              <UpdateTitle>
                <GrDocumentUpdate /> Update Log
              </UpdateTitle>
              <UpdateResult>
                {readProjects.project.update.map((item) => (
                  <UpdateData key={item.content}>
                    <UpdateContents>{item.content}</UpdateContents>
                    <UpdateDate>{item.date}</UpdateDate>
                  </UpdateData>
                ))}
              </UpdateResult>
            </UpdateWrapper>
          )}
          <WorkingPeriodWrapper>
            <WorkingPeriodTitle>
              <BiTimer /> Working Period
            </WorkingPeriodTitle>
            <WorkingPeriodDateWrapper>
              {readProjects.project.workingPeriod.end !== '' ? (
                <>
                  <WorkingPeriodDate>{readProjects.project.workingPeriod.start}</WorkingPeriodDate>
                  <WorkingPeriodText>~</WorkingPeriodText>
                  <WorkingPeriodDate>{readProjects.project.workingPeriod.end}</WorkingPeriodDate>
                </>
              ) : (
                <>
                  <WorkingPeriodDate style={{ width: '150px' }}>{`${readProjects.project.workingPeriod.start} ...`}</WorkingPeriodDate>
                </>
              )}
            </WorkingPeriodDateWrapper>
          </WorkingPeriodWrapper>
          <MoreInfoWrapper>
            <MoreInfo style={{ color: MoreInfocolor[readProjects.project.moreInfo.projectClass] }}>
              <BiCodeBlock />
              {readProjects.project.moreInfo.projectClass}
            </MoreInfo>
            <MoreInfo style={{ color: MoreInfocolor[readProjects.project.moreInfo.developState] }}>
              <GiSandsOfTime />
              {readProjects.project.moreInfo.developState}
            </MoreInfo>
          </MoreInfoWrapper>
          {readProjects.project.tags.length > 0 && (
            <TagsWrapper>
              <TagsTitle>
                <IoIosPricetags /> Tags
              </TagsTitle>
              <TagsTagBox>
                {readProjects.project.tags.map((tag) => (
                  <Tag key={tag.name} style={{ color: tag.color }} to={`/project/list?tag=${tag.name}`}>
                    {`#${tag.name}`}
                  </Tag>
                ))}
              </TagsTagBox>
            </TagsWrapper>
          )}
          <AuthWrapper>
            {loading || likeLoading ? (
              <LikeWrapper>
                <Loading r="24px" />
              </LikeWrapper>
            ) : (
              <LikeWrapper onClick={() => dispatch(likeProject(readProjects.project._id))}>
                <BiLike />
                <div>{readProjects.project.like.length}</div>
              </LikeWrapper>
            )}
            {user && (
              <AuthButtonWrapper>
                <AuthButton hoverColor="#714900" onClick={onEdit}>
                  <AiOutlineEdit />
                  Edit
                </AuthButton>
                <AuthButton hoverColor="#850000" onClick={onRemove}>
                  <AiOutlineDelete />
                  Delete
                </AuthButton>
              </AuthButtonWrapper>
            )}
          </AuthWrapper>
          <CommentBlock comment={readProjects.project.comment} loading={loading || commentLoading} user={user} id={readProjects.project._id} reload={readProjects.reload} />
          <ListButtonWrapper to="/project/list">
            <BiArrowBack />
            List
          </ListButtonWrapper>
        </ReadWrapper>
      </Wrapper>
    );
  }
};

export default Read;

const CommentBlock = ({ comment, loading, user, id, reload }) => {
  const dispatch = useDispatch();
  const initialState = {
    nickname: user ? '전승하' : '',
    password: user ? '9999' : '',
    content: '',
    replyNickname: user ? '전승하' : '',
    replyPassword: user ? '9999' : '',
    replyContent: '',
    removePassword: '',
  };
  const reducer = (state, action) => {
    var newValue = action.target && action.target.value;
    switch (action.name) {
      case 'nickname':
      case 'replyNickname':
        newValue = newValue.substring(0, 6);
        break;
      case 'password':
      case 'replyPassword':
      case 'removePassword':
        var passwordPattern = /[^0-9]/g;
        if (passwordPattern.test(newValue)) newValue = newValue.replace(passwordPattern, '');
        newValue = newValue.substring(0, 6);
        break;
      case 'content':
      case 'replyContent':
        newValue = newValue.substring(0, 600);
        break;
      case 'resetAll':
        return initialState;
      case 'resetReply':
        return user ? { ...state, replyNickname: '전승하', replyPassword: '9999', replyContent: '' } : { ...state, replyNickname: '', replyPassword: '', replyContent: '' };
      case 'resetRemove':
        return { ...state, removePassword: '' };
      default:
        break;
    }
    return {
      ...state,
      [action.name]: newValue,
    };
  };
  const dateToString = (date) => {
    const format = (n) => (n < 10 ? `0${n}` : `${n}`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${format(year % 100)}-${format(month)}-${format(day)} ${format(hour)}:${format(minute)}`;
  };
  const countComment = (comment) => {
    let count = 0;
    for (let i = 0; i < comment.length; i++) {
      if (!comment[i].die) count++;
      for (let j = 0; j < comment[i].reply.length; j++) {
        if (!comment[i].reply[j].die) count++;
      }
    }
    return count;
  };
  const loadMoreComment = (i) => {
    let limit = 10;
    for (; i < comment.length; i++) {
      limit -= comment[i].reply.length + 1;
      if (limit <= 0) break;
    }
    return i + 1;
  };
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [replyId, setReplyId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const [visibleCommentIndex, setVisibleCommentIndex] = useState(loadMoreComment(0));

  useEffect(() => {
    if (reload) {
      stateDispatch({ name: 'resetAll' });
      setReplyId(null);
      setRemoveId(null);
    }
  }, [reload]);

  const onClickWriteComment = (commentId) => {
    const nickname = commentId !== '' ? state.replyNickname : state.nickname;
    const password = commentId !== '' ? state.replyPassword : state.password;
    const content = commentId !== '' ? state.replyContent : state.content;
    if (nickname.length === 0) {
      alert('닉네임을 입력해 주세요.');
      return;
    }
    if (!user && nickname.includes('승하')) {
      alert('사용할 수 없는 닉네임입니다.');
      return;
    }
    if (password.length < 4) {
      alert('비밀번호가 너무 짧습니다.');
      return;
    }
    if (content.length === 0) {
      alert('댓글 내용을 입력해 주세요.');
      return;
    }
    if (commentId === '') {
      setVisibleCommentIndex(comment.length + 9999);
    }
    dispatch(
      writeCommentProject({
        id: id,
        comment: {
          commentId: commentId,
          comment: { nickname, password, content },
        },
      }),
    );
  };
  const onClickRemoveComment = (commentId) => {
    if (state.removePassword.length === 0) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    dispatch(
      removeCommentProject({
        id: id,
        comment: {
          commentId: commentId,
          password: state.removePassword,
        },
      }),
    );
  };

  return (
    <CommentWrapper>
      <CommentCount>{`${countComment(comment)} Comments`}</CommentCount>
      {comment.slice(0, visibleCommentIndex).map((i) => (
        <CommentBox key={i._id}>
          <CommentItemWrapper nickname={i.nickname} die={i.die}>
            <CommentItemNicknameAndContent>
              <CommentItemNickname nickname={i.nickname} die={i.die}>
                {i.nickname}
              </CommentItemNickname>
              <CommentItemContent>{i.content}</CommentItemContent>
            </CommentItemNicknameAndContent>
            <CommentItemInfo>
              <CommentItemDate>{dateToString(new Date(i.date))}</CommentItemDate>
              <CommentItemButton>
                <CommentItemButtonItem
                  onClick={() => {
                    stateDispatch({ name: 'resetReply' });
                    setReplyId(replyId === i._id ? null : i._id);
                    setRemoveId(null);
                  }}
                >
                  답글
                </CommentItemButtonItem>
                {!i.die && (user || !(i.nickname === '전승하')) && (
                  <CommentItemButtonItem>
                    <div
                      onClick={() => {
                        stateDispatch({ name: 'resetRemove' });
                        setReplyId(null);
                        setRemoveId(removeId === i._id ? null : i._id);
                      }}
                    >
                      삭제
                    </div>
                    {removeId === i._id && (
                      <RemovePopupWrapper>
                        <RemovePopup>
                          <input
                            placeholder="비밀번호"
                            value={state.removePassword}
                            onChange={(e) => stateDispatch({ ...e, name: 'removePassword' })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') onClickRemoveComment(i._id);
                            }}
                          />
                          {loading ? (
                            <div style={{ width: '20px', height: '20px' }}>
                              <Loading r="18px" />
                            </div>
                          ) : (
                            <BsFillTrashFill onClick={() => onClickRemoveComment(i._id)} />
                          )}
                        </RemovePopup>
                      </RemovePopupWrapper>
                    )}
                  </CommentItemButtonItem>
                )}
              </CommentItemButton>
            </CommentItemInfo>
          </CommentItemWrapper>
          {i.reply.map((j) => (
            <CommentItemWrapper key={j._id} style={{ width: 'calc(100% - 30px)', marginLeft: '30px' }} nickname={j.nickname} die={j.die} reply={true}>
              <CommentItemNicknameAndContent>
                <CommentItemNickname nickname={j.nickname} die={j.die}>
                  {j.nickname}
                </CommentItemNickname>
                <CommentItemContent>{j.content}</CommentItemContent>
              </CommentItemNicknameAndContent>
              <CommentItemInfo>
                <CommentItemDate>{dateToString(new Date(j.date))}</CommentItemDate>
                <CommentItemButton>
                  <CommentItemButtonItem
                    onClick={() => {
                      stateDispatch({ name: 'resetReply' });
                      setReplyId(replyId === i._id ? null : i._id);
                      setRemoveId(null);
                    }}
                  >
                    답글
                  </CommentItemButtonItem>
                  {!j.die && (user || !(j.nickname === '전승하')) && (
                    <CommentItemButtonItem>
                      <div
                        onClick={() => {
                          stateDispatch({ name: 'resetRemove' });
                          setReplyId(null);
                          setRemoveId(removeId === j._id ? null : j._id);
                        }}
                      >
                        삭제
                      </div>
                      {removeId === j._id && (
                        <RemovePopupWrapper>
                          <RemovePopup>
                            <input
                              placeholder="비밀번호"
                              value={state.removePassword}
                              onChange={(e) => stateDispatch({ ...e, name: 'removePassword' })}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') onClickRemoveComment(j._id);
                              }}
                            />
                            {loading ? (
                              <div style={{ width: '20px', height: '20px' }}>
                                <Loading r="18px" />
                              </div>
                            ) : (
                              <BsFillTrashFill onClick={() => onClickRemoveComment(j._id)} />
                            )}
                          </RemovePopup>
                        </RemovePopupWrapper>
                      )}
                    </CommentItemButtonItem>
                  )}
                </CommentItemButton>
              </CommentItemInfo>
            </CommentItemWrapper>
          ))}
          {replyId === i._id && (
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                style={{
                  width: '30px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  transform: 'rotate(180deg)',
                  marginTop: '10px',
                }}
              >
                <BiReply style={{ width: '27px', height: '27px' }} />
              </div>
              <CommentInputWrapper style={{ margin: '3px 0 10px 0', width: 'calc(100% - 30px)' }}>
                <CommentInputSmallWrapper>
                  <CommentNickname placeholder="닉네임" value={state.replyNickname} onChange={(e) => stateDispatch({ ...e, name: 'replyNickname' })} />
                  <CommentPassword placeholder="비밀번호 (숫자 4 ~ 6자리)" value={state.replyPassword} onChange={(e) => stateDispatch({ ...e, name: 'replyPassword' })} />
                </CommentInputSmallWrapper>
                <CommentInputSmallWrapper>
                  <CommentInputContent
                    placeholder="내용을 입력하세요."
                    value={state.replyContent}
                    onChange={(e) => stateDispatch({ ...e, name: 'replyContent' })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') onClickWriteComment(i._id);
                    }}
                  />
                  <CommentInputWriteButton onClick={() => onClickWriteComment(i._id)}>{loading ? <Loading r="30px" /> : <BsFillPencilFill />}</CommentInputWriteButton>
                </CommentInputSmallWrapper>
              </CommentInputWrapper>
            </div>
          )}
        </CommentBox>
      ))}
      {comment.length === 0 && (
        <NoComment>
          댓글이 없습니다.
          <br />첫 댓글을 남겨보세요!
        </NoComment>
      )}
      {visibleCommentIndex <= comment.length && (
        <LoadMoreCommentButtonWrapper
          onClick={() => {
            setVisibleCommentIndex(loadMoreComment(visibleCommentIndex));
          }}
        >
          <AiOutlineReload />
          <div>댓글 더 보기</div>
        </LoadMoreCommentButtonWrapper>
      )}
      <CommentInputWrapper>
        <CommentInputSmallWrapper>
          <CommentNickname placeholder="닉네임" value={state.nickname} onChange={(e) => stateDispatch({ ...e, name: 'nickname' })} />
          <CommentPassword placeholder="비밀번호 (숫자 4 ~ 6자리)" value={state.password} onChange={(e) => stateDispatch({ ...e, name: 'password' })} />
        </CommentInputSmallWrapper>
        <CommentInputSmallWrapper>
          <CommentInputContent
            placeholder="내용을 입력하세요."
            value={state.content}
            onChange={(e) => stateDispatch({ ...e, name: 'content' })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onClickWriteComment('');
            }}
          />
          <CommentInputWriteButton onClick={() => onClickWriteComment('')}>{loading ? <Loading r="30px" /> : <BsFillPencilFill />}</CommentInputWriteButton>
        </CommentInputSmallWrapper>
      </CommentInputWrapper>
    </CommentWrapper>
  );
};
