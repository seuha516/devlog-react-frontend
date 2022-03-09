import React, { useEffect } from 'react';

const Main = ({ history }) => {
  useEffect(() => {
    history.push('/project/list');
  }, [history]);
  return <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}></div>;
};

export default Main;
