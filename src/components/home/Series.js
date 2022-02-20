import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';

import LoadingComponent from 'components/utils/LoadingComponent';
import SeriesItem from './SeriesItem';

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
  height: 100%;
  justify-content: flex-start;
  position: relative;
  background-color: #b9a7a7;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  padding: 35px 5%;
  @media all and (max-width: 1024px) {
    grid-column: 1 / 6;
    grid-row: 3 / 4;
  }
  @media all and (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 4 / 5;
  }
`;
const Header = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
`;
const Title = styled.div`
  font-size: 45px;
  font-family: 'Anton', sans-serif;
`;
const More = styled(Link)`
  font-size: 25px;
  font-family: 'Antonio', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 27px;
    height: 27px;
    margin: 0 0 -2px 7px;
  }
  &:hover {
    color: #7d0000;
  }
`;
const Content = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  min-height: 75px;
  @media all and (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
  }
`;

const Series = () => {
  const { series, error, loading } = useSelector(({ listBlog, loading }) => ({
    series: listBlog.series,
    error: listBlog.error,
    loading: loading['listBlog/LIST_POST'],
  }));
  return (
    <Wrapper>
      <Header>
        <Title>Series</Title>
        <More to="/blog/list/series">
          {series && `More`}
          <BsArrowRight />
        </More>
      </Header>
      <Content>
        {error ? (
          <div>Error</div>
        ) : loading ? (
          <LoadingComponent />
        ) : (
          series &&
          series
            .slice(0, 5)
            .map((item) => <SeriesItem key={item.name} series={item} />)
        )}
      </Content>
    </Wrapper>
  );
};

export default Series;
