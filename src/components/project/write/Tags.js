import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import { IoIosPricetags } from 'react-icons/io';
import { BsPlusCircle } from 'react-icons/bs';
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
  max-width: 700px;
  margin-top: 40px;
  position: relative;
  .chrome-picker {
    position: absolute;
    top: 135px;
    left: calc(50% - 10px);
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  @media all and (max-width: 520px) {
    .chrome-picker {
      top: 200px;
      left: calc(50% - 112.5px);
    }
  }
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
  background-color: #4b4b4b;
  font-size: 20px;
  text-align: center;
  @media all and (max-width: 520px) {
    margin: 0 calc(50% - 125px);
  }
  &::placeholder {
    color: #c1c1c1;
    font-size: 14px;
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

const Tags = ({ tags, tagList }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [popUp, setPopUp] = useState(false);

  const insertTag = useCallback(
    (value) => {
      if (value === '') {
        alert('태그를 입력해 주세요.');
        return;
      }
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].name === value) {
          alert('이미 있는 태그입니다.');
          return;
        }
      }
      dispatch(changeField({ key: 'tags', value: [...tags, { name: value, color: color }] }));
      setInput('');
      setColor('#ffffff');
      setPopUp(false);
    },
    [color, dispatch, tags],
  );
  const onRemove = useCallback(
    (value) => {
      dispatch(changeField({ key: 'tags', value: tags.filter((i) => i.name !== value) }));
    },
    [dispatch, tags],
  );

  return (
    <Wrapper>
      <Title>
        <IoIosPricetags /> Tags
      </Title>
      <SearchWrapper>
        <SearchInput
          placeholder="태그를 입력하세요"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (tagList[e.target.value]) setColor(tagList[e.target.value]);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              insertTag(input.trim());
            }
          }}
          style={{ color: color }}
        />
        <PalleteWrapper color={color}>
          <PalleteButton onClick={() => setPopUp(!popUp)} />
          {popUp && <ChromePicker disableAlpha color={color} onChange={(c) => setColor(c.hex)} />}
        </PalleteWrapper>
        <BsPlusCircle style={{ cursor: 'pointer' }} onClick={() => insertTag(input.trim())} />
      </SearchWrapper>
      <TagBox>
        {tags.map((tag) => (
          <Tag key={tag.name} style={{ color: tag.color }} onClick={() => onRemove(tag.name)}>
            {`#${tag.name}`}
          </Tag>
        ))}
      </TagBox>
    </Wrapper>
  );
};

export default Tags;
