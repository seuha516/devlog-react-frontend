import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BiCodeBlock } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
import { AiTwotoneSetting } from 'react-icons/ai';
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

const MoreInfo = () => {
  const dispatch = useDispatch();
  const moreInfo = useSelector((store) => store.writeProjects.moreInfo);
  const [state, setState] = useState(moreInfo);

  const onChange1 = (e) => {
    const nextState = { ...state, projectClass: e.target.name };
    setState(nextState);
  };
  const onChange2 = (e) => {
    const nextState = { ...state, developState: e.target.name };
    setState(nextState);
  };
  useEffect(() => {
    dispatch(changeField({ key: 'moreInfo', value: state }, [state, dispatch]));
  });

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
