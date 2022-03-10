import React from 'react';
import { useDispatch } from 'react-redux';
import { BiTimer } from 'react-icons/bi';
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
  margin-bottom: 25px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 10px 0 0;
  }
`;
const InputWrapper = styled(FlexRow)`
  @media all and (max-width: 360px) {
    flex-direction: column;
  }
`;
const Input = styled.input`
  width: 125px;
  height: 40px;
  outline: none;
  margin-bottom: 20px;
  border: none;
  border-bottom: 3px solid #4b4b4b;
  background-color: transparent;
  font-size: 25px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
  &::placeholder {
    color: #4b4b4b;
    font-style: italic;
  }
`;
const Text = styled.div`
  font-size: 35px;
  font-family: 'Crimson Pro', serif;
  margin: 0 20px 25px 20px;
  @media all and (max-width: 360px) {
    display: none;
  }
`;

const WorkingPeriod = ({ workingPeriod }) => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(
      changeField({
        key: 'workingPeriod',
        value: { ...workingPeriod, [e.target.name]: e.target.value },
      }),
    );
  };

  return (
    <Wrapper>
      <Title>
        <BiTimer /> Working Period
      </Title>
      <InputWrapper>
        <Input name="start" placeholder="Start" value={workingPeriod.start} onChange={onChange} />
        <Text>~</Text>
        <Input name="end" placeholder="End" value={workingPeriod.end} onChange={onChange} />
      </InputWrapper>
    </Wrapper>
  );
};

export default WorkingPeriod;
