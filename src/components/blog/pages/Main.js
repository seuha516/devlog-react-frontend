import React, { useEffect } from 'react';

const Main = ({ history }) => {
  useEffect(() => {
    history.push('/blog/list');
  }, [history]);
  return <div style={{ width: '100%', height: 'calc(100vh - 62px)' }} />;
};

export default Main;
