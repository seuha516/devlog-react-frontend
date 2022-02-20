import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SeriesWrapper = styled(Link)`
  display: flex;
  margin: 5px 7.5px;
  padding: 7.5px 20px;
  border-radius: 3px;
  background-color: #ad8a8a;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 2px 2px 2px #540a0a;
  }
`;
const Name = styled.div`
  font-size: 22px;
  font-weight: 600;
  font-family: 'Nanum Myeongjo', serif;
  margin: 0 10px 0 0;
`;
const Count = styled.div`
  font-size: 20px;
  font-family: 'Exo 2', sans-serif;
  color: white;
`;

const SeriesItem = ({ series }) => {
  return (
    <SeriesWrapper key={series.name} to={`blog/series/${series.name}`}>
      <Name>{series.name}</Name>
      <Count>{series.count}</Count>
    </SeriesWrapper>
  );
};

export default SeriesItem;
