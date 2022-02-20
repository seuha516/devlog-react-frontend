import React from 'react';
import styled from 'styled-components';
import { BiTimer } from 'react-icons/bi';

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
  margin-top: 30px;
`;
const Title = styled(FlexRow)`
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  svg {
    width: 45px;
    height: 45px;
    margin: 7px 10px 0 0;
  }
`;
const Date = styled.div`
  width: 125px;
  height: 40px;
  font-size: 25px;
  font-family: 'Crimson Pro', serif;
  text-align: center;
`;
const Text = styled.div`
  font-size: 35px;
  font-family: 'Crimson Pro', serif;
  margin: 0 5px 20px 5px;
`;

const WorkingPeriod = ({ workingPeriod }) => {
  return (
    <Wrapper>
      <Title>
        <BiTimer /> Working Period
      </Title>
      <FlexRow>
        {workingPeriod.end !== '' ? (
          <>
            <Date>{workingPeriod.start}</Date>
            <Text>~</Text>
            <Date>{workingPeriod.end}</Date>
          </>
        ) : (
          <Date>{`${workingPeriod.start} ...`}</Date>
        )}
      </FlexRow>
    </Wrapper>
  );
};

export default WorkingPeriod;
