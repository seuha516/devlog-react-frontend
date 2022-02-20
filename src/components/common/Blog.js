import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/blog" exact component={Main} />
        <Route path="/blog/list" component={List} />
        <Route path="/blog/write" component={Write} />
        <Route path="/blog/read/:Id" component={Read} />
        <Route path="/blog/series/:name" component={Series} />
        <Route component={NotFound} />
      </Switch>
    </Background>
  );
};

export default Blog;
