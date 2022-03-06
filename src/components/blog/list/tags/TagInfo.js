import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0;
  padding: 5px 25px;
  background: #000000b3;
`;
const Count = styled.div`
  font-size: 70px;
  font-weight: 600;
  font-family: 'Roboto Slab', serif;
  margin: 0 20px 5px 0;
  color: white;
  text-shadow: 3px 3px 3px black;
`;
const Text = styled.div`
  font-size: 45px;
  font-family: 'Roboto Slab', serif;
  color: #ffffffdb;
  text-shadow: 1.5px 1.5px 2px black;
`;

const TagInfo = ({ tagCount }) => {
  return (
    <Wrapper>
      <Count>{tagCount}</Count>
      <Text>Tags</Text>
    </Wrapper>
  );
};

export default TagInfo;
