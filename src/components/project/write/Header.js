import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 130px;
`;
const TextWrapper = styled.div`
  width: calc(100% - 80px);
  height: 100%;
  padding: 40px;
  background-color: #b4b4b4de;
`;
const Text = styled.div`
  font-size: 40px;
  font-weight: 700;
  font-family: 'Bitter', serif;
  letter-spacing: 1px;
`;
const Triangle = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  margin-left: calc(min(100%, 1040px) - 120px);
  display: inline-block;
  vertical-align: middle;
  border-top: solid 40px transparent;
  border-right: solid 40px transparent;
  border-bottom: solid 40px #515151;
  border-left: solid 40px #515151;
  box-shadow: -2px 2px 4px black;
`;
const Rectangle = styled.div`
  width: 80px;
  height: 50px;
  margin-top: 80px;
  border-right: 2px solid #000000e8;
  background-color: #b4b4b4de;
`;

const Header = () => {
  const originalProjectId = useSelector(
    (store) => store.writeProjects.originalProjectId,
  );
  return (
    <Wrapper>
      <TextWrapper>
        <Text>{originalProjectId ? 'Edit Project' : 'New Project'}</Text>
      </TextWrapper>
      <Triangle />
      <Rectangle />
    </Wrapper>
  );
};

export default Header;
