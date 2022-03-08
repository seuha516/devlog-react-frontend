import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ChromePicker } from 'react-color';
import { IoIosColorPalette } from 'react-icons/io';
import styled from 'styled-components';
import { changeField } from 'modules/blog/writeBlog';

const Wrapper = styled.div`
  width: 100%;
  margin: 30px 0 40px 0;
  position: relative;
  .chrome-picker {
    position: absolute;
    top: 130px;
    left: 0;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
`;
const Text = styled.div`
  font-weight: 600;
  color: #808080;
  margin-bottom: 10px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const TagForm = styled.form`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  height: 45px;
  margin-bottom: 5px;
  input {
    width: calc(80% - 32px);
    max-width: 200px;
    padding: 10px;
    background-color: #494949;
    &::placeholder {
      color: #aaaaaa;
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
  }
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  button {
    width: calc(20% - 8px);
    max-width: 50px;
    cursor: pointer;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: none;
    background: gray;
    color: white;
    font-weight: bold;
    transition: all 0.2s linear;
    &:hover {
      background: black;
    }
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
`;
const TagListBlock = styled.div`
  display: flex;
  height: 46px;
  margin-top: 0.5rem;
  margin-bottom: 8px;
  background-color: #363636;
  padding: 15px 12.5px;
  border-radius: 4px;
`;
const Tag = styled.div`
  margin-right: 0.5rem;
  color: gray;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    opacity: 0.5;
  }
`;
const PalleteIconWrapper = styled.div`
  width: 35px;
  height: 35px;
  margin: 3.5px 0 0 5px;
  overflow: visible;
  svg {
    width: 35px;
    height: 35px;
    cursor: pointer;
    transition: all 0.2s linear;
    color: gray;
    &:hover {
      color: black;
    }
  }
  position: relative;
`;

const TagBox = ({ tags, tagList }) => {
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
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
    },
    [input, insertTag],
  );

  return (
    <Wrapper>
      <Text>태그</Text>
      <TagListBlock>
        {tags.map((tag) => (
          <Tag key={tag.name} onClick={() => onRemove(tag.name)} style={{ color: tag.color }}>
            #{tag.name}
          </Tag>
        ))}
      </TagListBlock>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (tagList[e.target.value]) setColor(tagList[e.target.value]);
          }}
          style={{ color: color }}
        />
        <button type="submit">추가</button>
        <PalleteIconWrapper>
          <IoIosColorPalette onClick={() => setPopUp(!popUp)} />
        </PalleteIconWrapper>
      </TagForm>
      {popUp && <ChromePicker disableAlpha color={color} onChange={(c) => setColor(c.hex)} />}
    </Wrapper>
  );
};

export default TagBox;
