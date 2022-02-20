import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 500px;
  margin-bottom: 35px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SeriesWrapper = styled(Link)`
  display: flex;
  margin: 7.5px;
  padding: 7.5px 20px;
  border-radius: 3px;
  background-color: #9d9d9d;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
  &:hover {
    box-shadow: 1px 1px 1px 1px black;
  }
`;
const Name = styled.div`
  font-size: 25px;
  font-weight: 600;
  font-family: 'Nanum Myeongjo', serif;
  margin: 0 10px 0 0;
`;
const Count = styled.div`
  font-size: 20px;
  font-family: 'Exo 2', sans-serif;
  color: white;
`;

const Series = ({ series }) => {
  return (
    <Wrapper>
      {series.map((item) => (
        <SeriesWrapper key={item.name} to={`/blog/series/${item.name}`}>
          <Name>{item.name}</Name>
          <Count>{item.count}</Count>
        </SeriesWrapper>
      ))}
    </Wrapper>
  );
};

export default Series;
