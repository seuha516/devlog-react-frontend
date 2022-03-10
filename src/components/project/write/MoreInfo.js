import React from 'react';
import { useDispatch } from 'react-redux';
import { AiTwotoneSetting } from 'react-icons/ai';
import { BiCodeBlock } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
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
const Info = styled(FlexRow)`
  flex-wrap: wrap;
  margin: 12.5px 0px;
  svg {
    width: 40px;
    height: 40px;
    margin: 5px;
  }
`;
const Choices = styled(FlexRow)`
  flex-wrap: wrap;
  background-color: #8d8d8d;
`;
const Choice = styled(FlexRow)`
  margin: 2.5px 5px;
  font-family: 'PT Sans', sans-serif;
  font-size: 18px;
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin: 5px;
`;

const MoreInfo = ({ moreInfo }) => {
  const dispatch = useDispatch();

  const onChange1 = (e) => {
    dispatch(changeField({ key: 'moreInfo', value: { ...moreInfo, projectClass: e.target.name } }));
  };
  const onChange2 = (e) => {
    dispatch(changeField({ key: 'moreInfo', value: { ...moreInfo, developState: e.target.name } }));
  };

  const projectClassList = ['Group Project', 'Personal Project', 'Practice'];
  const developStateList = ['In Progress', 'Complete'];

  return (
    <Wrapper>
      <Title>
        <AiTwotoneSetting />
        Setting
      </Title>
      <Info>
        <BiCodeBlock />
        <Choices>
          {projectClassList.map((item) => (
            <Choice key={item}>
              <Checkbox
                type="checkbox"
                name={item}
                onChange={onChange1}
                checked={moreInfo.projectClass === item}
              />
              {item}
            </Choice>
          ))}
        </Choices>
      </Info>
      <Info>
        <GiSandsOfTime />
        <Choices>
          {developStateList.map((item) => (
            <Choice key={item}>
              <Checkbox
                type="checkbox"
                name={item}
                onChange={onChange2}
                checked={moreInfo.developState === item}
              />
              {item}
            </Choice>
          ))}
        </Choices>
      </Info>
    </Wrapper>
  );
};

export default MoreInfo;
