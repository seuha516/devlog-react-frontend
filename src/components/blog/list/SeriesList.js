import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import styled from 'styled-components';

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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0;
  padding: 5px 25px;
  background: #000000b3;
`;
const InfoCount = styled.div`
  font-size: 70px;
  font-weight: 600;
  font-family: 'Roboto Slab', serif;
  margin: 0 20px 5px 0;
  color: white;
  text-shadow: 3px 3px 3px black;
`;
const InfoText = styled.div`
  font-size: 45px;
  font-family: 'Roboto Slab', serif;
  color: #ffffffdb;
  text-shadow: 1.5px 1.5px 2px black;
`;

const MovePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  margin: -15px 0 30px 0;
  justify-content: space-between;
`;
const MovePageSetPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  cursor: pointer;
  svg {
    width: 45px;
    height: 45px;
    margin: 0 3px -1.5px 3px;
    border-radius: 30px;
    transition: all 0.2s linear;
  }
  &:hover {
    text-shadow: 1px 1px 1px gray;
    svg {
      background-color: black;
      color: white;
    }
  }
`;
const MovePageSetPageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'Karantina', cursive;
  letter-spacing: 1px;
`;

const SeriesWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 500px;
  margin-bottom: 35px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SeriesItemWrapper = styled(Link)`
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
const SeriesName = styled.div`
  font-size: 25px;
  font-weight: 600;
  font-family: 'Nanum Myeongjo', serif;
  margin: 0 10px 0 0;
`;
const SeriesCount = styled.div`
  font-size: 20px;
  font-family: 'Exo 2', sans-serif;
  color: white;
`;

const SeriesList = ({ series, setPage }) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <InfoCount>{series.length}</InfoCount>
        <InfoText>Series</InfoText>
      </InfoWrapper>
      <MovePageWrapper>
        <MovePageSetPage style={{ justifyContent: 'flex-start' }} onClick={() => setPage(1)}>
          <AiOutlineLeftCircle />
          <MovePageSetPageText>Posts</MovePageSetPageText>
        </MovePageSetPage>
        <MovePageSetPage style={{ justifyContent: 'flex-end' }} onClick={() => setPage(0)}>
          <MovePageSetPageText>Tags</MovePageSetPageText>
          <AiOutlineRightCircle />
        </MovePageSetPage>
      </MovePageWrapper>
      <SeriesWrapper>
        {series.map((item) => (
          <SeriesItemWrapper key={item.name} to={`/blog/series?series=${item.name}`}>
            <SeriesName>{item.name}</SeriesName>
            <SeriesCount>{item.count}</SeriesCount>
          </SeriesItemWrapper>
        ))}
      </SeriesWrapper>
    </Wrapper>
  );
};

export default SeriesList;
