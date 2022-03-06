import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { rootSaga } from 'modules';
import { setUser, check } from 'modules/user';
import 'index.scss';

import Header from 'components/utils/Header';
import Home from 'components/common/Home';
import About from 'components/common/About';
import Project from 'components/common/Project';
import Blog from 'components/common/Blog';
import Login from 'components/common/Login';
import NotFound from 'components/utils/NotFound';
import Footer from 'components/utils/Footer';
import Buttons from 'components/utils/Buttons';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
function loadUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    store.dispatch(setUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working.', e);
  }
}
sagaMiddleware.run(rootSaga);
loadUser();
document.getElementById('root').setAttribute('spellcheck', 'false');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/project" component={Project} />
        <Route path="/blog" component={Blog} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
      <Buttons />
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
