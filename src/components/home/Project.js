import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 5 / 4;
  border-radius: 10px;
  margin: 25px 0;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.15s linear;
  &:hover {
    box-shadow: 1px 1px 2px 1px lightgray;
  }
  @media all and (max-width: 768px) {
    margin: 12.5px 0;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const TextWrapper = styled(FlexColumn)`
  width: 100%;
  aspect-ratio: 80 / 19;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #363636;
  color: white;
  justify-content: space-evenly;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  font-family: 'Noto Serif KR', serif;
  letter-spacing: 1px;
  @media all and (min-width: 1025px) and (max-width: 1572.8px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 35 * 25 / 400);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  @media all and (min-width: 769px) and (max-width: 1024px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 25 * 25 / 400);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  @media all and (max-width: 462px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 10 * 25 / 400);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;
const Tags = styled(FlexRow)`
  max-width: 95%;
  height: 20px;
  overflow: hidden;
`;
const Tag = styled.div`
  font-size: 18px;
  & + & {
    margin-left: 10px;
  }
  @media all and (min-width: 1025px) and (max-width: 1572.8px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 35 * 18 / 400);
    & + & {
      margin-left: calc(calc(100vw - 16.8px) * 9 / 35 * 10 / 400);
    }
  }
  @media all and (min-width: 769px) and (max-width: 1024px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 25 * 18 / 400);
    & + & {
      margin-left: calc(calc(100vw - 16.8px) * 9 / 25 * 10 / 400);
    }
  }
  @media all and (max-width: 462px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 10 * 18 / 400);
    & + & {
      margin-left: calc(calc(100vw - 16.8px) * 9 / 10 * 10 / 400);
    }
  }
`;
const TagsText = styled.div`
  font-size: 18px;
  color: white;
  margin-left: 10px;
  @media all and (min-width: 1025px) and (max-width: 1572.8px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 35 * 18 / 400);
    margin-left: calc(calc(100vw - 16.8px) * 9 / 35 * 10 / 400);
  }
  @media all and (min-width: 769px) and (max-width: 1024px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 25 * 18 / 400);
    margin-left: calc(calc(100vw - 16.8px) * 9 / 25 * 10 / 400);
  }
  @media all and (max-width: 462px) {
    font-size: calc(calc(100vw - 16.8px) * 9 / 10 * 18 / 400);
    margin-left: calc(calc(100vw - 16.8px) * 9 / 10 * 10 / 400);
  }
`;

const Project = ({ project }) => {
  return (
    <Wrapper to={`/project/read/${project._id}`}>
      <Thumbnail src={project.thumbnail === '' ? 'images/Project/Default.png' : `${process.env.REACT_APP_API_IMAGE}/${project.thumbnail}`} />
      <TextWrapper>
        <Title>{project.title}</Title>
        <Tags>
          {project.tags.map((tag, index) => {
            if (index < 3) {
              return (
                <Tag key={tag._id} style={{ color: tag.color }}>
                  {`#${tag.name}`}
                </Tag>
              );
            } else if (index === 3) {
              return <TagsText key={tag._id}>{` + ${project.tags.length - 3}`}</TagsText>;
            } else return null;
          })}
        </Tags>
      </TextWrapper>
    </Wrapper>
  );
};

export default Project;
