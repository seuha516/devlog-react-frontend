import React from 'react';
import styled from 'styled-components';
import { GrDocumentUpdate } from 'react-icons/gr';

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
  margin-bottom: 20px;
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
const Result = styled(FlexColumn)`
  width: 100%;
  max-width: 700px;
  min-height: 40px;
  padding: 10px 0px;
  border-radius: 10px;
  background: #bababa;
`;
const Data = styled(FlexRow)`
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 7.5px 0px;
`;
const Contents = styled(FlexRow)`
  font-size: 20px;
  font-family: 'Nanum Myeongjo', serif;
  line-height: 24px;
  margin: 5px;
  color: black;
  text-align: center;
  word-break: break-all;
`;
const Date = styled(FlexRow)`
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  margin: 5px;
  text-align: center;
  color: black;
`;

const Update = ({ update }) => {
  return (
    <Wrapper>
      <Title>
        <GrDocumentUpdate /> Update Log
      </Title>
      <Result>
        {update.map((item) => (
          <Data key={item.contents}>
            <Contents>{item.contents}</Contents>
            <Date>{item.date}</Date>
          </Data>
        ))}
      </Result>
    </Wrapper>
  );
};

export default Update;
