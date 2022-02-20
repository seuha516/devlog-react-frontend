import React, { useEffect } from 'react';

const Main = ({ history }) => {
  useEffect(() => {
    history.push('/blog/list');
  });
  return <div style={{ width: '100%', height: '100%' }}></div>;
};

export default Main;
