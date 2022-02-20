import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ImNewspaper } from 'react-icons/im';
import { BiLink, BiCodeBlock } from 'react-icons/bi';
import { AiFillGithub } from 'react-icons/ai';

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
  margin-top: 20px;
`;
const Title = styled(FlexRow)`
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
const Result = styled(FlexColumn)`
  width: 100%;
  max-width: 400px;
  padding: 10px 0px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #1e1e1e;
  overflow: auto;
`;
const Data = styled.a`
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
const Post = styled(Link)`
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

const ProjectLink = ({ link, title }) => {
  return (
    <Wrapper>
      <Title>
        <BiLink /> Link
      </Title>
      <Result>
        {link.website.map((item) => (
          <Data
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexRow>
              <BiCodeBlock />
              {item.info}
            </FlexRow>
          </Data>
        ))}
        {link.github.map((item) => (
          <Data
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FlexRow>
              <AiFillGithub />
              {item.info}
            </FlexRow>
          </Data>
        ))}
        <Post to={`/blog/list?project=${title}`}>
          <FlexRow>
            <ImNewspaper />
            Post
          </FlexRow>
        </Post>
      </Result>
    </Wrapper>
  );
};

export default ProjectLink;
