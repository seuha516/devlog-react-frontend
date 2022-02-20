import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/projects/writeProjects';

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.input`
  width: min(90%, 400px);
  height: 50px;
  outline: none;
  margin-bottom: 25px;
  padding-bottom: 0.3rem;
  border: none;
  border-bottom: 3px solid #4b4b4b;
  background-color: transparent;
  text-align: center;
  font-family: 'Crimson Pro', serif;
  font-size: 40px;
  &::placeholder {
    color: #4b4b4b;
    font-style: italic;
  }
`;
const SubTitle = styled.input`
  width: min(90%, 400px);
  height: 36px;
  outline: none;
  margin-bottom: 25px;
  padding-bottom: 0.25rem;
  border: none;
  border-bottom: 3px solid #4b4b4b;
  background-color: transparent;
  text-align: center;
  font-family: 'Crimson Pro', serif;
  font-size: 27px;
  &::placeholder {
    color: #4b4b4b;
    font-style: italic;
  }
`;
const Body = styled.textarea`
  width: min(100%, 700px);
  height: 240px;
  margin: 20px 0 25px 0;
  padding: 15px;
  resize: none;
  outline: none;
  border: none;
  background-color: transparent;
  border: 3px solid #4b4b4b;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  &::placeholder {
    color: #4b4b4b;
    font-style: italic;
  }
`;

const Input = () => {
  const dispatch = useDispatch();
  const { title, subTitle, body } = useSelector(({ writeProjects }) => ({
    title: writeProjects.title,
    subTitle: writeProjects.subTitle,
    body: writeProjects.body,
  }));

  const onChange = (e) => {
    dispatch(changeField({ key: e.target.name, value: e.target.value }));
  };

  return (
    <Wrapper>
      <Title
        placeholder="Title"
        name="title"
        value={title}
        onChange={onChange}
      />
      <SubTitle
        placeholder="SubTitle"
        name="subTitle"
        value={subTitle}
        onChange={onChange}
      />
      <Body placeholder="Body" name="body" value={body} onChange={onChange} />
    </Wrapper>
  );
};

export default Input;
