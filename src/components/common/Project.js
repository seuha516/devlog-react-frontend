import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Main from 'components/project/pages/Main';
import List from 'components/project/pages/List';
import Write from 'components/project/pages/Write';
import Read from 'components/project/pages/Read';
import NotFound from 'components/utils/NotFound';

const Background = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #232323;
  background-image: url('/images/Common/Background1.jpg');
`;

const Project = () => {
  return (
    <Background>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/list/*" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Background>
  );
};

export default Project;
