import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-self: flex-start;
  background: #9d9d9dde;
  max-width: 800px;
  padding: 15px;
  font-size: 60px;
  font-family: 'Nanum Pen Script', cursive;
`;

const Title = ({ name }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default Title;
