import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoIosPricetags } from 'react-icons/io';
import { BsPlusCircle } from 'react-icons/bs';
import { changeField } from 'modules/projects/writeProjects';
import { catalogProject } from 'modules/projects/catalogProjects';

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
  max-width: 700px;
  margin-top: 40px;
`;
const Title = styled(FlexRow)`
  width: 150px;
  height: 65px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 35px;
    height: 35px;
    margin: 10px 10px 0 0;
  }
`;
const SearchWrapper = styled(FlexRow)`
  width: 100%;
  margin: 15px 0 30px 0;
  justify-content: space-between;
  padding: 0 calc(50% - 200px);
  svg {
    width: 45px;
    height: 45px;
  }
  @media all and (max-width: 520px) {
    height: 140px;
    margin-top: 0;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  max-width: 250px;
  height: 45px;
  outline: none;
  padding: 5px 20px;
  border: 2.5px solid #4b4b4b;
  background-color: transparent;
  font-size: 20px;
  text-align: center;
  @media all and (max-width: 520px) {
    margin: 0 calc(50% - 125px);
  }
`;
const PalleteWrapper = styled.div`
  width: 45px;
  height: 45px;
  background-color: ${(props) => props.color};
  border: 2px solid black;
  cursor: pointer;
  @media all and (max-width: 520px) {
    margin-right: 30px;
  }
`;
const PalleteButton = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  background-color: transparent;
`;
const PalleteInput = styled(FlexRow)`
  position: absolute;
  margin-top: -45px;
  margin-left: -27.5px;
  width: 100px;
  height: 40px;
  padding: 5px 15px;
  border-radius: 8px;
  background-color: #151515;
`;
const PalleteText = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  text-align: center;
  color: white;
`;
const TagBox = styled(FlexRow)`
  width: 100%;
  min-height: 55px;
  padding: 15px 10px;
  flex-wrap: wrap;
  font-size: 20px;
  line-height: 22.5px;
  background-color: #363636;
`;
const Tag = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin: 7.5px;
  &:hover {
    background-color: #ff2a2a78;
  }
`;

const Tags = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.writeProjects.tags);
  const tagList = useSelector((state) => state.catalogProjects.tags);
  const [localTags, setLocalTags] = useState(tags);

  const [input, setInput] = useState('');
  const [pallete, setPallete] = useState('#ffffff');
  const [palleteOpen, setPalleteOpen] = useState(false);
  const textDOM = useRef(null);

  const addTag = () => {
    if (input === '') {
      alert('빈 태그는 입력할 수 없습니다.');
      return;
    }
    for (let i = 0; i < localTags.length; i++) {
      if (localTags[i].name === input) {
        alert('이미 있는 태그입니다.');
        return;
      }
    }
    const nextTags = [...localTags, { name: input, color: pallete }];
    setLocalTags(nextTags);
    setInput('');
    setPallete('#ffffff');
    setPalleteOpen(false);
  };
  const removeTag = (tagName) => {
    const nextTags = localTags.filter((tag) => tag.name !== tagName);
    setLocalTags(nextTags);
  };
  useEffect(() => {
    dispatch(changeField({ key: 'tags', value: localTags }));
  }, [dispatch, localTags]);
  useEffect(() => {
    dispatch(catalogProject());
  }, [dispatch]);

  return (
    <Wrapper>
      <Title>
        <IoIosPricetags /> Tags
      </Title>
      <SearchWrapper>
        <SearchInput
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (tagList[e.target.value]) setPallete(tagList[e.target.value]);
          }}
        />
        <PalleteWrapper color={pallete}>
          <PalleteButton
            onClick={async () => {
              const nextPalleteOpen = !palleteOpen;
              setPalleteOpen(nextPalleteOpen);
              if (nextPalleteOpen) {
                await new Promise((resolve) => setTimeout(resolve, 10));
                if (textDOM.current) textDOM.current.focus();
              }
            }}
          />
          {palleteOpen && (
            <PalleteInput>
              <PalleteText
                ref={textDOM}
                value={pallete}
                onChange={(e) => {
                  setPallete(e.target.value);
                }}
              />
            </PalleteInput>
          )}
        </PalleteWrapper>
        <BsPlusCircle
          style={{ cursor: 'pointer' }}
          onClick={() => {
            addTag();
          }}
        />
      </SearchWrapper>
      <TagBox>
        {tags.map((tag) => (
          <Tag
            key={tag.name}
            style={{ color: tag.color }}
            onClick={() => removeTag(tag.name)}
          >
            {`#${tag.name}`}
          </Tag>
        ))}
      </TagBox>
    </Wrapper>
  );
};

export default Tags;
