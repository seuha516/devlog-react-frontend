import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listCounter } from 'modules/counter';
import Loading from 'components/utils/Loading';
import NotFound from 'components/utils/NotFound';
import Error from 'components/utils/Error';

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #232323;
  background-image: url('/images/Common/Background6.png');
`;
const Wrapper = styled.form`
  width: 95%;
  max-width: 480px;
  margin: 30px 0;
  background-color: #000000b4;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 38px;
  font-family: 'Zen Dots', cursive;
  line-height: 60px;
  color: #fdfdfde6;
  cursor: pointer;
`;
const LogWrapper = styled.div`
  margin: 25px 0;
`;
const Data = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Time = styled.div`
  font-size: 27px;
  color: #ffffffdb;
  @media all and (max-width: 400px) {
    font-size: 24px;
  }
`;
const Ip = styled.div`
  margin: 3px 0 0 15px;
  font-size: 20px;
  color: #ffffffa8;
  @media all and (max-width: 400px) {
    font-size: 18px;
    margin: 3px 0 0 8px;
  }
`;

const timeString = (date) => {
  const format = (n) => (n < 10 ? `0${n}` : `${n}`);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  return `${year % 100}.${format(month)}.${format(day)} ${format(
    hour,
  )}:${format(minute)}`;
};

const Visitor = () => {
  const dispatch = useDispatch();
  const { user, loading, error, list } = useSelector(
    ({ user, loading, counter }) => ({
      user: user.user,
      loading: loading['counter/LIST_COUNTER'],
      error: counter.error,
      list: counter.list,
    }),
    shallowEqual,
  );
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Visitors';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  useEffect(() => {
    dispatch(listCounter());
  }, [dispatch]);
  if (!user) {
    return (
      <Background>
        <NotFound />
      </Background>
    );
  } else if (error) {
    return (
      <Background>
        <Error />
      </Background>
    );
  } else if (loading) {
    return (
      <Background>
        <Loading />
      </Background>
    );
  } else {
    return (
      <Background>
        <Wrapper>
          <Title onClick={() => dispatch(listCounter())}>Visitor Log</Title>
          {list && (
            <LogWrapper>
              {list.map((data) => (
                <Data key={data._id}>
                  <Time>{timeString(new Date(data.date))}</Time>
                  <Ip>{data.ip}</Ip>
                </Data>
              ))}
            </LogWrapper>
          )}
        </Wrapper>
      </Background>
    );
  }
};

export default Visitor;
