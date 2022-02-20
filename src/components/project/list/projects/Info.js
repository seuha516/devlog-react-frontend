import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  margin: 35px 0;
  padding: 5px 25px;
`;
const Count = styled.div`
  font-size: 70px;
  margin: 0 20px 5px 0;
  font-weight: 600;
  color: white;
  text-shadow: 3px 3px 3px black;
  font-family: 'Roboto Slab', serif;
`;
const Text = styled.div`
  font-size: 45px;
  color: #ffffffdb;
  text-shadow: 1.5px 1.5px 2px black;
  font-family: 'Roboto Slab', serif;
`;

const Info = ({ projectCount }) => {
  return (
    <Wrapper>
      <Count>{`${projectCount}`}</Count>
      <Text>Projects</Text>
    </Wrapper>
  );
};

export default Info;
