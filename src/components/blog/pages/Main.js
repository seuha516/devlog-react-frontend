import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/blog/list');
  }, [navigate]);
  return <div style={{ width: '100%', height: 'calc(100vh - 62px)' }} />;
};

export default Main;
