import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/project" exact component={Main} />
        <Route path="/project/list" component={List} />
        <Route path="/project/write" component={Write} />
        <Route path="/project/read/:id" component={Read} />
        <Route component={NotFound} />
      </Switch>
    </Background>
  );
};

export default Project;
