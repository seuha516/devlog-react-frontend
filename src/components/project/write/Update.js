import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GrDocumentUpdate } from 'react-icons/gr';
import { AiOutlinePlusCircle } from 'react-icons/ai';
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
  margin-top: 50px;
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
  padding: 10px 10px 25px 10px;
  height: 100%;
  background: #737373;
  border-radius: 5px;
`;
const Result = styled(FlexColumn)`
  width: 100%;
  min-height: 40px;
  padding: 10px 0px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #bababa;
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
const Contents = styled(FlexRow)`
  font-size: 18px;
  margin: 5px;
  color: black;
`;
const Date = styled(FlexRow)`
  font-size: 15px;
  margin: 5px;
  color: black;
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

const Update = () => {
  const dispatch = useDispatch();
  const update = useSelector((store) => store.writeProjects.update);
  const [state, setState] = useState(update);

  const [input, setInput] = useState({
    contents: '',
    date: '',
  });

  const onChangeInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const addLink = () => {
    if (input.contents === '' || input.date === '') {
      alert('빈 칸을 채워주세요.');
      return;
    }
    for (let i = 0; i < state.length; i++) {
      if (state[i].contents === input.contents) {
        alert('이미 있는 contents입니다.');
        return;
      }
    }
    const nextArray = [...state, input];
    setState(nextArray);
    setInput({ contents: '', date: '' });
  };
  const removeLink = (contents) => {
    const nextArray = state.filter((item) => item.contents !== contents);
    setState(nextArray);
  };

  useEffect(() => {
    dispatch(changeField({ key: 'update', value: state }));
  }, [state, dispatch]);

  return (
    <Wrapper>
      <Title>
        <GrDocumentUpdate /> Update Log
      </Title>
      <Box>
        <FlexColumn>
          <Result>
            {update.map((item) => (
              <Data
                key={item.contents}
                onClick={() => removeLink(item.contents)}
              >
                <Contents>{item.contents}</Contents>
                <Date>{item.date}</Date>
              </Data>
            ))}
          </Result>
          <InputWrapper>
            <Input
              name="contents"
              placeholder="Contents"
              onChange={onChangeInput}
              value={input.contents}
            />
            <Input
              name="date"
              placeholder="Date"
              onChange={onChangeInput}
              value={input.date}
            />
          </InputWrapper>
          <PlusButton onClick={addLink} />
        </FlexColumn>
      </Box>
    </Wrapper>
  );
};

export default Update;
