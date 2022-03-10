import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillGithub, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiLink, BiCodeBlock } from 'react-icons/bi';
import styled from 'styled-components';
import { changeField } from 'modules/projects/writeProjects';

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
  margin-top: 45px;
`;
const Title = styled(FlexRow)`
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
const Box = styled.div`
  margin-bottom: 40px;
  width: min(100%, 600px);
  padding: 40px 10px 25px 10px;
  height: 100%;
  background: #353535;
  border-radius: 5px;
`;
const Name = styled(FlexRow)`
  width: 180px;
  height: 50px;
  position: absolute;
  justify-content: flex-start;
  font-size: 27.5px;
  font-family: 'Rubik', sans-serif;
  color: white;
  margin-top: -65px;
  margin-left: 10px;
  text-shadow: 1px 1px 1px black;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;
const Result = styled(FlexColumn)`
  width: 100%;
  min-height: 40px;
  padding: 10px 0px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #1e1e1e;
  overflow: auto;
`;
const Data = styled(FlexRow)`
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 7.5px 0px;
  &:hover {
    cursor: pointer;
    background-color: #ff2a2a78;
  }
`;
const Url = styled(FlexRow)`
  font-size: 18px;
  word-break: break-all;
  margin: 5px;
  color: white;
`;
const Info = styled(FlexRow)`
  font-size: 15px;
  margin: 5px;
  color: white;
`;
const InputWrapper = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  @media all and (max-width: 700px) {
    flex-direction: column;
  }
`;
const Input = styled.input`
  width: calc(50% - 15px);
  height: 40px;
  outline: none;
  margin-bottom: 25px;
  border: none;
  border-bottom: 3px solid #b4b4b4;
  background-color: transparent;
  font-size: 25px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
  color: #e3e3e3;
  &::placeholder {
    color: #b4b4b4;
    font-style: italic;
  }
  @media all and (max-width: 700px) {
    width: 90%;
  }
`;
const PlusButton = styled(AiOutlinePlusCircle)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: white;
`;

const Link = ({ link }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    websiteURL: '',
    websiteInfo: '',
    githubURL: '',
    githubInfo: '',
  });

  const onChangeInput = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const addLink = (name) => {
    if (input[name + 'URL'] === '' || input[name + 'Info'] === '') {
      alert('빈 칸을 채워주세요.');
      return;
    }
    for (let i = 0; i < link[name].length; i++) {
      if (link[name][i].url === input[name + 'URL']) {
        alert('이미 있는 URL입니다.');
        return;
      }
    }
    dispatch(
      changeField({
        key: 'link',
        value: {
          ...link,
          [name]: [
            ...link[name],
            {
              url: input[name + 'URL'],
              info: input[name + 'Info'],
            },
          ],
        },
      }),
    );
    setInput({ ...input, [name + 'URL']: '', [name + 'Info']: '' });
  };
  const removeLink = (name, url) => {
    dispatch(
      changeField({
        key: 'link',
        value: { ...link, [name]: link[name].filter((item) => item.url !== url) },
      }),
    );
  };

  return (
    <Wrapper>
      <Title>
        <BiLink /> Link
      </Title>
      <Box>
        <Name>
          <BiCodeBlock />
          Website
        </Name>
        <FlexColumn>
          <Result>
            {link.website.map((item) => (
              <Data key={item.url} onClick={() => removeLink('website', item.url)}>
                <Url>{item.url}</Url>
                <Info>{item.info}</Info>
              </Data>
            ))}
          </Result>
          <InputWrapper>
            <Input
              name="websiteURL"
              placeholder="URL"
              onChange={onChangeInput}
              value={input.websiteURL}
            />
            <Input
              name="websiteInfo"
              placeholder="Info"
              onChange={onChangeInput}
              value={input.websiteInfo}
            />
          </InputWrapper>
          <PlusButton onClick={() => addLink('website')} />
        </FlexColumn>
      </Box>
      <Box>
        <Name>
          <AiFillGithub />
          GitHub
        </Name>
        <FlexColumn>
          <Result>
            {link.github.map((item) => (
              <Data key={item.url} onClick={() => removeLink('github', item.url)}>
                <Url>{item.url}</Url>
                <Info>{item.info}</Info>
              </Data>
            ))}
          </Result>
          <InputWrapper>
            <Input
              name="githubURL"
              placeholder="URL"
              onChange={onChangeInput}
              value={input.githubURL}
            />
            <Input
              name="githubInfo"
              placeholder="Info"
              onChange={onChangeInput}
              value={input.githubInfo}
            />
          </InputWrapper>
          <PlusButton onClick={() => addLink('github')} />
        </FlexColumn>
      </Box>
    </Wrapper>
  );
};

export default Link;
