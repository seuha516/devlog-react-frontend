import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = ({ history }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/project/list');
  }, [navigate]);
  return <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}></div>;
};

export default Main;
