import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Main from 'components/blog/pages/Main';
import List from 'components/blog/pages/List';
import Write from 'components/blog/pages/Write';
import Read from 'components/blog/pages/Read';
import NotFound from 'components/utils/NotFound';
import Series from 'components/blog/pages/Series';

const Background = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 62px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #949494;
  background-image: url('/images/Common/Background3.png');
`;

const Blog = () => {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list/*" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/series" element={<Series />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Background>
  );
};

export default Blog;
