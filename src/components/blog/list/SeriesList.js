import React from 'react';
import styled from 'styled-components';

import SeriesInfo from 'components/blog/list/series/SeriesInfo';
import SeriesMovePage from './series/SeriesMovePage';
import Series from 'components/blog/list/series/Series';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  animation: appear 0.3s ease-out;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @keyframes appear {
    from {
      opacity: 0;
      margin-top: 60px;
    }
    to {
      opacity: 1;
      margin-top: 0px;
    }
  }
`;

const SeriesList = ({ series, setPage }) => {
  return (
    <Wrapper>
      <SeriesInfo seriesCount={series.length} />
      <SeriesMovePage setPage={setPage} />
      <Series series={series} />
    </Wrapper>
  );
};

export default SeriesList;
