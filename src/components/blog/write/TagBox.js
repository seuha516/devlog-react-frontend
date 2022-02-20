import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/blog/writeBlog';
import { IoIosColorPalette } from 'react-icons/io';

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
const Color = styled.input`
  width: 100px;
  height: 38px;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 0 10px;
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
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.writeBlog.tags);
  const tagList = useSelector((store) => store.getlistBlog.tags);

  const [input, setInput] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [localTags, setLocalTags] = useState(tags);

  const insertTag = useCallback(
    (tag) => {
      if (tag === '') {
        alert('태그를 입력해 주세요.');
        return;
      }
      for (let i = 0; i < localTags.length; i++) {
        if (localTags[i].tag === tag) {
          alert('이미 있는 태그입니다.');
          return;
        }
      }
      const nextTags = [...localTags, { tag: tag, color: color }];
      setLocalTags(nextTags);
    },
    [localTags, color],
  );
  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
    },
    [localTags],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  useEffect(() => {
    dispatch(changeField({ key: 'tags', value: localTags }));
  }, [dispatch, localTags]);

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
        <Color value={color} onChange={(e) => setColor(e.target.value)} />
      </FlexBox>
      <TagList tags={localTags} onRemove={onRemove} />
    </Wrapper>
  );
};
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag.tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)} style={{ color: tag.color }}>
    #{tag.tag}
  </Tag>
));

export default TagBox;
