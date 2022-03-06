import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';
import { IoIosColorPalette } from 'react-icons/io';
import styled from 'styled-components';
import { changeField } from 'modules/blog/writeBlog';

const Wrapper = styled.div`
  width: 100%;
  margin: 20px 0 40px 0;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Text = styled.div`
  font-weight: 600;
  color: #808080;
  margin-bottom: 10px;
`;
const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  height: 45px;
  margin-bottom: 5px;
  input {
    width: 200px;
    padding: 10px;
    background-color: #494949;
    &::placeholder {
      color: #aaaaaa;
    }
  }
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  button {
    width: 50px;
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
  }
`;
const Tag = styled.div`
  margin-right: 0.5rem;
  color: gray;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
  background-color: #494949;
  padding: 20px 12.5px;
`;

const TagBox = () => {
  const { tags, tagList } = useSelector(({ writeBlog, catalogBlog }) => ({
    tags: writeBlog.tags,
    tagList: catalogBlog.tags,
  }));
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [color, setColor] = useState('#ffffff');

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
      const nextTags = [...tags, { name: value, color: color }];
      dispatch(changeField({ key: 'tags', value: nextTags }));
    },
    [color, dispatch, tags],
  );
  const onRemove = useCallback(
    (value) => {
      const nextTags = tags.filter((i) => i !== value);
      dispatch(changeField({ key: 'tags', value: nextTags }));
    },
    [dispatch, tags],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
      setColor('#ffffff');
    },
    [input, insertTag],
  );

  return (
    <Wrapper>
      <Text>태그</Text>
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
      </TagForm>
      <FlexBox>
        <IoIosColorPalette
          style={{
            width: '30px',
            height: '30px',
            marginRight: '5px',
          }}
        />
        <ChromePicker disableAlpha color={color} onChange={(c) => setColor(c.hex)} />
      </FlexBox>
      <TagList tags={tags} onRemove={onRemove} />
    </Wrapper>
  );
};
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag.name} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)} style={{ color: tag.color }}>
    #{tag.name}
  </Tag>
));

export default TagBox;
